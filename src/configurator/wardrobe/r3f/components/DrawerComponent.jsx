// import * as THREE from "three";
// import Drawer from "../common/drawer";
// import { Griff } from "../common/griff";
// import { Plane, Html } from "@react-three/drei";
// import MeasureComponent from "./MeasureComponent";
// import Config from "../../../config";
// import useDndStore from "../../zustand/dndStore";
// import InternalDrawer from "../common/internalDrawer";
// import { useLoader, useThree } from "@react-three/fiber";
// import useCornerStore from "../../zustand/cornerStore";
// import { getDraggingInfo } from "../../utils/draggingInfo";
// import useDimensionStore from "../../zustand/dimensionStore";
// import PlusIcon from "/images/configurator/icons/plus-1.png?url";
// import MinusIcon from "/images/configurator/icons/minus.png?url";
// import { getBottom, getTop } from "../../utils/availableSpace";
// import useFurnishingStore from "../../zustand/furnishingStore";
// import { createUseGesture, dragAction, pinchAction } from "@use-gesture/react";
// import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

// let intersects = new Array(1);
// let drawerTopVisible = true;
// let drawerBottomVisible = true;
// let topConnected = false;
// let bottomConnected = false;
// let topAssetType = "none";
// let result = {};

// const DrawerComponent = React.memo(function DrawerComponent({
//   asset,
//   spaceRef,
//   index,
//   allfurnishing,
//   svId,
// }) {
//   const {
//     xIndex,
//     inDivider,
//     d_xIndex,
//     d_yPos,
//     type,
//     scale,
//     position,
//     topVisible,
//     bottomVisible,
//     sideVisible,
//     topShelfDistance,
//     topAsset,
//     bottomAsset,
//     drawerType,
//     drawerGroup: initialDrawerGroup,
//     drawerGroupScale: initialDrawerGroupScale,
//   } = asset;

//   const setShowDimensions = useCornerStore.use.setShowDimensions();
//   const viewOption = useCornerStore.use.viewOption();

//   const furnishingAssets = useFurnishingStore.use.furnishingAssets();

//   const addAsset = useFurnishingStore.use.addAsset();
//   //const removeAsset = useFurnishingStore.use.removeAsset();
//   const removeAssetByIndex = useFurnishingStore.use.removeAssetByIndex();
//   const showDrawerShelf = useFurnishingStore.use.showDrawerShelf();
//   const setSelectionInfo = useFurnishingStore.use.setSelectionInfo();
//   const updateAsset = useFurnishingStore.use.updateAsset();
//   const totalSpace = useFurnishingStore.use.totalSpace();
//   const removeGriff = useFurnishingStore.use.removeGriff();

//   const setAssetDragging = useDndStore.use.setAssetDragging();
//   const assetDragging = useDndStore.use.assetDragging();
//   const setDrawerHeight = useDndStore.use.setDrawerHeight();
//   const setDrawerTopDistance = useDndStore.use.setDrawerTopDistance();
//   const setType = useDndStore.use.setType();

//   const elementsWidths = useDimensionStore.use.elementsWidths();
//   const height = useDimensionStore.use.height();
//   const depth = useDimensionStore.use.depth();
//   const width = useDimensionStore.use.width();
//   const elementsCount = useDimensionStore.use.elementsCount();
//   const hanging = useDimensionStore.use.hanging();
//   const withFeet = useDimensionStore.use.withFeet();

//   const { size, camera, raycaster } = useThree();
//   const [planPositionX, setPlanPositionX] = useState();
//   const [planPositionY, setPlanPositionY] = useState();

//   const pointer = useMemo(() => new THREE.Vector2(), []);
//   const ref = useRef();
//   const [dragStarted, setDragStarted] = useState(true);
//   const [showControl, setShowControl] = useState(false);
//   const [showDimentionControl, setShowDimensionControl] = useState(false);
//   const [showDimen, setShowDimen] = useState(false);
//   const [showMeasure, setShowMeasure] = useState(false);
//   const [drawerHeightValue, setDrawerHeightValue] = useState();
//   const [measureInfo, setMeasureInfo] = useState({
//     posX: 0,
//     aboveTop: 0,
//     aboveBottom: 0,
//     belowTop: 0,
//     belowBottom: 0,
//   });

//   const { sideIncident } = Config.furnishing.drawer;
//   const { panelSpace, panelWidth } = Config.furnishing.internalDrawer;

//   const [trashMap, arrowUpDownMap, plusMap] = useLoader(THREE.TextureLoader, [
//     "/images/furnishing/doors/trash_blue.png",
//     "/images/configurator/icons/arrow_up_down.png",
//     "/images/configurator/icons/plus.png",
//   ]);
//   plusMap.anisotropy = 16;
//   plusMap.minFilter = THREE.LinearFilter;
//   plusMap.magFilter = THREE.LinearFilter;
//   plusMap.generateMipmaps = false;

//   const useGesture = createUseGesture([dragAction, pinchAction]);

//   useEffect(() => {
//     if (!dragStarted) {
//       setShowDimensions(false);
//       setPlanPositionX(position[0]);
//       setPlanPositionY(position[1]);
//       setSelectionInfo({
//         xIndex,
//         yPos: position[1],
//         inDivider,
//         d_xIndex,
//         d_yPos,
//       });
//       setAssetDragging(true);
//       if (!topVisible || !bottomVisible) {
//         showDrawerShelf({
//           type,
//           xIndex,
//           yPos: position[1],
//           inDivider,
//           d_xIndex,
//           d_yPos,
//         });
//       }
//       setShowControl(false);
//     }
//   }, [dragStarted]);

//   //run when wardrobe height changes. Update all drawers at the top
//   useEffect(() => {
//     furnishingAssets.forEach((asset, index) => {
//       if (
//         asset.type === Config.furnishing.type.drawer ||
//         asset.type === Config.furnishing.type.internalDrawer
//       ) {
//         const topPosition = height - Config.plate.thickness / 2;
//         const assetPosition = asset.position[1] + scale[1] / 2;
//         if (
//           asset.topAsset === "none" &&
//           topPosition - assetPosition < Config.plate.thickness &&
//           !asset.topVisible
//         ) {
//           updateAsset({
//             index,
//             newData: {
//               topVisible: true,
//             },
//           });
//         }
//       }
//     });
//   }, [height]);
//   const handleDragStart = useCallback(() => {
//     setType(type);
//     setDrawerHeight(scale[1]);
//     if (type === Config.furnishing.type.drawer) setDrawerTopDistance(topShelfDistance);
//     setDragStarted(true);
//   }, [type, scale, topShelfDistance, xIndex, position]);

//   const handleDrag = useCallback(
//     (state) => {
//       if (state.delta[0] === 0 && state.delta[1] === 0) return;
//       document.body.style.cursor = "grabbing";

//       setDragStarted(false);
//       setShowMeasure(true);

//       pointer.x = ((state.values[0] - size.left) / size.width) * 2 - 1;
//       pointer.y = -((state.values[1] - size.top) / size.height) * 2 + 1;
//       raycaster.setFromCamera(pointer, camera);
//       intersects = raycaster.intersectObjects(spaceRef.children, true);

//       if (!intersects[0]) return;

//       if (intersects[0].object.name === "available") {
//         const { top, bottom, topAsset, bottomAsset, availableTop, availableBottom } =
//           intersects[0].object.userData;

//         topAssetType = topAsset;

//         result = getDraggingInfo({
//           type,
//           top,
//           bottom,
//           topAsset,
//           bottomAsset,
//           initialPosY: intersects[0].point.y * 100 + height / 2,
//           raster: Config.furnishing.default.raster,
//           availableWidth: intersects[0].object.geometry.parameters.width,
//           objectHeight: scale[1],
//         });

//         drawerTopVisible = result.topVisible;
//         drawerBottomVisible = result.bottomVisible;
//         topConnected = result.topConnected;
//         bottomConnected = result.bottomConnected;
//         ref.current?.position.set(
//           intersects[0].object.position.x,
//           hanging || withFeet ? result.posY - 25 : result.posY,
//           position[2]
//         );
//         setPlanPositionX(intersects[0].object.position.x);
//         setPlanPositionY(result.posY);

//         if (scale[0] !== result.objectWidth) {
//           updateAsset({
//             index,
//             newData: { scale: [result.objectWidth, scale[1], scale[2]] },
//           });
//         }

//         // if (asset.topVisible !== drawerTopVisible || asset.bottomVisible !== drawerBottomVisible) {
//         //   updateAsset({
//         //     index,
//         //     newData: {
//         //       topVisible: drawerTopVisible,
//         //       bottomVisible: drawerBottomVisible,
//         //     },
//         //   });
//         // }

//         const tempMeasureInfo = {
//           posX: intersects[0].object.position.x,
//           aboveTop: availableTop,
//           aboveBottom: getBottom(
//             hanging || withFeet ? result.posY - 25 : result.posY,
//             scale[1],
//             type,
//             topShelfDistance
//           ),
//           belowTop: getTop(hanging || withFeet ? result.posY - 25 : result.posY, scale[1], type),
//           belowBottom: availableBottom,
//         };

//         if (JSON.stringify(measureInfo) !== JSON.stringify(tempMeasureInfo))
//           setMeasureInfo(tempMeasureInfo);
//       } else {
//         drawerTopVisible = true;
//         topConnected = false;
//         drawerBottomVisible = true;
//         bottomConnected = false;

//         ref.current?.position.set(
//           intersects[0].point.x * 100 + width / 2,
//           intersects[0].point.y * 100 + height / 2,
//           depth + depth / 2
//         );

//         setShowMeasure(false);
//       }
//     },
//     [spaceRef, ref, allfurnishing, scale, measureInfo, hanging, withFeet]
//   );

//   const handleDragEnd = useCallback(
//     (state) => {
//       setShowMeasure(false);
//       setAssetDragging(false);
//       setShowControl(false);
//       if (state.values[0] === state.initial[0] && state.values[1] === state.initial[1]) return;

//       // Calculate X-axis scale based on whether it's a `Drawer` or `InternalDrawer`
//       const scaleX =
//         type === "Drawer"
//           ? elementsWidths[xIndex] - sideIncident * 2
//           : elementsWidths[xIndex] - (panelSpace + panelWidth) * 2;

//       // Revert the asset to its previous position in the wardrobe if there is no intersection or if the intersection is with `other` or `occupied`
//       if (
//         !intersects[0] ||
//         intersects[0]?.object.name === "other" ||
//         intersects[0]?.object.name === "occupied"
//       ) {
//         //update positionY for the controls Plane
//         setPlanPositionY(position[1] + 0.0000000000001);
//         return updateAsset({
//           index,
//           newData: {
//             position: [position[0], position[1] + 0.0000000000001, position[2]],
//             // Update the asset's scale along the x-axis based on the width of the wardrobe section (xIndex).
//             // elementsWidths is an array that stores the width of each wardrobe section(xIndex).
//             scale: [scaleX, scale[1], scale[2]],
//           },
//         });
//       }

//       //Handle update of the DraggedAsset on dragEnd
//       const { topAsset, bottomAsset, xIndex: currentXindex } = intersects[0].object.userData;

//       //Get value of topVisible and bottomVisible
//       const topVisibleValue =
//         (result.topConnected && topAsset === type) ||
//         (result.topConnected && topAsset === "none") ||
//         (!result.topVisible && topAsset === "none")
//           ? false
//           : true;
//       const bottomVisibleValue =
//         (result.bottomConnected && bottomAsset === type) ||
//         (result.bottomConnected && bottomAsset === "none") ||
//         (!result.bottomVisible && bottomAsset === "none")
//           ? false
//           : true;

//       const payload = {
//         index,
//         newData: {
//           xIndex: intersects[0].object.userData.xIndex,
//           topAsset: topAsset, //update topAsset
//           bottomAsset: bottomAsset, //update bottomAsset
//           topVisible: topVisibleValue, //update topVisible
//           bottomVisible: bottomVisibleValue, //update bottomVisible
//           inDivider: intersects[0].object.userData.inDivider,
//           d_xIndex: intersects[0].object.userData.d_xIndex,
//           d_yPos: intersects[0].object.userData.d_yPos,
//           position: [ref.current.position.x, ref.current.position.y, ref.current.position.z],
//           scale: scale,
//           type,
//           isShowControl: true,
//         },
//       };

//       updateAsset(payload);

//       /***************** Function Logic: What Happens When topConnected or bottomConnected Is True (Indicating It Is Connected to Another Drawer) **********************************************************/
//       // Handles removal of the bottom of the topAsset if it's connected with another Drawer
//       if (result.topConnected && type === Config.furnishing.type.drawer) {
//         // Find the closest asset above `result.posY` directly
//         let topAsset = null;
//         let assetIndex = -1;

//         for (let i = 0; i < furnishingAssets.length; i++) {
//           const currentAsset = furnishingAssets[i];
//           if (
//             currentAsset.xIndex === currentXindex &&
//             currentAsset.position[1] > result.posY &&
//             (!topAsset || currentAsset.position[1] < topAsset.position[1])
//           ) {
//             topAsset = currentAsset;
//             assetIndex = i;
//           }
//         }
//         if (topAsset && topAsset?.type === Config.furnishing.type.drawer) {
//           updateAsset({
//             index: assetIndex,
//             newData: {
//               bottomVisible: false,
//             },
//           });
//         }
//       }

//       // Handles removal of the top of the topAsset if it's connected with another Drawer
//       if (result.bottomConnected && type === Config.furnishing.type.drawer) {
//         // Find the closest asset below `result.posY` directly
//         let bottomAsset = null;
//         let assetIndex = -1;

//         for (let i = 0; i < furnishingAssets.length; i++) {
//           const currentAsset = furnishingAssets[i];
//           if (
//             currentAsset.xIndex === currentXindex &&
//             currentAsset.position[1] < result.posY &&
//             (!bottomAsset || currentAsset.position[1] > bottomAsset.position[1])
//           ) {
//             bottomAsset = currentAsset;
//             assetIndex = i;
//           }
//         }

//         if (bottomAsset && bottomAsset?.type === Config.furnishing.type.drawer) {
//           updateAsset({
//             index: assetIndex,
//             newData: {
//               topVisible: false,
//             },
//           });
//         }
//       }

//       /****************************************************************************************/

//       /***************** Function Logic: What Happens When topConnected or bottomConnected Is just becomes false (Indicating It Is Connected to Another Drawer) **********************************************************/
//       // Updates the bottomVisible property of the top drawer it was connected to when it is no longer topConnected.
//       //if (!asset.topVisible && !topConnected && asset.type === Config.furnishing.type.drawer) {

//       if (
//         !asset.topVisible &&
//         (!topConnected || ref.current.position.y !== position[1]) &&
//         asset.type === Config.furnishing.type.drawer
//       ) {
//         const filteredAssets = furnishingAssets.filter((asset) => {
//           return asset.xIndex === xIndex && asset.position[1] > position[1];
//         });
//         //if it's topConnected with the top Plate
//         if (!filteredAssets.length) return;

//         const sortAssets = filteredAssets.sort((a, b) => {
//           return a.position[1] - b.position[1];
//         });
//         const topAsset = sortAssets[0];

//         const assetIndex = furnishingAssets.findIndex(
//           (asset) => asset.xIndex === xIndex && asset.position[1] === topAsset.position[1]
//         );
//         if (topAsset && topAsset?.type === Config.furnishing.type.drawer) {
//           updateAsset({
//             index: assetIndex,
//             newData: {
//               bottomVisible: true,
//             },
//           });
//         }
//       }

//       //Updates the topVisible property of the bottom drawer it was connected to when it is no longer bottomConnected.
//       if (
//         !asset.bottomVisible &&
//         (!bottomConnected || ref.current.position.y !== position[1]) &&
//         asset.type === Config.furnishing.type.drawer
//       ) {
//         const filteredAssets = furnishingAssets.filter((asset) => {
//           return asset.xIndex === xIndex && asset.position[1] < position[1];
//         });

//         //if it's bottomConnected with the bottom Plate
//         if (!filteredAssets.length) return;

//         const sortAssets = filteredAssets.sort((a, b) => {
//           return b.position[1] - a.position[1];
//         });

//         const bottomAsset = sortAssets[0];

//         const assetIndex = furnishingAssets.findIndex(
//           (asset) => asset.xIndex === xIndex && asset.position[1] === bottomAsset.position[1]
//         );

//         if (bottomAsset && bottomAsset?.type === Config.furnishing.type.drawer) {
//           updateAsset({
//             index: assetIndex,
//             newData: {
//               topVisible: true,
//             },
//           });
//         }
//       }

//       /***** */
//       /***** */
//       /***** */
//       /** // INTERNAL DRAWER INTERNAL DRAWER UPDATE FUNCTION INTERNAL DRAWER INTERNAL DRAWER UPDATE FUNCTION **/
//       /***************** Function Logic: What Happens When topConnected or bottomConnected Is True (Indicating It Is Connected to Another InternalDrawer) **********************************************************/
//       // Handles removal of the bottom of the topAsset if it's connected with another InternalDrawer
//       if (result.topConnected && asset.type === Config.furnishing.type.internalDrawer) {
//         // Find the closest asset above `result.posY` directly
//         let topAsset = null;
//         let assetIndex = -1;

//         for (let i = 0; i < furnishingAssets.length; i++) {
//           const currentAsset = furnishingAssets[i];
//           if (
//             currentAsset.xIndex === currentXindex &&
//             currentAsset.position[1] > result.posY &&
//             (!topAsset || currentAsset.position[1] < topAsset.position[1])
//           ) {
//             topAsset = currentAsset;
//             assetIndex = i;
//           }
//         }

