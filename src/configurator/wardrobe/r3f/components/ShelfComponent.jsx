import * as THREE from "three";
import Plate from "../common/Plate";
import { useThree } from "@react-three/fiber";
import Config from "../../../config";
import { RoundedBox } from "@react-three/drei";
import MeasureComponent from "./MeasureComponent";
import useDndStore from "../../zustand/dndStore";
import useCalcStore from "../../zustand/calcStore";
import useCornerStore from "../../zustand/cornerStore";
import { getDraggingInfo } from "../../utils/draggingInfo";
import useDimensionStore from "../../zustand/dimensionStore";
import useFurnishingStore from "../../zustand/furnishingStore";
import { getBottom, getTop } from "../../utils/availableSpace";
import { createUseGesture, dragAction, pinchAction } from "@use-gesture/react";
import { ControlButtons, PlaneComponent } from "../../../../components/controllButtons";
import React, { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { getAvailableSpace } from "../../utils/availableSpace";

let intersects = new Array(1);

const ShelfComponent = React.memo(function ShelfComponent({
  asset,
  spaceRef,
  allfurnishing,
  index,
  svId,
}) {
  const { xIndex, inDivider, d_xIndex, d_yPos, type, scale, position, isShowControl } = asset;
  const { size, camera, raycaster } = useThree();
  const ref = useRef();
  const minDis = Config.furnishing.shelf.minDistance;
  const pointer = useMemo(() => new THREE.Vector2(), []);
  const moveRef = useRef({ up: true, down: true });
  const stopRef = useRef({ top: null, bottom: null });

  const dragStateRef = useRef({
    initial: [0, 0],
    values: [0, 0],
    previousY: 0,
    goingUp: null,
    previousGoingUp: null,
  });
  const { shelf, foldBottom, glassBottom } = Config.furnishing.type;

  const { setType, assetDragging, setAssetDragging, setCurrentIndex } = useDndStore((state) => ({
    setType: state.setType,
    assetDragging: state.assetDragging,
    setAssetDragging: state.setAssetDragging,
    setCurrentIndex: state.setCurrentIndex,
  }));

  const { korpusType, height, depth, hanging, withFeet, width, baseType } = useDimensionStore(
    (state) => ({
      korpusType: state.korpusType,
      height: state.height,
      depth: state.depth,
      hanging: state.hanging,
      withFeet: state.withFeet,
      width: state.width,
      baseType: state.baseType,
    })
  );

  const { addAsset, setSelectionInfo, updateAsset, removeAssetByIndex } = useFurnishingStore(
    (state) => ({
      addAsset: state.addAsset,
      setSelectionInfo: state.setSelectionInfo,
      updateAsset: state.updateAsset,
      removeAssetByIndex: state.removeAssetByIndex,
    })
  );

  const { viewOption, setShowDimensions } = useCornerStore((state) => ({
    viewOption: state.viewOption,
    setShowDimensions: state.setShowDimensions,
  }));

  const { showMeasure, measureInfo, setShowMeasure, setMeasureInfo } = useCalcStore((state) => ({
    showMeasure: state.showMeasure,
    measureInfo: state.measureInfo,
    setShowMeasure: state.setShowMeasure,
    setMeasureInfo: state.setMeasureInfo,
  }));

  const elementsWidths = useDimensionStore.use.elementsWidths();
  const currentIndex = useDndStore.use.currentIndex();
  const drawerHeight = useDndStore.use.drawerHeight();
  const drawerTopDistance = useDndStore.use.drawerTopDistance();
  const doorAssets = useFurnishingStore.use.doorAssets();
  const furnishingAssets = useFurnishingStore.use.furnishingAssets();
  const selectionInfo = useFurnishingStore.use.selectionInfo();
  const korpusMaterial = useDimensionStore.use.korpusMaterial();
  const withOutFeet = useDimensionStore.use.withOutFeet();

  const [showControl, setShowControl] = useState(false);
  const positionsRef = useRef({});
  const addY = hanging || withFeet ? 25 : 0;
  const memoArray = [
    spaceRef,
    dragStateRef,
    ref,
    moveRef,
    allfurnishing,
    scale,
    measureInfo,
    hanging,
    withFeet,
    intersects,
    positionsRef,
  ];

  const handleDragStart = useCallback(() => {
    setType(type);
    setCurrentIndex(index);
    setShowDimensions(false);
    setSelectionInfo({
      xIndex,
      yPos: position[1],
      inDivider,
      d_xIndex,
      d_yPos,
    });
    setAssetDragging(true);
    setShowControl(false);
  }, [type]);

  const selectChildren = ({ currentY, currentSection, currentIndex, goingUp }) => {
    const all = [];
    const filtered = allfurnishing.current.children
      .filter((c, i) => {
        if (!c.children.length) return;
        const isInSameSection = c.userData.xIndex === currentSection;
        const isNotCurrent = i !== currentIndex;
        const y = c.children[1].position.y;
        const positionComparison = goingUp ? y > currentY : y < currentY;

        return isInSameSection && isNotCurrent && positionComparison;
      })
      .sort((a, b) => {
        const aY = a.children[1].position.y;
        const bY = b.children[1].position.y;
        return goingUp ? aY - bY : bY - aY;
      });

    for (let i = 0; i < filtered.length; i++) {
      const type = filtered[i].furnishType;
      if (type === "shelf") all.push(filtered[i]);
      else break;
    }

    return all;
  };

  const setDirection = (state) => {
    const initialY = state.initial[1];
    const currentY = state.values[1];

    if (dragStateRef.current.previousY === null) dragStateRef.current.previousY = initialY;

    dragStateRef.current.goingUp = currentY < dragStateRef.current.previousY;
    dragStateRef.current.previousGoingUp = dragStateRef.current.goingUp;
    dragStateRef.current.previousY = currentY;
    dragStateRef.current.values = state.values;
  };

  const updateRuler = (availableTop, availableBottom, result) => {
    const tempMeasureInfo = {
      posX: intersects[0].object.position.x,
      aboveTop: availableTop,
      aboveBottom: getBottom(result.posY - addY, scale[1], type, 0),
      belowTop: getTop(result.posY - addY, scale[1], type),
      belowBottom: availableBottom,
    };
    if (JSON.stringify(measureInfo) !== JSON.stringify(tempMeasureInfo))
      setMeasureInfo(tempMeasureInfo);
  };

  const updatePositionChild = ({ svId, position }) => {
    const { x, y, z } = position;
    const thisChildObj = allfurnishing.current.children.find((e) => e.userData.svId === svId);
    thisChildObj.children[1].position.set(x, y, z);
    positionsRef.current = {
      ...positionsRef.current,
      [svId]: { x, y, z },
    };
  };

  const updatePositionDragged = ({ position }) => {
    ref.current.position.set(position.x, position.y, position.z);
    const { top, bottom, topAsset, bottomAsset, availableTop, availableBottom, type } =
      intersects[0].object.userData;

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

    updateRuler(availableTop, availableBottom, result);
  };

  const checkPosition = ({ currentIndex, position }) => {
    const { x, y, z } = position;
    const { goingUp } = dragStateRef.current;
    let { top, bottom, xIndex } = intersects[0].object.userData;

    // top = top - addY;
    bottom = bottom - addY;

    if (intersects[0].object.name !== "available" && !intersects[0].object.userData.type) {
      const position = {
        x: intersects[0].point.x * 100 + width / 2,
        y: y,
        z: depth + depth / 2,
      };
      return updatePositionDragged({ position });
    } else if (intersects[0].object.name !== "available" && intersects[0].object.userData.type) {
      return;
    }

    const children = selectChildren({
      currentY: ref.current.position.y,
      currentSection: xIndex,
      currentIndex,
      goingUp,
      checkShelf: true,
    }); // depend on cursor,
    const stoppingDistance = children.length * (scale[1] + minDis);
    const stoppingPointDragged = goingUp
      ? top - stoppingDistance - addY
      : bottom + stoppingDistance;

    if (goingUp) stopRef.current.top = stoppingPointDragged;
    if (!goingUp) stopRef.current.bottom = stoppingPointDragged;

    const stop = goingUp ? y >= stopRef.current.top : y <= stopRef.current.bottom;

    if (stop) return;
    if (goingUp && stopRef.current.bottom && y <= stopRef.current.bottom) return;
    if (!goingUp && stopRef.current.top && y >= stopRef.current.top) return;

    if (y + 5 >= top - addY) {
      // end top
      return updatePositionDragged({ position: { x, y: top + scale[1] / 2 - addY, z } });
    } else if (y - 5 <= bottom) {
      // end bottom
      return updatePositionDragged({ position: { x, y: bottom + scale[1] / 2, z } });
    }

    updatePositionDragged({ position: { x, y, z } });

    if (!children) return updatePositionDragged({ position: { x, y, z } });

    children.forEach((child, index) => {
      const { svId } = child.userData;
      const thisChildY = child.children[1].position.y;
      const adjustment = (minDis + scale[1]) * (index + 1);
      const distance = goingUp ? thisChildY - y : y - thisChildY;
      const stoppingPoint = goingUp
        ? top -
          (children.length - index - 1) *
            (scale[1] + (index === children.length - 1 ? 0 : minDis)) -
          addY
        : bottom +
          (children.length - index - 1) * (scale[1] + (index === children.length - 1 ? 0 : minDis));

      if (distance > adjustment) return;

      const [X, , Z] = child.userData.position;

      const newY = goingUp ? y + adjustment : y - adjustment;
      if (goingUp && thisChildY < stoppingPoint) {
        updatePositionChild({ svId, position: { x: X, y: newY, z: Z } });
      } else if (!goingUp && thisChildY > stoppingPoint) {
        updatePositionChild({ svId, position: { x: X, y: newY, z: Z } });
      } else if (goingUp && thisChildY >= stoppingPoint) {
        updatePositionChild({ svId, position: { x: X, y: stoppingPoint, z: Z } });
      } else if (!goingUp && thisChildY <= stoppingPoint) {
        updatePositionChild({ svId, position: { x: X, y: stoppingPoint, z: Z } });
      }
    });
  };

  // Ensures showControl is false for assets other than the currently interacted asset
  useEffect(() => {
    if (assetDragging) {
      furnishingAssets.forEach((_, index) => {
        if (currentIndex !== index) setShowControl(false);
      });
    }
  }, [currentIndex]);

  const handleDrag = useCallback((state) => {
    if (state.delta[0] === 0 && state.delta[1] === 0) return;
    document.body.style.cursor = "grabbing";

    setDirection(state);
    setShowMeasure(true);

    pointer.x = ((state.values[0] - size.left) / size.width) * 2 - 1;
    pointer.y = -((state.values[1] - size.top) / size.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    intersects = raycaster.intersectObjects(spaceRef.children, true);

    if (!intersects[0]) return;

    const currentIndex = allfurnishing.current.children.findIndex((e) => e.userData.svId === svId);
    const cursor = intersects[0].point.y * 100 + height / 2 - addY;

    checkPosition({
      currentIndex,
      position: { x: intersects[0].object.position.x, y: cursor, z: position[2] },
    });

    if (
      scale[0] !== intersects[0].object.geometry.parameters.width &&
      intersects[0].object.name !== "other"
    ) {
      updateAsset({
        index,
        newData: { scale: [intersects[0].object.geometry.parameters.width, scale[1], scale[2]] },
      });
    }
  }, memoArray);

  const handleDragEnd = useCallback((state) => {
    if (state.values[0] === state.initial[0] && state.values[1] === state.initial[1]) return;

    Object.entries(positionsRef.current).forEach(([svId, position]) => {
      const refItem = allfurnishing.current.children.find((s) => s.userData.svId === svId);

      updateAsset({
        index: refItem.furnishIndex,
        newData: {
          position: [position.x, position.y, position.z],
        },
      });
    });

    // If the asset intersects with the "other" object (indicating it's outside the wardrobe),
    // Then, update the asset's position to its previous position with a very tiny , negligible offset
    // to the Y-axis to trigger action and move it back.
    if (intersects[0]?.object.name === "other") {
      setAssetDragging(false);
      positionsRef.current = {};
      setCurrentIndex(null);

      return updateAsset({
        index,
        newData: {
          position: [position[0], position[1] + 0.0000000000001, position[2]],
          // Update the asset's scale along the x-axis based on the width of the wardrobe section (xIndex).
          // elementsWidths is an array that stores the width of each wardrobe section(xIndex).
          scale: [elementsWidths[xIndex], scale[1], scale[2]],
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

    document.body.style.cursor = "pointer";
    setShowMeasure(false);
    updateAsset(payload);
    //setShowControl(true);
    setAssetDragging(false);
    positionsRef.current = {};
    setCurrentIndex(null);
  }, memoArray);

  const useGesture = createUseGesture([dragAction, pinchAction]);

  const bind = useGesture(
    {
      onDragStart: handleDragStart,
      onDrag: handleDrag,
      onDragEnd: handleDragEnd,
    },

    {
      enabled: viewOption === Config.view.front,
      drag: { threshold: 5 },
    }
  );

  const handlePointerOver = useCallback(() => {
    document.body.style.cursor = "pointer";
  }, []);

  const handlePointerOut = useCallback(() => {
    document.body.style.cursor = "auto";
  }, []);

  const onRemoveObject = useCallback((furnishIndex) => {
    removeAssetByIndex(furnishIndex);
    setShowControl(false);
  }, []);

  /* 1. Filters all children in `allfurnishing.current.children` to locate elements that:
   *    - Are in the same `xIndex` (wardrobe section) as specified by `index parameter`.
   *    - Have their `y` position (vertical position) overlapping the area defined by `top` and `bottom`,
   *      adjusted by the element's height (`scale[1]`).
   * 2. Loops over the filtered children to collect only those elements of type "shelf".
   *    - Stops collecting if an element of a different type is encountered (ensures only continuous shelves are selected).
   */
  const selectChildrenInSpace = ({ top, bottom, index }) => {
    const all = [];

    // Filter for elements within the given section and vertical range
    const filtered = allfurnishing.current.children.filter((c, i) => {
      // checks if it's in same xIndex to the one compared to
      const isInSameSection = c.userData.xIndex === index;
      const y = c.children[1].position.y;
      // Checks if the 'y' vertical position is within the specified top and bottom bounds.
      const positionComparison = y - scale[1] < top && y + scale[1] > bottom;
      return isInSameSection && positionComparison;
    });

    // Collect only continuous "shelf" elements
    for (let i = 0; i < filtered.length; i++) {
      const type = filtered[i].furnishType;
      if (type === "shelf") all.push(filtered[i]);
      else break; // Stop if a non-shelf element is encountered
    }

    return all;
  };

  const onPlusMap = useCallback(() => {
    const { xIndex, position } = ref.current.userData;

    const space = getAvailableSpace({
      elementsWidths,
      baseType,
      height,
      depth,
      type,
      drawerHeight,
      drawerTopDistance,
      furnishingAssets,
      doorAssets,
      assetDragging: true,
      selectionInfo,
      korpusMaterial,
      hanging,
      withFeet,
      withOutFeet,
      currentIndex,
    });

    const filtered = space.filter(
      (s) =>
        s.xIndex == xIndex && position[1] - scale[1] <= s.top && position[1] + scale[1] >= s.bottom
    );

    // get all shelves inside the selected space
    const children = selectChildrenInSpace({
      top: filtered[0].top,
      bottom: filtered[0].bottom,
      index: xIndex,
    });

    // lets first divide the available space by the children.length + 1
    const interval =
      (filtered[0].top + minDis - (filtered[0].bottom - minDis)) / (children.length + 2); // we are not including the height (scale[1])

    if (interval <= minDis) return;

    // position all shelves as per interval and add new shelf at last
    children.forEach((child, i) => {
      const [x, , z] = child.children[1].position;
      const newY = filtered[0].bottom - minDis + (i + 1) * interval;
      const thisIndex = allfurnishing.current.children.findIndex(
        (e) => e.userData.svId === child.userData.svId
      );

      updateAsset({
        index: thisIndex,
        newData: {
          position: [x, newY, z],
        },
      });
    });

    // add last child at last position
    addAsset({
      asset: {
        xIndex: children[0].userData.xIndex,
        inDivider: children[0].userData.inDivider,
        d_xIndex: children[0].userData.d_xIndex,
        d_yPos: children[0].userData.d_yPos,
        position: [
          children[0].userData.position[0],
          filtered[0].bottom - minDis + (children.length + 1) * interval,
          children[0].userData.position[2],
        ],
        scale: scale,
        type,
        isShowControl: true,
      },
    });

    setShowControl(false);
  }, memoArray);

  return (
    <group
      furnishType="shelf"
      furnishIndex={index}
      userData={{
        xIndex,
        inDivider,
        d_xIndex,
        d_yPos,
        type,
        scale,
        position,
        isShowControl,
        svId,
      }}
    >
      <PlaneComponent
        assetDragging={assetDragging}
        setShowControl={setShowControl}
        scale={scale}
        planPositionX={position[0]}
        planPositionY={position[1]}
        position={position}
        type={type}
        korpusType={korpusType}
        depth={depth}
      />
      <group
        {...bind()}
        ref={ref}
        position={position}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        userData={{
          xIndex,
          inDivider,
          d_xIndex,
          d_yPos,
          type,
          scale,
          position,
          isShowControl,
          svId,
        }}
      >
        {(type === shelf || type === foldBottom) && (
          <Plate
            args={scale}
            type={Config.plate.type.floor}
            korpShelf={type}
            category={Config.color.category.body}
          />
        )}
        {type === glassBottom && (
          <RoundedBox castShadow args={scale} material={Config.furnishing.glassBottom.material} />
        )}
        <ControlButtons
          furnishIndex={index}
          showControl={showControl}
          onRemoveObject={onRemoveObject}
          onPlusMap={onPlusMap}
          setSelectionInfo={setSelectionInfo}
          setType={setType}
          xIndex={xIndex}
          position={position}
          inDivider={inDivider}
          d_xIndex={d_xIndex}
          d_yPos={d_yPos}
          depth={depth}
          scale={scale}
          type={type}
          korpusType={korpusType}
        />
      </group>
      <MeasureComponent measureInfo={measureInfo} showMeasure={showMeasure} depth={depth} />
    </group>
  );
});

export default ShelfComponent;
