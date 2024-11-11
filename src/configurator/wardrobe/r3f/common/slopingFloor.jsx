import React, { useMemo } from "react"
import Config from "../../../config"
import Plate from "./Plate"

const slopingConfig = Config.furnishing.slopingFloor

const SlopingFloor = React.memo(function SlopingFloor(props) {
  const { width, depth, visible } = props

  const floor_depth = useMemo(
    () =>
      (depth -
        2 * slopingConfig.zIncident -
        (slopingConfig.wallHeight + slopingConfig.thickness) *
          Math.sin(slopingConfig.angle)) /
      Math.cos(slopingConfig.angle),
    [depth]
  )

  return (
    <group visible={visible} rotation-x={slopingConfig.angle}>
      {/* floor */}
      <Plate
        args={[width, slopingConfig.thickness, floor_depth]}
        position={[0, slopingConfig.thickness / 2, -floor_depth / 2]}
        type={Config.plate.type.floor}
        category={Config.color.category.body}
      />

      {/* wall front */}
      <Plate
        args={[width, slopingConfig.wallHeight, slopingConfig.thickness]}
        position={[
          0,
          slopingConfig.thickness + slopingConfig.wallHeight / 2,
          -slopingConfig.thickness / 2,
        ]}
        type={Config.plate.type.back}
        category={Config.color.category.body}
      />

      {/* wall middle */}
      <Plate
        args={[width, slopingConfig.wallHeight, slopingConfig.thickness]}
        position={[
          0,
          slopingConfig.thickness + slopingConfig.wallHeight / 2,
          -floor_depth / 2,
        ]}
        type={Config.plate.type.back}
        category={Config.color.category.body}
      />

      {/* wall back */}
      <Plate
        args={[width, slopingConfig.wallHeight, slopingConfig.thickness]}
        position={[
          0,
          slopingConfig.thickness + slopingConfig.wallHeight / 2,
          -floor_depth + slopingConfig.thickness / 2,
        ]}
        type={Config.plate.type.back}
        category={Config.color.category.body}
      />
    </group>
  )
})

export default SlopingFloor
