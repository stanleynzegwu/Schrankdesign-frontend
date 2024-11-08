/* eslint-disable react/no-unknown-property */
import { Plane, RoundedBox } from "@react-three/drei";
import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
// import { Select } from "@react-three/postprocessing"
import { useLoader, useThree } from "@react-three/fiber";
import { createUseGesture, dragAction, pinchAction } from "@use-gesture/react";
import * as THREE from "three";

import Config from "../../../config";
import { getDraggingInfo } from "../../utils/draggingInfo";
import { getBottom, getTop } from "../../utils/availableSpace";
import MeasureComponent from "./MeasureComponent";

import useDndStore from "../../zustand/dndStore";
import useDimensionStore from "../../zustand/dimensionStore";
import useCornerStore from "../../zustand/cornerStore";
import useFurnishingStore from "../../zustand/furnishingStore";
import Plate from "../common/Plate";

let intersects = new Array(1);

const findClosestElement = (array, target) => {
  let closestElement = array[0]; // Assume the first element is closest initially
  let minDifference = Math.abs(target - array[0]); // Initialize with the difference of the first element

  for (let i = 1; i < array.length; i++) {
    const difference = Math.abs(target - array[i]);

    if (difference < minDifference) {
      minDifference = difference;
      closestElement = array[i];
    }
  }

  return closestElement;
};

