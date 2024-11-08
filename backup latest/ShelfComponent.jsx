import * as THREE from "three";
import Plate from "../common/Plate";
import { useThree } from "@react-three/fiber";
import Config from "@src/configurator/config";
import { RoundedBox } from "@react-three/drei";
import MeasureComponent from "./MeasureComponent";
import useDndStore from "@wardrobe/zustand/dndStore";
import useCalcStore from "@wardrobe/zustand/calcStore";
import useCornerStore from "@wardrobe/zustand/cornerStore";
import { getDraggingInfo } from "@wardrobe/utils/draggingInfo";
import useDimensionStore from "@wardrobe/zustand/dimensionStore";
import useFurnishingStore from "@wardrobe/zustand/furnishingStore";
import { getBottom, getTop } from "@wardrobe/utils/availableSpace";
import { createUseGesture, dragAction, pinchAction } from "@use-gesture/react";
import { ControlButtons, PlaneComponent } from "@src/components/controllButtons";

import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";

let intersects = new Array(1);

const findClosestElement = (array, target) => {
  let closestElement = array[0];
  let minDifference = Math.abs(target - array[0]);

  for (let i = 1; i < array.length; i++) {
    const difference = Math.abs(target - array[i]);
    if (difference < minDifference) {
      minDifference = difference;
      closestElement = array[i];
    }
  }
  return closestElement;
};

