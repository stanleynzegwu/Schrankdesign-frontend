import React, { useRef, useMemo, useEffect } from "react";
import Config from "../../../config";
import Plate from "./Plate";
import {
  getDoorHeight,
  getFlapWidth,
  getFlapPositionX,
  getFlapPositionY,
} from "../../utils/getInfo";
import useDimensionStore from "../../zustand/dimensionStore";
import useCornerStore from "../../zustand/cornerStore";
import { useFrame, useThree } from "@react-three/fiber";
const Flap = React.memo(function Flap(props) {
  let {
    scale,
    door_type,
    door_category,
    elementIndex,
    topAsset,
    bottomAsset,
    visible,
    withAnimation,
    xIndex,
    yPos,
  } = props;
  const korpusType = useDimensionStore.use.korpusType();

  const downRef = useRef();
  const upRef = useRef();
  const openDoor = useCornerStore.use.openDoor();

  const { clock } = useThree();

  // if (
  //   scale[1] > Config.door.flap_height_range.max ||
  //   scale[1] < Config.door.flap_height_range.min ||
  //   scale[0] > Config.door.flap_width_range.max ||
  //   scale[0] < Config.door.flap_width_range.min
  // ) {
  //   visible = false;
  // }

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
    return getFlapWidth(scale[0], elementIndex, korpusType);
  }, [scale[0], elementIndex, korpusType]);

  const height = useMemo(() => {
    return getDoorHeight(scale[1], topAsset, bottomAsset, korpusType);
  }, [scale[1], topAsset, bottomAsset, korpusType]);

  const positionX = useMemo(() => {
    return getFlapPositionX(
      door_type,
      posX,
      posY,
      width,
      korpusType,
      elementIndex
    );
  }, [door_type, posX, posX, width, elementIndex]);

  const positionY = useMemo(() => {
    return getFlapPositionY(
      door_type,
      posX,
      posY,
      korpusType,
      topAsset,
      bottomAsset
    );
  }, [door_type, posX, posY, korpusType, topAsset, bottomAsset]);

  useEffect(() => {
    clock.start();
  }, [openDoor]);

  useFrame(({ clock }) => {
    if (!withAnimation) return;

    if (
      door_type === Config.door.type.flap_down &&
      downRef.current === undefined
    )
      return;
    if (door_type === Config.door.type.flap_up && upRef.current === undefined)
      return;
    const elapsedTime = clock.getElapsedTime();
    if (openDoor) {
      switch (door_type) {
        case Config.door.type.flap_down:
          if (downRef.current.rotation.x < Math.PI / 2 - 0.1)
            downRef.current.rotation.x = elapsedTime;
          else clock.stop();
          break;
        case Config.door.type.flap_up:
          if (upRef.current.rotation.x > -(Math.PI / 2 - 0.1))
            upRef.current.rotation.x = -elapsedTime;
          else clock.stop();
          break;
        default:
          break;
      }
    } else {
      switch (door_type) {
        case Config.door.type.flap_down:
          if (downRef.current.rotation.x > 0)
            downRef.current.rotation.x = Math.PI / 2 - 0.1 - elapsedTime;
          else {
            downRef.current.rotation.x = 0;
            clock.stop();
          }
          break;
        case Config.door.type.flap_up:
          if (upRef.current.rotation.x < 0)
            upRef.current.rotation.x = -(Math.PI / 2 - 0.1) + elapsedTime;
          else {
            upRef.current.rotation.x = 0;
            clock.stop();
          }
          break;
        default:
          break;
      }
    }
  });

  return (
    <group visible={visible}>
      {door_type === Config.door.type.flap_down && (
        <group ref={downRef} position={[0, -height / 2, 0]}>
          <Plate
            args={[width, height, scale[2]]}
            position={[positionX, positionY + height / 2, 0]}
            type={Config.furnishing.type.flap}
            catergory={Config.color.category.front}
          />
        </group>
      )}
      {door_type === Config.door.type.flap_up && (
        <group ref={upRef} position={[0, +height / 2, 0]}>
          <Plate
            args={[width, height, scale[2]]}
            position={[positionX, positionY - height / 2, 0]}
            type={Config.furnishing.type.flap}
            catergory={Config.color.category.front}
          />
        </group>
      )}
    </group>
  );
});

export default Flap;
