import React, { useMemo } from "react"

import Config from "../../../config"
import Plate from "./Plate"
import { getDrawerPlateScale } from "../../utils/getInfo"

const drawerConfig = Config.furnishing.drawer

const DrawerBody = React.memo(function DrawerBody(props) {
  const { scale } = props

  const plateScale = useMemo(() => {
    return getDrawerPlateScale(scale)
  }, [scale])
  // console.log( plateScale, scale)
  return (
    <group>
      {/* left Side */}
      <Plate
        args={plateScale.left_right}
        position={[-scale[0] / 2 + drawerConfig.thickness / 2, 0, 0]}
        type={Config.plate.type.side}
        category={Config.color.category.body}
      />
      {/* right Side */}
      <Plate
        args={plateScale.left_right}
        position={[scale[0] / 2 - drawerConfig.thickness / 2, 0, 0]}
        type={Config.plate.type.side}
        category={Config.color.category.body}
      />
      {/* bottom Side */}
      <Plate
        args={plateScale.bottom}
        position={[
          0,
          -scale[1] / 2 +
            drawerConfig.bottomIncident +
            drawerConfig.thickness / 2,
          0,
        ]}
        type={Config.plate.type.floor}
        category={Config.color.category.body}
      />
      {/* back Side */}
      <Plate
        args={plateScale.back}
        position={[
          0,
          (drawerConfig.bottomIncident +
            drawerConfig.thickness -
            drawerConfig.backHeightDifference) /
            2,
          -scale[2] / 2 + drawerConfig.thickness / 2,
        ]}
        type={Config.plate.type.back}
        category={Config.color.category.body}
      />
    </group>
  )
})

export default DrawerBody
