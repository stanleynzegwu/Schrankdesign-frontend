import React from "react";
import { extend } from "@react-three/fiber";
import CustomMaterial from "./customMaterial";
import { RoundedBoxGeometry } from "three-stdlib";
import Config from "../../../config";
import useDimensionStore from "../../zustand/dimensionStore";

extend({ RoundedBoxGeometry });
// PLate shelf
const Plate = React.memo(function Plate(props) {
  const korpusType = useDimensionStore.use.korpusType();
  const { category, type, args, korpusMaterial, korpShelf, ...rest } = props;

  const position = props.position || [0, 0, 0];
  const z =
    korpShelf === Config.furnishing.type.foldBottom && korpusType === Config.korpusType.innerShap2;

  return (
    <mesh
      {...rest}
      position={[position[0], position[1], z ? position[2] + 1.9 * 1.25 : position[2]]}
      castShadow
      receiveShadow
    >
      <roundedBoxGeometry args={[...args, 4, Config.plate.radius]} />
      <CustomMaterial category={category} type={type} />
    </mesh>
  );
});

export default Plate;