//         if (topAsset && topAsset?.type === Config.furnishing.type.internalDrawer) {
//           updateAsset({
//             index: assetIndex,
//             newData: {
//               bottomVisible: false,
//             },
//           });
//         }
//       }

//       // Handles removal of the top of the topAsset if it's connected with another Drawer
//       if (result.bottomConnected && asset.type === Config.furnishing.type.internalDrawer) {
//         // Find the closest asset below `result.posY` directly
//         let bottomAsset = null;
//         let assetIndex = -1;

//         for (let i = 0; i < furnishingAssets.length; i++) {
//           const currentAsset = furnishingAssets[i];
//           if (
//             currentAsset.xIndex === currentXindex &&
//             currentAsset.position[1] < result.posY &&
//             (!bottomAsset || currentAsset.position[1] > bottomAsset.position[1])
//           ) {
//             bottomAsset = currentAsset;
//             assetIndex = i;
//           }
//         }

//         if (bottomAsset && bottomAsset?.type === Config.furnishing.type.internalDrawer) {
//           updateAsset({
//             index: assetIndex,
//             newData: {
//               topVisible: false,
//             },
//           });
//         }
//       }

//       /****************************************************************************************/

//       /***************** Function Logic: What Happens When topConnected or bottomConnected Is just becomes false (Indicating It Is Connected to Another InternalDrawer) **********************************************************/
//       //Updates the bottomVisible property of the top Internal drawer it was connected to when it is no longer topConnected.
//       if (
//         !asset.topVisible &&
//         (!topConnected || ref.current.position.y !== position[1]) &&
//         asset.type === Config.furnishing.type.internalDrawer
//       ) {
//         const filteredAssets = furnishingAssets.filter((asset) => {
//           return asset.xIndex === xIndex && asset.position[1] > position[1];
//         });

//         //if it's topConnected with the top Plate
//         if (!filteredAssets.length) return;

//         const sortAssets = filteredAssets.sort((a, b) => {
//           return a.position[1] - b.position[1];
//         });
//         const topAsset = sortAssets[0];

//         const assetIndex = furnishingAssets.findIndex(
//           (asset) => asset.xIndex === xIndex && asset.position[1] === topAsset.position[1]
//         );

//         if (topAsset && topAsset?.type === Config.furnishing.type.internalDrawer) {
//           updateAsset({
//             index: assetIndex,
//             newData: {
//               bottomVisible: true,
//             },
//           });
//         }
//       }

//       //Updates the topVisible property of the bottom InternalDrawer it was connected to when it is no longer bottomConnected.
//       if (
//         !asset.bottomVisible &&
//         (!bottomConnected || ref.current.position.y !== position[1]) &&
//         asset.type === Config.furnishing.type.internalDrawer
//       ) {
//         const filteredAssets = furnishingAssets.filter((asset) => {
//           return asset.xIndex === xIndex && asset.position[1] < position[1];
//         });

//         //if it's bottomConnected with the bottom Plate
//         if (!filteredAssets.length) return;

//         const sortAssets = filteredAssets.sort((a, b) => {
//           return b.position[1] - a.position[1];
//         });

//         const bottomAsset = sortAssets[0];

//         const assetIndex = furnishingAssets.findIndex(
//           (asset) => asset.xIndex === xIndex && asset.position[1] === bottomAsset.position[1]
//         );

//         if (bottomAsset && bottomAsset?.type === Config.furnishing.type.internalDrawer) {
//           updateAsset({
//             index: assetIndex,
//             newData: {
//               topVisible: true,
//             },
//           });
//         }
//       }

//       document.body.style.cursor = "pointer";
//     },
//     [ref, scale, topShelfDistance, xIndex, position, furnishingAssets]
//   );

//   const bind = useGesture(
//     { onDragStart: handleDragStart, onDrag: handleDrag, onDragEnd: handleDragEnd },
//     { enabled: viewOption === Config.view.front }
//   );

//   useEffect(() => {
//     setDrawerHeightValue(
//       (topShelfDistance === undefined
//         ? 0
//         : scale[1] +
//           topShelfDistance +
//           Config.furnishing.drawer.bottomShelfDistance +
//           2 * Config.furnishing.shelf.thickness1
//       ).toFixed(1)
//     );
//   }, [topShelfDistance]);

//   const handleBlur = useCallback(
//     (e) => {
//       if (e.currentTarget.contains(e.relatedTarget)) return;
//       setShowDimensionControl(false);
//       const flagValue =
//         position[1] + scale[1] / 2 + topShelfDistance + Config.furnishing.shelf.thickness1 + 0.5;
//       const { availableTop, aboveBottom } = getAvailableSpace(xIndex, totalSpace, flagValue);
//       const scaleY = !topShelfDistance
//         ? 0
//         : drawerHeightValue -
//           topShelfDistance -
//           Config.furnishing.drawer.bottomShelfDistance -
//           2 * Config.furnishing.shelf.thickness1;

//       const tempAvailableTop = scaleY - scale[1];
//       const positionY = position[1] - scale[1] / 2 + scaleY / 2;

//       if (availableTop > 0) return customDrawer(scaleY, positionY);
//       if (tempAvailableTop < 0) return customDrawer(scaleY, positionY);

//       const filteredAssets = furnishingAssets.filter(
//         (asset) => asset.xIndex === xIndex && asset.position[1] > position[1]
//       );
//       const sortAssets = filteredAssets.sort((a, b) => a.position[1] - b.position[1]);
//       const available =
//         sortAssets.length > 0
//           ? sortAssets[0].position[1] - sortAssets[0].scale[1] / 2 - (position[1] + scale[1] / 2)
//           : height - (position[1] + scale[1] / 2);

//       if (tempAvailableTop < available) return customDrawer(scaleY, positionY);

//       setDrawerHeightValue(
//         (topShelfDistance === undefined
//           ? 0
//           : scale[1] +
//             topShelfDistance +
//             Config.furnishing.drawer.bottomShelfDistance +
//             2 * Config.furnishing.shelf.thickness1
//         ).toFixed(1)
//       );
//       setShowControl(false);
//     },
//     [drawerHeightValue, position]
//   );

//   const onRemoveObject = useCallback(
//     (furnishIndex) => {
//       if (!asset.topVisible && asset.type === Config.furnishing.type.drawer) {
//         const filteredAssets = furnishingAssets.filter((asset) => {
//           return asset.xIndex === xIndex && asset.position[1] > position[1];
//         });

//         //if it's topConnected with the top Plate
//         if (filteredAssets.length) {
//           const sortAssets = filteredAssets.sort((a, b) => {
//             return a.position[1] - b.position[1];
//           });
//           const topAsset = sortAssets[0];

//           const assetIndex = furnishingAssets.findIndex(
//             (asset) => asset.xIndex === xIndex && asset.position[1] === topAsset.position[1]
//           );
//           if (topAsset && topAsset?.type === Config.furnishing.type.drawer) {
//             updateAsset({
//               index: assetIndex,
//               newData: {
//                 bottomVisible: true,
//               },
//             });
//           }
//         }
//       }

//       //Updates the topVisible property of the bottom drawer it was connected to when it is no longer bottomConnected.
//       if (!asset.bottomVisible && asset.type === Config.furnishing.type.drawer) {
//         const filteredAssets = furnishingAssets.filter((asset) => {
//           return asset.xIndex === xIndex && asset.position[1] < position[1];
//         });

//         //if it's bottomConnected with the bottom Plate
//         if (filteredAssets.length) {
//           const sortAssets = filteredAssets.sort((a, b) => {
//             return b.position[1] - a.position[1];
//           });

//           const bottomAsset = sortAssets[0];

//           const assetIndex = furnishingAssets.findIndex(
//             (asset) => asset.xIndex === xIndex && asset.position[1] === bottomAsset.position[1]
//           );

//           if (bottomAsset && bottomAsset?.type === Config.furnishing.type.drawer) {
//             updateAsset({
//               index: assetIndex,
//               newData: {
//                 topVisible: true,
//               },
//             });
//           }
//         }
//       }

//       /************************* INTERNAL DRAWER  *************************/
//       if (asset.type === Config.furnishing.type.internalDrawer) {
//         if (!asset.topVisible) {
//           const filteredAssets = furnishingAssets.filter((asset) => {
//             return asset.xIndex === xIndex && asset.position[1] > position[1];
//           });

//           //if it's topConnected with the top Plate
//           if (filteredAssets.length) {
//             const sortAssets = filteredAssets.sort((a, b) => {
//               return a.position[1] - b.position[1];
//             });
//             const topAsset = sortAssets[0];

//             const assetIndex = furnishingAssets.findIndex(
//               (asset) => asset.xIndex === xIndex && asset.position[1] === topAsset.position[1]
//             );
//             if (topAsset && topAsset?.type === Config.furnishing.type.internalDrawer) {
//               updateAsset({
//                 index: assetIndex,
//                 newData: {
//                   bottomVisible: true,
//                 },
//               });
//             }
//           }
//         }

//         //Updates the topVisible property of the bottom Internaldrawer it was connected to when it is no longer bottomConnected.
//         if (!asset.bottomVisible) {
//           const filteredAssets = furnishingAssets.filter((asset) => {
//             return asset.xIndex === xIndex && asset.position[1] < position[1];
//           });

//           //if it's bottomConnected with the bottom Plate
//           if (filteredAssets.length) {
//             const sortAssets = filteredAssets.sort((a, b) => {
//               return b.position[1] - a.position[1];
//             });

//             const bottomAsset = sortAssets[0];

//             const assetIndex = furnishingAssets.findIndex(
//               (asset) => asset.xIndex === xIndex && asset.position[1] === bottomAsset.position[1]
//             );

//             if (bottomAsset && bottomAsset?.type === Config.furnishing.type.internalDrawer) {
//               updateAsset({
//                 index: assetIndex,
//                 newData: {
//                   topVisible: true,
//                 },
//               });
//             }
//           }
//         }
//       }

//       removeAssetByIndex(furnishIndex);
//       setShowControl(false);
//     },
//     [furnishingAssets]
//   );

//   const getAvailableSpace = (initialXIndex, totalSpace, flagValue) => {
//     const filter = totalSpace.filter((space) => {
//       return (
//         space.xIndex === initialXIndex &&
//         space.availableBottom <= flagValue &&
//         space.availableTop >= flagValue
//       );
//     });
//     const aboveBottom = getBottom(
//       hanging || withFeet ? position[1] - 25 : position[1],
//       scale[1],
//       type,
//       topShelfDistance
//     );
//     const availableTop = filter[0]?.height;
//     return { availableTop, aboveBottom };
//   };

//   const updateDrawer = (scaleY, positionY, tempDrawerGroupScale) => {
//     const payload = {};
//     payload.removal = {
//       xIndex,
//       yPos: position[1],
//       inDivider,
//       d_xIndex,
//       d_yPos,
//     };

//     payload.asset = {
//       xIndex,
//       inDivider,
//       d_xIndex,
//       d_yPos,
//       position: [position[0], positionY, position[2]],
//       scale: [scale[0], scaleY, scale[2]],
//       type,
//       drawerType,
//       topVisible,
//       bottomVisible,
//       sideVisible: true,
//       topShelfDistance: type === Config.furnishing.type.drawer ? topShelfDistance : undefined,
//       topShelfVisible:
//         type === Config.furnishing.type.divider &&
//         (topAssetType === Config.furnishing.type.slopingFloor ||
//           topAssetType === Config.furnishing.type.clothesLift ||
//           topAssetType === Config.furnishing.type.clothesRail ||
//           topAssetType === Config.furnishing.type.pantsPullout)
//           ? true
//           : false,
//       dividerLeftWidth:
//         type === Config.furnishing.type.divider
//           ? (scale[0] - Config.furnishing.divider.thickness) / 2
//           : undefined,
//       bottomAsset,
//       drawerGroup: initialDrawerGroup + 1,
//       drawerGroupScale: tempDrawerGroupScale,
//     };

//     payload.drawerShelf = [];
//     if (topConnected) {
//       payload.drawerShelf.push({
//         location: "top",
//         bottomVisible: !topConnected,
//       });
//     }
//     if (bottomConnected) {
//       payload.drawerShelf.push({
//         location: "bottom",
//         topVisible: !bottomConnected,
//       });
//     }
//     addAsset(payload);
//   };

//   const customDrawer = (scaleY, positionY) => {
//     const payload = {};

//     payload.removal = {
//       xIndex,
//       yPos: position[1],
//       inDivider,
//       d_xIndex,
//       d_yPos,
//     };

//     payload.asset = {
//       xIndex,
//       inDivider,
//       d_xIndex,
//       d_yPos,
//       position: [position[0], positionY, position[2]],
//       scale: [scale[0], scaleY, scale[2]],
//       type,
//       drawerType,
//       topVisible,
//       bottomVisible,
//       sideVisible: true,
//       topShelfDistance: type === Config.furnishing.type.drawer ? topShelfDistance : undefined,
//       topShelfVisible:
//         type === Config.furnishing.type.divider &&
//         (topAssetType === Config.furnishing.type.slopingFloor ||
//           topAssetType === Config.furnishing.type.clothesLift ||
//           topAssetType === Config.furnishing.type.clothesRail ||
//           topAssetType === Config.furnishing.type.pantsPullout)
//           ? true
//           : false,
//       dividerLeftWidth:
//         type === Config.furnishing.type.divider
//           ? (scale[0] - Config.furnishing.divider.thickness) / 2
//           : undefined,
//       bottomAsset,
//       drawerGroup: 1,
//       drawerGroupScale: [scaleY],
//     };

//     payload.drawerShelf = [];
//     if (topConnected) {
//       payload.drawerShelf.push({
//         location: "top",
//         bottomVisible: !topConnected,
//       });
//     }
//     if (bottomConnected) {
//       payload.drawerShelf.push({
//         location: "bottom",
//         topVisible: !bottomConnected,
//       });
//     }
//     addAsset(payload);
//   };

//   // click plus icon add drawer on top
//   const onPlusMap = useCallback(() => {
//     if (type === Config.furnishing.type.drawer) {
//       const flagValue =
//         position[1] + scale[1] / 2 + topShelfDistance + Config.furnishing.shelf.thickness1 + 1;
//       const { availableTop, aboveBottom } = getAvailableSpace(xIndex, totalSpace, flagValue);

//       if (scale[1] < availableTop) {
//         const payload = {};

//         payload.asset = {
//           xIndex,
//           inDivider,
//           d_xIndex,
//           d_yPos,
//           position: [
//             position[0],
//             position[1] +
//               scale[1] / 2 +
//               scale[1] / 2 +
//               Config.furnishing.drawer.bottomShelfDistance +
//               Config.furnishing.shelf.thickness1 +
//               0.475 +
//               0.475,
//             position[2],
//           ],
//           scale: [scale[0], scale[1], scale[2]],
//           type,
//           drawerType,
//           topVisible: true,
//           bottomVisible: false,
//           sideVisible: true,
//           topShelfDistance: type === Config.furnishing.type.drawer ? topShelfDistance : undefined,
//           topShelfVisible:
//             type === Config.furnishing.type.divider &&
//             (topAssetType === Config.furnishing.type.slopingFloor ||
//               topAssetType === Config.furnishing.type.clothesLift ||
//               topAssetType === Config.furnishing.type.clothesRail ||
//               topAssetType === Config.furnishing.type.pantsPullout)
//               ? true
//               : false,
//           dividerLeftWidth:
//             type === Config.furnishing.type.divider
//               ? (scale[0] - Config.furnishing.divider.thickness) / 2
//               : undefined,
//           bottomAsset,
//           drawerGroup: initialDrawerGroup + 1,
//           drawerGroupScale: initialDrawerGroupScale,
//         };

//         payload.drawerShelf = [];
//         if (topConnected) {
//           payload.drawerShelf.push({
//             location: "top",
//             bottomVisible: !topConnected,
//           });
//         }
//         if (bottomConnected) {
//           payload.drawerShelf.push({
//             location: "bottom",
//             topVisible: !bottomConnected,
//           });
//         }

//         addAsset(payload);

//         //update topVisible property of the clicked Drawer to false
//         updateAsset({
//           index,
//           newData: {
//             topVisible: false,
//           },
//         });
//       }
//     }

//     if (type === Config.furnishing.type.internalDrawer) {
//       const filteredAssets = furnishingAssets.filter(
//         (asset) => asset.xIndex === xIndex && asset.position[1] > position[1]
//       );
//       const sortAssets = filteredAssets.sort((a, b) => a.position[1] - b.position[1]);

//       let available = topShelfDistance;
//       if (sortAssets.length > 0) {
//         available =
//           sortAssets[0].position[1] -
//           sortAssets[0].scale[1] / 2 -
//           (position[1] + scale[1] / 2) -
//           Config.furnishing.internalDrawer.topShelfDistance -
//           Config.furnishing.internalDrawer.panelSpace;
//       } else {
//         available =
//           height -
//           (position[1] + scale[1] / 2) -
//           Config.furnishing.internalDrawer.topShelfDistance -
//           Config.furnishing.internalDrawer.panelSpace;
//       }

//       if (scale[1] < available) {
//         // const scaleY =
//         //   initialDrawerGroupScale[0] +
//         //   scale[1] +
//         //   Config.furnishing.internalDrawer.topShelfDistance +
//         //   Config.furnishing.internalDrawer.panelSpace;
//         // const positionY = position[1] - scale[1] / 2 + scaleY / 2;
//         // customDrawer(scaleY, positionY);

//         const payload = {};