const ShelfComponent = React.memo(function ShelfComponent({
  xIndex,
  inDivider,
  d_xIndex,
  d_yPos,
  type,
  initialScale,
  position,
  spaceRef,
  isShowControl,
  allfurnishing,
}) {
  const { size, camera, raycaster } = useThree();

  const setType = useDndStore.use.setType();

  const [scale, setScale] = useState(initialScale);

  const [planPositionX, setPlanPositionX] = useState();
  const [planPositionY, setPlanPositionY] = useState();

  const korpusType = useDimensionStore.use.korpusType()

  // update scale based on initial scale change
  useEffect(() => {
    setScale(initialScale);
    // setShowControl(!isShowControl);
    setShowControl(false)
  }, [initialScale]);

  const pointer = useMemo(() => new THREE.Vector2(), []);

  const ref = useRef();
  const viewOption = useCornerStore.use.viewOption();
  const setShowDimensions = useCornerStore.use.setShowDimensions();

  const height = useDimensionStore.use.height();
  const depth = useDimensionStore.use.depth();
  const width = useDimensionStore.use.width();

  const addAsset = useFurnishingStore.use.addAsset();
  const removeAsset = useFurnishingStore.use.removeAsset();
  const setSelectionInfo = useFurnishingStore.use.setSelectionInfo();
  const updateAssetsInSpace = useFurnishingStore.use.updateAssetsInSpace();

  const hanging = useDimensionStore.use.hanging();
  const withFeet = useDimensionStore.use.withFeet();

  const assetDragging = useDndStore.use.assetDragging();
  const setAssetDragging = useDndStore.use.setAssetDragging();

  const totalSpace = useFurnishingStore.use.totalSpace();

  const [dragStarted, setDragStarted] = useState(true);

  const [showControl, setShowControl] = useState(!!isShowControl);

  const [moveTriger, setMoveTriger] = useState(true);

  const [moveFlag, setMoveFlag] = useState();

  // show or hide measurement
  // show measure while dragging assets
  const [showMeasure, setShowMeasure] = useState(false);
  const [measureInfo, setMeasureInfo] = useState({
    posX: 0,
    aboveTop: 0,
    aboveBottom: 0,
    belowTop: 0,
    belowBottom: 0,
  });

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
      setShowControl(false);
    }
  }, [dragStarted]);

  const getMinDistance = (array, movePosY, targetPosY, unitDis) => {
    const filteredArray = array.filter(
      (e) =>
        (e.userData?.position &&
          e.children[1]?.position.y > movePosY &&
          e.children[1]?.position.y < targetPosY) ||
        (e.children[1]?.position.y < movePosY &&
          e.children[1]?.position.y > targetPosY)
    );
    const count = filteredArray.length;
    const minDis = unitDis * (count + 1);
    return minDis;
  };

  const pushAssetsInSpace = (payload) => {
    const { topYPos, bottomYPos, movePosY, currentIndex, flagPosition } =
      payload;

    const filterCondition = (item) =>
      !inDivider
        ? !item.inDivider &&
          item.xIndex === xIndex &&
          item.position[1] >= bottomYPos &&
          item.position[1] <= topYPos
        : item.inDivider &&
          item.d_xIndex === d_xIndex &&
          item.d_yPos === d_yPos &&
          item.xIndex === xIndex &&
          item.position[1] >= bottomYPos &&
          item.position[1] <= topYPos;

    allfurnishing.current.children.map((e, index) => {
      if (
        e.userData &&
        filterCondition &&
        index !== currentIndex &&
        flagPosition === e.children[1]?.position.x
      ) {
        const minDis = getMinDistance(
          allfurnishing.current.children,
          movePosY,
          e.children[1]?.position.y,
          19
        );
        if (Math.abs(e.children[1]?.position.y - movePosY) < minDis) {
          if (e.children[1]?.position.y > movePosY) {
            e.children[1]?.position.set(
              e.children[1].position.x,
              movePosY + minDis,
              e.children[1].position.z
            );

            if (index === currentIndex - 1 || index === currentIndex + 1) {
              setMoveFlag(movePosY + minDis);
            }
          } else {
            e.children[1].position.set(
              e.children[1].position.x,
              movePosY - minDis,
              e.children[1].position.z
            );
            if (index === currentIndex - 1 || index === currentIndex + 1) {
              setMoveFlag(movePosY - minDis);
            }
          }
        }
      }
    });
  };

  const handleDragStart = useCallback(() => {
    setType(type);
    setDragStarted(true);
  }, [type]);

  const handleDrag = useCallback(
    (state) => {
      if (moveTriger) {
        if (state.elapsedTime < 100) return;

        if (state.delta[0] === 0 && state.delta[1] === 0) return;

        setDragStarted(false);

        pointer.x = ((state.values[0] - size.left) / size.width) * 2 - 1;
        pointer.y = -((state.values[1] - size.top) / size.height) * 2 + 1;

        raycaster.setFromCamera(pointer, camera);

        intersects = raycaster.intersectObjects(spaceRef.children, true);

        if (intersects[0] !== undefined) {
          if (intersects[0].object.name === "available") {
            const {
              top,
              bottom,
              topAsset,
              bottomAsset,
              availableTop,
              availableBottom,
            } = intersects[0].object.userData;

            const result = getDraggingInfo({
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
            ref.current?.position.set(
              intersects[0].object.position.x,
              hanging || withFeet ? result.posY-25 : result.posY,
              position[2]
            );

            if (
              scale[0] !== result.objectWidth ||
              scale[1] !== initialScale[1] ||
              scale[2] !== initialScale[2]
            ) {
              setScale([result.objectWidth, initialScale[1], initialScale[2]]);
            }

            setShowMeasure(true);
            const tempMeasureInfo = {
              posX: intersects[0].object.position.x,
              aboveTop: availableTop,
              aboveBottom: getBottom(
                hanging || withFeet ? result.posY-25 : result.posY, 
                scale[1], type, 0
              ),
              belowTop: getTop(
                hanging || withFeet ? result.posY-25 : result.posY, 
                scale[1], type
              ),
              belowBottom: availableBottom,
            };

            if (
              JSON.stringify(measureInfo) !== JSON.stringify(tempMeasureInfo)
            ) {
              setMeasureInfo(tempMeasureInfo);
            }

            if (
              allfurnishing.current &&
              allfurnishing.current.children.length > 1
            ) {
              const currentIndex = allfurnishing.current.children.findIndex(
                (e) =>
                  e.userData &&
                  e.userData.position &&
                  e.userData.position[1] === position[1]
              );

              const { nearestTop, nearestBottom } = getSpaceLimit();
              const movePosY = ref.current?.position.y;
              const flagPosition = ref.current?.position.x;
              const topMinDis = getMinDistance(
                allfurnishing.current.children,
                movePosY,
                nearestTop,
                19
              );
              const bottomMinDis = getMinDistance(
                allfurnishing.current.children,
                movePosY,
                nearestBottom,
                19
              );
              if (
                nearestTop - movePosY >= topMinDis - 19 &&
                movePosY - nearestBottom >= bottomMinDis - 19
              ) {
                pushAssetsInSpace({
                  topYPos: nearestTop,
                  bottomYPos: nearestBottom,
                  movePosY,
                  currentIndex,
                  flagPosition: flagPosition,
                });
                setMoveTriger(true);
              } else {
                setMoveTriger(false);
              }
            }
          } else {
            ref.current?.position.set(
              intersects[0].point.x * 100 + width / 2,
              intersects[0].point.y * 100 + height / 2,
              depth + depth / 2
            );

            setShowMeasure(false);
          }
        }
      } else {
        pointer.x = ((state.values[0] - size.left) / size.width) * 2 - 1;
        pointer.y = -((state.values[1] - size.top) / size.height) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);

        intersects = raycaster.intersectObjects(spaceRef.children, true);
        if (intersects[0] !== undefined) {
          if (intersects[0].object.name === "available") {
            const {
              top,
              bottom,
              topAsset,
              bottomAsset,
              // availableTop,
              // availableBottom,
            } = intersects[0].object.userData;

            const result = getDraggingInfo({
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

            if (
              (ref.current.position.y >= result.posY &&
                ref.current.position.y < moveFlag) ||
              (ref.current.position.y <= result.posY &&
                ref.current.position.y > moveFlag)
            ) {
              setMoveTriger(true);
            }
          }
        }
      }
    },
    [ref, spaceRef, measureInfo, allfurnishing, moveTriger, hanging, withFeet]
    // [ref, scale, initialScale, spaceRef, dragStarted, showMeasure]
  );

  const handleDragEnd = useCallback(
    (state) => {
      setPlanPositionX(ref.current.position.x);
      setPlanPositionY(ref.current.position.y);
      setShowControl(false);
      if (
        state.values[0] === state.initial[0] &&
        state.values[1] === state.initial[1]
      ) {
        return;
      }

      setMoveTriger(true);
      setShowMeasure(false);
      if (intersects[0].object.name === "available") {
        const payload = {};

        payload.removal = {
          xIndex,
          yPos: position[1],
          inDivider,
          d_xIndex,
          d_yPos,
        };

        payload.asset = {
          xIndex: intersects[0].object.userData.xIndex,
          inDivider: intersects[0].object.userData.inDivider,
          d_xIndex: intersects[0].object.userData.d_xIndex,
          d_yPos: intersects[0].object.userData.d_yPos,
          position: [
            ref.current.position.x,
            ref.current.position.y,
            ref.current.position.z,
          ],
          scale: scale,
          type,
          isShowControl: true,
        };

        addAsset(payload);
        setShowControl(true);
      } else {
        removeAsset({ xIndex, yPos: position[1] });
      }

      setAssetDragging(false);
    },
    [ref, scale, xIndex, position]
  );

  const useGesture = createUseGesture([dragAction, pinchAction]);

  const bind = useGesture(
    {
      onDragStart: handleDragStart,
      onDrag: handleDrag,
      onDragEnd: handleDragEnd,
    },
    { enabled: viewOption === Config.view.front }
  );

  const handlePointerOver = useCallback(() => {
    document.body.style.cursor = "pointer";
    setPlanPositionX(ref.current.position.x);
    setPlanPositionY(ref.current.position.y);
  }, []);

  const handlePointerOut = useCallback(() => {
    document.body.style.cursor = "auto";
  }, []);

  const getSpaceLimit = useCallback(() => {
    const topSpaces = totalSpace.filter((e) =>
      !e.inDivider
        ? e.d_xIndex === d_xIndex &&
          e.xIndex === xIndex &&
          e.top + scale[1] >= position[1]
        : e.d_xIndex === d_xIndex &&
          e.d_yPos === d_yPos &&
          e.xIndex === xIndex &&
          e.top + scale[1] >= position[1]
    );
    const bottomSpaces = totalSpace.filter((e) =>
      !e.inDivider
        ? e.d_xIndex === d_xIndex &&
          e.xIndex === xIndex &&
          e.bottom <= position[1]
        : e.d_xIndex === d_xIndex &&
          e.d_yPos === d_yPos &&
          e.xIndex === xIndex &&
          e.bottom <= position[1]
    );

    const otherTopSpaces = topSpaces.filter((e) => e.topAsset !== type);
    const otherBottomSpaces = bottomSpaces.filter(
      (e) => e.bottomAsset !== type
    );

    const topValues = [];
    const botValues = [];
    otherTopSpaces.forEach((e) => {
      topValues.push(e.top);
    });

    otherBottomSpaces.forEach((e) => {
      botValues.push(e.bottom);
    });

    const nearestTop = findClosestElement(topValues, position[1]);

    const nearestBottom = findClosestElement(botValues, position[1]);

    return { topValues, botValues, nearestTop, nearestBottom };
  }, [totalSpace, xIndex, d_xIndex, scale]);

  const onRemoveObject = useCallback(() => {
    removeAsset({ xIndex, yPos: position[1] });
  }, [xIndex, position, inDivider]);

  const getSpaceLimitForAdd = useCallback(() => {
    const topSpaces = totalSpace.filter((e) =>
      !e.inDivider
        ? e.d_xIndex === d_xIndex &&
          e.xIndex === xIndex &&
          e.availableTop + scale[1] >= position[1]
        : e.d_xIndex === d_xIndex &&
          e.d_yPos === d_yPos &&
          e.xIndex === xIndex &&
          e.availableTop + scale[1] >= position[1]
    );
    const bottomSpaces = totalSpace.filter((e) =>
      !e.inDivider
        ? e.d_xIndex === d_xIndex &&
          e.xIndex === xIndex &&
          e.availableBottom <= position[1]
        : e.d_xIndex === d_xIndex &&
          e.d_yPos === d_yPos &&
          e.xIndex === xIndex &&
          e.availableBottom <= position[1]
    );

    const otherTopSpaces = topSpaces.filter((e) => e.topAsset !== type);
    const otherBottomSpaces = bottomSpaces.filter(
      (e) => e.bottomAsset !== type
    );

    const topValues = [];
    const botValues = [];
    otherTopSpaces.forEach((e) => {
      topValues.push(e.availableTop);
    });

    otherBottomSpaces.forEach((e) => {
      botValues.push(e.availableBottom);
    });

    const nearestTop = findClosestElement(topValues, position[1]);

    const nearestBottom = findClosestElement(botValues, position[1]);

    return { topValues, botValues, nearestTop, nearestBottom };
  }, [totalSpace, xIndex, d_xIndex, scale]);

  const onPlusMap = useCallback(() => {
    const { topValues, botValues, nearestTop, nearestBottom } =
      getSpaceLimitForAdd();
    if (topValues.length !== 0 && botValues.length !== 0) {
      const newYpos = updateAssetsInSpace({
        topYPos: nearestTop,
        bottomYPos: nearestBottom,
        xIndex,
        inDivider,
        d_xIndex,
        d_yPos,
      });

      const payload = {};

      payload.asset = {
        xIndex,
        yPos: position[1],
        inDivider,
        d_xIndex,
        d_yPos,
        position: [ref.current.position.x, newYpos, ref.current.position.z],
        scale: scale,
        type,
        isShowControl: false,
      };
      addAsset(payload);
      setShowControl(false);
    }
  }, [totalSpace, xIndex, inDivider, d_xIndex, d_yPos, scale, ref]);

  const [trashMap, arrowUpDownMap, plusMap] = useLoader(THREE.TextureLoader, [
    "/images/furnishing/doors/trash_blue.png",
    "/images/configurator/icons/arrow_up_down.png",
    "/images/configurator/icons/plus.png",
  ]);

  return (
    <group
      userData={{
        xIndex,
        inDivider,
        d_xIndex,
        d_yPos,
        type,
        initialScale,
        position,
        isShowControl,
      }}

      // ref={ref}
    >
      <Plane
        onPointerOver={(e) => {
          e.stopPropagation();
          
          if (assetDragging) return;

          setShowControl(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();

          if (assetDragging) return;

          setShowControl(false);
        }}
        args={[scale[0], 16]}
        position={[
          planPositionX === undefined ? position[0] : planPositionX,
          planPositionY === undefined ? position[1] + 2 : planPositionY + 2,
          type === Config.furnishing.type.foldBottom && korpusType === Config.korpusType.innerShap2
          ? depth + 2.1 : depth + 0.2,
        ]}
        rotateX={Math.PI / 2}
        visible={false}
      />
      <group
        {...bind()}
        ref={ref}
        // eslint-disable-next-line react/no-unknown-property
        position={position}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {(type === Config.furnishing.type.shelf ||
          type === Config.furnishing.type.foldBottom) && (
          <Plate args={scale} type={Config.plate.type.floor} korpShelf={type} 
            category={Config.color.category.body}
          />
        )}
        {type === Config.furnishing.type.glassBottom && (
          <RoundedBox
            castShadow
            args={scale}
            material={Config.furnishing.glassBottom.material}
          />
        )}
        <group visible={!assetDragging && showControl && isShowControl}>
          <mesh
            onPointerOver={() => {
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              document.body.style.cursor = "auto";
            }}
            position={[0, 0,
              type === Config.furnishing.type.foldBottom && korpusType === Config.korpusType.innerShap2
              ? depth + 2.11 - position[2]: depth + 0.21 - position[2]]}
          >
            <circleGeometry args={[6]} />
            <meshBasicMaterial map={arrowUpDownMap} />
          </mesh>
          <mesh
            onPointerOver={() => {
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              document.body.style.cursor = "auto";
            }}
            onClick={() => onRemoveObject()}
            position={[-scale[0] / 2 + 6, 6, 
              type === Config.furnishing.type.foldBottom && korpusType === Config.korpusType.innerShap2
              ? depth + 2.11 - position[2]: depth + 0.21 - position[2]]}
          >
            <circleGeometry args={[5]} />
            <meshBasicMaterial map={trashMap} />
          </mesh>
          <mesh
            onPointerOver={() => {
              document.body.style.cursor = "pointer";
              setSelectionInfo({
                xIndex,
                yPos: position[1],
                inDivider,
                d_xIndex,
                d_yPos,
              });
              setType(type);
            }}
            onPointerOut={() => {
              document.body.style.cursor = "auto";
            }}
            onClick={() => onPlusMap()}
            position={[scale[0] / 2 - 6, 6,
              type === Config.furnishing.type.foldBottom && korpusType === Config.korpusType.innerShap2
              ? depth + 2.11 - position[2]: depth + 0.21 - position[2]]}
          >
            <circleGeometry args={[5]} />
            <meshBasicMaterial map={plusMap} />
          </mesh>
        </group>
      </group>
      <MeasureComponent
        measureInfo={measureInfo}
        showMeasure={showMeasure}
        depth={depth}
      />
    </group>
  );
});

export default ShelfComponent;
