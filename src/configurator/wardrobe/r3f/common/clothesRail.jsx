/* eslint-disable react/no-unknown-property */
import { OBJLoader, MTLLoader } from "three-stdlib"
import { useLoader, extend } from "@react-three/fiber"
import React, { useMemo } from "react"
import Config from "../../../config"

extend({ OBJLoader, MTLLoader })

const ClothesRail = React.memo(function ClothesRail(props) {
  const { width, visible } = props

  const endMaterial = useLoader(MTLLoader, "/models/rail_end.mtl")
  const endObj = useLoader(OBJLoader, "/models/rail_end.obj", (loader) => {
    endMaterial.preload()
    loader.setMaterials(endMaterial)
  })

  const bodyMaterial = useLoader(MTLLoader, "/models/rail_body.mtl")
  const bodyObj = useLoader(OBJLoader, "/models/rail_body.obj", (loader) => {
    bodyMaterial.preload()
    loader.setMaterials(bodyMaterial)
  })

  const endClone1 = useMemo(() => endObj.clone(), [endObj])
  const endClone2 = useMemo(() => endObj.clone(), [endObj])
  const bodyClone = useMemo(() => bodyObj.clone(), [bodyObj])

  return (
    <group visible={visible}>
      <primitive
        object={endClone1}
        scale={[0.1, 0.1, 0.1]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        position={[-width / 2, Config.furnishing.clothesRail.posYDelta, 0]}
      />

      <primitive
        object={bodyClone}
        scale={[
          0.1,
          (width - 2 * Config.furnishing.clothesRail.widthDelta) * 0.01,
          0.1,
        ]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        position={[width / 2 - Config.furnishing.clothesRail.widthDelta, 0, 0]}
      />

      <primitive
        object={endClone2}
        scale={[0.1, 0.1, 0.1]}
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        position={[width / 2, Config.furnishing.clothesRail.posYDelta, 0]}
      />
    </group>
  )
})

export default ClothesRail
