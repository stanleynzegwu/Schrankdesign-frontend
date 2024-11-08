import React, {
  useRef,
  useMemo,
  useCallback,
  useState,
  useEffect,
} from "react";
import { createUseGesture, dragAction, pinchAction } from "@use-gesture/react";
import { useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import Flap from "../common/flap";
import useDndStore from "../../zustand/dndStore";
import useCornerStore from "../../zustand/cornerStore";
import Config from "../../../config";
import useFurnishingStore from "../../zustand/furnishingStore";
const FlapComponent = React.memo(function FlapComponent({
  initialXIndex,
  initialScale,
  position,
  spaceRef,
  initialFlapType,
  initialDoorCategory,
  initialTopAsset,
  initialBottomAsset,
  initialElementIndex,
}) {
  const [scale, setScale] = useState(initialScale);
  const [flapType, setFlapType] = useState(initialFlapType);
  const [top_asset, setTop_asset] = useState(initialTopAsset);
  const [bottom_asset, setBottom_asset] = useState(initialBottomAsset);
  const [elementIndex, setElementIndex] = useState(initialElementIndex);
  const assetDragging = useDndStore.use.assetDragging();
  const setAssetDragging = useDndStore.use.setAssetDragging();
  const setType = useDndStore.use.setType();
  const [showControl, setShowControl] = useState(false)

  const addFlap = useFurnishingStore.use.addFlap()
  const removeFlap = useFurnishingStore.use.removeFlap()

  useEffect(() => {
    setScale(initialScale);
    setFlapType(initialFlapType);
    setTop_asset(initialTopAsset);
    setBottom_asset(initialBottomAsset);
    setElementIndex(initialElementIndex);
    // setShowControl(true)
  }, [
    initialScale,
    initialFlapType,
    initialTopAsset,
    initialBottomAsset,
    initialElementIndex,
  ]);

  const { size, camera, raycaster } = useThree();
  const ref = useRef();
  const pointer = useMemo(() => new THREE.Vector2(), []);

  let intersects = new Array(1);


  const useGesture = createUseGesture([dragAction, pinchAction]);
  const [dragStarted, setDragStarted] = useState(true);

  const handleDragStart = useCallback(
    (state) => {
      state.event.stopPropagation();

      setDragStarted(true);
      setType(Config.furnishing.type.flap);
    },
    [initialXIndex, position]
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
    //   console.log(spaceRef)
      if (intersects[0] !== undefined) {
        if (intersects[0].object.name === "available") {
          const { xIndex, topAsset, bottomAsset } =
            intersects[0].object.userData;

          const tempElementIndex =
            xIndex === 0
              ? Config.elementIndex.first
              : xIndex === elementsCount - 1
              ? Config.elementIndex.last
              : Config.elementIndex.middle;

          setElementIndex(tempElementIndex);
          setTop_asset(topAsset);
          setBottom_asset(bottomAsset);
          const flapWidth = intersects[0].object.geometry.parameters.width;
          if (initialFlapType === Config.door.type.flap_down) {
            if (
              flapWidth >= Config.door.flap_width_range.min &&
              flapWidth <= Config.door.flap_width_range.max
            ) {
              setFlapType(flapType);
            } else {
              setFlapType(Config.door.type.flap_up);
            }
          } else if (initialFlapType === Config.door.type.flap_up) {
            if (
              flapWidth >= Config.door.flap_width_range.min &&
              flapWidth <= Config.door.flap_width_range.max
            ) {
              setFlapType(flapType);
            } else {
              setFlapType(Config.door.type.flap_down);
            }
          }

          ref.current?.position.set(
            intersects[0].object.position.x,
            intersects[0].object.position.y,
            position[2]
          );

          if (
            scale[0] !== intersects[0].object.geometry.parameters.width ||
            scale[1] !== intersects[0].object.geometry.parameters.height ||
            scale[2] !== initialScale[2]
          ) {
            setScale([
              intersects[0].object.geometry.parameters.width,
              intersects[0].object.geometry.parameters.height,
              initialScale[2],
            ]);
          }
        } else {
          ref.current?.position.set(
            intersects[0].point.x * 100 + width * 0.5,
            intersects[0].point.y * 100 + height * 0.5,
            depth + depth * 0.5
          );
        }
      }
    },
    [scale, spaceRef, initialFlapType]
    // [elementIndex, top_asset, bottom_asset, elementsCount, scale]
  );

  const handleDragEnd = useCallback(
    (state) => {
      state.event.stopPropagation();

      if (
        state.values[0] === state.initial[0] &&
        state.values[1] === state.initial[1]
      ) {
        return;
      }
      setAssetDragging(false)
      if (intersects[0].object?.name === "available") {
        const payload = {};

        payload.removal = { xIndex: initialXIndex, posY: position[1] };
        payload.asset = {
            xIndex: intersects[0].object.userData.xIndex,
            position: [
              ref.current?.position.x,
              ref.current?.position.y,
              ref.current?.position.z,
            ],
            scale,
            type: Config.furnishing.type.flap,
            flapType: flapType,
            doorCategory: initialDoorCategory,
            topAsset: top_asset,
            bottomAsset: bottom_asset,
            elementIndex: elementIndex,
          }
          if (payload.asset.scale[1] <= Config.door.flap_height_range.max &&
            payload.asset.scale[1] >= Config.door.flap_height_range.min
           ) {
            addFlap(payload)
           }
           else {
            removeFlap({ xIndex: initialXIndex, posY: position[1] })
           }
      } else {
      }
    },
    [
      scale,
      initialXIndex,
      position,
      elementIndex,
      top_asset,
      bottom_asset,
      flapType,
    ]
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
  ])

  return (
    <>
      <group {...bind()} ref={ref} position={position}>
        <group
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
        >
          <Flap
            scale={scale}
            flap_type={flapType}
            door_category={initialDoorCategory}
            elementIndex={elementIndex}
            topAsset={top_asset}
            bottomAsset={bottom_asset}
            visible={true}
            withAnimation={true}
            xIndex={initialXIndex}
            yPos={position[1]}
          />
          {/* <Suspense fallback={null}>
            <Griff
              spaceScale={initialScale}
              door_type={initialDoorType}
              door_category={initialDoorCategory}
              elementIndex={initialElementIndex}
              visible={true}
              withAnimation={true}
              position={position}
              scale={scale}
            />
          </Suspense> */}
        </group>
        <group visible={showControl}>
        <mesh
            onPointerOver={() => {
              document.body.style.cursor = "pointer"
            }}
            onPointerOut={() => {
              document.body.style.cursor = "auto"
            }}
            onClick={(e) => {
              e.stopPropagation()
              document.body.style.cursor = "auto"
              removeFlap({ xIndex: initialXIndex, posY: position[1] })
            //   removeGriff({ xIndex: initialXIndex, posY: position[1]})
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

export default FlapComponent;
