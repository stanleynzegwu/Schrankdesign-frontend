import React, { forwardRef } from "react";
import { extend } from "@react-three/fiber";
import CustomMaterial from "./customMaterial";
import { RoundedBoxGeometry } from "three-stdlib";
import Config from "../../../config";
import useDimensionStore from "../../zustand/dimensionStore";

extend({ RoundedBoxGeometry });

const Shelf = React.memo(
  forwardRef(function Plate(props, ref) {
    const korpusType = useDimensionStore.use.korpusType();
    const { category, type, scale, korpusMaterial, korpShelf, ...rest } = props;

    const position = props.position || [0, 0, 0];
    const z =
      korpShelf === Config.furnishing.type.foldBottom &&
      korpusType === Config.korpusType.innerShap2;

    return (
      <mesh
        ref={ref}
        {...rest}
        position={[position[0], position[1], z ? position[2] + 1.9 * 1.25 : position[2]]}
        castShadow
        receiveShadow
      >
        <roundedBoxGeometry args={[...scale, 4, Config.plate.radius]} />
        <CustomMaterial category={category} type={type} />
      </mesh>
    );
  })
);

export default Shelf;