//         payload.asset = {
//           xIndex,
//           inDivider,
//           d_xIndex,
//           d_yPos,
//           position: [
//             position[0],
//             position[1] +
//               scale[1] / 2 +
//               scale[1] / 2 +
//               Config.furnishing.drawer.bottomShelfDistance +
//               Config.furnishing.shelf.thickness1,
//             position[2],
//           ],
//           scale: [scale[0], scale[1], scale[2]],
//           type,
//           drawerType,
//           topVisible: true,
//           bottomVisible: false,
//           sideVisible: true,
//           topShelfDistance: type === Config.furnishing.type.drawer ? topShelfDistance : undefined,
//           topShelfVisible:
//             type === Config.furnishing.type.divider &&
//             (topAssetType === Config.furnishing.type.slopingFloor ||
//               topAssetType === Config.furnishing.type.clothesLift ||
//               topAssetType === Config.furnishing.type.clothesRail ||
//               topAssetType === Config.furnishing.type.pantsPullout)
//               ? true
//               : false,
//           dividerLeftWidth:
//             type === Config.furnishing.type.divider
//               ? (scale[0] - Config.furnishing.divider.thickness) / 2
//               : undefined,
//           bottomAsset,
//           drawerGroup: initialDrawerGroup + 1,
//           drawerGroupScale: initialDrawerGroupScale,
//         };

//         payload.drawerShelf = [];
//         if (topConnected) {
//           payload.drawerShelf.push({
//             location: "top",
//             bottomVisible: !topConnected,
//           });
//         }
//         if (bottomConnected) {
//           payload.drawerShelf.push({
//             location: "bottom",
//             topVisible: !bottomConnected,
//           });
//         }

//         addAsset(payload);

//         //update topVisible property of the clicked Drawer to false
//         updateAsset({
//           index,
//           newData: {
//             topVisible: false,
//           },
//         });
//       }
//     }
//   }, [
//     totalSpace,
//     xIndex,
//     drawerHeightValue,
//     scale,
//     position,
//     furnishingAssets,
//     height,
//     initialDrawerGroupScale,
//     initialDrawerGroup,
//   ]);

//   return (
//     <group
//       visible={scale[2] !== 0}
//       furnishType="drawer"
//       furnishIndex={index}
//       userData={{
//         xIndex,
//         inDivider,
//         d_xIndex,
//         d_yPos,
//         type,
//         scale,
//         position,
//         svId,
//       }}
//     >
//       <Plane
//         // args={[scale[0], 25]}
//         args={[
//           scale[0],
//           scale[1] +
//             (type === Config.furnishing.type.drawer
//               ? Config.furnishing.drawer.topShelfDistance +
//                 Config.furnishing.drawer.bottomShelfDistance
//               : Config.furnishing.internalDrawer.topShelfDistance +
//                 Config.furnishing.internalDrawer.bottomShelfDistance) +
//             Config.plate.thickness +
//             Config.plate.thickness,
//         ]}
//         position={[position[0], position[1], depth + 3.2]}
//         // position={[
//         //   position[0],
//         //   planPositionY == undefined ? position[1] : planPositionY,
//         //   depth + 3.2,
//         // ]}
//         rotateX={Math.PI / 2}
//         visible={false}
//         onPointerOver={(e) => {
//           e.stopPropagation();
//           if (assetDragging) return;
//           setShowControl(true);
//         }}
//         onPointerOut={(e) => {
//           e.stopPropagation();
//           if (assetDragging) return;
//           //if (showDimen) return;
//           setShowControl(false);
//         }}
//       />
//       <group
//         {...bind()}
//         ref={ref}
//         position={position}
//         userData={{
//           xIndex,
//           inDivider,
//           d_xIndex,
//           d_yPos,
//           type,
//           scale,
//           position,
//           svId,
//         }}
//       >
//         {type === Config.furnishing.type.drawer && (
//           <>
//             <Drawer
//               scale={scale}
//               depth={depth}
//               elementIndex={
//                 (inDivider ? d_xIndex : xIndex) === 0
//                   ? Config.elementIndex.first
//                   : xIndex === elementsCount - 1
//                   ? Config.elementIndex.last
//                   : Config.elementIndex.middle
//               }
//               topVisible={topVisible}
//               bottomVisible={bottomVisible}
//               topShelfDistance={topShelfDistance}
//               position={position}
//               type={type}
//               topAsset={topAsset}
//               bottomAsset={bottomAsset}
//               visible={true}
//               xIndex={xIndex}
//               drawerGroup={initialDrawerGroup}
//               drawerGroupScale={initialDrawerGroupScale}
//               drag={false}
//             />
//             <Griff
//               type={type}
//               visible={true}
//               position={position}
//               scale={scale}
//               depth={depth}
//               drawerGroupScale={initialDrawerGroupScale}
//               topShelfDistance={topShelfDistance}
//             />
//           </>
//         )}

//         {type === Config.furnishing.type.internalDrawer && (
//           <InternalDrawer
//             scale={scale}
//             depth={depth}
//             // topVisible={true}
//             topVisible={topVisible}
//             bottomVisible={bottomVisible}
//             sideVisible={sideVisible}
//             position={position}
//           />
//         )}
//         {!assetDragging &&
//           showControl &&
//           drawerType !== Config.furnishing.drawer.type.customDrawer && (
//             <group>
//               <mesh
//                 onPointerOver={() => {
//                   document.body.style.cursor = "pointer";
//                 }}
//                 onPointerOut={() => {
//                   document.body.style.cursor = "auto";
//                 }}
//                 position={[0, -5, depth + 3.21 - position[2]]}
//               >
//                 <circleGeometry args={[5]} />
//                 <meshBasicMaterial map={arrowUpDownMap} />
//               </mesh>
//               <mesh
//                 onPointerOver={() => {
//                   document.body.style.cursor = "pointer";
//                 }}
//                 onPointerOut={() => {
//                   document.body.style.cursor = "auto";
//                 }}
//                 onClick={() => onRemoveObject(index)}
//                 position={[-scale[0] / 2 + 5, 4.5, depth + 3.21 - position[2]]}
//               >
//                 <circleGeometry args={[5]} />
//                 <meshBasicMaterial map={trashMap} />
//               </mesh>
//               <mesh
//                 onPointerOver={() => {
//                   document.body.style.cursor = "pointer";
//                 }}
//                 onPointerOut={() => {
//                   document.body.style.cursor = "auto";
//                 }}
//                 onClick={() => onPlusMap()}
//                 position={[scale[0] / 2 - 5, 4.5, depth + 3.21 - position[2]]}
//               >
//                 <circleGeometry args={[5]} />
//                 <meshBasicMaterial map={plusMap} />
//               </mesh>
//             </group>
//           )}

//         {showControl && drawerType === Config.furnishing.drawer.type.customDrawer && (
//           <group>
//             <group>
//               {/* Arrow Icon */}
//               <mesh
//                 onPointerOver={() => {
//                   document.body.style.cursor = "pointer";
//                 }}
//                 onPointerOut={() => {
//                   document.body.style.cursor = "auto";
//                 }}
//                 position={[0, -5, depth + 3.21 - position[2]]}
//               >
//                 <circleGeometry args={[5]} />
//                 <meshBasicMaterial map={arrowUpDownMap} />
//               </mesh>
//               {/* Trash Icon */}
//               <mesh
//                 onPointerOver={() => {
//                   document.body.style.cursor = "pointer";
//                 }}
//                 onPointerOut={() => {
//                   document.body.style.cursor = "auto";
//                 }}
//                 onClick={() => onRemoveObject(index)}
//                 // position={[-scale[0] / 2 + 5, 4.5, depth + 3.21 - position[2]]}
//                 position={[-scale[0] / 2 + 3, 4.5, depth + 3.21 - position[2]]}
//               >
//                 <circleGeometry args={[5]} />
//                 <meshBasicMaterial map={trashMap} />
//               </mesh>
//               {/* Plus Icon */}
//               <mesh
//                 onPointerOver={() => {
//                   document.body.style.cursor = "pointer";
//                 }}
//                 onPointerOut={() => {
//                   document.body.style.cursor = "auto";
//                 }}
//                 onClick={() => onPlusMap()}
//                 // position={[scale[0] / 2 - 5, 4.5, depth + 3.21 - position[2]]}
//                 position={[scale[0] / 2 - 3, 4.5, depth + 3.21 - position[2]]}
//               >
//                 <circleGeometry args={[5]} />
//                 <meshBasicMaterial map={plusMap} />
//               </mesh>
//             </group>
//             <group visible={drawerHeightValue < 41 ? true : false}>
//               <mesh>
//                 <Html
//                   position={[0, showDimentionControl ? -0.1 : 4.5, depth + 3.21 - position[2]]}
//                   center
//                   args={[scale[0], scale[1]]}
//                   pointerEvents="auto"
//                 >
//                   {!showDimentionControl ? (
//                     <div
//                       className="w-[60px] bg-white h-[21px] rounded-[6px] cursor-pointer border border-[#36695C] text-center text-[14px] m-auto"
//                       // style={{ width: `${scale[0] < 43 ? "30px" : "55px"}` }}
//                       style={{ width: `${scale[0] < 43 ? "25px" : "45px"}` }}
//                       onClick={() => setShowDimensionControl(true)}
//                       tabIndex={0}
//                       onMouseOver={() => {
//                         setShowDimen(true);
//                       }}
//                       // onMouseLeave={() => {
//                       //   setShowDimen(false);
//                       // }}
//                       onMouseLeave={() => {
//                         setShowDimen(false);
//                         setShowControl(false);
//                       }}
//                     >
//                       {scale[0] < 43
//                         ? `${Math.round(drawerHeightValue)}`
//                         : `${Math.round(drawerHeightValue)} cm`}
//                     </div>
//                   ) : (
//                     <div
//                       className={` bg-[#b6b6b6e0] justify-center gap-1 flex flex-row`}
//                       style={{
//                         width:
//                           Math.round((11 * (screen.width / 1600) * 55) / camera.position.z) + "px",
//                         height:
//                           Math.round(
//                             (11 * (screen.height / 900) * drawerHeightValue) / camera.position.z
//                           ) + "px",
//                       }}
//                       tabIndex={0}
//                       onBlur={(e) => {
//                         if (e.currentTarget.contains(e.relatedTarget)) return;
//                         setShowDimensionControl(false);
//                         setShowControl(false);
//                         handleBlur(e);
//                       }}
//                     >
//                       <div
//                         className="w-[30px] flex items-center mx-auto"
//                         onClick={() => {
//                           if (Math.round(drawerHeightValue) > 10)
//                             setDrawerHeightValue(Number(drawerHeightValue - 1));
//                         }}
//                       >
//                         <img src={MinusIcon} className="w-full cursor-pointer" />
//                       </div>
//                       <div
//                         className="text-[14px] h-[22px] m-auto border border-[#36695C] rounded-[6px] px-1 bg-white flex flex-row"
//                         style={{ width: "65px" }}
//                         onBlur={(e) => {
//                           handleBlur(e);
//                         }}
//                       >
//                         <input
//                           className="w-[35px] bg-transparent text-center outline-none"
//                           type="number"
//                           value={Math.round(drawerHeightValue)}
//                           onChange={(e) => {
//                             setDrawerHeightValue(Number(e.target.value));
//                           }}
//                           onKeyDown={(e) => {
//                             if (e.key === "Enter") {
//                               e.preventDefault();
//                               setShowDimensionControl(false);
//                               setShowControl(false);
//                               setShowDimen(false);
//                               handleBlur(e);
//                             }
//                           }}
//                         />
//                         cm
//                       </div>
//                       <div
//                         className="w-[30px] flex items-center mx-auto"
//                         onClick={() => {
//                           if (Math.round(drawerHeightValue) < 40)
//                             setDrawerHeightValue(Number(drawerHeightValue + 1));
//                         }}
//                       >
//                         <img src={PlusIcon} className="w-full cursor-pointer" />
//                       </div>
//                     </div>
//                   )}
//                 </Html>
//               </mesh>
//             </group>
//           </group>
//         )}
//       </group>

//       <MeasureComponent measureInfo={measureInfo} showMeasure={showMeasure} depth={depth} />
//     </group>
//   );
// });

// export default DrawerComponent;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import * as THREE from "three";
// import Drawer from "../common/drawer";
// import { Griff } from "../common/griff";
// import { Plane, Html } from "@react-three/drei";
// import MeasureComponent from "./MeasureComponent";
// import Config from "../../../config";
// import useDndStore from "../../zustand/dndStore";
// import InternalDrawer from "../common/internalDrawer";
// import { useLoader, useThree } from "@react-three/fiber";
// import useCornerStore from "../../zustand/cornerStore";
// import { getDraggingInfo } from "../../utils/draggingInfo";
// import useDimensionStore from "../../zustand/dimensionStore";
// import PlusIcon from "/images/configurator/icons/plus-1.png?url";
// import MinusIcon from "/images/configurator/icons/minus.png?url";
// import { getBottom, getTop } from "../../utils/availableSpace";
// import useFurnishingStore from "../../zustand/furnishingStore";
// import { createUseGesture, dragAction, pinchAction } from "@use-gesture/react";
// import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

// let intersects = new Array(1);
// let drawerTopVisible = true;
// let drawerBottomVisible = true;
// let topConnected = false;
// let bottomConnected = false;
// let topAssetType = "none";
// let result = {};

// const DrawerComponent = React.memo(function DrawerComponent({
//   asset,
//   spaceRef,
//   index,
//   allfurnishing,
//   svId,
// }) {
//   const {
//     xIndex,
//     inDivider,
//     d_xIndex,
//     d_yPos,
//     type,
//     scale,
//     position,
//     topVisible,
//     bottomVisible,
//     sideVisible,
//     topShelfDistance,
//     topAsset,
//     bottomAsset,
//     drawerType,
//     drawerGroup: initialDrawerGroup,
//     drawerGroupScale: initialDrawerGroupScale,
//   } = asset;

//   const setShowDimensions = useCornerStore.use.setShowDimensions();
//   const viewOption = useCornerStore.use.viewOption();

//   const furnishingAssets = useFurnishingStore.use.furnishingAssets();

//   const addAsset = useFurnishingStore.use.addAsset();
//   //const removeAsset = useFurnishingStore.use.removeAsset();
//   const removeAssetByIndex = useFurnishingStore.use.removeAssetByIndex();
//   const showDrawerShelf = useFurnishingStore.use.showDrawerShelf();
//   const setSelectionInfo = useFurnishingStore.use.setSelectionInfo();
//   const updateAsset = useFurnishingStore.use.updateAsset();
//   const totalSpace = useFurnishingStore.use.totalSpace();
//   const removeGriff = useFurnishingStore.use.removeGriff();

//   const setAssetDragging = useDndStore.use.setAssetDragging();
//   const assetDragging = useDndStore.use.assetDragging();
//   const setDrawerHeight = useDndStore.use.setDrawerHeight();
//   const setDrawerTopDistance = useDndStore.use.setDrawerTopDistance();
//   const setType = useDndStore.use.setType();
//   const currentIndex = useDndStore.use.currentIndex();
//   const setCurrentIndex = useDndStore.use.setCurrentIndex();

//   const elementsWidths = useDimensionStore.use.elementsWidths();
//   const height = useDimensionStore.use.height();
//   const depth = useDimensionStore.use.depth();
//   const width = useDimensionStore.use.width();
//   const elementsCount = useDimensionStore.use.elementsCount();
//   const hanging = useDimensionStore.use.hanging();
//   const withFeet = useDimensionStore.use.withFeet();

//   const { size, camera, raycaster } = useThree();
//   const [planPositionX, setPlanPositionX] = useState();
//   const [planPositionY, setPlanPositionY] = useState();

//   const pointer = useMemo(() => new THREE.Vector2(), []);
//   const ref = useRef();
//   const [dragStarted, setDragStarted] = useState(true);
//   const [showControl, setShowControl] = useState(false);
//   const [showDimentionControl, setShowDimensionControl] = useState(false);
//   const [showDimen, setShowDimen] = useState(false);
//   const [showMeasure, setShowMeasure] = useState(false);
//   const [drawerHeightValue, setDrawerHeightValue] = useState();
//   const [measureInfo, setMeasureInfo] = useState({
//     posX: 0,
//     aboveTop: 0,
//     aboveBottom: 0,
//     belowTop: 0,
//     belowBottom: 0,
//   });

//   const { sideIncident } = Config.furnishing.drawer;
//   const { panelSpace, panelWidth } = Config.furnishing.internalDrawer;

//   const [trashMap, arrowUpDownMap, plusMap] = useLoader(THREE.TextureLoader, [
//     "/images/furnishing/doors/trash_blue.png",
//     "/images/configurator/icons/arrow_up_down.png",
//     "/images/configurator/icons/plus.png",
//   ]);
//   plusMap.anisotropy = 16;
//   plusMap.minFilter = THREE.LinearFilter;
//   plusMap.magFilter = THREE.LinearFilter;
//   plusMap.generateMipmaps = false;

//   const useGesture = createUseGesture([dragAction, pinchAction]);

//   useEffect(() => {
//     if (!dragStarted) {
//       setShowDimensions(false);
//       setPlanPositionX(position[0]);
//       setPlanPositionY(position[1]);
//       setSelectionInfo({
//         xIndex,
//         yPos: position[1],
//         inDivider,
//         d_xIndex,
//         d_yPos,
//       });
//       setAssetDragging(true);
//       if (!topVisible || !bottomVisible) {
//         showDrawerShelf({
//           type,
//           xIndex,
//           yPos: position[1],
//           inDivider,
//           d_xIndex,
//           d_yPos,
//         });
//       }
//       setShowControl(false);
//     }
//   }, [dragStarted]);

