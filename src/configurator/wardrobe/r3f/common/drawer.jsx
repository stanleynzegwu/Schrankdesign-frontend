import DrawerBody from "./drawerBody";
import React, { useMemo } from "react";

import Config from "../../../config";
import { getOuterDrawerScale } from "../../utils/getInfo";
import Plate from "./Plate";
import useDimensionStore from "../../zustand/dimensionStore";
import useFurnishingStore from "../../zustand/furnishingStore";
import useDndStore from "../../zustand/dndStore";
const drawerConfig = Config.furnishing.drawer;

const Drawer = React.memo(function Drawer(props) {
  // scale is just for the body part
  // position is a center of body part
  const {
    scale,
    depth,
    elementIndex,
    visible,
    topVisible,
    bottomVisible,
    topShelfDistance,
    position,
    type,
    topAsset,
    bottomAsset,
    xIndex,
    drawerGroup,
    drawerGroupScale,
    drag,
  } = props;
  // console.log(drawerGroup, drawerGroupScale, drag)
  const height = useDimensionStore.use.height();
  const korpusType = useDimensionStore.use.korpusType();
  const outerDrawerScale = useMemo(() => {
    return getOuterDrawerScale(
      scale,
      depth,
      elementIndex,
      topShelfDistance,
      korpusType,
      topVisible,
      bottomVisible,
      topAsset,
      bottomAsset
    );
  }, [scale, depth, elementIndex, topShelfDistance, korpusType, position, height]);

  const frontplateVisible = useDndStore.use.frontplateVisible();

  const positionX = (korpusType) => {
    let positionX = 0;
    if (
      elementIndex === Config.elementIndex.first &&
      (korpusType === Config.korpusType.uShap ||
        korpusType === Config.korpusType.innerShap ||
        korpusType === Config.korpusType.innerShap2)
    ) {
      if (korpusType === Config.korpusType.innerShap2) {
        positionX += -Config.plate.thickness / 4 + 0.475;
      } else {
        positionX += -Config.plate.thickness / 4 + 0.95;
      }
      return positionX;
    }

    if (
      elementIndex === Config.elementIndex.last &&
      (korpusType === Config.korpusType.uShap ||
        korpusType === Config.korpusType.innerShap ||
        korpusType === Config.korpusType.innerShap2)
    ) {
      if (korpusType === Config.korpusType.innerShap2) {
        positionX += Config.plate.thickness / 4 - 0.475;
      } else {
        positionX += -Config.plate.thickness / 4;
      }
      return positionX;
    }

    if (elementIndex === Config.elementIndex.first) {
      positionX -= Config.plate.thickness / 4;
    }

    if (elementIndex === Config.elementIndex.last) {
      positionX += Config.plate.thickness / 4;
    }

    return positionX;
  };

  const positionY = (
    topShelfDistance,
    drawerConfig,
    topVisible,
    bottomVisible,
    topAsset,
    bottomAsset,
    korpusType
  ) => {
    let positionY = (topShelfDistance - drawerConfig.bottomShelfDistance) / 2;
    if (
      (korpusType === Config.korpusType.empty || korpusType === Config.korpusType.outerShap) &&
      topVisible === false &&
      topAsset === "none"
    ) {
      // console.log("here", korpusType, topVisible, topAsset)
      return (positionY += 0.475);
    }
    if (
      (korpusType === Config.korpusType.empty ||
        korpusType === Config.korpusType.outerShap ||
        korpusType === Config.korpusType.topShap ||
        korpusType === Config.korpusType.uShap) &&
      bottomVisible === false &&
      bottomAsset === "none"
    ) {
      return (positionY -= 0.475);
    }
    if (
      (korpusType === Config.korpusType.topShap ||
        korpusType === Config.korpusType.uShap ||
        korpusType === Config.korpusType.innerShap ||
        korpusType === Config.korpusType.innerShap2) &&
      topVisible === false
    ) {
      if (korpusType === Config.korpusType.innerShap2) {
        return positionY;
      }
      if (topAsset !== Config.furnishing.type.drawer && topVisible === false) {
        return (positionY -= 0.475);
      }
    }

    if (
      (korpusType === Config.korpusType.innerShap || korpusType === Config.korpusType.innerShap2) &&
      bottomVisible === false
    ) {
      if (korpusType === Config.korpusType.innerShap2) {
        return positionY;
      }
      if (bottomAsset !== Config.furnishing.type.drawer && bottomVisible === false) {
        return (positionY += 0.475);
      }
    }

    return positionY;
  };
  const frontPlate = () => {
    const plates = [];
    let positionY = -scale[1] / 2;
    let tempPositionY;
    for (let i = 0; i < drawerGroupScale.length; i++) {
      if (i === 0) {
        positionY += drawerGroupScale[i] / 2 - topShelfDistance;
        tempPositionY = drawerGroupScale[i] / 2;
      } else {
        positionY +=
          drawerGroupScale[i] / 2 +
          tempPositionY +
          Config.furnishing.shelf.thickness1 +
          topShelfDistance +
          Config.furnishing.drawer.bottomShelfDistance;

        tempPositionY = drawerGroupScale[i] / 2;
      }
      const scaleY =
        drawerGroupScale[i] +
        topShelfDistance -
        0.475 +
        Config.furnishing.drawer.bottomShelfDistance +
        Config.furnishing.shelf.thickness1;
      plates.push(
        <Plate
          key={i} // Ensure each element has a unique key
          args={[outerDrawerScale.front[0], scaleY, outerDrawerScale.front[2]]}
          position={[
            positionX(korpusType),
            positionY,
            scale[2] / 2 + drawerConfig.frontThickness / 2,
          ]}
          type={Config.plate.type.back}
          category={Config.color.category.front}
          visible={frontplateVisible}
        />
      );
    }

    return plates;
  };
  const bodyGroup = () => {
    const plates = [];
    let tempPositionY;
    let positionY = -scale[1] / 2;
    for (let i = 0; i < drawerGroupScale.length; i++) {
      // console.log(drawerGroupScale[i])
      if (i === 0) {
        positionY += drawerGroupScale[i] / 2;
        tempPositionY = drawerGroupScale[i] / 2;
      } else {
        positionY +=
          drawerGroupScale[i] / 2 +
          tempPositionY +
          Config.furnishing.shelf.thickness1 +
          topShelfDistance +
          Config.furnishing.drawer.bottomShelfDistance;
        tempPositionY = drawerGroupScale[i] / 2;
      }
      plates.push(
        <group position={[0, positionY, 0]}>
          <DrawerBody scale={[scale[0], drawerGroupScale[i], scale[2]]} />
        </group>
      );
    }

    return plates;
  };

  const shelfPlate = () => {
    const shelf = [];
    let positionY = -scale[1] / 2;
    for (let i = 0; i < drawerGroupScale.length - 1; i++) {
      if (i === 0) {
        positionY += drawerGroupScale[i] + Config.furnishing.drawer.bottomShelfDistance;
      } else {
        positionY +=
          drawerGroupScale[i] +
          Config.furnishing.shelf.thickness1 +
          topShelfDistance +
          Config.furnishing.drawer.bottomShelfDistance;
      }

      shelf.push(
        <Plate
          args={outerDrawerScale.top}
          position={[
            0,
            positionY,
            scale[2] / 2 -
              Config.furnishing.drawer.bodyFrontIncident -
              depth / 2 +
              Config.plate.backThickness / 2 +
              Config.plate.backIncident / 2 +
              (korpusType === Config.korpusType.innerShap2 ? 0.95 : 0),
          ]}
          visible={topVisible}
          type={Config.plate.type.floor}
          category={Config.color.category.body}
        />
      );
    }

    return shelf;
  };
  return (
    // eslint-disable-next-line react/no-unknown-property
    <group visible={visible}>
      {drawerGroup > 1 ? bodyGroup() : <DrawerBody scale={scale} />}
      {/* top shelf */}
      <Plate
        args={outerDrawerScale.top}
        position={[
          0,
          scale[1] / 2 + topShelfDistance + Config.plate.thickness / 2,
          scale[2] / 2 -
            Config.furnishing.drawer.bodyFrontIncident -
            depth / 2 +
            Config.plate.backThickness / 2 +
            Config.plate.backIncident / 2 +
            (korpusType === Config.korpusType.innerShap2 ? 0.95 : 0),
        ]}
        visible={topVisible}
        type={Config.plate.type.floor}
        category={Config.color.category.body}
      />
      {/* bottom shelf */}
      <Plate
        args={outerDrawerScale.bottom}
        position={[
          0,
          -scale[1] / 2 - drawerConfig.bottomShelfDistance - Config.plate.thickness / 2,
          scale[2] / 2 -
            Config.furnishing.drawer.bodyFrontIncident -
            depth / 2 +
            Config.plate.backThickness / 2 +
            Config.plate.backIncident / 2 +
            (korpusType === Config.korpusType.innerShap2 ? 0.95 : 0),
        ]}
        visible={bottomVisible}
        type={Config.plate.type.floor}
        category={Config.color.category.body}
      />
      {/* front plate */}
      {drawerGroup > 1 ? (
        frontPlate()
      ) : (
        <Plate
          args={outerDrawerScale.front}
          // args={args}
          // position={position}
          position={[
            positionX(korpusType),
            positionY(
              topShelfDistance,
              drawerConfig,
              topVisible,
              bottomVisible,
              topAsset,
              bottomAsset,
              korpusType
            ),

            scale[2] / 2 + drawerConfig.frontThickness / 2,
          ]}
          type={Config.plate.type.back}
          category={Config.color.category.front}
          visible={frontplateVisible}
        />
      )}

      {/* shelf plate */}
      {drawerGroup > 1 && shelfPlate()}
    </group>
  );
});

export default Drawer;
