import Config from "../../../config"
import React, { useEffect } from "react"
import Plate from "./Plate"
// import { getDividerHeight } from "../../utils/getInfo"
// import useFurnishingStore from "../../zustand/furnishingStore"
import useDimensionStore from "../../zustand/dimensionStore"
const DividerPage = React.memo(function DividerPage(props) {
  const { scale, leftWidth, visible, topShelfVisible } = props
  const height = useDimensionStore.use.height()
  useEffect(() => {
  }, [height])
  
  return (
    // eslint-disable-next-line react/no-unknown-property
    <group visible={visible}>
      <Plate
        args={[
          Config.furnishing.divider.thickness,
          topShelfVisible === true
            ? scale[1] - Config.furnishing.divider.thickness
            : scale[1],
          scale[2],
        ]}
        position={[
          -scale[0] / 2 + leftWidth + Config.furnishing.divider.thickness / 2,
          topShelfVisible === true
            ? -Config.furnishing.divider.thickness / 2
            : 0,
          0,
        ]}
        type={Config.plate.type.side}
        category={Config.color.category.body}
      />
      {/* top shelf */}
      <Plate
        args={[scale[0], Config.furnishing.divider.thickness, scale[2]]}
        position={[
          0,
          scale[1] / 2 - Config.furnishing.divider.thickness / 2,
          0,
        ]}
        type={Config.plate.type.floor}
        visible={topShelfVisible}
        category={Config.color.category.body}
      />
    </group>
  )
})

export default DividerPage
