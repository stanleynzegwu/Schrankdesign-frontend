import React from "react";
import Plate from "./Plate";
import Config from "../../../config";

const DividerPage = React.memo(function DividerPage(props) {
  const { scale, leftWidth, visible, topShelfVisible, type } = props;

  return (
    <group visible={visible}>
      {/* devider */}
      <Plate
        args={[
          Config.furnishing.divider.thickness,
          topShelfVisible === true ? scale[1] - Config.furnishing.divider.thickness : scale[1],
          scale[2],
        ]}
        position={[
          -scale[0] / 2 + leftWidth + Config.furnishing.divider.thickness / 2,
          topShelfVisible === true ? -Config.furnishing.divider.thickness / 2 : 0,
          0,
        ]}
        type={Config.plate.type.side}
        category={Config.color.category.body}
      />

      {/* // ! top plate - add this conditionally, if ! top plate then add top plate at top position */}
      {/* <Plate
        Sv3n="Hi"
        args={[scale[0], Config.furnishing.divider.thickness, scale[2]]}
        position={[
          0,
          scale[1] / 2 - Config.furnishing.divider.thickness / 2,
          0,
        ]}
        type={Config.plate.type.floor}
        corpShelf={type}
        category={Config.color.category.body}
      /> */}
    </group>
  );
});

export default DividerPage;