//   // Ensures showControl is false for assets other than the currently interacted asset
//   useEffect(() => {
//     furnishingAssets.forEach((_, index) => {
//       if (currentIndex !== index) setShowControl(false);
//     });
//   }, [currentIndex]);

//   //run when wardrobe height changes. Update all drawers at the top
//   useEffect(() => {
//     furnishingAssets.forEach((asset, index) => {
//       if (
//         asset.type === Config.furnishing.type.drawer ||
//         asset.type === Config.furnishing.type.internalDrawer
//       ) {
//         const topPosition = height - Config.plate.thickness / 2;
//         const assetPosition = asset.position[1] + scale[1] / 2;
//         if (
//           asset.topAsset === "none" &&
//           topPosition - assetPosition < Config.plate.thickness &&
//           !asset.topVisible
//         ) {
//           updateAsset({
//             index,
//             newData: {
//               topVisible: true,
//             },
//           });
//         }
//       }
//     });
//   }, [height]);

//   const handleDragStart = useCallback(
//     (state) => {
//       state.event.stopPropagation();

//       setCurrentIndex(index);
//       setType(type);
//       setDrawerHeight(scale[1]);
//       if (type === Config.furnishing.type.drawer) setDrawerTopDistance(topShelfDistance);
//       setDragStarted(true);
//     },
//     [type, scale, topShelfDistance, xIndex, position]
//   );

//   const handleDrag = useCallback(
//     (state) => {
//       if (state.delta[0] === 0 && state.delta[1] === 0) return;
//       document.body.style.cursor = "grabbing";

//       setDragStarted(false);
//       setShowMeasure(true);
//       setShowControl(false);

//       pointer.x = ((state.values[0] - size.left) / size.width) * 2 - 1;
//       pointer.y = -((state.values[1] - size.top) / size.height) * 2 + 1;
//       raycaster.setFromCamera(pointer, camera);
//       intersects = raycaster.intersectObjects(spaceRef.children, true);

//       if (!intersects[0]) return;

//       if (intersects[0].object.name === "available") {
//         const { top, bottom, topAsset, bottomAsset, availableTop, availableBottom } =
//           intersects[0].object.userData;

//         topAssetType = topAsset;

//         result = getDraggingInfo({
//           type,
//           top,
//           bottom,
//           topAsset,
//           bottomAsset,
//           initialPosY: intersects[0].point.y * 100 + height / 2,
//           raster: Config.furnishing.default.raster,
//           availableWidth: intersects[0].object.geometry.parameters.width,
//           objectHeight: scale[1],
//         });

//         drawerTopVisible = result.topVisible;
//         drawerBottomVisible = result.bottomVisible;
//         topConnected = result.topConnected;
//         bottomConnected = result.bottomConnected;
//         ref.current?.position.set(
//           intersects[0].object.position.x,
//           hanging || withFeet ? result.posY - 25 : result.posY,
//           position[2]
//         );
//         setPlanPositionX(intersects[0].object.position.x);
//         setPlanPositionY(result.posY);

//         if (scale[0] !== result.objectWidth) {
//           updateAsset({
//             index,
//             newData: { scale: [result.objectWidth, scale[1], scale[2]] },
//           });
//         }

//         // if (asset.topVisible !== drawerTopVisible || asset.bottomVisible !== drawerBottomVisible) {
//         //   updateAsset({
//         //     index,
//         //     newData: {
//         //       topVisible: drawerTopVisible,
//         //       bottomVisible: drawerBottomVisible,
//         //     },
//         //   });
//         // }

//         const tempMeasureInfo = {
//           posX: intersects[0].object.position.x,
//           aboveTop: availableTop,
//           aboveBottom: getBottom(
//             hanging || withFeet ? result.posY - 25 : result.posY,
//             scale[1],
//             type,
//             topShelfDistance
//           ),
//           belowTop: getTop(hanging || withFeet ? result.posY - 25 : result.posY, scale[1], type),
//           belowBottom: availableBottom,
//         };

//         if (JSON.stringify(measureInfo) !== JSON.stringify(tempMeasureInfo))
//           setMeasureInfo(tempMeasureInfo);
//       } else {
//         drawerTopVisible = true;
//         topConnected = false;
//         drawerBottomVisible = true;
//         bottomConnected = false;

//         ref.current?.position.set(
//           intersects[0].point.x * 100 + width / 2,
//           intersects[0].point.y * 100 + height / 2,
//           depth + depth / 2
//         );

//         setShowMeasure(false);
//       }
//     },
//     [spaceRef, ref, allfurnishing, scale, measureInfo, hanging, withFeet]
//   );

//   const handleDragEnd = useCallback(
//     (state) => {
//       document.body.style.cursor = "pointer";
//       setCurrentIndex(null);
//       setShowMeasure(false);
//       setAssetDragging(false);
//       setShowControl(false);
//       if (state.values[0] === state.initial[0] && state.values[1] === state.initial[1]) return;

//       // Calculate X-axis scale based on whether it's a `Drawer` or `InternalDrawer`
//       const scaleX =
//         type === "Drawer"
//           ? elementsWidths[xIndex] - sideIncident * 2
//           : elementsWidths[xIndex] - (panelSpace + panelWidth) * 2;

//       // Revert the asset to its previous position in the wardrobe if there is no intersection or if the intersection is with `other` or `occupied`
//       if (
//         !intersects[0] ||
//         intersects[0]?.object.name === "other" ||
//         intersects[0]?.object.name === "occupied"
//       ) {
//         //update positionY for the controls Plane
//         setPlanPositionY(position[1] + 0.0000000000001);
//         return updateAsset({
//           index,
//           newData: {
//             position: [position[0], position[1] + 0.0000000000001, position[2]],
//             // Update the asset's scale along the x-axis based on the width of the wardrobe section (xIndex).
//             // elementsWidths is an array that stores the width of each wardrobe section(xIndex).
//             scale: [scaleX, scale[1], scale[2]],
//           },
//         });
//       }

//       //Handle update of the DraggedAsset on dragEnd
//       const { topAsset, bottomAsset, xIndex: currentXindex } = intersects[0].object.userData;

//       //Get value of topVisible and bottomVisible
//       const topVisibleValue =
//         (result.topConnected && topAsset === type) ||
//         (result.topConnected && topAsset === "none") ||
//         (!result.topVisible && topAsset === "none")
//           ? false
//           : true;
//       const bottomVisibleValue =
//         (result.bottomConnected && bottomAsset === type) ||
//         (result.bottomConnected && bottomAsset === "none") ||
//         (!result.bottomVisible && bottomAsset === "none")
//           ? false
//           : true;

//       const payload = {
//         index,
//         newData: {
//           xIndex: intersects[0].object.userData.xIndex,
//           topAsset: topAsset, //update topAsset
//           bottomAsset: bottomAsset, //update bottomAsset
//           topVisible: topVisibleValue, //update topVisible
//           bottomVisible: bottomVisibleValue, //update bottomVisible
//           inDivider: intersects[0].object.userData.inDivider,
//           d_xIndex: intersects[0].object.userData.d_xIndex,
//           d_yPos: intersects[0].object.userData.d_yPos,
//           position: [ref.current.position.x, ref.current.position.y, ref.current.position.z],
//           scale: scale,
//           type,
//           isShowControl: true,
//         },
//       };

//       updateAsset(payload);

//       /***************** Function Logic: What Happens When topConnected or bottomConnected Is True (Indicating It Is Connected to Another Drawer) **********************************************************/
//       // Handles removal of the bottom of the topAsset if it's connected with another Drawer
//       if (result.topConnected && type === Config.furnishing.type.drawer) {
//         // Find the closest asset above `result.posY` directly
//         let topAsset = null;
//         let assetIndex = -1;

//         for (let i = 0; i < furnishingAssets.length; i++) {
//           const currentAsset = furnishingAssets[i];
//           if (
//             currentAsset.xIndex === currentXindex &&
//             currentAsset.position[1] > result.posY &&
//             (!topAsset || currentAsset.position[1] < topAsset.position[1])
//           ) {
//             topAsset = currentAsset;
//             assetIndex = i;
//           }
//         }
//         if (topAsset && topAsset?.type === Config.furnishing.type.drawer) {
//           updateAsset({
//             index: assetIndex,
//             newData: {
//               bottomVisible: false,
//             },
//           });
//         }
//       }

//       // Handles removal of the top of the topAsset if it's connected with another Drawer
//       if (result.bottomConnected && type === Config.furnishing.type.drawer) {
//         // Find the closest asset below `result.posY` directly
//         let bottomAsset = null;
//         let assetIndex = -1;

//         for (let i = 0; i < furnishingAssets.length; i++) {
//           const currentAsset = furnishingAssets[i];
//           if (
//             currentAsset.xIndex === currentXindex &&
//             currentAsset.position[1] < result.posY &&
//             (!bottomAsset || currentAsset.position[1] > bottomAsset.position[1])
//           ) {
//             bottomAsset = currentAsset;
//             assetIndex = i;
//           }
//         }

//         if (bottomAsset && bottomAsset?.type === Config.furnishing.type.drawer) {
//           updateAsset({
//             index: assetIndex,
//             newData: {
//               topVisible: false,
//             },
//           });
//         }
//       }

//       /****************************************************************************************/

//       /***************** Function Logic: What Happens When topConnected or bottomConnected Is just becomes false (Indicating It Is Connected to Another Drawer) **********************************************************/
//       // Updates the bottomVisible property of the top drawer it was connected to when it is no longer topConnected.
//       //if (!asset.topVisible && !topConnected && asset.type === Config.furnishing.type.drawer) {

//       if (
//         !asset.topVisible &&
//         (!topConnected || ref.current.position.y !== position[1]) &&
//         asset.type === Config.furnishing.type.drawer
//       ) {
//         const filteredAssets = furnishingAssets.filter((asset) => {
//           return asset.xIndex === xIndex && asset.position[1] > position[1];
//         });
//         //if it's topConnected with the top Plate
//         if (!filteredAssets.length) return;

//         const sortAssets = filteredAssets.sort((a, b) => {
//           return a.position[1] - b.position[1];
//         });
//         const topAsset = sortAssets[0];

//         const assetIndex = furnishingAssets.findIndex(
//           (asset) => asset.xIndex === xIndex && asset.position[1] === topAsset.position[1]
//         );
//         if (topAsset && topAsset?.type === Config.furnishing.type.drawer) {
//           updateAsset({
//             index: assetIndex,
//             newData: {
//               bottomVisible: true,
//             },
//           });
//         }
//       }

//       //Updates the topVisible property of the bottom drawer it was connected to when it is no longer bottomConnected.
//       if (
//         !asset.bottomVisible &&
//         (!bottomConnected || ref.current.position.y !== position[1]) &&
//         asset.type === Config.furnishing.type.drawer
//       ) {
//         const filteredAssets = furnishingAssets.filter((asset) => {
//           return asset.xIndex === xIndex && asset.position[1] < position[1];
//         });

//         //if it's bottomConnected with the bottom Plate
//         if (!filteredAssets.length) return;

//         const sortAssets = filteredAssets.sort((a, b) => {
//           return b.position[1] - a.position[1];
//         });

//         const bottomAsset = sortAssets[0];

//         const assetIndex = furnishingAssets.findIndex(
//           (asset) => asset.xIndex === xIndex && asset.position[1] === bottomAsset.position[1]
//         );

//         if (bottomAsset && bottomAsset?.type === Config.furnishing.type.drawer) {
//           updateAsset({
//             index: assetIndex,
//             newData: {
//               topVisible: true,
//             },
//           });
//         }
//       }

//       /***** */
//       /***** */
//       /***** */
//       /** // INTERNAL DRAWER INTERNAL DRAWER UPDATE FUNCTION INTERNAL DRAWER INTERNAL DRAWER UPDATE FUNCTION **/
//       /***************** Function Logic: What Happens When topConnected or bottomConnected Is True (Indicating It Is Connected to Another InternalDrawer) **********************************************************/
//       // Handles removal of the bottom of the topAsset if it's connected with another InternalDrawer
//       if (result.topConnected && asset.type === Config.furnishing.type.internalDrawer) {
//         // Find the closest asset above `result.posY` directly
//         let topAsset = null;
//         let assetIndex = -1;

//         for (let i = 0; i < furnishingAssets.length; i++) {
//           const currentAsset = furnishingAssets[i];
//           if (
//             currentAsset.xIndex === currentXindex &&
//             currentAsset.position[1] > result.posY &&
//             (!topAsset || currentAsset.position[1] < topAsset.position[1])
//           ) {
//             topAsset = currentAsset;
//             assetIndex = i;
//           }
//         }

//         if (topAsset && topAsset?.type === Config.furnishing.type.internalDrawer) {
//           updateAsset({
//             index: assetIndex,
//             newData: {
//               bottomVisible: false,
//             },
//           });
//         }
//       }

//       // Handles removal of the top of the topAsset if it's connected with another Drawer
//       if (result.bottomConnected && asset.type === Config.furnishing.type.internalDrawer) {
//         // Find the closest asset below `result.posY` directly
//         let bottomAsset = null;
//         let assetIndex = -1;

//         for (let i = 0; i < furnishingAssets.length; i++) {
//           const currentAsset = furnishingAssets[i];
//           if (
//             currentAsset.xIndex === currentXindex &&
//             currentAsset.position[1] < result.posY &&
//             (!bottomAsset || currentAsset.position[1] > bottomAsset.position[1])
//           ) {
//             bottomAsset = currentAsset;
//             assetIndex = i;
//           }
//         }

//         if (bottomAsset && bottomAsset?.type === Config.furnishing.type.internalDrawer) {
//           updateAsset({
//             index: assetIndex,
//             newData: {
//               topVisible: false,
//             },
//           });
//         }
//       }

//       /****************************************************************************************/

//       /***************** Function Logic: What Happens When topConnected or bottomConnected Is just becomes false (Indicating It Is Connected to Another InternalDrawer) **********************************************************/
//       //Updates the bottomVisible property of the top Internal drawer it was connected to when it is no longer topConnected.
//       if (
//         !asset.topVisible &&
//         (!topConnected || ref.current.position.y !== position[1]) &&
//         asset.type === Config.furnishing.type.internalDrawer
//       ) {
//         const filteredAssets = furnishingAssets.filter((asset) => {
//           return asset.xIndex === xIndex && asset.position[1] > position[1];
//         });

//         //if it's topConnected with the top Plate
//         if (!filteredAssets.length) return;

//         const sortAssets = filteredAssets.sort((a, b) => {
//           return a.position[1] - b.position[1];
//         });
//         const topAsset = sortAssets[0];

//         const assetIndex = furnishingAssets.findIndex(
//           (asset) => asset.xIndex === xIndex && asset.position[1] === topAsset.position[1]
//         );

//         if (topAsset && topAsset?.type === Config.furnishing.type.internalDrawer) {
//           updateAsset({
//             index: assetIndex,
//             newData: {
//               bottomVisible: true,
//             },
//           });
//         }
//       }

//       //Updates the topVisible property of the bottom InternalDrawer it was connected to when it is no longer bottomConnected.
//       if (
//         !asset.bottomVisible &&
//         (!bottomConnected || ref.current.position.y !== position[1]) &&
//         asset.type === Config.furnishing.type.internalDrawer
//       ) {
//         const filteredAssets = furnishingAssets.filter((asset) => {
//           return asset.xIndex === xIndex && asset.position[1] < position[1];
//         });

//         //if it's bottomConnected with the bottom Plate
//         if (!filteredAssets.length) return;

//         const sortAssets = filteredAssets.sort((a, b) => {
//           return b.position[1] - a.position[1];
//         });

//         const bottomAsset = sortAssets[0];

//         const assetIndex = furnishingAssets.findIndex(
//           (asset) => asset.xIndex === xIndex && asset.position[1] === bottomAsset.position[1]
//         );

//         if (bottomAsset && bottomAsset?.type === Config.furnishing.type.internalDrawer) {
//           updateAsset({
//             index: assetIndex,
//             newData: {
//               topVisible: true,
//             },
//           });
//         }
//       }
//     },
//     [ref, scale, topShelfDistance, xIndex, position, furnishingAssets]
//   );

//   const bind = useGesture(
//     {
//       onDragStart: handleDragStart,
//       //onDragStart: (state) => handleDragStart(state, ...state.args),
//       onDrag: handleDrag,
//       onDragEnd: handleDragEnd,
//     },
//     { enabled: viewOption === Config.view.front }
//   );

//   useEffect(() => {
//     setDrawerHeightValue(
//       (topShelfDistance === undefined
//         ? 0
//         : scale[1] +
//           topShelfDistance +
//           Config.furnishing.drawer.bottomShelfDistance +
//           2 * Config.furnishing.shelf.thickness1
//       ).toFixed(1)
//     );
//   }, [topShelfDistance]);

//   const handleBlur = useCallback(
//     (e) => {
//       if (e.currentTarget.contains(e.relatedTarget)) return;
//       setShowDimensionControl(false);
//       const flagValue =
//         position[1] + scale[1] / 2 + topShelfDistance + Config.furnishing.shelf.thickness1 + 0.5;
//       const { availableTop, aboveBottom } = getAvailableSpace(xIndex, totalSpace, flagValue);
//       const scaleY = !topShelfDistance
//         ? 0
//         : drawerHeightValue -
//           topShelfDistance -
//           Config.furnishing.drawer.bottomShelfDistance -
//           2 * Config.furnishing.shelf.thickness1;

//       const tempAvailableTop = scaleY - scale[1];
//       const positionY = position[1] - scale[1] / 2 + scaleY / 2;