const ShelfComponent = React.memo(function ShelfComponent({ asset, spaceRef, allfurnishing, index, svId }) {

  const { xIndex, inDivider, d_xIndex, d_yPos, type, scale, position, isShowControl } = asset;
  const { size, camera, raycaster } = useThree();
  const ref = useRef();
  const minDis = Config.furnishing.shelf.minDistance; // minimal distance of shelves
  const pointer = useMemo(() => new THREE.Vector2(), []);
  const moveRef = useRef({
    up: true,
    down: true,
    pushUp: true,
    pushDown: true
  })

  const pushChildRef = useRef(0);

  const dragStateRef = useRef({
    initial: [0, 0],
    values: [0, 0],
    previousY: 0,
    goingUp: null,
    previousGoingUp: null
  });

  // useEffect(()=>{
  //   allfurnishing.current.children.forEach((child) => {
      
  //     if (child.userData.redLine) {
  //       child.remove(child.userData.redLine); 
  //       child.userData.redLine.geometry.dispose(); // Clean up the geometry
  //       child.userData.redLine.material.dispose(); // Clean up the material
  //       delete child.userData.redLine;
  //     }

  //     const { position } = child.children[1];
  //     const points = [];
  //     points.push(new THREE.Vector3(position.x - 50, position.y, position.z + 29)); // Starting point
  //     points.push(new THREE.Vector3(position.x + 50, position.y, position.z + 29)); // Adjusted end point
  //     const geometry = new THREE.BufferGeometry().setFromPoints(points);
  //     const material = new THREE.LineBasicMaterial({ color: 0xff0000 }); // Red line
  //     const line = new THREE.Line(geometry, material);
  //     child.add(line);
  //     child.userData.redLine = line;
  //   });
  // }, [allfurnishing])

  const {shelf, foldBottom, glassBottom} = Config.furnishing.type;
  const shelfTypes = [shelf, foldBottom, glassBottom];

  const { setType, assetDragging, setAssetDragging, setCurrentIndex } = useDndStore((state) => ({
    setType: state.setType,
    assetDragging: state.assetDragging,
    setAssetDragging: state.setAssetDragging,
    setCurrentIndex: state.setCurrentIndex
  }));

  const { korpusType, height, depth, hanging, withFeet, width, baseType } = useDimensionStore((state) => ({
    korpusType: state.korpusType,
    height: state.height,
    depth: state.depth,
    hanging: state.hanging,
    withFeet: state.withFeet,
    width: state.width,
    baseType: state.baseType
  }));
  
  const { addAsset, setSelectionInfo, updateAssetsInSpace, totalSpace, updateAsset, removeAssetByIndex } = useFurnishingStore((state) => ({
    addAsset: state.addAsset,
    setSelectionInfo: state.setSelectionInfo,
    updateAssetsInSpace: state.updateAssetsInSpace,
    totalSpace: state.totalSpace,
    updateAsset: state.updateAsset,
    removeAssetByIndex: state.removeAssetByIndex
  }));
  
  const { viewOption, setShowDimensions } = useCornerStore((state) => ({
    viewOption: state.viewOption,
    setShowDimensions: state.setShowDimensions,
  }));

  const { showMeasure, measureInfo, setShowMeasure, setMeasureInfo } = useCalcStore((state) => ({
    showMeasure: state.showMeasure,
    measureInfo: state.measureInfo,
    setShowMeasure: state.setShowMeasure,
    setMeasureInfo: state.setMeasureInfo
  }));

  const [showControl, setShowControl] = useState(false);
  const positionsRef = useRef({});
  const addY = hanging || withFeet ? 25 : 0;

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

  const selectChildren = ({currentY, currentSection, currentIndex, goingUp}) => {
    const all = [];
    const filtered = allfurnishing.current.children.filter((c, i) => {
      if (!c.children.length) return;
      const isInSameSection = c.userData.xIndex === currentSection;
      const isNotCurrent = i !== currentIndex;
      const y = c.children[1].position.y;
      const positionComparison = goingUp ? y > currentY : y < currentY;
  
      return isInSameSection && isNotCurrent && positionComparison;
    }).sort((a, b) => {
      const aY = a.children[1].position.y;
      const bY = b.children[1].position.y;
      return goingUp ? aY - bY : bY - aY;
    });

    for (let i = 0; i < filtered.length; i++) {
      const type = filtered[i].furnishType;
      if (type === 'shelf') all.push(filtered[i]);
      else break;
    }

    return all;
  }

  const setDirection = (state) => {
    const initialY = state.initial[1];
    const currentY = state.values[1];
  
    if (dragStateRef.current.previousY === null) dragStateRef.current.previousY = initialY;

    dragStateRef.current.goingUp = currentY < dragStateRef.current.previousY;
  
    if (dragStateRef.current.previousGoingUp !== null && dragStateRef.current.goingUp !== dragStateRef.current.previousGoingUp) {
      // handle change in direction
    }

    dragStateRef.current.previousGoingUp = dragStateRef.current.goingUp;
    dragStateRef.current.previousY = currentY;
    dragStateRef.current.values = state.values;
  };

  const updateRuler = (availableTop, availableBottom, result) => {
    const tempMeasureInfo = {
      posX: intersects[0].object.position.x,
      aboveTop: availableTop,
      aboveBottom: getBottom(
        result.posY - addY, 
        scale[1], 
        type, 0
      ),
      belowTop: getTop(
        result.posY - addY, 
        scale[1], 
        type
      ),
      belowBottom: availableBottom,
    };
    if (JSON.stringify(measureInfo) !== JSON.stringify(tempMeasureInfo)) setMeasureInfo(tempMeasureInfo);
  }

  const updatePosition = (svId, newY, thisChild) => {
    positionsRef.current = {
      ...positionsRef.current,
      [svId]: {
        x: thisChild.userData.position[0],
        y: newY,
        z: thisChild.userData.position[2]
      }
    };
  };

  const checkIfHit = ({ allChildren, goingUp }) => {
    const flippedArray = [...allChildren].reverse();
    const top = intersects[0].object.userData.top;
    const bottom = intersects[0].object.userData.bottom;

    const stopArray = flippedArray.map((child, index) => {
      const childY = child.children[1].position.y;
      const extra = child.children[1].userData.scale[1];
      const newY = goingUp 
        ? index === 0 ? childY : childY + extra + (index * 14)
        : index === 0 ? childY : childY - extra - (index * 14);

      if (goingUp) return parseInt(top) <= parseInt(newY);
      else return parseInt(bottom) >= parseInt(newY);
    });
  
    return stopArray; // Array indicating which children should stop
  };

  const pushInSpace = ({ currentY, currentSection, currentIndex }) => {
    const goingUp = dragStateRef.current.goingUp;
    const allChildren = selectChildren({ currentY, currentSection, currentIndex, goingUp });

    if (!allChildren.length) return;

    const stopArray = checkIfHit({ allChildren, goingUp });

    allChildren.forEach((child, index) => {
      const {svId, scale} = child.userData;
      const thisChildObj = allfurnishing.current.children.find(e => e.userData.svId === svId);
      const thisChildY = child.children[1].position.y;
      if (index === 0) pushChildRef.current = parseInt(child.children[1].position.y);
      const adjustment = ((minDis + scale[1]) * (index + 1));
      const distance = goingUp ? thisChildY - currentY : currentY - thisChildY;

      if (Math.abs(distance) <= adjustment && !stopArray[index]) {
        const newY = goingUp ? currentY + adjustment : currentY - adjustment;
        updatePosition(svId, newY, child)
        thisChildObj.children[1].position.set(
          child.userData.position[0],
          newY,
          child.userData.position[2]
        );
      }
    });
    moveRef.current.pushUp = !stopArray.every(Boolean);
    moveRef.current.pushDown = !stopArray.every(Boolean);
  };


  //  // make sure we not hit the top/bottom of product
  //  const maxTop = top - scale[1] - minDis;
  //  const maxBottom = bottom + scale[1] + minDis;

  //  // now if within 5 cm of the max top/bottom set to max and stop moving

  //  if (y >= maxTop) { // end top
  //    return updatePositionDragged({x, y: maxTop, z});
  //  } else if (y <= maxBottom) { // end bottom
  //    return updatePositionDragged({x, y: maxBottom, z});
  //  };

  const handleDrag = useCallback((state) => {
    if (state.delta[0] === 0 && state.delta[1] === 0) return;
    document.body.style.cursor = "grabbing";

    setDirection(state);
    setShowMeasure(true);

    const {goingUp} = dragStateRef.current;
    const {up, down, pushUp, pushDown} = moveRef.current;

    pointer.x = ((state.values[0] - size.left) / size.width) * 2 - 1;
    pointer.y = -((state.values[1] - size.top) / size.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    intersects = raycaster.intersectObjects(spaceRef.children, true);

    const elementsTop = height - Config.plate.thickness
    const elementsBottom = (baseType == Config.baseType.panel
      ? Config.plate.plinthHeight
      : Config.glider.height) + Config.plate.thickness;

    if (!intersects[0]) return;

    const currentIndex = allfurnishing.current.children.findIndex(e => e.userData.svId === svId);

    // 

    const {
      top,
      bottom,
      topAsset,
      bottomAsset,
      availableTop,
      availableBottom,
      xIndex,
      type
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

    const cursor = intersects[0].point.y * 100 + height / 2; // = current mouse position save as product

    // before update position we need to detect pushUp/pushDown
    // with distance ?

    // before releasing the lock, we need to make sure distance >= minDistance
    if (!goingUp && !moveRef.current.pushUp) moveRef.current.pushUp = true;
    if (goingUp && !moveRef.current.pushDown) moveRef.current.pushDown = true;

    if (goingUp && !pushUp) return;
    if (!goingUp && !pushDown) return;

    if (goingUp && !up) return;
    if (!goingUp && !up && (cursor + minDis + scale[1]) > elementsTop) return;

    if (!goingUp && !down) return;
    if (goingUp && !down && (cursor - minDis - scale[1]) < elementsBottom) return;

    if (goingUp && parseInt(cursor + minDis) >= parseInt(elementsTop)) {
      moveRef.current.up = false;
      ref.current.position.set( // set to limit
        intersects[0].object.position.x,
        elementsTop - addY - minDis - (scale[1] / 2),
        position[2]
      );
      return;
    } else {
      if (!up) moveRef.current.up = true;
    }

    if (!goingUp && parseInt(cursor - minDis) <= parseInt(elementsBottom)) {
      moveRef.current.down = false;
      ref.current.position.set( // set to limit
        intersects[0].object.position.x,
        elementsBottom + addY + minDis + (scale[1] / 2),
        position[2]
      );
      return;
    } else {
      if (!down) moveRef.current.down = true;
    }

    if (intersects[0].object.name === "available") {
      ref.current.position.set(
        intersects[0].object.position.x,
        result.posY - addY,
        position[2]
      );
    } else {
      if (shelfTypes.includes(type)) {
        ref.current.position.set(
          intersects[0].object.position.x,
          result.posY - addY,
          position[2]
        );
      } else {
        setShowMeasure(false);
        ref.current?.position.set(
          intersects[0].point.x * 100 + width / 2,
          intersects[0].point.y * 100 + height / 2 - addY,
          depth + depth / 2
        );
      }
    }

    updateRuler(availableTop, availableBottom, result);

    const currentY = ref.current.position.y;

    if (scale[0] !== result.objectWidth && intersects[0].object.name !== "other") {
      updateAsset({ // ! can we change to update ref ??
        index,
        newData: {scale: [result.objectWidth, scale[1], scale[2]]}
      });
    }

    pushInSpace({cursor, currentSection: xIndex, currentIndex});

  }, [spaceRef, dragStateRef, ref, moveRef, allfurnishing, scale, measureInfo, hanging, withFeet, intersects]);

  const handleDragEnd = useCallback((state) => {
      
    if (state.values[0] === state.initial[0] && state.values[1] === state.initial[1]) return; 

    Object.entries(positionsRef.current).forEach(([svId, position]) => {
      const refItem = allfurnishing.current.children.find(s => s.userData.svId === svId);

      updateAsset({
        index: refItem.furnishIndex,
        newData: {
          position: [
            position.x, 
            position.y, 
            position.z
          ],
          // add update scale once changed to ref
        }
      });
    })

    if (intersects[0].object.name === "other") return removeAssetByIndex(index);

    const payload = {
      index,
      newData: {
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
      }
    };

    document.body.style.cursor = "pointer";
    setShowMeasure(false);
    updateAsset(payload);
    setShowControl(true);
    setAssetDragging(false);
    positionsRef.current = {};
    setCurrentIndex(null);
  }, [spaceRef, dragStateRef, ref, moveRef, allfurnishing, scale, positionsRef]);

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
  }, []);

  const handlePointerOut = useCallback(() => {
    document.body.style.cursor = "auto";
  }, []);

  const onRemoveObject = useCallback(furnishIndex => {
    removeAssetByIndex(furnishIndex);
  }, []);

  const getSpaceLimitForAdd = useCallback(() => {

    const topSpaces = totalSpace.filter(e => !e.inDivider
      ? e.d_xIndex === d_xIndex && e.xIndex === xIndex && e.availableTop + scale[1] >= position[1]
      : e.d_xIndex === d_xIndex && e.d_yPos === d_yPos && e.xIndex === xIndex && e.availableTop + scale[1] >= position[1]
    );
    const bottomSpaces = totalSpace.filter(e => !e.inDivider
      ? e.d_xIndex === d_xIndex && e.xIndex === xIndex && e.availableBottom <= position[1]
      : e.d_xIndex === d_xIndex && e.d_yPos === d_yPos && e.xIndex === xIndex && e.availableBottom <= position[1]
    );

    const otherTopSpaces = topSpaces.filter(e => e.topAsset !== type);
    const otherBottomSpaces = bottomSpaces.filter(e => e.bottomAsset !== type);
    const topValues = otherTopSpaces.map(e => e.availableTop);
    const botValues = otherBottomSpaces.map(e => e.availableTop);
    const nearestTop = findClosestElement(topValues, position[1]);
    const nearestBottom = findClosestElement(botValues, position[1]);

    return { topValues, botValues, nearestTop, nearestBottom };
  }, []);

  const onPlusMap = useCallback(() => {
    const { topValues, botValues, nearestTop, nearestBottom } = getSpaceLimitForAdd();
    if (topValues.length === 0 || botValues.length === 0) return;
    const newYpos = updateAssetsInSpace({
      topYPos: nearestTop,
      bottomYPos: nearestBottom,
      xIndex,
      inDivider,
      d_xIndex,
      d_yPos,
    });

    const payload = {
      asset: {
        xIndex,
        yPos: position[1],
        inDivider,
        d_xIndex,
        d_yPos,
        position: [ref.current.position.x, newYpos, ref.current.position.z],
        scale: scale,
        type,
        isShowControl: false,
      }
    };

    addAsset(payload);
    setShowControl(false);
    
  }, []);

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
        svId
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
          svId
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
          <RoundedBox
            castShadow
            args={scale}
            material={Config.furnishing.glassBottom.material}
          />
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
      <MeasureComponent
        measureInfo={measureInfo}
        showMeasure={showMeasure}
        depth={depth}
      />
    </group>
  );
});

export default ShelfComponent;
