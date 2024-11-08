import React, { useMemo } from "react"

import DrawerBody from "./drawerBody"
import Config from "../../../config"
import { getInternalDrawerScale } from "../../utils/getInfo"
import Plate from "./Plate"

const internalDrawerConfig = Config.furnishing.internalDrawer

const InternalDrawr = React.memo(function InternalDrawer(props) {
  const { scale, depth, visible, topVisible, bottomVisible, sideVisible } =
    props

  const internalDrawerScale = useMemo(() => {
    return getInternalDrawerScale(scale, depth)
  }, [scale, depth])

  return (
    // eslint-disable-next-line react/no-unknown-property
    <group visible={visible}>
      <DrawerBody scale={scale} />

      {/* right panel */}
      <Plate
        args={internalDrawerScale.side}
        position={[
          scale[0] / 2 +
            internalDrawerConfig.panelSpace +
            internalDrawerConfig.panelWidth / 2,
          -internalDrawerConfig.bottomShelfDistance / 2,
          scale[2] / 2 +
            Config.plate.thickness -
            (depth -
              internalDrawerConfig.frontInnerSpace -
              Config.plate.backIncident -
              Config.plate.backThickness) /
              2,
        ]}
        visible={sideVisible}
        type={Config.plate.type.side}
        category={Config.color.category.body}
      />

      {/* left panel */}
      <Plate
        args={internalDrawerScale.side}
        position={[
          -scale[0] / 2 -
            internalDrawerConfig.panelSpace -
            internalDrawerConfig.panelWidth / 2,
          -internalDrawerConfig.bottomShelfDistance / 2,
          scale[2] / 2 +
            Config.plate.thickness -
            (depth -
              internalDrawerConfig.frontInnerSpace -
              Config.plate.backIncident -
              Config.plate.backThickness) /
              2,
        ]}
        visible={sideVisible}
        type={Config.plate.type.side}
        category={Config.color.category.body}
      />

      {/* top shelf */}
      <Plate
        args={internalDrawerScale.top}
        position={[
          0,
          scale[1] / 2 +
            internalDrawerConfig.topShelfDistance +
            Config.plate.thickness / 2,
          scale[2] / 2 +
            Config.plate.thickness -
            (depth -
              internalDrawerConfig.frontInnerSpace -
              Config.plate.backIncident -
              Config.plate.backThickness) /
              2,
        ]}
        visible={topVisible}
        type={Config.plate.type.floor}
        category={Config.color.category.body}
      />

      {/* bottom shelf */}
      <Plate
        args={internalDrawerScale.bottom}
        position={[
          0,
          -scale[1] / 2 -
            internalDrawerConfig.bottomShelfDistance -
            Config.plate.thickness / 2,
          scale[2] / 2 +
            Config.plate.thickness -
            (depth -
              internalDrawerConfig.frontInnerSpace -
              Config.plate.backIncident -
              Config.plate.backThickness) /
              2,
        ]}
        visible={bottomVisible}
        type={Config.plate.type.floor}
        category={Config.color.category.body}
      />

      {/* front plate */}
      <Plate
        args={internalDrawerScale.front}
        position={[
          0,
          -(
            internalDrawerConfig.bottomShelfDistance -
            internalDrawerConfig.frontSpace
          ) / 2,
          scale[2] / 2 + Config.plate.thickness / 2,
        ]}
        type={Config.plate.type.back}
        category={Config.color.category.body}
      />
    </group>
  )
})

export default InternalDrawr