//       if (availableTop > 0) return customDrawer(scaleY, positionY);
//       if (tempAvailableTop < 0) return customDrawer(scaleY, positionY);

//       const filteredAssets = furnishingAssets.filter(
//         (asset) => asset.xIndex === xIndex && asset.position[1] > position[1]
//       );
//       const sortAssets = filteredAssets.sort((a, b) => a.position[1] - b.position[1]);
//       const available =
//         sortAssets.length > 0
//           ? sortAssets[0].position[1] - sortAssets[0].scale[1] / 2 - (position[1] + scale[1] / 2)
//           : height - (position[1] + scale[1] / 2);

//       if (tempAvailableTop < available) return customDrawer(scaleY, positionY);

//       setDrawerHeightValue(
//         (topShelfDistance === undefined
//           ? 0
//           : scale[1] +
//             topShelfDistance +
//             Config.furnishing.drawer.bottomShelfDistance +
//             2 * Config.furnishing.shelf.thickness1
//         ).toFixed(1)
//       );
//       setShowControl(false);
//     },
//     [drawerHeightValue, position]
//   );

//   const onRemoveObject = useCallback(
//     (furnishIndex) => {
//       if (!asset.topVisible && asset.type === Config.furnishing.type.drawer) {
//         const filteredAssets = furnishingAssets.filter((asset) => {
//           return asset.xIndex === xIndex && asset.position[1] > position[1];
//         });

//         //if it's topConnected with the top Plate
//         if (filteredAssets.length) {
//           const sortAssets = filteredAssets.sort((a, b) => {
//             return a.position[1] - b.position[1];
//           });
//           const topAsset = sortAssets[0];

//           const assetIndex = furnishingAssets.findIndex(
//             (asset) => asset.xIndex === xIndex && asset.position[1] === topAsset.position[1]
//           );
//           if (topAsset && topAsset?.type === Config.furnishing.type.drawer) {
//             updateAsset({
//               index: assetIndex,
//               newData: {
//                 bottomVisible: true,
//               },
//             });
//           }
//         }
//       }

//       //Updates the topVisible property of the bottom drawer it was connected to when it is no longer bottomConnected.
//       if (!asset.bottomVisible && asset.type === Config.furnishing.type.drawer) {
//         const filteredAssets = furnishingAssets.filter((asset) => {
//           return asset.xIndex === xIndex && asset.position[1] < position[1];
//         });

//         //if it's bottomConnected with the bottom Plate
//         if (filteredAssets.length) {
//           const sortAssets = filteredAssets.sort((a, b) => {
//             return b.position[1] - a.position[1];
//           });

//           const bottomAsset = sortAssets[0];

//           const assetIndex = furnishingAssets.findIndex(
//             (asset) => asset.xIndex === xIndex && asset.position[1] === bottomAsset.position[1]
//           );

//           if (bottomAsset && bottomAsset?.type === Config.furnishing.type.drawer) {
//             updateAsset({
//               index: assetIndex,
//               newData: {
//                 topVisible: true,
//               },
//             });
//           }
//         }
//       }

//       /************************* INTERNAL DRAWER  *************************/
//       if (asset.type === Config.furnishing.type.internalDrawer) {
//         if (!asset.topVisible) {
//           const filteredAssets = furnishingAssets.filter((asset) => {
//             return asset.xIndex === xIndex && asset.position[1] > position[1];
//           });

//           //if it's topConnected with the top Plate
//           if (filteredAssets.length) {
//             const sortAssets = filteredAssets.sort((a, b) => {
//               return a.position[1] - b.position[1];
//             });
//             const topAsset = sortAssets[0];

//             const assetIndex = furnishingAssets.findIndex(
//               (asset) => asset.xIndex === xIndex && asset.position[1] === topAsset.position[1]
//             );
//             if (topAsset && topAsset?.type === Config.furnishing.type.internalDrawer) {
//               updateAsset({
//                 index: assetIndex,
//                 newData: {
//                   bottomVisible: true,
//                 },
//               });
//             }
//           }
//         }

//         //Updates the topVisible property of the bottom Internaldrawer it was connected to when it is no longer bottomConnected.
//         if (!asset.bottomVisible) {
//           const filteredAssets = furnishingAssets.filter((asset) => {
//             return asset.xIndex === xIndex && asset.position[1] < position[1];
//           });

//           //if it's bottomConnected with the bottom Plate
//           if (filteredAssets.length) {
//             const sortAssets = filteredAssets.sort((a, b) => {
//               return b.position[1] - a.position[1];
//             });

//             const bottomAsset = sortAssets[0];

//             const assetIndex = furnishingAssets.findIndex(
//               (asset) => asset.xIndex === xIndex && asset.position[1] === bottomAsset.position[1]
//             );

//             if (bottomAsset && bottomAsset?.type === Config.furnishing.type.internalDrawer) {
//               updateAsset({
//                 index: assetIndex,
//                 newData: {
//                   topVisible: true,
//                 },
//               });
//             }
//           }
//         }
//       }

//       removeAssetByIndex(furnishIndex);
//       setShowControl(false);
//     },
//     [furnishingAssets]
//   );

//   const getAvailableSpace = (initialXIndex, totalSpace, flagValue) => {
//     const filter = totalSpace.filter((space) => {
//       return (
//         space.xIndex === initialXIndex &&
//         space.availableBottom <= flagValue &&
//         space.availableTop >= flagValue
//       );
//     });
//     const aboveBottom = getBottom(
//       hanging || withFeet ? position[1] - 25 : position[1],
//       scale[1],
//       type,
//       topShelfDistance
//     );
//     const availableTop = filter[0]?.height;
//     return { availableTop, aboveBottom };
//   };

//   const updateDrawer = (scaleY, positionY, tempDrawerGroupScale) => {
//     const payload = {};
//     payload.removal = {
//       xIndex,
//       yPos: position[1],
//       inDivider,
//       d_xIndex,
//       d_yPos,
//     };

//     payload.asset = {
//       xIndex,
//       inDivider,
//       d_xIndex,
//       d_yPos,
//       position: [position[0], positionY, position[2]],
//       scale: [scale[0], scaleY, scale[2]],
//       type,
//       drawerType,
//       topVisible,
//       bottomVisible,
//       sideVisible: true,
//       topShelfDistance: type === Config.furnishing.type.drawer ? topShelfDistance : undefined,
//       topShelfVisible:
//         type === Config.furnishing.type.divider &&
//         (topAssetType === Config.furnishing.type.slopingFloor ||
//           topAssetType === Config.furnishing.type.clothesLift ||
//           topAssetType === Config.furnishing.type.clothesRail ||
//           topAssetType === Config.furnishing.type.pantsPullout)
//           ? true
//           : false,
//       dividerLeftWidth:
//         type === Config.furnishing.type.divider
//           ? (scale[0] - Config.furnishing.divider.thickness) / 2
//           : undefined,
//       bottomAsset,
//       drawerGroup: initialDrawerGroup + 1,
//       drawerGroupScale: tempDrawerGroupScale,
//     };

//     payload.drawerShelf = [];
//     if (topConnected) {
//       payload.drawerShelf.push({
//         location: "top",
//         bottomVisible: !topConnected,
//       });
//     }
//     if (bottomConnected) {
//       payload.drawerShelf.push({
//         location: "bottom",
//         topVisible: !bottomConnected,
//       });
//     }
//     addAsset(payload);
//   };

//   const customDrawer = (scaleY, positionY) => {
//     const payload = {};

//     payload.removal = {
//       xIndex,
//       yPos: position[1],
//       inDivider,
//       d_xIndex,
//       d_yPos,
//     };

//     payload.asset = {
//       xIndex,
//       inDivider,
//       d_xIndex,
//       d_yPos,
//       position: [position[0], positionY, position[2]],
//       scale: [scale[0], scaleY, scale[2]],
//       type,
//       drawerType,
//       topVisible,
//       bottomVisible,
//       sideVisible: true,
//       topShelfDistance: type === Config.furnishing.type.drawer ? topShelfDistance : undefined,
//       topShelfVisible:
//         type === Config.furnishing.type.divider &&
//         (topAssetType === Config.furnishing.type.slopingFloor ||
//           topAssetType === Config.furnishing.type.clothesLift ||
//           topAssetType === Config.furnishing.type.clothesRail ||
//           topAssetType === Config.furnishing.type.pantsPullout)
//           ? true
//           : false,
//       dividerLeftWidth:
//         type === Config.furnishing.type.divider
//           ? (scale[0] - Config.furnishing.divider.thickness) / 2
//           : undefined,
//       bottomAsset,
//       drawerGroup: 1,
//       drawerGroupScale: [scaleY],
//     };

//     payload.drawerShelf = [];
//     if (topConnected) {
//       payload.drawerShelf.push({
//         location: "top",
//         bottomVisible: !topConnected,
//       });
//     }
//     if (bottomConnected) {
//       payload.drawerShelf.push({
//         location: "bottom",
//         topVisible: !bottomConnected,
//       });
//     }
//     addAsset(payload);
//   };

//   // click plus icon add drawer on top
//   const onPlusMap = useCallback(() => {
//     if (type === Config.furnishing.type.drawer) {
//       const flagValue =
//         position[1] + scale[1] / 2 + topShelfDistance + Config.furnishing.shelf.thickness1 + 1;
//       const { availableTop, aboveBottom } = getAvailableSpace(xIndex, totalSpace, flagValue);

//       if (scale[1] < availableTop) {
//         const payload = {};

//         payload.asset = {
//           xIndex,
//           inDivider,
//           d_xIndex,
//           d_yPos,
//           position: [
//             position[0],
//             position[1] +
//               scale[1] / 2 +
//               scale[1] / 2 +
//               Config.furnishing.drawer.bottomShelfDistance +
//               Config.furnishing.shelf.thickness1 +
//               0.475 +
//               0.475,
//             position[2],
//           ],
//           scale: [scale[0], scale[1], scale[2]],
//           type,
//           drawerType,
//           topVisible: true,
//           bottomVisible: false,
//           sideVisible: true,
//           topShelfDistance: type === Config.furnishing.type.drawer ? topShelfDistance : undefined,
//           topShelfVisible:
//             type === Config.furnishing.type.divider &&
//             (topAssetType === Config.furnishing.type.slopingFloor ||
//               topAssetType === Config.furnishing.type.clothesLift ||
//               topAssetType === Config.furnishing.type.clothesRail ||
//               topAssetType === Config.furnishing.type.pantsPullout)
//               ? true
//               : false,
//           dividerLeftWidth:
//             type === Config.furnishing.type.divider
//               ? (scale[0] - Config.furnishing.divider.thickness) / 2
//               : undefined,
//           bottomAsset,
//           drawerGroup: initialDrawerGroup + 1,
//           drawerGroupScale: initialDrawerGroupScale,
//         };

//         payload.drawerShelf = [];
//         if (topConnected) {
//           payload.drawerShelf.push({
//             location: "top",
//             bottomVisible: !topConnected,
//           });
//         }
//         if (bottomConnected) {
//           payload.drawerShelf.push({
//             location: "bottom",
//             topVisible: !bottomConnected,
//           });
//         }

//         addAsset(payload);

//         //update topVisible property of the clicked Drawer to false
//         updateAsset({
//           index,
//           newData: {
//             topVisible: false,
//           },
//         });
//       }
//     }

//     if (type === Config.furnishing.type.internalDrawer) {
//       const filteredAssets = furnishingAssets.filter(
//         (asset) => asset.xIndex === xIndex && asset.position[1] > position[1]
//       );
//       const sortAssets = filteredAssets.sort((a, b) => a.position[1] - b.position[1]);

//       let available = topShelfDistance;
//       if (sortAssets.length > 0) {
//         available =
//           sortAssets[0].position[1] -
//           sortAssets[0].scale[1] / 2 -
//           (position[1] + scale[1] / 2) -
//           Config.furnishing.internalDrawer.topShelfDistance -
//           Config.furnishing.internalDrawer.panelSpace;
//       } else {
//         available =
//           height -
//           (position[1] + scale[1] / 2) -
//           Config.furnishing.internalDrawer.topShelfDistance -
//           Config.furnishing.internalDrawer.panelSpace;
//       }

//       if (scale[1] < available) {
//         // const scaleY =
//         //   initialDrawerGroupScale[0] +
//         //   scale[1] +
//         //   Config.furnishing.internalDrawer.topShelfDistance +
//         //   Config.furnishing.internalDrawer.panelSpace;
//         // const positionY = position[1] - scale[1] / 2 + scaleY / 2;
//         // customDrawer(scaleY, positionY);

//         const payload = {};

//         payload.asset = {
//           xIndex,
//           inDivider,
//           d_xIndex,
//           d_yPos,
//           position: [
//             position[0],
//             position[1] +
//               scale[1] / 2 +
//               scale[1] / 2 +
//               Config.furnishing.drawer.bottomShelfDistance +
//               Config.furnishing.shelf.thickness1,
//             position[2],
//           ],
//           scale: [scale[0], scale[1], scale[2]],
//           type,
//           drawerType,
//           topVisible: true,
//           bottomVisible: false,
//           sideVisible: true,
//           topShelfDistance: type === Config.furnishing.type.drawer ? topShelfDistance : undefined,
//           topShelfVisible:
//             type === Config.furnishing.type.divider &&
//             (topAssetType === Config.furnishing.type.slopingFloor ||
//               topAssetType === Config.furnishing.type.clothesLift ||
//               topAssetType === Config.furnishing.type.clothesRail ||
//               topAssetType === Config.furnishing.type.pantsPullout)
//               ? true
//               : false,
//           dividerLeftWidth:
//             type === Config.furnishing.type.divider
//               ? (scale[0] - Config.furnishing.divider.thickness) / 2
//               : undefined,
//           bottomAsset,
//           drawerGroup: initialDrawerGroup + 1,
//           drawerGroupScale: initialDrawerGroupScale,
//         };

//         payload.drawerShelf = [];
//         if (topConnected) {
//           payload.drawerShelf.push({
//             location: "top",
//             bottomVisible: !topConnected,
//           });
//         }
//         if (bottomConnected) {
//           payload.drawerShelf.push({
//             location: "bottom",
//             topVisible: !bottomConnected,
//           });
//         }

//         addAsset(payload);

//         //update topVisible property of the clicked Drawer to false
//         updateAsset({
//           index,
//           newData: {
//             topVisible: false,
//           },
//         });
//       }
//     }
//   }, [
//     totalSpace,
//     xIndex,
//     drawerHeightValue,
//     scale,
//     position,
//     furnishingAssets,
//     height,
//     initialDrawerGroupScale,
//     initialDrawerGroup,
//   ]);

//   return (
//     <group
//       visible={scale[2] !== 0}
//       furnishType="drawer"
//       furnishIndex={index}
//       userData={{
//         xIndex,
//         inDivider,
//         d_xIndex,
//         d_yPos,
//         type,
//         scale,
//         position,
//         svId,
//       }}
//     >
//       <Plane
//         // args={[scale[0], 25]}
//         args={[
//           scale[0],
//           scale[1] +
//             (type === Config.furnishing.type.drawer
//               ? Config.furnishing.drawer.topShelfDistance +
//                 Config.furnishing.drawer.bottomShelfDistance
//               : Config.furnishing.internalDrawer.topShelfDistance +
//                 Config.furnishing.internalDrawer.bottomShelfDistance) +
//             Config.plate.thickness +
//             Config.plate.thickness,
//         ]}
//         position={[position[0], position[1], depth + 3.2]}
//         // position={[
//         //   position[0],
//         //   planPositionY == undefined ? position[1] : planPositionY,
//         //   depth + 3.2,
//         // ]}
//         rotateX={Math.PI / 2}
//         visible={false}
//         onPointerOver={(e) => {
//           e.stopPropagation();
//           if (assetDragging) return;
//           setShowControl(true);
//         }}
//         onPointerOut={(e) => {
//           e.stopPropagation();
//           if (assetDragging) return;
//           //if (showDimen) return;
//           setShowControl(false);
//         }}
//       />
//       <group
//         {...bind()}
//         ref={ref}
//         position={position}
//         userData={{
//           xIndex,
//           inDivider,
//           d_xIndex,
//           d_yPos,
//           type,
//           scale,
//           position,
//           svId,
//         }}
//       >
//         {type === Config.furnishing.type.drawer && (
//           <>
//             <Drawer
//               scale={scale}
//               depth={depth}
//               elementIndex={
//                 (inDivider ? d_xIndex : xIndex) === 0
//                   ? Config.elementIndex.first
//                   : xIndex === elementsCount - 1
//                   ? Config.elementIndex.last
//                   : Config.elementIndex.middle
//               }
//               topVisible={topVisible}
//               bottomVisible={bottomVisible}
//               topShelfDistance={topShelfDistance}
//               position={position}
//               type={type}
//               topAsset={topAsset}
//               bottomAsset={bottomAsset}
//               visible={true}
//               xIndex={xIndex}
//               drawerGroup={initialDrawerGroup}
//               drawerGroupScale={initialDrawerGroupScale}
//               drag={false}
//             />
//             <Griff
//               type={type}
//               visible={true}
//               position={position}
//               scale={scale}
//               depth={depth}
//               drawerGroupScale={initialDrawerGroupScale}
//               topShelfDistance={topShelfDistance}
//             />
//           </>
//         )}

