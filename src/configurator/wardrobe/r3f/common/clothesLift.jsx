/* eslint-disable react/no-unknown-property */
import { OBJLoader, MTLLoader } from "three-stdlib"
import { useLoader, extend } from "@react-three/fiber"
import React, { useMemo } from "react"
import Config from "../../../config"

extend({ OBJLoader, MTLLoader })

const ClothesLift = React.memo(function ClothesLift({ width, visible }) {
  const railMaterial = useLoader(MTLLoader, "/models/rails.mtl")
  const railObj = useLoader(OBJLoader, "/models/rails.obj", (loader) => {
    railMaterial.preload()
    loader.setMaterials(railMaterial)
  })

  const leftMaterial = useLoader(MTLLoader, "/models/lefts.mtl")
  const leftObj = useLoader(OBJLoader, "/models/lefts.obj", (loader) => {
    leftMaterial.preload()
    loader.setMaterials(leftMaterial)
  })

  const rightMaterial = useLoader(MTLLoader, "/models/right.mtl")
  const rightObj = useLoader(OBJLoader, "/models/right.obj", (loader) => {
    rightMaterial.preload()
    loader.setMaterials(rightMaterial)
  })

  const handleMaterial = useLoader(MTLLoader, "/models/handle.mtl")
  const handleObj = useLoader(OBJLoader, "/models/handle.obj", (loader) => {
    handleMaterial.preload()
    loader.setMaterials(handleMaterial)
  })

  const railClone = useMemo(() => railObj.clone(), [railObj])
  const leftClone = useMemo(() => leftObj.clone(), [leftObj])
  const rightClone = useMemo(() => rightObj.clone(), [rightObj])
  const handleClone = useMemo(() => handleObj.clone(), [handleObj])

  return (
    <group visible={visible}>
      <primitive
        object={leftClone}
        scale={[0.1, 0.1, 0.1]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-width / 2, Config.furnishing.clothesLift.leftYDelta, 0]}
      />

      <primitive
        object={railClone}
        scale={[
          (0.1 * (width - Config.furnishing.clothesLift.railWidthDiff)) /
            Config.furnishing.clothesLift.defaultWidth,
          0.1,
          0.1,
        ]}
        position={[0, 0, -Config.furnishing.clothesLift.defaultDepth]}
      />

      <primitive
        object={rightClone}
        scale={[0.1, 0.1, 0.1]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[width / 2, Config.furnishing.clothesLift.leftYDelta, 0]}
      />

      <primitive
        object={handleClone}
        scale={[0.1, 0.1, 0.1]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[
          0,
          Config.furnishing.clothesLift.handleYDelta,
          Config.furnishing.clothesLift.handleZDelta,
        ]}
      />
    </group>
  )
})

export default ClothesLift
