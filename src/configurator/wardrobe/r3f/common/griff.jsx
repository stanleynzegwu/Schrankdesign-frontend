import { useRef, useEffect, useMemo, useState, Suspense } from "react";
import * as THREE from "three";
// import { useGLTF } from "@react-three/drei";
import { FBXLoader } from "three-stdlib"; // GLTFLoader,
import { useLoader, useThree, useFrame } from "@react-three/fiber";
import Config from "../../../config";
import {
  // getDoorHeight,
  getDoorPositionX,
  getDoorPositionY,
  getDoorWidth,
  getHandleInfo,
  getHandleSide,
} from "../../utils/getInfo";
import useDimensionStore from "../../zustand/dimensionStore";
import useCornerStore from "../../zustand/cornerStore";
import { GriffModel } from "./griffModel";
export function Griff(props) {
  let {
    scale,
    visible,
    door_type,
    elementIndex,
    topAsset,
    bottomAsset,
    withAnimation,
    position,
    type,
    depth,
    drawerGroupScale,
    topShelfDistance
  } = props;
  const openDoor = useCornerStore.use.openDoor();
  const korpusType = useDimensionStore.use.korpusType();
  const handle = useDimensionStore.use.handle();
  const handleIndex = useDimensionStore.use.handleIndex();
  const handleListIndex = useDimensionStore.use.handleListIndex();
  const handleDirection = useDimensionStore.use.handleDirection();
  const minHeight = useDimensionStore.use.minHeight();
  const setMinLength = useDimensionStore.use.setMinLength();
  const setMinHeight = useDimensionStore.use.setMinHeight();
  const setEWidthsFixed = useDimensionStore.use.setEWidthsFixed();
  const setElementsCount = useDimensionStore.use.setElementsCount();
  const elementsCount = useDimensionStore.use.elementsCount();
  const setElementsWidths = useDimensionStore.use.setElementsWidths();
  const wardrobeWidth = useDimensionStore.use.width();
  const pushOpen = useDimensionStore.use.pushOpen();
  // const { nodes, materials, scene  } = useGLTF("../models/griff-1.gltf");
  const leftRef = useRef();
  const rightRef = useRef();
  const leftDoubleRef = useRef();
  const rightDoubleRef = useRef();
  const tleftRef = useRef();
  const trightRef = useRef();
  const tleftDoubleRef = useRef();
  const trightDoubleRef = useRef();
  const drawerRef = useRef();
  const flapDownRef = useRef();
  const flapUpRef = useRef();
  const tflapDownRef = useRef();
  const tflapUpRef = useRef();
  const modelHeight = 16;
  const [modelScale, setModelScale] = useState();
  const [rotationY, setRotationY] = useState();

  if (scale[1] < minHeight && !pushOpen && type === Config.furnishing.type.door) {
    
    visible = false;
  }
  if (
    (scale[1] > Config.door.flap_height_range.max ||
    scale[1] < Config.door.flap_height_range.min ||
    scale[0] > Config.door.flap_width_range.max ||
    scale[0] < Config.door.flap_width_range.min) && type === Config.furnishing.type.flap
  ) {
    visible = false;
  }
  useEffect(() => {
    if (handleDirection === "V") {
      setRotationY(Math.PI / 2);
    } else {
      setRotationY(0);
    }
  }, [handleDirection]);

  const handleInfo = useMemo(() => {
    return getHandleInfo(handle, handleIndex, handleListIndex);
  }, [handle, handleIndex, handleListIndex]);

  let model = handleInfo?.gltf ? useLoader(FBXLoader, handleInfo.gltf) : undefined;
  
  useEffect(() => {
    if (model) {
      const box = new THREE.Box3().setFromObject(model);
      const size = new THREE.Vector3();
      const modelSize = box.getSize(size);
      setModelScale(modelHeight / modelSize.x);
    }
    if (handleInfo.minHeight !== 0) {
      setMinHeight(handleInfo.minHeight);
    }

    if (handleInfo.minLength !== 0) {
      setMinLength(handleInfo.minLength);
      let tempElementWidth = Number(
        (
          (Config.plate.width - Config.plate.thickness) /
            Config.init.elementsCount -
          Config.plate.thickness
        ).toFixed(1)
      );
      if (tempElementWidth < handleInfo.minLength) {
        const elements = [];
        let numberofElement = Math.floor(
          (wardrobeWidth - Config.plate.thickness) /
            (handleInfo.minLength + Config.plate.thickness)
        );

        for (let index = 0; index < numberofElement; index++) {
          elements.push(
            Number(
              (
                (wardrobeWidth - Config.plate.thickness) / numberofElement -
                Config.plate.thickness
              ).toFixed(1)
            )
          );
        }
        setElementsCount(numberofElement);
        setElementsWidths(elements);
        setEWidthsFixed(Array(Config.init.elementsCount).fill(false));
      } 
      else if (elementsCount === 0) {
        // console.log("hereerer")
        const elements = [];
        for (let index = 0; index < Config.init.elementsCount; index++) {
          elements.push(
            Number(
              (
                (wardrobeWidth - Config.plate.thickness) /
                  Config.init.elementsCount -
                Config.plate.thickness
              ).toFixed(1)
            )
          );
        }
        setElementsCount(Config.init.elementsCount);
        setElementsWidths(elements);
        setEWidthsFixed(Array(Config.init.elementsCount).fill(false));
      }
    }
  }, [handleInfo]);

  const handleSide = useMemo(() => {
    return getHandleSide(position, scale, handleInfo, handleDirection);
  }, [position, scale, handleInfo, handleDirection]);

  const posX = useMemo(() => {
    let temp = 0;
    if (elementIndex === Config.elementIndex.first) {
      temp -=
        (Config.plate.thickness - Config.furnishing.default.frontInterval) / 2;
    } else {
      temp -= Config.furnishing.default.shelfOverlapping / 2;
    }

    if (elementIndex === Config.elementIndex.last) {
      temp +=
        (Config.plate.thickness - Config.furnishing.default.frontInterval) / 2;
    } else {
      temp += Config.furnishing.default.shelfOverlapping / 2;
    }

    return temp;
  }, [elementIndex]);

  const posY = useMemo(() => {
    let temp = 0;
    if (topAsset === "none") {
      temp +=
        (Config.plate.thickness - Config.furnishing.default.frontInterval) / 2;
    } else {
      temp += Config.furnishing.default.shelfOverlapping / 2;
    }

    // stretch to the bottom
    if (bottomAsset === "none") {
      temp -=
        (Config.plate.thickness - Config.furnishing.default.frontInterval) / 2;
    } else {
      temp -= Config.furnishing.default.shelfOverlapping / 2;
    }

    return temp;
  }, [topAsset, bottomAsset]);

  const width = useMemo(() => {
    return getDoorWidth(scale[0], elementIndex, korpusType);
  }, [scale[0], elementIndex, korpusType, door_type]);

  const totalx = useMemo(() => {
    return getDoorPositionX(
      door_type,
      posX,
      posY,
      width,
      korpusType,
      elementIndex
    );
  });
  const positionX = useMemo(() => {
    let positionX = getDoorPositionX(
      door_type,
      posX,
      posY,
      width,
      korpusType,
      elementIndex
    );
    if (handleDirection === "V") {
      if (door_type === Config.door.type.revolving_left) {
        positionX -= handleInfo.verticalX;
      }
      if (door_type === Config.door.type.revolving_right) {
        positionX += handleInfo.verticalX;
      }
    }
    if (handleDirection === "H") {
      if (door_type === Config.door.type.revolving_left) {
        positionX -= handleInfo.horizontalX;
      }
      if (door_type === Config.door.type.revolving_right) {
        positionX += handleInfo.horizontalX;
      }
    }
    return positionX;
  }, [door_type, posX, posX, width, elementIndex, handleInfo, handleDirection]);

  const positionY = useMemo(() => {
    let positionY = getDoorPositionY(
      door_type,
      posX,
      posY,
      korpusType,
      topAsset,
      bottomAsset
    );
    positionY += handleSide;
    return positionY;
  }, [door_type, posX, posY, korpusType, topAsset, bottomAsset, handleSide]);

  const { clock } = useThree();

  useEffect(() => {
    clock.start();
  }, [openDoor]);
  useFrame(({ clock }) => {
    if (!withAnimation) return;

    if (
      door_type === Config.door.type.revolving_left &&
      tleftRef.current === undefined
    )
      return;
    if (
      door_type === Config.door.type.revolving_right &&
      trightRef.current === undefined
    )
      return;
    if (
      door_type === Config.door.type.revolving_double &&
      tleftDoubleRef.current === undefined &&
      trightDoubleRef.current === undefined
    )
      return;
    if ( 
      door_type === Config.door.type.flap_down &&
      tflapDownRef.current === undefined
    )
      return
    if (
      door_type === Config.door.type.flap_up &&
      tflapUpRef.current === undefined
    )
      return

    const elapsedTime = clock.getElapsedTime();
    if (model !== undefined) {
      if (openDoor) {
        switch (door_type) {
          case Config.door.type.revolving_left:
            if (tleftRef.current.rotation.y > -(Math.PI / 2 - 0.1))
              tleftRef.current.rotation.y = -elapsedTime;
            else {
              clock.stop();
            }
            break;
          case Config.door.type.revolving_right:
            if (trightRef.current.rotation.y < Math.PI / 2 - 0.1)
              trightRef.current.rotation.y = elapsedTime;
            else clock.stop();
            break;
          case Config.door.type.revolving_double:
            if (
              tleftDoubleRef.current.rotation.y > -(Math.PI / 2 - 0.1) ||
              trightDoubleRef.current.rotation.y < Math.PI / 2 - 0.1
            ) {
              tleftDoubleRef.current.rotation.y = -elapsedTime;
              trightDoubleRef.current.rotation.y = elapsedTime;
            } else clock.stop();
            break;
          case Config.door.type.flap_down:
            if (tflapDownRef.current.rotation.x < (Math.PI / 2 - 0.1))
              tflapDownRef.current.rotation.x = elapsedTime
            else clock.stop()
            break
          case Config.door.type.flap_up:
            if (tflapUpRef.current.rotation.x > -(Math.PI / 2 - 0.1))
              tflapUpRef.current.rotation.x = -elapsedTime
            else clock.stop()
            break
          default:
            break;
        }
      } else {
        switch (door_type) {
          case Config.door.type.revolving_left:
            if (
              tleftRef.current.rotation.y < 0 &&
              elapsedTime < 1.5 &&
              model !== undefined
            ) {
              tleftRef.current.rotation.y = -(Math.PI / 2 - 0.1) + elapsedTime;
            } else {
              tleftRef.current.rotation.y = 0;
              clock.stop();
            }
            break;
          case Config.door.type.revolving_right:
            if (trightRef.current.rotation.y > 0)
              trightRef.current.rotation.y = Math.PI / 2 - 0.1 - elapsedTime;
            else {
              trightRef.current.rotation.y = 0;
              clock.stop();
            }
            break;
          case Config.door.type.revolving_double:
            if (
              tleftDoubleRef.current.rotation.y < 0 ||
              trightDoubleRef.current.rotation.y > 0
            ) {
              tleftDoubleRef.current.rotation.y =
                -(Math.PI / 2 - 0.1) + elapsedTime;
              trightDoubleRef.current.rotation.y =
                Math.PI / 2 - 0.1 - elapsedTime;
            } else {
              tleftDoubleRef.current.rotation.y = 0;
              trightDoubleRef.current.rotation.y = 0;
              clock.stop();
            }
            break;
          case Config.door.type.flap_down:
            if (tflapDownRef.current.rotation.x > 0)
              tflapDownRef.current.rotation.x = (Math.PI / 2 - 0.1) - elapsedTime
            else {
              tflapDownRef.current.rotation.x = 0
              clock.stop()
            }
            break
          case Config.door.type.flap_up:
            if (tflapUpRef.current.rotation.x < 0)
              tflapUpRef.current.rotation.x = -(Math.PI / 2 - 0.1) + elapsedTime
            else {
              tflapUpRef.current.rotation.x = 0
              clock.stop()
            }
            break
          default:
            break;
        }
      }
    }
  });
  const Griffs = () => {
    const griffes = [];
    let positionY = -scale[1] / 2;
    let tempPositionY
    if (drawerGroupScale?.length === 1) {
      griffes.push(
        <group ref={drawerRef} position={[0, 0, depth / 2]}>
          <GriffModel
             object={model}
             scale={modelScale}
             rotation={[-Math.PI / 2, 0, 0]}
           />
        </group>
      )
    } else {
      for (let i = 0; i < drawerGroupScale?.length; i++) {
        if (i === 0) {
          positionY += drawerGroupScale[i] / 2 -topShelfDistance;
          tempPositionY = drawerGroupScale[i] / 2
        } else {
          positionY +=  drawerGroupScale[i] / 2 + tempPositionY + Config.furnishing.shelf.thickness1 + topShelfDistance
            + Config.furnishing.drawer.bottomShelfDistance
  
          tempPositionY = drawerGroupScale[i] / 2
        }
        const scaleY = drawerGroupScale[i] + topShelfDistance - 0.475
                        + Config.furnishing.drawer.bottomShelfDistance + Config.furnishing.shelf.thickness1
  
        griffes.push(
          <group ref={drawerRef} position={[0, positionY, depth / 2]}>
            <GriffModel
               object={model}
               scale={modelScale}
               rotation={[-Math.PI / 2, 0, 0]}
             />
          </group>
        )                
      }
    }

    return griffes;
    
  }
  return (
    <group
      visible={visible && !pushOpen && model !== undefined}
      position={[
        type === Config.furnishing.type.drawer || door_type === Config.door.type.flap_down || door_type === Config.door.type.flap_up
          ? 0
          : handleDirection === "V"
          ? handleInfo.xOffset
          : handleInfo.xOffset - handleInfo.yOffset,
        type === Config.furnishing.type.drawer || door_type === Config.door.type.flap_down || door_type === Config.door.type.flap_up
          ? 0
          : handleDirection === "V"
          ? handleInfo.yOffset
          : 0,
        type === Config.furnishing.type.drawer || door_type === Config.door.type.flap_down || door_type === Config.door.type.flap_up
          ? 0 : handleInfo.zOffset,
      ]}
    >
      {model !== undefined && (
        <Suspense fallback={null}>
          {door_type === Config.door.type.revolving_left && (
            <group
              ref={tleftRef}
              position={[
                handleDirection === "V"
                  ? -totalx
                  : -totalx + handleInfo.yOffset,
                0,
                0,
              ]}
            >
              <group
                ref={leftRef}
                position={[
                  handleDirection === "V"
                    ? positionX + totalx
                    : positionX + totalx - handleInfo.yOffset,
                  positionY,
                  Config.plate.thickness / 2,
                ]}
              >
                <GriffModel
                  object={model}
                  scale={modelScale}
                  rotation={[-Math.PI / 2, rotationY, 0]}
                />
              </group>
            </group>
          )}
          {door_type === Config.door.type.revolving_right && (
            <group
              ref={trightRef}
              position={[
                handleDirection === "V"
                  ? -totalx
                  : -totalx + handleInfo.yOffset,
                0,
                0,
              ]}
            >
              <group
                ref={rightRef}
                position={[
                  handleDirection === "V"
                    ? positionX + totalx
                    : positionX + totalx - handleInfo.yOffset,
                  positionY,
                  Config.plate.thickness / 2,
                ]}
              >
                <GriffModel
                  object={model}
                  scale={modelScale}
                  rotation={[-Math.PI / 2, rotationY, 0]}
                />
              </group>
            </group>
          )}
          {door_type === Config.door.type.revolving_double && (
            <>
              <group
                ref={trightDoubleRef}
                position={[
                  handleDirection === "V"
                    ? width / 2
                    : width / 2 + handleInfo.yOffset,
                  0,
                  0,
                ]}
              >
                <group
                  ref={rightDoubleRef}
                  position={[
                    handleDirection === "V"
                      ? handleInfo.verticalX - width / 2
                      : handleInfo.horizontalX - width / 2 - handleInfo.yOffset,
                    positionY,
                    Config.plate.thickness / 2,
                  ]}
                >
                  <GriffModel
                    object={model}
                    scale={modelScale}
                    rotation={[-Math.PI / 2, rotationY, 0]}
                  />
                </group>
              </group>
              <group
                ref={tleftDoubleRef}
                position={[
                  handleDirection === "V"
                    ? -width / 2
                    : -width / 2 + handleInfo.yOffset,
                  0,
                  0,
                ]}
              >
                <group
                  ref={leftDoubleRef}
                  position={[
                    handleDirection === "V"
                      ? -handleInfo.verticalX + width / 2
                      : -handleInfo.horizontalX +
                        width / 2 -
                        handleInfo.yOffset,
                    positionY,
                    Config.plate.thickness / 2,
                  ]}
                >
                  <GriffModel
                    object={model}
                    scale={modelScale}
                    rotation={[-Math.PI / 2, rotationY, 0]}
                  />
                </group>
              </group>
            </>
          )}
          {type === Config.furnishing.type.drawer && (
            // <group ref={drawerRef} position={[0, 0, depth / 2]}>
            //   {drawerGroupScale.length === 1 ? (
            //     <GriffModel
            //       object={model}
            //       scale={modelScale}
            //       rotation={[-Math.PI / 2, 0, 0]}
            //     />
            //   ) : (
                Griffs()
            //   )}
            // </group>
          )}
          {door_type === Config.door.type.flap_up && (
            <group ref={tflapUpRef} position={[0, scale[1]/2, 0]}>
              <group
                ref={flapUpRef}
                position={[0, -scale[1] + handleInfo.horizontalY, Config.plate.thickness / 2]}
              >
                <GriffModel
                  object={model}
                  scale={modelScale}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
            </group>
          )}
          {door_type === Config.door.type.flap_down && (
            <group ref={tflapDownRef} position={[0, -scale[1]/2, 0]}>
              <group
                ref={flapDownRef}
                position={[0, scale[1] - handleInfo.horizontalY, Config.plate.thickness / 2]}
              >
                <GriffModel
                  object={model}
                  scale={modelScale}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
            </group>
          )}
        </Suspense>
      )}
    </group>
  );
}
