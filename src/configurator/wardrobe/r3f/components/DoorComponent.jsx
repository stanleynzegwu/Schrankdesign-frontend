import * as THREE from "three";
import Door from "../common/door";
import Flap from "../common/flap";
import { Griff } from "../common/griff";
import { Plane } from "@react-three/drei";
import Config from "../../../config";
import useDndStore from "../../zustand/dndStore";
import { useLoader, useThree } from "@react-three/fiber";
import useCornerStore from "../../zustand/cornerStore";
import useDimensionStore from "../../zustand/dimensionStore";
import useFurnishingStore from "../../zustand/furnishingStore";
import { createUseGesture, dragAction, pinchAction } from "@use-gesture/react";
import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";

let intersects = new Array(1);

const RoundedShape = React.memo(function RoundedShape({ width, visible, upward }) {
  const shape = useMemo(
    () =>
      new THREE.Shape()
        .moveTo(-width * 0.5, 0)
        .quadraticCurveTo(-width * 0.5, upward ? 8 : -8, -width * 0.5 + 8, upward ? 8 : -8)
        .lineTo(width * 0.5 - 8, upward ? 8 : -8)
        .quadraticCurveTo(width * 0.5, upward ? 8 : -8, width * 0.5, 0)
        .lineTo(-width * 0.5, 0),
    [width]
  );
  return (
    <mesh visible={visible}>
      <shapeGeometry args={[shape]} />
      <meshBasicMaterial color={0x577e60} />
    </mesh>
  );
});