//         {type === Config.furnishing.type.internalDrawer && (
//           <InternalDrawer
//             scale={scale}
//             depth={depth}
//             // topVisible={true}
//             topVisible={topVisible}
//             bottomVisible={bottomVisible}
//             sideVisible={sideVisible}
//             position={position}
//           />
//         )}
//         {!assetDragging &&
//           showControl &&
//           drawerType !== Config.furnishing.drawer.type.customDrawer && (
//             <group>
//               <mesh
//                 onPointerOver={() => {
//                   document.body.style.cursor = "pointer";
//                 }}
//                 onPointerOut={() => {
//                   document.body.style.cursor = "auto";
//                 }}
//                 position={[0, -5, depth + 3.21 - position[2]]}
//               >
//                 <circleGeometry args={[5]} />
//                 <meshBasicMaterial map={arrowUpDownMap} />
//               </mesh>
//               <mesh
//                 onPointerOver={() => {
//                   document.body.style.cursor = "pointer";
//                 }}
//                 onPointerOut={() => {
//                   document.body.style.cursor = "auto";
//                 }}
//                 onClick={() => onRemoveObject(index)}
//                 position={[-scale[0] / 2 + 5, 4.5, depth + 3.21 - position[2]]}
//               >
//                 <circleGeometry args={[5]} />
//                 <meshBasicMaterial map={trashMap} />
//               </mesh>
//               <mesh
//                 onPointerOver={() => {
//                   document.body.style.cursor = "pointer";
//                 }}
//                 onPointerOut={() => {
//                   document.body.style.cursor = "auto";
//                 }}
//                 onClick={() => onPlusMap()}
//                 position={[scale[0] / 2 - 5, 4.5, depth + 3.21 - position[2]]}
//               >
//                 <circleGeometry args={[5]} />
//                 <meshBasicMaterial map={plusMap} />
//               </mesh>
//             </group>
//           )}

//         {showControl && drawerType === Config.furnishing.drawer.type.customDrawer && (
//           <group>
//             <group>
//               {/* Arrow Icon */}
//               <mesh
//                 onPointerOver={() => {
//                   document.body.style.cursor = "pointer";
//                 }}
//                 onPointerOut={() => {
//                   document.body.style.cursor = "auto";
//                 }}
//                 position={[0, -5, depth + 3.21 - position[2]]}
//               >
//                 <circleGeometry args={[5]} />
//                 <meshBasicMaterial map={arrowUpDownMap} />
//               </mesh>
//               {/* Trash Icon */}
//               <mesh
//                 onPointerOver={() => {
//                   document.body.style.cursor = "pointer";
//                 }}
//                 onPointerOut={() => {
//                   document.body.style.cursor = "auto";
//                 }}
//                 onClick={() => onRemoveObject(index)}
//                 // position={[-scale[0] / 2 + 5, 4.5, depth + 3.21 - position[2]]}
//                 position={[-scale[0] / 2 + 3, 4.5, depth + 3.21 - position[2]]}
//               >
//                 <circleGeometry args={[5]} />
//                 <meshBasicMaterial map={trashMap} />
//               </mesh>
//               {/* Plus Icon */}
//               <mesh
//                 onPointerOver={() => {
//                   document.body.style.cursor = "pointer";
//                 }}
//                 onPointerOut={() => {
//                   document.body.style.cursor = "auto";
//                 }}
//                 onClick={() => onPlusMap()}
//                 // position={[scale[0] / 2 - 5, 4.5, depth + 3.21 - position[2]]}
//                 position={[scale[0] / 2 - 3, 4.5, depth + 3.21 - position[2]]}
//               >
//                 <circleGeometry args={[5]} />
//                 <meshBasicMaterial map={plusMap} />
//               </mesh>
//             </group>
//             <group visible={drawerHeightValue < 41 ? true : false}>
//               <mesh>
//                 <Html
//                   position={[0, showDimentionControl ? -0.1 : 4.5, depth + 3.21 - position[2]]}
//                   center
//                   args={[scale[0], scale[1]]}
//                   pointerEvents="auto"
//                 >
//                   {!showDimentionControl ? (
//                     <div
//                       className="w-[60px] bg-white h-[21px] rounded-[6px] cursor-pointer border border-[#36695C] text-center text-[14px] m-auto"
//                       // style={{ width: `${scale[0] < 43 ? "30px" : "55px"}` }}
//                       style={{ width: `${scale[0] < 43 ? "25px" : "45px"}` }}
//                       onClick={() => setShowDimensionControl(true)}
//                       tabIndex={0}
//                       onMouseOver={() => {
//                         setShowDimen(true);
//                       }}
//                       // onMouseLeave={() => {
//                       //   setShowDimen(false);
//                       // }}
//                       onMouseLeave={() => {
//                         setShowDimen(false);
//                         setShowControl(false);
//                       }}
//                     >
//                       {scale[0] < 43
//                         ? `${Math.round(drawerHeightValue)}`
//                         : `${Math.round(drawerHeightValue)} cm`}
//                     </div>
//                   ) : (
//                     <div
//                       className={` bg-[#b6b6b6e0] justify-center gap-1 flex flex-row`}
//                       style={{
//                         width:
//                           Math.round((11 * (screen.width / 1600) * 55) / camera.position.z) + "px",
//                         height:
//                           Math.round(
//                             (11 * (screen.height / 900) * drawerHeightValue) / camera.position.z
//                           ) + "px",
//                       }}
//                       tabIndex={0}
//                       onBlur={(e) => {
//                         if (e.currentTarget.contains(e.relatedTarget)) return;
//                         setShowDimensionControl(false);
//                         setShowControl(false);
//                         handleBlur(e);
//                       }}
//                     >
//                       <div
//                         className="w-[30px] flex items-center mx-auto"
//                         onClick={() => {
//                           if (Math.round(drawerHeightValue) > 10)
//                             setDrawerHeightValue(Number(drawerHeightValue - 1));
//                         }}
//                       >
//                         <img src={MinusIcon} className="w-full cursor-pointer" />
//                       </div>
//                       <div
//                         className="text-[14px] h-[22px] m-auto border border-[#36695C] rounded-[6px] px-1 bg-white flex flex-row"
//                         style={{ width: "65px" }}
//                         onBlur={(e) => {
//                           handleBlur(e);
//                         }}
//                       >
//                         <input
//                           className="w-[35px] bg-transparent text-center outline-none"
//                           type="number"
//                           value={Math.round(drawerHeightValue)}
//                           onChange={(e) => {
//                             setDrawerHeightValue(Number(e.target.value));
//                           }}
//                           onKeyDown={(e) => {
//                             if (e.key === "Enter") {
//                               e.preventDefault();
//                               setShowDimensionControl(false);
//                               setShowControl(false);
//                               setShowDimen(false);
//                               handleBlur(e);
//                             }
//                           }}
//                         />
//                         cm
//                       </div>
//                       <div
//                         className="w-[30px] flex items-center mx-auto"
//                         onClick={() => {
//                           if (Math.round(drawerHeightValue) < 40)
//                             setDrawerHeightValue(Number(drawerHeightValue + 1));
//                         }}
//                       >
//                         <img src={PlusIcon} className="w-full cursor-pointer" />
//                       </div>
//                     </div>
//                   )}
//                 </Html>
//               </mesh>
//             </group>
//           </group>
//         )}
//       </group>

//       <MeasureComponent measureInfo={measureInfo} showMeasure={showMeasure} depth={depth} />
//     </group>
//   );
// });

// export default DrawerComponent;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import * as THREE from "three";
import Drawer from "../common/drawer";
import { Griff } from "../common/griff";
import { Plane, Html } from "@react-three/drei";
import MeasureComponent from "./MeasureComponent";
import Config from "../../../config";
import useDndStore from "../../zustand/dndStore";
import InternalDrawer from "../common/internalDrawer";
import { useLoader, useThree } from "@react-three/fiber";
import useCornerStore from "../../zustand/cornerStore";
import { getDraggingInfo } from "../../utils/draggingInfo";
import useDimensionStore from "../../zustand/dimensionStore";
import PlusIcon from "/images/configurator/icons/plus-1.png?url";
import MinusIcon from "/images/configurator/icons/minus.png?url";
import { getBottom, getTop } from "../../utils/availableSpace";
import useFurnishingStore from "../../zustand/furnishingStore";
import { createUseGesture, dragAction, pinchAction } from "@use-gesture/react";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

let intersects = new Array(1);
let drawerTopVisible = true;
let drawerBottomVisible = true;
let topConnected = false;
let bottomConnected = false;
let topAssetType = "none";
let result = {};

