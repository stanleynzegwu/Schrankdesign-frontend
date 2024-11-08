/* eslint-disable react/no-unknown-property */
import { OBJLoader, MTLLoader } from "three-stdlib"
import { useLoader, extend } from "@react-three/fiber"
import React, { useMemo } from "react"

import Config from "../../../config"
import Plate from "./Plate"

extend({ OBJLoader, MTLLoader })

const PantsPullout = React.memo(function PantsPullout(props) {
  const { scale, visible } = props

  const pantsMaterial = useLoader(MTLLoader, "/models/pants_pullout.mtl")
  const pantsObj = useLoader(
    OBJLoader,
    "/models/pants_pullout.obj",
    (loader) => {
      pantsMaterial.preload()
      loader.setMaterials(pantsMaterial)
    }
  )

  const pantsClone = useMemo(() => pantsObj.clone(), [pantsObj])

  return (
    <group visible={visible}>
      <Plate args={scale} type={Config.plate.type.floor} />
      <primitive
        object={pantsClone}
        scale={[0.1, 0.1, 0.1]}
        rotation={[-Math.PI / 2, 0, Math.PI]}
        position={[
          0,
          -scale[1] / 2,
          Config.furnishing.pantsPullout.depthDiff -
            Config.furnishing.pantsPullout.pulloutDepth / 2,
        ]}
      />
    </group>
  )
})

export default PantsPullout
