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

  useEffect(() => {
    if (!dragStarted) {
      setShowDimensions(false);
      setPlanPositionX(position[0]);
      setPlanPositionY(position[1]);
      setSelectionInfo({
        xIndex,
        yPos: position[1],
        inDivider,
        d_xIndex,
        d_yPos,
      });
      setAssetDragging(true);
      if (!topVisible || !bottomVisible) {
        showDrawerShelf({
          type,
          xIndex,
          yPos: position[1],
          inDivider,
          d_xIndex,
          d_yPos,
        });
      }
      setShowControl(false);
    }
  }, [dragStarted]);

  const handleDragStart = useCallback(() => {
    setType(type);
    setDrawerHeight(scale[1]);
    if (type === Config.furnishing.type.drawer) setDrawerTopDistance(topShelfDistance);
    setDragStarted(true);
  }, [type, scale, topShelfDistance, xIndex, position]);

  const handleDrag = useCallback(
    (state) => {
      if (state.delta[0] === 0 && state.delta[1] === 0) return;
      document.body.style.cursor = "grabbing";

      setDragStarted(false);
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

        setShowMeasure(false);
      }
    },
    [spaceRef, ref, allfurnishing, scale, measureInfo, hanging, withFeet]
  );

  const handleDragEnd = useCallback(
    (state) => {
      setShowMeasure(false);
      setAssetDragging(false);
      setShowControl(false);
      if (state.values[0] === state.initial[0] && state.values[1] === state.initial[1]) return;

      // Calculate X-axis scale based on whether it's a `Drawer` or `InternalDrawer`
      const scaleX =
        type === "Drawer"
          ? elementsWidths[xIndex] - sideIncident * 2
          : elementsWidths[xIndex] - (panelSpace + panelWidth) * 2;

      // Revert the asset to its previous position in the wardrobe if there is no intersection or if the intersection is with `other`
      if (!intersects[0] || intersects[0]?.object.name === "other") {
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

      const payload = {
        index,
        newData: {
          xIndex: intersects[0].object.userData.xIndex,
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
    },
    [ref, scale, topShelfDistance, xIndex, position, furnishingAssets]
  );

  const bind = useGesture(
    { onDragStart: handleDragStart, onDrag: handleDrag, onDragEnd: handleDragEnd },
    { enabled: viewOption === Config.view.front }
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

  const onRemoveObject = useCallback((furnishIndex) => {
    removeAssetByIndex(furnishIndex);
    // setShowControl(false);
  }, []);

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

      if (drawerType !== Config.furnishing.drawer.type.customDrawer) {
        const scaleY =
          scale[1] +
          initialDrawerGroupScale[0] +
          0.475 +
          Config.furnishing.drawer.bottomShelfDistance +
          Config.furnishing.shelf.thickness1;
        const positionY = position[1] - scale[1] / 2 + scaleY / 2;

        if (initialDrawerGroupScale[0] < availableTop) {
          let tempDrawerGroupScale = initialDrawerGroupScale;
          tempDrawerGroupScale.push(initialDrawerGroupScale[0]);
          updateDrawer(scaleY, positionY, tempDrawerGroupScale);
        }
      } else {
        if (drawerHeightValue < availableTop) {
          const scaleY =
            topShelfDistance === undefined
              ? 0
              : 40 -
                topShelfDistance -
                Config.furnishing.drawer.bottomShelfDistance -
                2 * Config.furnishing.shelf.thickness1;

          const positionY = position[1] - scale[1] / 2 + scaleY / 2;
          customDrawer(scaleY, positionY);
        } else {
          const filteredAssets = furnishingAssets.filter((asset) => {
            return asset.xIndex === xIndex && asset.position[1] > position[1];
          });
          const sortAssets = filteredAssets.sort((a, b) => {
            return a.position[1] - b.position[1];
          });

          let available = topShelfDistance;
          if (sortAssets.length > 0) {
            available =
              sortAssets[0].position[1] -
              sortAssets[0].scale[1] / 2 -
              (position[1] + scale[1] / 2) -
              topShelfDistance -
              Config.furnishing.shelf.thickness1;
          } else {
            available = height - (position[1] + scale[1] / 2);
          }

          const scaleY =
            topShelfDistance === undefined
              ? 0
              : Number(drawerHeightValue) +
                available -
                topShelfDistance * 2 -
                Config.furnishing.drawer.bottomShelfDistance -
                3 * Config.furnishing.shelf.thickness1;

          const positionY = position[1] - scale[1] / 2 + scaleY / 2;
          customDrawer(scaleY, positionY);
        }
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

      if (initialDrawerGroupScale[0] < available) {
        const scaleY =
          initialDrawerGroupScale[0] +
          scale[1] +
          Config.furnishing.internalDrawer.topShelfDistance +
          Config.furnishing.internalDrawer.panelSpace;
        const positionY = position[1] - scale[1] / 2 + scaleY / 2;
        customDrawer(scaleY, positionY);
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
        args={[scale[0], 25]}
        position={[
          position[0],
          planPositionY == undefined ? position[1] : planPositionY,
          depth + 3.2,
        ]}
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
          if (showDimen) return;
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
            topVisible={true}
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
                position={[-scale[0] / 2 + 5, 4.5, depth + 3.21 - position[2]]}
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
                position={[scale[0] / 2 - 5, 4.5, depth + 3.21 - position[2]]}
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
                      style={{ width: `${scale[0] < 43 ? "30px" : "55px"}` }}
                      onClick={() => setShowDimensionControl(true)}
                      tabIndex={0}
                      onMouseOver={() => {
                        setShowDimen(true);
                      }}
                      onMouseLeave={() => {
                        setShowDimen(false);
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
