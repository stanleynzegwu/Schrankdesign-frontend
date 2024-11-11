// ControlButtons.js
import React from "react";
import * as THREE from "three";
import Config from "@src/configurator/config";
import { useLoader } from "@react-three/fiber";
import { Plane } from "@react-three/drei";

// The plane component is responsible for handling pointer events to toggle ControlButtons.
export const PlaneComponent = ({
  assetDragging,
  setShowControl,
  scale,
  planPositionX,
  planPositionY,
  position,
  type,
  korpusType,
  depth,
}) => {
  return (
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
          ? depth + 2.1
          : depth + 0.2,
      ]}
      rotateX={Math.PI / 2}
      visible={false}
    />
  );
};

export const ControlButtons = ({
  showControl,
  onRemoveObject,
  onPlusMap,
  setSelectionInfo,
  setType,
  xIndex,
  position,
  inDivider,
  d_xIndex,
  d_yPos,
  depth,
  scale,
  type,
  korpusType,
  furnishIndex,
}) => {
  const [trashMap, arrowUpDownMap, plusMap] = useLoader(THREE.TextureLoader, [
    "/images/furnishing/doors/trash_blue.png",
    "/images/configurator/icons/arrow_up_down.png",
    "/images/configurator/icons/plus.png",
  ]);

  return (
    <group visible={showControl}>
      {/* Drag Asset Button */}
      <mesh
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
        position={[
          0,
          0,
          type === Config.furnishing.type.foldBottom && korpusType === Config.korpusType.innerShap2
            ? depth + 2.11 - position[2]
            : depth + 0.21 - position[2],
        ]}
      >
        <circleGeometry args={[6]} />
        <meshBasicMaterial map={arrowUpDownMap} />
      </mesh>
      {/* Remove Asset Button */}
      <mesh
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
        onClick={() => onRemoveObject(furnishIndex)}
        position={[
          -scale[0] / 2 + 6,
          6,
          type === Config.furnishing.type.foldBottom && korpusType === Config.korpusType.innerShap2
            ? depth + 2.11 - position[2]
            : depth + 0.21 - position[2],
        ]}
      >
        <circleGeometry args={[5]} />
        <meshBasicMaterial map={trashMap} />
      </mesh>
      {/* Add Asset Button */}
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
        position={[
          scale[0] / 2 - 6,
          6,
          type === Config.furnishing.type.foldBottom && korpusType === Config.korpusType.innerShap2
            ? depth + 2.11 - position[2]
            : depth + 0.21 - position[2],
        ]}
      >
        <circleGeometry args={[5]} />
        <meshBasicMaterial map={plusMap} />
      </mesh>
    </group>
  );
};