const DoorComponent = React.memo(function DoorComponent({ asset, spaceRef, index }) {
  const {
    scale,
    position,
    type: initialType,
    xIndex: initialXIndex,
    doorType: initialDoorType,
    topAsset: initialTopAsset,
    bottomAsset: initialBottomAsset,
    elementIndex: initialElementIndex,
    doorCatergory: initialDoorCategory,
  } = asset;

  const setType = useDndStore.use.setType();
  const assetDragging = useDndStore.use.assetDragging();
  const setAssetDragging = useDndStore.use.setAssetDragging();

  const addDoor = useFurnishingStore.use.addDoor();
  const addGriff = useFurnishingStore.use.addGriff();
  const removeDoor = useFurnishingStore.use.removeDoor();
  const updateDoor = useFurnishingStore.use.updateDoor();
  const totalSpace = useFurnishingStore.use.totalSpace();
  const removeGriff = useFurnishingStore.use.removeGriff();
  const furnishingAssets = useFurnishingStore.use.furnishingAssets();
  const setSelectionInfo = useFurnishingStore.use.setSelectionInfo();
  const updateDoorDimensions = useFurnishingStore.use.updateDoorDimensions();
  const updateFurnishingAssests = useFurnishingStore.use.updateFurnishingAssests();

  const depth = useDimensionStore.use.depth();
  const width = useDimensionStore.use.width();
  const height = useDimensionStore.use.height();
  const hanging = useDimensionStore.use.hanging();
  const minHeight = useDimensionStore.use.minHeight();
  const withOutFeet = useDimensionStore.use.withOutFeet();
  const elementsCount = useDimensionStore.use.elementsCount();

  const [showControl, setShowControl] = useState(false);
  const [doorType, setDoorType] = useState(initialDoorType);
  const [top_asset, setTop_asset] = useState(initialTopAsset);
  const [bottom_asset, setBottom_asset] = useState(initialBottomAsset);
  const [elementIndex, setElementIndex] = useState(initialElementIndex);

  const { revolving_left, revolving_right, revolving_double } = Config.door.type;

  const [availableData, setAvailableData] = useState({
    top: 0,
    bottom: 0,
    assets: [],
    innerAssets: [],
    topAssetType: "none",
    bottomAssetType: "none",
  });

  useEffect(() => {
    const space = totalSpace.find(
      (item) =>
        item.xIndex === initialXIndex &&
        item.availableBottom <= position[1] &&
        item.availableTop >= position[1]
    );
    if (!space) return;

    const filterAndSortAssets = (item) =>
      !item.inDivider &&
      item.xIndex === initialXIndex &&
      item.position[1] >= space.availableBottom &&
      item.position[1] <= space.availableTop &&
      [
        Config.furnishing.type.shelf,
        Config.furnishing.type.foldBottom,
        Config.furnishing.type.pantsPullout,
      ].includes(item.type);
    const filteredAssets = furnishingAssets
      .filter(filterAndSortAssets)
      .sort((a, b) => a.position[1] - b.position[1]);
    const innerAssets = filteredAssets.filter((item) => {
      return (
        item.position[1] - item.scale[1] * 0.5 < position[1] + scale[1] * 0.5 - 0.1 &&
        item.position[1] + item.scale[1] * 0.5 > position[1] - scale[1] * 0.5 + 0.1
      );
    });
    setAvailableData({
      assets: filteredAssets,
      top: space.availableTop,
      bottom: space.availableBottom,
      topAssetType: space.topAsset,
      bottomAssetType: space.bottomAsset,
      innerAssets: innerAssets,
    });
  }, [totalSpace, position, scale, initialXIndex, furnishingAssets]);

  const { assets, top, bottom, topAssetType, innerAssets, bottomAssetType } = availableData;

  useEffect(() => {
    setDoorType(initialDoorType);
    setTop_asset(initialTopAsset);
    setBottom_asset(initialBottomAsset);
    setElementIndex(initialElementIndex);
  }, [initialDoorType, initialTopAsset, initialBottomAsset, initialElementIndex]);

  const ref = useRef();
  const { size, camera, raycaster } = useThree();
  const pointer = useMemo(() => new THREE.Vector2(), []);
  const useGesture = createUseGesture([dragAction, pinchAction]);
  const [dragStarted, setDragStarted] = useState(true);

  useEffect(() => {
    if (!dragStarted) {
      setShowControl(false);
      setAssetDragging(true);
      setSelectionInfo({
        xIndex: initialXIndex,
        yPos: position[1],
      });
    }
  }, [dragStarted]);

  const handleDragStart = useCallback(
    (state) => {
      state.event.stopPropagation();

      setDragStarted(true);
      setType(initialType);
    },
    [initialXIndex, position, initialType]
  );

  const handleDrag = useCallback(
    (state) => {
      state.event.stopPropagation();

      if (state.elapsedTime < 100) return;
      if (state.delta[0] === 0 && state.delta[1] === 0) return;

      setDragStarted(false);

      pointer.x = ((state.values[0] - size.left) / size.width) * 2 - 1;
      pointer.y = -((state.values[1] - size.top) / size.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      intersects = raycaster.intersectObjects(spaceRef.children, true);

      if (!intersects[0]) return;
      if (intersects[0].object.name === "available") {
        const { xIndex, topAsset, bottomAsset } = intersects[0].object.userData;

        const tempElementIndex =
          xIndex === 0
            ? Config.elementIndex.first
            : xIndex === elementsCount - 1
            ? Config.elementIndex.last
            : Config.elementIndex.middle;

        updateDoorDimensions({
          index,
          newData: {
            scale: [
              intersects[0].object.geometry.parameters.width,
              intersects[0].object.geometry.parameters.height,
              scale[2],
            ],
          },
        });

        setElementIndex(tempElementIndex);
        setTop_asset(topAsset);
        setBottom_asset(bottomAsset);

        if (initialType === Config.furnishing.type.door) {
          const doorWidth = intersects[0].object.geometry.parameters.width;
          if (initialDoorType === revolving_left || initialDoorType === revolving_right) {
            if (
              doorWidth >= Config.door.left_type_range.min &&
              doorWidth <= Config.door.left_type_range.max
            ) {
              setDoorType(initialDoorType);
            } else {
              setDoorType(revolving_double);
            }
          } else if (initialDoorType === revolving_double) {
            if (
              doorWidth < Config.door.double_type_range.min &&
              doorWidth > Config.door.double_type_range.max
            ) {
              setDoorType(initialDoorType);
            } else {
              setDoorType(revolving_left);
            }
          }
        } else if (initialType === Config.furnishing.type.flap) {
          const flapWidth = intersects[0].object.geometry.parameters.width;
          if (initialDoorType === Config.door.type.flap_down) {
            if (
              flapWidth >= Config.door.flap_width_range.min &&
              flapWidth <= Config.door.flap_width_range.max
            ) {
              setDoorType(initialDoorType);
            } else {
              setDoorType(Config.door.type.flap_up);
            }
          } else if (initialDoorType === Config.door.type.flap_up) {
            if (
              flapWidth >= Config.door.flap_width_range.min &&
              flapWidth <= Config.door.flap_width_range.max
            ) {
              setDoorType(initialDoorType);
            } else {
              setDoorType(Config.door.type.flap_down);
            }
          }
        } else {
          console.log("Else", initialType);
        }

        ref.current?.position.set(
          intersects[0].object.position.x,
          intersects[0].object.position.y,
          position[2]
        );
      } else {
        ref.current?.position.set(
          intersects[0].point.x * 100 + width * 0.5,
          intersects[0].point.y * 100 + height * 0.5,
          depth + depth * 0.5
        );
      }
    },
    [scale, spaceRef, initialDoorType]
  );

  const handleDragEnd = useCallback(
    (state) => {
      state.event.stopPropagation();

      if (state.values[0] === state.initial[0] && state.values[1] === state.initial[1]) {
        return;
      }

      setAssetDragging(false);

      if (intersects[0]?.object.name === "available") {
        const payload = {};

        payload.removal = { xIndex: initialXIndex, posY: position[1] };

        payload.asset = {
          xIndex: intersects[0].object.userData.xIndex,
          position: [ref.current?.position.x, ref.current?.position.y, ref.current?.position.z],
          scale,
          type: Config.furnishing.type.door,
          doorType: doorType,
          doorCategory: initialDoorCategory,
          topAsset: top_asset,
          bottomAsset: bottom_asset,
          elementIndex: elementIndex,
          isPlint: (hanging && !withOutFeet) || (!hanging && withOutFeet),
        };
        if (initialType === Config.furnishing.type.door) {
          if (payload.asset.scale[1] > minHeight) {
            addDoor(payload);
          } else {
            removeDoor({ xIndex: initialXIndex, posY: position[1] });
          }
        } else if (initialType === Config.furnishing.type.flap) {
          if (
            payload.asset.scale[1] <= Config.door.flap_height_range.max &&
            payload.asset.scale[1] >= Config.door.flap_height_range.min
          ) {
            payload.asset.type = Config.furnishing.type.flap;
            addDoor(payload);
          } else {
            removeDoor({ xIndex: initialXIndex, posY: position[1] });
          }
        }
        payload.asset = {
          xIndex: intersects[0].object.userData.xIndex,
          scale,
          position: [ref.current?.position.x, ref.current?.position.y, ref.current?.position.z],
          doorType: doorType,
          doorCategory: initialDoorCategory,
          elementIndex: elementIndex,
        };
        if (initialType === Config.furnishing.type.door) {
          if (payload.asset.scale[1] > minHeight) {
            addGriff(payload);
          } else {
            removeGriff({ xIndex: initialXIndex, posY: position[1] });
          }
        } else if (initialType === Config.furnishing.type.flap) {
          if (
            payload.asset.scale[1] <= Config.door.flap_height_range.max &&
            payload.asset.scale[1] >= Config.door.flap_height_range.min &&
            payload.asset.scale[0] <= Config.door.flap_width_range.max &&
            payload.asset.scale[0] >= Config.door.flap_width_range.min
          ) {
            addGriff(payload);
          } else {
            removeGriff({ xIndex: initialXIndex, posY: position[1] });
          }
        }
        setShowControl(true);
      } else {
        removeDoor({ xIndex: initialXIndex, posY: position[1] });
        removeGriff({ xIndex: initialXIndex, posY: position[1] });
      }
    },
    [scale, initialXIndex, position, elementIndex, top_asset, bottom_asset, doorType]
  );

  const openDoor = useCornerStore.use.openDoor();
  const viewOption = useCornerStore.use.viewOption();

  const bind = useGesture(
    {
      onDragStart: handleDragStart,
      onDrag: handleDrag,
      onDragEnd: handleDragEnd,
    },
    { enabled: viewOption === Config.view.front }
  );

  const [trashMap, arrowUpMap, arrowDownMap] = useLoader(THREE.TextureLoader, [
    "/images/furnishing/doors/trash_blue.png",
    "/images/furnishing/doors/arrow_up_green.png",
    "/images/furnishing/doors/arrow_down_green.png",
  ]);

  const updateInnerAssets = (innerAsset, isShowControl) => {
    updateFurnishingAssests({
      xIndex: innerAsset.xIndex,
      posY: innerAsset.position[1],
      position: innerAsset.position,
      scale: innerAsset.scale,
      isShowControl: isShowControl,
    });
  };

  return (
    <>
      <group {...bind()} ref={ref} position={position}>
        <Plane
          scale={[scale[0], scale[1] + Config.plate.thickness * 2, scale[2]]}
          position={[0, 0, 3]}
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

            setShowControl(false);
          }}
        />
        <Plane
          scale={[scale[0], scale[1] + Config.plate.thickness * 2 + 16, scale[2]]}
          position={[0, Config.plate.thickness, 2]}
          rotateX={Math.PI / 2}
          visible={false}
          onPointerOver={(e) => {
            e.stopPropagation();
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
          }}
        />
        <group>
          {initialType === Config.furnishing.type.door && (
            <>
              <Door
                scale={scale}
                door_type={doorType}
                door_category={initialDoorCategory}
                elementIndex={elementIndex}
                topAsset={top_asset}
                bottomAsset={bottom_asset}
                visible={true}
                withAnimation={true}
                xIndex={initialXIndex}
                yPos={position[1]}
              />
              <Suspense fallback={null}>
                <Griff
                  spaceScale={scale}
                  door_type={initialDoorType}
                  door_category={initialDoorCategory}
                  elementIndex={initialElementIndex}
                  visible={true}
                  withAnimation={true}
                  position={position}
                  type={initialType}
                  scale={scale}
                />
              </Suspense>
            </>
          )}
          {initialType === Config.furnishing.type.flap && (
            <>
              <Flap
                scale={scale}
                door_type={doorType}
                door_category={initialDoorCategory}
                elementIndex={elementIndex}
                topAsset={top_asset}
                bottomAsset={bottom_asset}
                visible={true}
                withAnimation={true}
                xIndex={initialXIndex}
                yPos={position[1]}
              />
              <Suspense fallback={null}>
                <Griff
                  spaceScale={scale}
                  door_type={doorType}
                  door_category={initialDoorCategory}
                  elementIndex={initialElementIndex}
                  visible={true}
                  withAnimation={true}
                  position={position}
                  type={initialType}
                  scale={scale}
                />
              </Suspense>
            </>
          )}
        </group>

        <group
          visible={
            !assetDragging &&
            showControl &&
            !openDoor &&
            initialType === Config.furnishing.type.door
          }
        >
          <group
            // {...bindTop()}
            position={[0, scale[1] * 0.5, scale[2] * 0.5 + 1]}
          >
            <RoundedShape width={scale[0]} upward={false} visible={true} />
            {innerAssets.length > 0 &&
              innerAssets[innerAssets.length - 1].position[1] -
                innerAssets[innerAssets.length - 1].scale[1] * 0.5 -
                (position[1] - scale[1] * 0.5) >
                Config.door.min_height && (
                <mesh
                  onPointerOver={() => {
                    document.body.style.cursor = "pointer";
                  }}
                  onPointerOut={() => {
                    document.body.style.cursor = "auto";
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    document.body.style.cursor = "auto";
                    const targetScaleY =
                      innerAssets[innerAssets.length - 1].position[1] -
                      innerAssets[innerAssets.length - 1].scale[1] * 0.5 -
                      (position[1] - scale[1] * 0.5);

                    const targetPosY = targetScaleY * 0.5 + (position[1] - scale[1] * 0.5);

                    updateDoor({
                      xIndex: index,
                      posY: position[1],
                      position: [position[0], targetPosY, position[2]],
                      scale: [scale[0], targetScaleY, scale[2]],
                      topAsset: innerAssets[innerAssets.length - 1].type,
                      bottomAsset: bottom_asset,
                    });
                  }}
                  position={[top > position[1] + scale[1] * 0.5 + 0.1 ? -10 : 0, -6, 1]}
                >
                  <circleGeometry args={[5]} />
                  <meshBasicMaterial map={arrowDownMap} />
                </mesh>
              )}
            {top > position[1] + scale[1] * 0.5 + 0.1 && (
              <mesh
                onPointerOver={() => {
                  document.body.style.cursor = "pointer";
                }}
                onPointerOut={() => {
                  document.body.style.cursor = "auto";
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  document.body.style.cursor = "auto";
                  const filteredAssets = assets.filter(
                    (item) =>
                      item.position[1] - item.scale[1] * 0.5 > position[1] + scale[1] * 0.5 + 0.1
                  );

                  const payload = {
                    xIndex: initialXIndex,
                    bottomAsset: bottom_asset,
                    posY: position[1],
                  };
                  if (filteredAssets[0] === undefined) {
                    payload.position = [
                      position[0],
                      (top + (position[1] - scale[1] * 0.5)) * 0.5,
                      position[2],
                    ];
                    payload.scale = [scale[0], top - (position[1] - scale[1] * 0.5), scale[2]];
                    payload.topAsset = topAssetType;
                  } else {
                    payload.scale = [
                      scale[0],
                      filteredAssets[0].position[1] -
                        filteredAssets[0].scale[1] * 0.5 -
                        (position[1] - scale[1] * 0.5),
                      scale[2],
                    ];
                    payload.position = [
                      position[0],
                      (filteredAssets[0].position[1] -
                        filteredAssets[0].scale[1] * 0.5 +
                        (position[1] - scale[1] * 0.5)) /
                        2,
                      position[2],
                    ];
                    payload.topAsset = filteredAssets[0].type;
                  }

                  updateDoor(payload);
                }}
                position={[
                  innerAssets.length > 0 &&
                  innerAssets[innerAssets.length - 1].position[1] -
                    innerAssets[innerAssets.length - 1].scale[1] * 0.5 -
                    (position[1] - scale[1] * 0.5) >
                    Config.door.min_height
                    ? 10
                    : 0,
                  -6,
                  1,
                ]}
              >
                <circleGeometry args={[5]} />
                <meshBasicMaterial map={arrowUpMap} />
              </mesh>
            )}
          </group>
          <group
            position={[0, -scale[1] * 0.5, scale[2] * 0.5 + 1]}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <RoundedShape width={scale[0]} upward={true} visible={true} />
            {bottom < position[1] - scale[1] * 0.5 - 0.1 && (
              <mesh
                onPointerOver={() => {
                  document.body.style.cursor = "pointer";
                }}
                onPointerOut={() => {
                  document.body.style.cursor = "auto";
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  document.body.style.cursor = "auto";
                  const filteredAssets = assets.filter(
                    (item) =>
                      item.position[1] + item.scale[1] * 0.5 < position[1] - scale[1] * 0.5 - 0.1
                  );

                  const payload = {
                    xIndex: initialXIndex,
                    topAsset: top_asset,
                    posY: position[1],
                  };

                  if (filteredAssets[0] === undefined) {
                    payload.position = [
                      position[0],
                      (position[1] + scale[1] * 0.5 + bottom) * 0.5,
                      position[2],
                    ];
                    payload.scale = [scale[0], position[1] + scale[1] * 0.5 - bottom, scale[2]];
                    payload.bottomAsset = bottomAssetType;
                  } else {
                    const index = filteredAssets.length - 1;
                    payload.scale = [
                      scale[0],
                      position[1] +
                        scale[1] * 0.5 -
                        (filteredAssets[index].position[1] + filteredAssets[index].scale[1] * 0.5),
                      scale[2],
                    ];
                    payload.position = [
                      position[0],
                      (position[1] +
                        scale[1] * 0.5 +
                        (filteredAssets[index].position[1] +
                          filteredAssets[index].scale[1] * 0.5)) /
                        2,
                      position[2],
                    ];
                    payload.bottomAsset = filteredAssets[index].type;
                  }

                  updateDoor(payload);
                }}
                position={[
                  innerAssets.length > 0 &&
                  position[1] +
                    scale[1] * 0.5 -
                    (innerAssets[0].position[1] + innerAssets[0].scale[1] * 0.5) >
                    Config.door.min_height
                    ? -10
                    : 0,
                  6,
                  1,
                ]}
              >
                <circleGeometry args={[5]} />
                <meshBasicMaterial map={arrowDownMap} />
              </mesh>
            )}
            {innerAssets.length > 0 &&
              position[1] +
                scale[1] * 0.5 -
                (innerAssets[0].position[1] + innerAssets[0].scale[1] * 0.5) >
                Config.door.min_height && (
                <mesh
                  onPointerOver={() => {
                    document.body.style.cursor = "pointer";
                  }}
                  onPointerOut={() => {
                    document.body.style.cursor = "auto";
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    document.body.style.cursor = "auto";
                    const targetScaleY =
                      position[1] +
                      scale[1] * 0.5 -
                      (innerAssets[0].position[1] + innerAssets[0].scale[1] * 0.5);

                    const targetPosY =
                      (position[1] +
                        scale[1] * 0.5 +
                        (innerAssets[0].position[1] + innerAssets[0].scale[1] * 0.5)) /
                      2;

                    updateDoor({
                      xIndex: initialXIndex,
                      posY: position[1],
                      position: [position[0], targetPosY, position[2]],
                      scale: [scale[0], targetScaleY, scale[2]],
                      topAsset: top_asset,
                      bottomAsset: innerAssets[0].type,
                    });
                  }}
                  position={[bottom < position[1] - scale[1] * 0.5 - 0.1 ? 10 : 0, 6, 1]}
                >
                  <circleGeometry args={[5]} />
                  <meshBasicMaterial map={arrowUpMap} />
                </mesh>
              )}
          </group>
          <mesh
            onPointerOver={() => {
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              document.body.style.cursor = "auto";
            }}
            onClick={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "auto";
              removeDoor({ xIndex: initialXIndex, posY: position[1] });
            }}
            position={[0, 0, scale[2] * 0.5 + 1]}
            visible={showControl}
          >
            <circleGeometry args={[6]} />
            <meshBasicMaterial map={trashMap} />
          </mesh>
        </group>
        <group
          visible={
            !assetDragging &&
            showControl &&
            !openDoor &&
            initialType === Config.furnishing.type.flap
          }
        >
          <mesh
            onPointerOver={() => {
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              document.body.style.cursor = "auto";
            }}
            onClick={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "auto";
            }}
            position={[0, 0, scale[2] * 0.5 + 1]}
            visible={showControl}
          >
            <circleGeometry args={[6]} />
            <meshBasicMaterial map={trashMap} />
          </mesh>
        </group>
      </group>
    </>
  );
});

export default DoorComponent;
