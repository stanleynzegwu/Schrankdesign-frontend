import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import DividerPage from "../common/didviderPage";
import useCornerStore from "../../zustand/cornerStore";
import useDimensionStore from "../../zustand/dimensionStore";
import useFurnishingStore from "../../zustand/furnishingStore";
import { createUseGesture, dragAction, pinchAction } from "@use-gesture/react";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useDndStore from "../../zustand/dndStore";
import Config from "../../../config";

let intersects = new Array(1),
  topAssetType = "none";

const DividerComponent = React.memo(function DividerComponent({ asset, spaceRef }) {
  const {
    xIndex,
    inDivider,
    d_xIndex,
    d_yPos,
    scale,
    position,
    topShelfVisible,
    dividerLeftWidth,
    type,
  } = asset;

  const ref = useRef();
  const { size, camera, raycaster } = useThree();
  const pointer = useMemo(() => new THREE.Vector2(), []);

  const addAsset = useFurnishingStore.use.addAsset();
  const removeAsset = useFurnishingStore.use.removeAsset();
  const updateDividerAsset = useFurnishingStore.use.updateDividerAsset();
  const setSelectionInfo = useFurnishingStore.use.setSelectionInfo();

  const setShowDimensions = useCornerStore.use.setShowDimensions();
  const viewOption = useCornerStore.use.viewOption();

  const height = useDimensionStore.use.height();
  const depth = useDimensionStore.use.depth();
  const width = useDimensionStore.use.width();

  const setType = useDndStore.use.setType();
  const setAssetDragging = useDndStore.use.setAssetDragging();

  const [dragStarted, setDragStarted] = useState(true);

  useEffect(() => {
    if (!dragStarted) {
      setShowDimensions(false);
      setAssetDragging(true);

      updateDividerAsset({
        xIndex,
        yPos: position[1],
        topShelfVisible: false,
        leftWidth: dividerLeftWidth,
      });

      setSelectionInfo({
        xIndex,
        yPos: position[1],
        inDivider,
        d_xIndex,
        d_yPos,
      });
    }
  }, [dragStarted]);

  const handleDragStart = useCallback(() => {
    setType(Config.furnishing.type.divider);
    setDragStarted(true);
  }, [xIndex, position]);

  const handleDrag = useCallback(
    (state) => {
      if (state.elapsedTime < 100) return;

      if (state.delta[0] === 0 && state.delta[1] === 0) return;

      setDragStarted(false);

      pointer.x = ((state.values[0] - size.left) / size.width) * 2 - 1;
      pointer.y = -((state.values[1] - size.top) / size.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);

      intersects = raycaster.intersectObjects(spaceRef.children, true);

      if (!intersects[0]) return;

      if (intersects[0].object.name === "available") {
        const { topAsset } = intersects[0].object.userData;

        topAssetType = topAsset;

        ref.current?.position.set(
          intersects[0].object.position.x,
          intersects[0].object.position.y,
          position[2]
        );
      } else {
        ref.current?.position.set(
          intersects[0].point.x * 100 + width / 2,
          intersects[0].point.y * 100 + height / 2,
          depth + depth / 2
        );
      }
    },
    [ref, spaceRef, scale]
  );

  const handleDragEnd = useCallback(
    (state) => {
      if (state.values[0] === state.initial[0] && state.values[1] === state.initial[1]) {
        return;
      }

      if (
        intersects.length > 0 &&
        intersects[0].object &&
        intersects[0].object.name === "available"
      ) {
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
          position: [ref.current.position.x, ref.current.position.y, ref.current.position.z],
          scale: scale,
          type: Config.furnishing.type.divider,
          topShelfVisible:
            topAssetType === Config.furnishing.type.slopingFloor ||
            topAssetType === Config.furnishing.type.clothesLift ||
            topAssetType === Config.furnishing.type.clothesRail ||
            topAssetType === Config.furnishing.type.pantsPullout
              ? true
              : false,
          dividerLeftWidth: (scale[0] - Config.furnishing.divider.thickness) / 2,
        };

        addAsset(payload);
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
  }, []);

  const handlePointerOut = useCallback(() => {
    document.body.style.cursor = "auto";
  }, []);

  return (
    <group>
      <group
        {...bind()}
        ref={ref}
        position={position}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <DividerPage
          scale={scale}
          leftWidth={dividerLeftWidth}
          visible={true}
          topShelfVisible={topShelfVisible}
          type={type}
        />
      </group>
    </group>
  );
});

export default DividerComponent;
