/* eslint-disable react/no-unknown-property */
import React from "react";
import { RoundedBoxGeometry } from "three-stdlib";
import CustomMaterial from "./customMaterial";
import Config from "../../../config";
import { extend } from "@react-three/fiber";
import useDimensionStore from "../../zustand/dimensionStore";
import ColorMaterial from "./colorMaterial";
import WoodMaterial from "./woodMaterial";
extend({ RoundedBoxGeometry });

const Plate = React.memo(function Plate(props) {
  const korpusType = useDimensionStore.use.korpusType();
  const {
    // category = Config.color.category.body,
    category,
    position = [0, 0, 0],
    type,
    args,
    korpusMaterial,
    korpShelf,
    ...rest
  } = props;
  // console.log(category)
  return (
    <mesh
      {...rest}
      position={[position[0], position[1], 
        korpShelf === Config.furnishing.type.foldBottom &&
        korpusType === Config.korpusType.innerShap2 ?  position[2] + 1.9*1.25 : position[2]]}
      castShadow
      receiveShadow
    >

          <roundedBoxGeometry args={[...args, 4, Config.plate.radius]} />
          <CustomMaterial category={category} type={type} />

      {/* <roundedBoxGeometry args={[...args, 4, Config.plate.radius]} />
      { korpusMaterial == true &&
      (korpusType == Config.korpusType.topShap ||
        korpusType == Config.korpusType.uShap ||
        korpusType == Config.korpusType.innerShap) ? (
          <WoodMaterial mName={"wtype3"} type={type} />
      ) : (
        <CustomMaterial category={category} type={type} />
      )} */}
    </mesh>
  );
});

export default Plate;