const DrawerComponent = React.memo(function DrawerComponent({
  asset,
  spaceRef,
  index,
  allfurnishing,
  svId,
}) {
  const {
    xIndex,
    inDivider,
    d_xIndex,
    d_yPos,
    type,
    scale,
    position,
    topVisible,
    bottomVisible,
    sideVisible,
    topShelfDistance,
    topAsset,
    bottomAsset,
    drawerType,
    drawerGroup: initialDrawerGroup,
    drawerGroupScale: initialDrawerGroupScale,
  } = asset;

  const setShowDimensions = useCornerStore.use.setShowDimensions();
  const viewOption = useCornerStore.use.viewOption();

  const furnishingAssets = useFurnishingStore.use.furnishingAssets();

  const addAsset = useFurnishingStore.use.addAsset();
  //const removeAsset = useFurnishingStore.use.removeAsset();
  const removeAssetByIndex = useFurnishingStore.use.removeAssetByIndex();
  const showDrawerShelf = useFurnishingStore.use.showDrawerShelf();
  const setSelectionInfo = useFurnishingStore.use.setSelectionInfo();
  const updateAsset = useFurnishingStore.use.updateAsset();
  const totalSpace = useFurnishingStore.use.totalSpace();
  const removeGriff = useFurnishingStore.use.removeGriff();

  const setAssetDragging = useDndStore.use.setAssetDragging();
  const assetDragging = useDndStore.use.assetDragging();
  const setDrawerHeight = useDndStore.use.setDrawerHeight();
  const setDrawerTopDistance = useDndStore.use.setDrawerTopDistance();
  const setType = useDndStore.use.setType();
  const currentIndex = useDndStore.use.currentIndex();
  const setCurrentIndex = useDndStore.use.setCurrentIndex();
  const activeDrawerAsset = useDndStore.use.activeDrawerAsset();
  const setActiveDrawerAsset = useDndStore.use.setActiveDrawerAsset();

  const elementsWidths = useDimensionStore.use.elementsWidths();
  const height = useDimensionStore.use.height();
  const depth = useDimensionStore.use.depth();
  const width = useDimensionStore.use.width();
  const elementsCount = useDimensionStore.use.elementsCount();
  const hanging = useDimensionStore.use.hanging();
  const withFeet = useDimensionStore.use.withFeet();

  const { size, camera, raycaster } = useThree();
  const [planPositionX, setPlanPositionX] = useState();
  const [planPositionY, setPlanPositionY] = useState();

  const pointer = useMemo(() => new THREE.Vector2(), []);
  const ref = useRef();
  const [dragStarted, setDragStarted] = useState(true);
  const [showControl, setShowControl] = useState(false);
  const [showDimentionControl, setShowDimensionControl] = useState(false);
  const [showDimen, setShowDimen] = useState(false);
  const [showMeasure, setShowMeasure] = useState(false);
  const [drawerHeightValue, setDrawerHeightValue] = useState();
  const [measureInfo, setMeasureInfo] = useState({
    posX: 0,
    aboveTop: 0,
    aboveBottom: 0,
    belowTop: 0,
    belowBottom: 0,
  });

  const { sideIncident } = Config.furnishing.drawer;
  const { panelSpace, panelWidth } = Config.furnishing.internalDrawer;

  const [trashMap, arrowUpDownMap, plusMap] = useLoader(THREE.TextureLoader, [
    "/images/furnishing/doors/trash_blue.png",
    "/images/configurator/icons/arrow_up_down.png",
    "/images/configurator/icons/plus.png",
  ]);
  plusMap.anisotropy = 16;
  plusMap.minFilter = THREE.LinearFilter;
  plusMap.magFilter = THREE.LinearFilter;
  plusMap.generateMipmaps = false;

  const useGesture = createUseGesture([dragAction, pinchAction]);

  // useEffect(() => {
  //   if (!dragStarted) {
  //     setShowDimensions(false);
  //     setPlanPositionX(position[0]);
  //     setPlanPositionY(position[1]);
  //     setSelectionInfo({
  //       xIndex,
  //       yPos: position[1],
  //       inDivider,
  //       d_xIndex,
  //       d_yPos,
  //     });
  //     setAssetDragging(true);
  //     if (!topVisible || !bottomVisible) {
  //       showDrawerShelf({
  //         type,
  //         xIndex,
  //         yPos: position[1],
  //         inDivider,
  //         d_xIndex,
  //         d_yPos,
  //       });
  //     }
  //     setShowControl(false);
  //   }
  // }, [dragStarted]);

  // Ensures showControl is false for assets other than the currently interacted asset
  useEffect(() => {
    // furnishingAssets.forEach((_, index) => {
    //   if (currentIndex !== index) setShowControl(false);
    // });

    if (assetDragging) {
      furnishingAssets.forEach((_, index) => {
        if (currentIndex !== index) setShowControl(false);
      });
    }
  }, [currentIndex]);

  //run when wardrobe height changes. Update all drawers at the top
  useEffect(() => {
    furnishingAssets.forEach((asset, index) => {
      if (
        asset.type === Config.furnishing.type.drawer ||
        asset.type === Config.furnishing.type.internalDrawer
      ) {
        const topPosition = height - Config.plate.thickness / 2;
        const assetPosition = asset.position[1] + scale[1] / 2;
        if (
          asset.topAsset === "none" &&
          topPosition - assetPosition < Config.plate.thickness &&
          !asset.topVisible
        ) {
          updateAsset({
            index,
            newData: {
              topVisible: true,
            },
          });
        }
      }
    });
  }, [height]);

  const handleDragStart = useCallback(
    (state) => {
      setShowDimensions(false);
      setCurrentIndex(index);
      setType(type);
      setDrawerHeight(scale[1]);

      if (type === Config.furnishing.type.drawer) setDrawerTopDistance(topShelfDistance);
      //setDragStarted(true);
      setSelectionInfo({
        xIndex,
        yPos: position[1],
        inDivider,
        d_xIndex,
        d_yPos,
      });
      setAssetDragging(true);
      setShowControl(false);
    },
    [type, scale, topShelfDistance, xIndex, position]
  );

  const handleDrag = useCallback(
    (state) => {
      state.event.stopPropagation();
      if (state.delta[0] === 0 && state.delta[1] === 0) return;
      document.body.style.cursor = "grabbing";

      ///setDragStarted(false);
      setShowMeasure(true);

      pointer.x = ((state.values[0] - size.left) / size.width) * 2 - 1;
      pointer.y = -((state.values[1] - size.top) / size.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      intersects = raycaster.intersectObjects(spaceRef.children, true);

      if (!intersects[0]) return;

      if (intersects[0].object.name === "available") {
        const { top, bottom, topAsset, bottomAsset, availableTop, availableBottom } =
          intersects[0].object.userData;

        topAssetType = topAsset;

        result = getDraggingInfo({
          type,
          top,
          bottom,
          topAsset,
          bottomAsset,
          initialPosY: intersects[0].point.y * 100 + height / 2,
          raster: Config.furnishing.default.raster,
          availableWidth: intersects[0].object.geometry.parameters.width,
          objectHeight: scale[1],
        });

        drawerTopVisible = result.topVisible;
        drawerBottomVisible = result.bottomVisible;
        topConnected = result.topConnected;
        bottomConnected = result.bottomConnected;
        ref.current?.position.set(
          intersects[0].object.position.x,
          hanging || withFeet ? result.posY - 25 : result.posY,
          position[2]
        );
        setPlanPositionX(intersects[0].object.position.x);
        setPlanPositionY(result.posY);

        if (scale[0] !== result.objectWidth) {
          updateAsset({
            index,
            newData: { scale: [result.objectWidth, scale[1], scale[2]] },
          });
        }

        const tempMeasureInfo = {
          posX: intersects[0].object.position.x,
          aboveTop: availableTop,
          aboveBottom: getBottom(
            hanging || withFeet ? result.posY - 25 : result.posY,
            scale[1],
            type,
            topShelfDistance
          ),
          belowTop: getTop(hanging || withFeet ? result.posY - 25 : result.posY, scale[1], type),
          belowBottom: availableBottom,
        };

        if (JSON.stringify(measureInfo) !== JSON.stringify(tempMeasureInfo))
          setMeasureInfo(tempMeasureInfo);
      } else {
        drawerTopVisible = true;
        topConnected = false;
        drawerBottomVisible = true;
        bottomConnected = false;

        ref.current?.position.set(
          intersects[0].point.x * 100 + width / 2,
          intersects[0].point.y * 100 + height / 2,
          depth + depth / 2
        );

        //setShowMeasure(false);
      }
    },
    [spaceRef, ref, allfurnishing, scale, measureInfo, hanging, withFeet]
  );

  const handleDragEnd = useCallback(
    (state) => {
      document.body.style.cursor = "pointer";
      setCurrentIndex(null);
      setShowMeasure(false);
      setAssetDragging(false);
      setShowControl(false);
      if (state.values[0] === state.initial[0] && state.values[1] === state.initial[1]) return;

      // Calculate X-axis scale based on whether it's a `Drawer` or `InternalDrawer`
      const scaleX =
        type === "Drawer"
          ? elementsWidths[xIndex] - sideIncident * 2
          : elementsWidths[xIndex] - (panelSpace + panelWidth) * 2;

      // Revert the asset to its previous position in the wardrobe if there is no intersection or if the intersection is with `other` or `occupied`
      if (
        !intersects[0] ||
        intersects[0]?.object.name === "other" ||
        intersects[0]?.object.name === "occupied"
      ) {
        //update positionY for the controls Plane
        setPlanPositionY(position[1] + 0.0000000000001);
        return updateAsset({
          index,
          newData: {
            position: [position[0], position[1] + 0.0000000000001, position[2]],
            // Update the asset's scale along the x-axis based on the width of the wardrobe section (xIndex).
            // elementsWidths is an array that stores the width of each wardrobe section(xIndex).
            scale: [scaleX, scale[1], scale[2]],
          },
        });
      }

      //Handle update of the DraggedAsset on dragEnd
      const { topAsset, bottomAsset, xIndex: currentXindex } = intersects[0].object.userData;

      //Get value of topVisible and bottomVisible
      const topVisibleValue =
        (result.topConnected && topAsset === type) ||
        (result.topConnected && topAsset === "none") ||
        (!result.topVisible && topAsset === "none")
          ? false
          : true;
      const bottomVisibleValue =
        (result.bottomConnected && bottomAsset === type) ||
        (result.bottomConnected && bottomAsset === "none") ||
        (!result.bottomVisible && bottomAsset === "none")
          ? false
          : true;

      /******** I ADDED THIS CHECK BECAUSE OF THE EDGE-CASE OF USE-GESTURE `stopPropagation` **************************************/
      // because of some cases where you can unintentionally drag more than one drawer asset at the same time because of thier close proximity
      // I added `state.event.stopPropagation` in handleDrag function, which now prevents the close drawer from being dragged aswell
      // Now comes the edgecase/gotcha when you drag a drawer, even though the close drawer is not also visibly dragged
      // But it gets updated in the handleDragend, which makes it that even though the drawer is visibly where it was, but it has been updated
      // And now you will see the bug of empty unavailable space even though no asset there
      //console.log(`positionX - ${position[0]}, refPosX- ${ref.current.position.x} `);
      const isSamePosX = position[0] === ref.current.position.x;
      const isSamePosY = position[1] === ref.current.position.y;
      //console.log(isSamePosX && isSamePosY);
      //if positionX(xIndex) and positionY is unchanged return. Because it's not the dragged asset and does not need payload updated
      if (isSamePosX && isSamePosY) return;
      /**************************************************************************************************************************/
      const payload = {
        index,
        newData: {
          xIndex: intersects[0].object.userData.xIndex,
          topAsset: topAsset, //update topAsset
          bottomAsset: bottomAsset, //update bottomAsset
          topVisible: topVisibleValue, //update topVisible
          bottomVisible: bottomVisibleValue, //update bottomVisible
          inDivider: intersects[0].object.userData.inDivider,
          d_xIndex: intersects[0].object.userData.d_xIndex,
          d_yPos: intersects[0].object.userData.d_yPos,
          position: [ref.current.position.x, ref.current.position.y, ref.current.position.z],
          scale: scale,
          type,
          isShowControl: true,
        },
      };

      updateAsset(payload);

      /***************** Function Logic: What Happens When topConnected or bottomConnected Is True (Indicating It Is Connected to Another Drawer) **********************************************************/
      // Handles removal of the bottom of the topAsset if it's connected with another Drawer
      if (result.topConnected && type === Config.furnishing.type.drawer) {
        // Find the closest asset above `result.posY` directly
        let topAsset = null;
        let assetIndex = -1;

        for (let i = 0; i < furnishingAssets.length; i++) {
          const currentAsset = furnishingAssets[i];
          if (
            currentAsset.xIndex === currentXindex &&
            currentAsset.position[1] > result.posY &&
            (!topAsset || currentAsset.position[1] < topAsset.position[1])
          ) {
            topAsset = currentAsset;
            assetIndex = i;
          }
        }
        if (topAsset && topAsset?.type === Config.furnishing.type.drawer) {
          updateAsset({
            index: assetIndex,
            newData: {
              bottomVisible: false,
            },
          });
        }
      }

      // Handles removal of the top of the topAsset if it's connected with another Drawer
      if (result.bottomConnected && type === Config.furnishing.type.drawer) {
        // Find the closest asset below `result.posY` directly
        let bottomAsset = null;
        let assetIndex = -1;

        for (let i = 0; i < furnishingAssets.length; i++) {
          const currentAsset = furnishingAssets[i];
          if (
            currentAsset.xIndex === currentXindex &&
            currentAsset.position[1] < result.posY &&
            (!bottomAsset || currentAsset.position[1] > bottomAsset.position[1])
          ) {
            bottomAsset = currentAsset;
            assetIndex = i;
          }
        }

        if (bottomAsset && bottomAsset?.type === Config.furnishing.type.drawer) {
          updateAsset({
            index: assetIndex,
            newData: {
              topVisible: false,
            },
          });
        }
      }

      /****************************************************************************************/

      /***************** Function Logic: What Happens When topConnected or bottomConnected Is just becomes false (Indicating It Is Connected to Another Drawer) **********************************************************/
      // Updates the bottomVisible property of the top drawer it was connected to when it is no longer topConnected.
      //if (!asset.topVisible && !topConnected && asset.type === Config.furnishing.type.drawer) {

      if (
        !asset.topVisible &&
        (!topConnected || ref.current.position.y !== position[1]) &&
        asset.type === Config.furnishing.type.drawer
      ) {
        const filteredAssets = furnishingAssets.filter((asset) => {
          return asset.xIndex === xIndex && asset.position[1] > position[1];
        });
        //if it's topConnected with the top Plate
        if (!filteredAssets.length) return;

        const sortAssets = filteredAssets.sort((a, b) => {
          return a.position[1] - b.position[1];
        });
        const topAsset = sortAssets[0];

        const assetIndex = furnishingAssets.findIndex(
          (asset) => asset.xIndex === xIndex && asset.position[1] === topAsset.position[1]
        );
        if (topAsset && topAsset?.type === Config.furnishing.type.drawer) {
          updateAsset({
            index: assetIndex,
            newData: {
              bottomVisible: true,
            },
          });
        }
      }

      //Updates the topVisible property of the bottom drawer it was connected to when it is no longer bottomConnected.
      if (
        !asset.bottomVisible &&
        (!bottomConnected || ref.current.position.y !== position[1]) &&
        asset.type === Config.furnishing.type.drawer
      ) {
        const filteredAssets = furnishingAssets.filter((asset) => {
          return asset.xIndex === xIndex && asset.position[1] < position[1];
        });

        //if it's bottomConnected with the bottom Plate
        if (!filteredAssets.length) return;

        const sortAssets = filteredAssets.sort((a, b) => {
          return b.position[1] - a.position[1];
        });

        const bottomAsset = sortAssets[0];

        const assetIndex = furnishingAssets.findIndex(
          (asset) => asset.xIndex === xIndex && asset.position[1] === bottomAsset.position[1]
        );

        if (bottomAsset && bottomAsset?.type === Config.furnishing.type.drawer) {
          updateAsset({
            index: assetIndex,
            newData: {
              topVisible: true,
            },
          });
        }
      }

      /***** */
      /***** */
      /***** */
      /** // INTERNAL DRAWER INTERNAL DRAWER UPDATE FUNCTION INTERNAL DRAWER INTERNAL DRAWER UPDATE FUNCTION **/
      /***************** Function Logic: What Happens When topConnected or bottomConnected Is True (Indicating It Is Connected to Another InternalDrawer) **********************************************************/
      // Handles removal of the bottom of the topAsset if it's connected with another InternalDrawer
      if (result.topConnected && asset.type === Config.furnishing.type.internalDrawer) {
        // Find the closest asset above `result.posY` directly
        let topAsset = null;
        let assetIndex = -1;

        for (let i = 0; i < furnishingAssets.length; i++) {
          const currentAsset = furnishingAssets[i];
          if (
            currentAsset.xIndex === currentXindex &&
            currentAsset.position[1] > result.posY &&
            (!topAsset || currentAsset.position[1] < topAsset.position[1])
          ) {
            topAsset = currentAsset;
            assetIndex = i;
          }
        }

        if (topAsset && topAsset?.type === Config.furnishing.type.internalDrawer) {
          updateAsset({
            index: assetIndex,
            newData: {
              bottomVisible: false,
            },
          });
        }
      }

      // Handles removal of the top of the topAsset if it's connected with another Drawer
      if (result.bottomConnected && asset.type === Config.furnishing.type.internalDrawer) {
        // Find the closest asset below `result.posY` directly
        let bottomAsset = null;
        let assetIndex = -1;

        for (let i = 0; i < furnishingAssets.length; i++) {
          const currentAsset = furnishingAssets[i];
          if (
            currentAsset.xIndex === currentXindex &&
            currentAsset.position[1] < result.posY &&
            (!bottomAsset || currentAsset.position[1] > bottomAsset.position[1])
          ) {
            bottomAsset = currentAsset;
            assetIndex = i;
          }
        }

        if (bottomAsset && bottomAsset?.type === Config.furnishing.type.internalDrawer) {
          updateAsset({
            index: assetIndex,
            newData: {
              topVisible: false,
            },
          });
        }
      }

      /****************************************************************************************/

      /***************** Function Logic: What Happens When topConnected or bottomConnected Is just becomes false (Indicating It Is Connected to Another InternalDrawer) **********************************************************/
      //Updates the bottomVisible property of the top Internal drawer it was connected to when it is no longer topConnected.
      if (
        !asset.topVisible &&
        (!topConnected || ref.current.position.y !== position[1]) &&
        asset.type === Config.furnishing.type.internalDrawer
      ) {
        const filteredAssets = furnishingAssets.filter((asset) => {
          return asset.xIndex === xIndex && asset.position[1] > position[1];
        });

        //if it's topConnected with the top Plate
        if (!filteredAssets.length) return;

        const sortAssets = filteredAssets.sort((a, b) => {
          return a.position[1] - b.position[1];
        });
        const topAsset = sortAssets[0];

        const assetIndex = furnishingAssets.findIndex(
          (asset) => asset.xIndex === xIndex && asset.position[1] === topAsset.position[1]
        );

        if (topAsset && topAsset?.type === Config.furnishing.type.internalDrawer) {
          updateAsset({
            index: assetIndex,
            newData: {
              bottomVisible: true,
            },
          });
        }
      }

      //Updates the topVisible property of the bottom InternalDrawer it was connected to when it is no longer bottomConnected.
      if (
        !asset.bottomVisible &&
        (!bottomConnected || ref.current.position.y !== position[1]) &&
        asset.type === Config.furnishing.type.internalDrawer
      ) {
        const filteredAssets = furnishingAssets.filter((asset) => {
          return asset.xIndex === xIndex && asset.position[1] < position[1];
        });

        //if it's bottomConnected with the bottom Plate
        if (!filteredAssets.length) return;

        const sortAssets = filteredAssets.sort((a, b) => {
          return b.position[1] - a.position[1];
        });

        const bottomAsset = sortAssets[0];

        const assetIndex = furnishingAssets.findIndex(
          (asset) => asset.xIndex === xIndex && asset.position[1] === bottomAsset.position[1]
        );

        if (bottomAsset && bottomAsset?.type === Config.furnishing.type.internalDrawer) {
          updateAsset({
            index: assetIndex,
            newData: {
              topVisible: true,
            },
          });
        }
      }
    },
    [ref, scale, topShelfDistance, xIndex, position, furnishingAssets]
  );

  const bind = useGesture(
    {
      onDragStart: handleDragStart,
      onDrag: handleDrag,
      onDragEnd: handleDragEnd,
    },
    {
      //enabled: activeDrawerAsset === index,
      enabled: viewOption === Config.view.front,
      // Sets a drag threshold of 1px to distinguish between click and drag actions,
      // ensuring drag handlers only trigger after the user moves at least 1px.
      drag: { threshold: 1 },
      //drag: { filterTaps: true },
    }
  );

  useEffect(() => {
    setDrawerHeightValue(
      (topShelfDistance === undefined
        ? 0
        : scale[1] +
          topShelfDistance +
          Config.furnishing.drawer.bottomShelfDistance +
          2 * Config.furnishing.shelf.thickness1
      ).toFixed(1)
    );
  }, [topShelfDistance]);

  const handleBlur = useCallback(
    (e) => {
      if (e.currentTarget.contains(e.relatedTarget)) return;
      setShowDimensionControl(false);
      const flagValue =
        position[1] + scale[1] / 2 + topShelfDistance + Config.furnishing.shelf.thickness1 + 0.5;
      const { availableTop, aboveBottom } = getAvailableSpace(xIndex, totalSpace, flagValue);
      const scaleY = !topShelfDistance
        ? 0
        : drawerHeightValue -
          topShelfDistance -
          Config.furnishing.drawer.bottomShelfDistance -
          2 * Config.furnishing.shelf.thickness1;

      const tempAvailableTop = scaleY - scale[1];
      const positionY = position[1] - scale[1] / 2 + scaleY / 2;

      if (availableTop > 0) return customDrawer(scaleY, positionY);
      if (tempAvailableTop < 0) return customDrawer(scaleY, positionY);

      const filteredAssets = furnishingAssets.filter(
        (asset) => asset.xIndex === xIndex && asset.position[1] > position[1]
      );
      const sortAssets = filteredAssets.sort((a, b) => a.position[1] - b.position[1]);
      const available =
        sortAssets.length > 0
          ? sortAssets[0].position[1] - sortAssets[0].scale[1] / 2 - (position[1] + scale[1] / 2)
          : height - (position[1] + scale[1] / 2);

      if (tempAvailableTop < available) return customDrawer(scaleY, positionY);

      setDrawerHeightValue(
        (topShelfDistance === undefined
          ? 0
          : scale[1] +
            topShelfDistance +
            Config.furnishing.drawer.bottomShelfDistance +
            2 * Config.furnishing.shelf.thickness1
        ).toFixed(1)
      );
      setShowControl(false);
    },
    [drawerHeightValue, position]
  );

  const onRemoveObject = useCallback(
    (furnishIndex) => {
      if (!asset.topVisible && asset.type === Config.furnishing.type.drawer) {
        const filteredAssets = furnishingAssets.filter((asset) => {
          return asset.xIndex === xIndex && asset.position[1] > position[1];
        });

        //if it's topConnected with the top Plate
        if (filteredAssets.length) {
          const sortAssets = filteredAssets.sort((a, b) => {
            return a.position[1] - b.position[1];
          });
          const topAsset = sortAssets[0];

          const assetIndex = furnishingAssets.findIndex(
            (asset) => asset.xIndex === xIndex && asset.position[1] === topAsset.position[1]
          );
          if (topAsset && topAsset?.type === Config.furnishing.type.drawer) {
            updateAsset({
              index: assetIndex,
              newData: {
                bottomVisible: true,
              },
            });
          }
        }
      }

      //Updates the topVisible property of the bottom drawer it was connected to when it is no longer bottomConnected.
      if (!asset.bottomVisible && asset.type === Config.furnishing.type.drawer) {
        const filteredAssets = furnishingAssets.filter((asset) => {
          return asset.xIndex === xIndex && asset.position[1] < position[1];
        });

        //if it's bottomConnected with the bottom Plate
        if (filteredAssets.length) {
          const sortAssets = filteredAssets.sort((a, b) => {
            return b.position[1] - a.position[1];
          });

          const bottomAsset = sortAssets[0];

          const assetIndex = furnishingAssets.findIndex(
            (asset) => asset.xIndex === xIndex && asset.position[1] === bottomAsset.position[1]
          );

          if (bottomAsset && bottomAsset?.type === Config.furnishing.type.drawer) {
            updateAsset({
              index: assetIndex,
              newData: {
                topVisible: true,
              },
            });
          }
        }
      }

      /************************* INTERNAL DRAWER  *************************/
      if (asset.type === Config.furnishing.type.internalDrawer) {
        if (!asset.topVisible) {
          const filteredAssets = furnishingAssets.filter((asset) => {
            return asset.xIndex === xIndex && asset.position[1] > position[1];
          });

          //if it's topConnected with the top Plate
          if (filteredAssets.length) {
            const sortAssets = filteredAssets.sort((a, b) => {
              return a.position[1] - b.position[1];
            });
            const topAsset = sortAssets[0];

            const assetIndex = furnishingAssets.findIndex(
              (asset) => asset.xIndex === xIndex && asset.position[1] === topAsset.position[1]
            );
            if (topAsset && topAsset?.type === Config.furnishing.type.internalDrawer) {
              updateAsset({
                index: assetIndex,
                newData: {
                  bottomVisible: true,
                },
              });
            }
          }
        }

        //Updates the topVisible property of the bottom Internaldrawer it was connected to when it is no longer bottomConnected.
        if (!asset.bottomVisible) {
          const filteredAssets = furnishingAssets.filter((asset) => {
            return asset.xIndex === xIndex && asset.position[1] < position[1];
          });

          //if it's bottomConnected with the bottom Plate
          if (filteredAssets.length) {
            const sortAssets = filteredAssets.sort((a, b) => {
              return b.position[1] - a.position[1];
            });

            const bottomAsset = sortAssets[0];

            const assetIndex = furnishingAssets.findIndex(
              (asset) => asset.xIndex === xIndex && asset.position[1] === bottomAsset.position[1]
            );

            if (bottomAsset && bottomAsset?.type === Config.furnishing.type.internalDrawer) {
              updateAsset({
                index: assetIndex,
                newData: {
                  topVisible: true,
                },
              });
            }
          }
        }
      }

      removeAssetByIndex(furnishIndex);
      setShowControl(false);
    },
    [furnishingAssets]
  );

  const getAvailableSpace = (initialXIndex, totalSpace, flagValue) => {
    const filter = totalSpace.filter((space) => {
      return (
        space.xIndex === initialXIndex &&
        space.availableBottom <= flagValue &&
        space.availableTop >= flagValue
      );
    });
    const aboveBottom = getBottom(
      hanging || withFeet ? position[1] - 25 : position[1],
      scale[1],
      type,
      topShelfDistance
    );
    const availableTop = filter[0]?.height;
    return { availableTop, aboveBottom };
  };

  const updateDrawer = (scaleY, positionY, tempDrawerGroupScale) => {
    const payload = {};
    payload.removal = {
      xIndex,
      yPos: position[1],
      inDivider,
      d_xIndex,
      d_yPos,
    };

    payload.asset = {
      xIndex,
      inDivider,
      d_xIndex,
      d_yPos,
      position: [position[0], positionY, position[2]],
      scale: [scale[0], scaleY, scale[2]],
      type,
      drawerType,
      topVisible,
      bottomVisible,
      sideVisible: true,
      topShelfDistance: type === Config.furnishing.type.drawer ? topShelfDistance : undefined,
      topShelfVisible:
        type === Config.furnishing.type.divider &&
        (topAssetType === Config.furnishing.type.slopingFloor ||
          topAssetType === Config.furnishing.type.clothesLift ||
          topAssetType === Config.furnishing.type.clothesRail ||
          topAssetType === Config.furnishing.type.pantsPullout)
          ? true
          : false,
      dividerLeftWidth:
        type === Config.furnishing.type.divider
          ? (scale[0] - Config.furnishing.divider.thickness) / 2
          : undefined,
      bottomAsset,
      drawerGroup: initialDrawerGroup + 1,
      drawerGroupScale: tempDrawerGroupScale,
    };

    payload.drawerShelf = [];
    if (topConnected) {
      payload.drawerShelf.push({
        location: "top",
        bottomVisible: !topConnected,
      });
    }
    if (bottomConnected) {
      payload.drawerShelf.push({
        location: "bottom",
        topVisible: !bottomConnected,
      });
    }
    addAsset(payload);
  };

  const customDrawer = (scaleY, positionY) => {
    const payload = {};

    payload.removal = {
      xIndex,
      yPos: position[1],
      inDivider,
      d_xIndex,
      d_yPos,
    };

    payload.asset = {
      xIndex,
      inDivider,
      d_xIndex,
      d_yPos,
      position: [position[0], positionY, position[2]],
      scale: [scale[0], scaleY, scale[2]],
      type,
      drawerType,
      topVisible,
      bottomVisible,
      sideVisible: true,
      topShelfDistance: type === Config.furnishing.type.drawer ? topShelfDistance : undefined,
      topShelfVisible:
        type === Config.furnishing.type.divider &&
        (topAssetType === Config.furnishing.type.slopingFloor ||
          topAssetType === Config.furnishing.type.clothesLift ||
          topAssetType === Config.furnishing.type.clothesRail ||
          topAssetType === Config.furnishing.type.pantsPullout)
          ? true
          : false,
      dividerLeftWidth:
        type === Config.furnishing.type.divider
          ? (scale[0] - Config.furnishing.divider.thickness) / 2
          : undefined,
      bottomAsset,
      drawerGroup: 1,
      drawerGroupScale: [scaleY],
    };

    payload.drawerShelf = [];
    if (topConnected) {
      payload.drawerShelf.push({
        location: "top",
        bottomVisible: !topConnected,
      });
    }
    if (bottomConnected) {
      payload.drawerShelf.push({
        location: "bottom",
        topVisible: !bottomConnected,
      });
    }
    addAsset(payload);
  };

  // click plus icon add drawer on top
  const onPlusMap = useCallback(() => {
    if (type === Config.furnishing.type.drawer) {
      const flagValue =
        position[1] + scale[1] / 2 + topShelfDistance + Config.furnishing.shelf.thickness1 + 1;
      const { availableTop, aboveBottom } = getAvailableSpace(xIndex, totalSpace, flagValue);

      if (scale[1] < availableTop) {
        const payload = {};

        payload.asset = {
          xIndex,
          inDivider,
          d_xIndex,
          d_yPos,
          position: [
            position[0],
            position[1] +
              scale[1] / 2 +
              scale[1] / 2 +
              Config.furnishing.drawer.bottomShelfDistance +
              Config.furnishing.shelf.thickness1 +
              0.475 +
              0.475,
            position[2],
          ],
          scale: [scale[0], scale[1], scale[2]],
          type,
          drawerType,
          topVisible: true,
          bottomVisible: false,
          sideVisible: true,
          topShelfDistance: type === Config.furnishing.type.drawer ? topShelfDistance : undefined,
          topShelfVisible:
            type === Config.furnishing.type.divider &&
            (topAssetType === Config.furnishing.type.slopingFloor ||
              topAssetType === Config.furnishing.type.clothesLift ||
              topAssetType === Config.furnishing.type.clothesRail ||
              topAssetType === Config.furnishing.type.pantsPullout)
              ? true
              : false,
          dividerLeftWidth:
            type === Config.furnishing.type.divider
              ? (scale[0] - Config.furnishing.divider.thickness) / 2
              : undefined,
          bottomAsset,
          drawerGroup: initialDrawerGroup + 1,
          drawerGroupScale: initialDrawerGroupScale,
        };

        payload.drawerShelf = [];
        if (topConnected) {
          payload.drawerShelf.push({
            location: "top",
            bottomVisible: !topConnected,
          });
        }
        if (bottomConnected) {
          payload.drawerShelf.push({
            location: "bottom",
            topVisible: !bottomConnected,
          });
        }

        addAsset(payload);

        //update topVisible property of the clicked Drawer to false
        updateAsset({
          index,
          newData: {
            topVisible: false,
          },
        });
      }
    }

    if (type === Config.furnishing.type.internalDrawer) {
      const filteredAssets = furnishingAssets.filter(
        (asset) => asset.xIndex === xIndex && asset.position[1] > position[1]
      );
      const sortAssets = filteredAssets.sort((a, b) => a.position[1] - b.position[1]);

      let available = topShelfDistance;
      if (sortAssets.length > 0) {
        available =
          sortAssets[0].position[1] -
          sortAssets[0].scale[1] / 2 -
          (position[1] + scale[1] / 2) -
          Config.furnishing.internalDrawer.topShelfDistance -
          Config.furnishing.internalDrawer.panelSpace;
      } else {
        available =
          height -
          (position[1] + scale[1] / 2) -
          Config.furnishing.internalDrawer.topShelfDistance -
          Config.furnishing.internalDrawer.panelSpace;
      }

      if (scale[1] < available) {
        // const scaleY =
        //   initialDrawerGroupScale[0] +
        //   scale[1] +
        //   Config.furnishing.internalDrawer.topShelfDistance +
        //   Config.furnishing.internalDrawer.panelSpace;
        // const positionY = position[1] - scale[1] / 2 + scaleY / 2;
        // customDrawer(scaleY, positionY);

        const payload = {};

        payload.asset = {
          xIndex,
          inDivider,
          d_xIndex,
          d_yPos,
          position: [
            position[0],
            position[1] +
              scale[1] / 2 +
              scale[1] / 2 +
              Config.furnishing.drawer.bottomShelfDistance +
              Config.furnishing.shelf.thickness1,
            position[2],
          ],
          scale: [scale[0], scale[1], scale[2]],
          type,
          drawerType,
          topVisible: true,
          bottomVisible: false,
          sideVisible: true,
          topShelfDistance: type === Config.furnishing.type.drawer ? topShelfDistance : undefined,
          topShelfVisible:
            type === Config.furnishing.type.divider &&
            (topAssetType === Config.furnishing.type.slopingFloor ||
              topAssetType === Config.furnishing.type.clothesLift ||
              topAssetType === Config.furnishing.type.clothesRail ||
              topAssetType === Config.furnishing.type.pantsPullout)
              ? true
              : false,
          dividerLeftWidth:
            type === Config.furnishing.type.divider
              ? (scale[0] - Config.furnishing.divider.thickness) / 2
              : undefined,
          bottomAsset,
          drawerGroup: initialDrawerGroup + 1,
          drawerGroupScale: initialDrawerGroupScale,
        };

        payload.drawerShelf = [];
        if (topConnected) {
          payload.drawerShelf.push({
            location: "top",
            bottomVisible: !topConnected,
          });
        }
        if (bottomConnected) {
          payload.drawerShelf.push({
            location: "bottom",
            topVisible: !bottomConnected,
          });
        }

        addAsset(payload);

        //update topVisible property of the clicked Drawer to false
        updateAsset({
          index,
          newData: {
            topVisible: false,
          },
        });
      }
    }
  }, [
    totalSpace,
    xIndex,
    drawerHeightValue,
    scale,
    position,
    furnishingAssets,
    height,
    initialDrawerGroupScale,
    initialDrawerGroup,
  ]);

  return (
    <group
      visible={scale[2] !== 0}
      furnishType="drawer"
      furnishIndex={index}
      userData={{
        xIndex,
        inDivider,
        d_xIndex,
        d_yPos,
        type,
        scale,
        position,
        svId,
      }}
    >
      <Plane
        // args={[scale[0], 25]}
        args={[
          scale[0],
          scale[1] +
            (type === Config.furnishing.type.drawer
              ? Config.furnishing.drawer.topShelfDistance +
                Config.furnishing.drawer.bottomShelfDistance
              : Config.furnishing.internalDrawer.topShelfDistance +
                Config.furnishing.internalDrawer.bottomShelfDistance) +
            Config.plate.thickness +
            Config.plate.thickness,
        ]}
        position={[position[0], position[1], depth + 3.2]}
        // position={[
        //   position[0],
        //   planPositionY == undefined ? position[1] : planPositionY,
        //   depth + 3.2,
        // ]}
        rotateX={Math.PI / 2}
        visible={false}
        onPointerOver={(e) => {
          e.stopPropagation();
          if (assetDragging) return;
          setShowControl(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          if (assetDragging) return;
          //if (showDimen) return;
          setShowControl(false);
        }}
      />
      <group
        {...bind()}
        ref={ref}
        position={position}
        userData={{
          xIndex,
          inDivider,
          d_xIndex,
          d_yPos,
          type,
          scale,
          position,
          svId,
        }}
      >
        {type === Config.furnishing.type.drawer && (
          <>
            <Drawer
              scale={scale}
              depth={depth}
              elementIndex={
                (inDivider ? d_xIndex : xIndex) === 0
                  ? Config.elementIndex.first
                  : xIndex === elementsCount - 1
                  ? Config.elementIndex.last
                  : Config.elementIndex.middle
              }
              topVisible={topVisible}
              bottomVisible={bottomVisible}
              topShelfDistance={topShelfDistance}
              position={position}
              type={type}
              topAsset={topAsset}
              bottomAsset={bottomAsset}
              visible={true}
              xIndex={xIndex}
              drawerGroup={initialDrawerGroup}
              drawerGroupScale={initialDrawerGroupScale}
              drag={false}
            />
            <Griff
              type={type}
              visible={true}
              position={position}
              scale={scale}
              depth={depth}
              drawerGroupScale={initialDrawerGroupScale}
              topShelfDistance={topShelfDistance}
            />
          </>
        )}

        {type === Config.furnishing.type.internalDrawer && (
          <InternalDrawer
            scale={scale}
            depth={depth}
            // topVisible={true}
            topVisible={topVisible}
            bottomVisible={bottomVisible}
            sideVisible={sideVisible}
            position={position}
          />
        )}
        {!assetDragging &&
          showControl &&
          drawerType !== Config.furnishing.drawer.type.customDrawer && (
            <group>
              <mesh
                onPointerOver={() => {
                  document.body.style.cursor = "pointer";
                }}
                onPointerOut={() => {
                  document.body.style.cursor = "auto";
                }}
                position={[0, -5, depth + 3.21 - position[2]]}
              >
                <circleGeometry args={[5]} />
                <meshBasicMaterial map={arrowUpDownMap} />
              </mesh>
              <mesh
                onPointerOver={() => {
                  document.body.style.cursor = "pointer";
                }}
                onPointerOut={() => {
                  document.body.style.cursor = "auto";
                }}
                onClick={() => onRemoveObject(index)}
                position={[-scale[0] / 2 + 5, 4.5, depth + 3.21 - position[2]]}
              >
                <circleGeometry args={[5]} />
                <meshBasicMaterial map={trashMap} />
              </mesh>
              <mesh
                onPointerOver={() => {
                  document.body.style.cursor = "pointer";
                }}
                onPointerOut={() => {
                  document.body.style.cursor = "auto";
                }}
                onClick={() => onPlusMap()}
                position={[scale[0] / 2 - 5, 4.5, depth + 3.21 - position[2]]}
              >
                <circleGeometry args={[5]} />
                <meshBasicMaterial map={plusMap} />
              </mesh>
            </group>
          )}

        {showControl && drawerType === Config.furnishing.drawer.type.customDrawer && (
          <group>
            <group>
              {/* Arrow Icon */}
              <mesh
                onPointerOver={() => {
                  document.body.style.cursor = "pointer";
                }}
                onPointerOut={() => {
                  document.body.style.cursor = "auto";
                }}
                position={[0, -5, depth + 3.21 - position[2]]}
              >
                <circleGeometry args={[5]} />
                <meshBasicMaterial map={arrowUpDownMap} />
              </mesh>
              {/* Trash Icon */}
              <mesh
                onPointerOver={() => {
                  document.body.style.cursor = "pointer";
                }}
                onPointerOut={() => {
                  document.body.style.cursor = "auto";
                }}
                onClick={() => onRemoveObject(index)}
                // position={[-scale[0] / 2 + 5, 4.5, depth + 3.21 - position[2]]}
                position={[-scale[0] / 2 + 3, 4.5, depth + 3.21 - position[2]]}
              >
                <circleGeometry args={[5]} />
                <meshBasicMaterial map={trashMap} />
              </mesh>
              {/* Plus Icon */}
              <mesh
                onPointerOver={() => {
                  document.body.style.cursor = "pointer";
                }}
                onPointerOut={() => {
                  document.body.style.cursor = "auto";
                }}
                onClick={() => onPlusMap()}
                // position={[scale[0] / 2 - 5, 4.5, depth + 3.21 - position[2]]}
                position={[scale[0] / 2 - 3, 4.5, depth + 3.21 - position[2]]}
              >
                <circleGeometry args={[5]} />
                <meshBasicMaterial map={plusMap} />
              </mesh>
            </group>
            <group visible={drawerHeightValue < 41 ? true : false}>
              <mesh>
                <Html
                  position={[0, showDimentionControl ? -0.1 : 4.5, depth + 3.21 - position[2]]}
                  center
                  args={[scale[0], scale[1]]}
                  pointerEvents="auto"
                >
                  {!showDimentionControl ? (
                    <div
                      className="w-[60px] bg-white h-[21px] rounded-[6px] cursor-pointer border border-[#36695C] text-center text-[14px] m-auto"
                      // style={{ width: `${scale[0] < 43 ? "30px" : "55px"}` }}
                      style={{ width: `${scale[0] < 43 ? "25px" : "45px"}` }}
                      onClick={() => setShowDimensionControl(true)}
                      tabIndex={0}
                      onMouseOver={() => {
                        setShowDimen(true);
                      }}
                      // onMouseLeave={() => {
                      //   setShowDimen(false);
                      // }}
                      onMouseLeave={() => {
                        setShowDimen(false);
                        setShowControl(false);
                      }}
                    >
                      {scale[0] < 43
                        ? `${Math.round(drawerHeightValue)}`
                        : `${Math.round(drawerHeightValue)} cm`}
                    </div>
                  ) : (
                    <div
                      className={` bg-[#b6b6b6e0] justify-center gap-1 flex flex-row`}
                      style={{
                        width:
                          Math.round((11 * (screen.width / 1600) * 55) / camera.position.z) + "px",
                        height:
                          Math.round(
                            (11 * (screen.height / 900) * drawerHeightValue) / camera.position.z
                          ) + "px",
                      }}
                      tabIndex={0}
                      onBlur={(e) => {
                        if (e.currentTarget.contains(e.relatedTarget)) return;
                        setShowDimensionControl(false);
                        setShowControl(false);
                        handleBlur(e);
                      }}
                    >
                      <div
                        className="w-[30px] flex items-center mx-auto"
                        onClick={() => {
                          if (Math.round(drawerHeightValue) > 10)
                            setDrawerHeightValue(Number(drawerHeightValue - 1));
                        }}
                      >
                        <img src={MinusIcon} className="w-full cursor-pointer" />
                      </div>
                      <div
                        className="text-[14px] h-[22px] m-auto border border-[#36695C] rounded-[6px] px-1 bg-white flex flex-row"
                        style={{ width: "65px" }}
                        onBlur={(e) => {
                          handleBlur(e);
                        }}
                      >
                        <input
                          className="w-[35px] bg-transparent text-center outline-none"
                          type="number"
                          value={Math.round(drawerHeightValue)}
                          onChange={(e) => {
                            setDrawerHeightValue(Number(e.target.value));
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              setShowDimensionControl(false);
                              setShowControl(false);
                              setShowDimen(false);
                              handleBlur(e);
                            }
                          }}
                        />
                        cm
                      </div>
                      <div
                        className="w-[30px] flex items-center mx-auto"
                        onClick={() => {
                          if (Math.round(drawerHeightValue) < 40)
                            setDrawerHeightValue(Number(drawerHeightValue + 1));
                        }}
                      >
                        <img src={PlusIcon} className="w-full cursor-pointer" />
                      </div>
                    </div>
                  )}
                </Html>
              </mesh>
            </group>
          </group>
        )}
      </group>

      <MeasureComponent measureInfo={measureInfo} showMeasure={showMeasure} depth={depth} />
    </group>
  );
});

export default DrawerComponent;
