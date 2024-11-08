import { RoundedBox } from "@react-three/drei"
import React from "react"

import Config from "../../../config"

/* eslint-disable react/no-unknown-property */
const LedLighting = React.memo(function LedLighting(props) {
  const { scale, visible } = props
  return (
    <group
      visible={visible}
    >
      <RoundedBox
        castShadow
        args={[Config.furnishing.ledLighting.defaultWidth, scale[1], scale[2]]}
        position={[
          -scale[0] / 2 + Config.furnishing.ledLighting.defaultWidth / 2,
          0,
          0,
        ]}
        material={Config.furnishing.ledLighting.material}
      />
      <RoundedBox
        castShadow
        args={[Config.furnishing.ledLighting.defaultWidth, scale[1], scale[2]]}
        position={[
          scale[0] / 2 - Config.furnishing.ledLighting.defaultWidth / 2,
          0,
          0,
        ]}
        material={Config.furnishing.ledLighting.material}
      />
    </group>
  )
})

export default LedLighting
