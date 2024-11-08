/* eslint-disable react/no-unknown-property */
import { Plane } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import React from "react"
import * as THREE from "three"
import useDimensionStore from "../zustand/dimensionStore"
import Config from "../../config"

const BackgroundGroup = React.memo(function BackgroundGroup() {
  const width = useDimensionStore.use.width()

  const [floor_texture, floor_normalMap, floor_armMap] = useLoader(
    THREE.TextureLoader,
    [
      "/images/configurator/textures/floor/laminate_floor_02_diff_1k.jpg",
      "/images/configurator/textures/floor/laminate_floor_02_nor_gl_1k.png",
      "/images/configurator/textures/floor/laminate_floor_02_arm_1k.jpg",
    ]
  )

  floor_texture.wrapS = THREE.RepeatWrapping
  floor_texture.wrapT = THREE.RepeatWrapping
  floor_texture.repeat.set(7.5, 7.5)
  floor_texture.colorSpace = THREE.SRGBColorSpace

  floor_normalMap.wrapS = THREE.RepeatWrapping
  floor_normalMap.wrapT = THREE.RepeatWrapping
  floor_normalMap.repeat.set(7.5, 7.5)

  floor_armMap.wrapS = THREE.RepeatWrapping
  floor_armMap.wrapT = THREE.RepeatWrapping
  floor_armMap.repeat.set(7.5, 7.5)

  const [
    wall_texture,
    wall_normalMap,
    wall_roughnessMap,
    wall_aoMap,
    wall_displacementMap,
  ] = useLoader(THREE.TextureLoader, [
    "/images/configurator/textures/wall/wfnhfaq_2K_Albedo.jpg",
    "/images/configurator/textures/wall/wfnhfaq_2K_Normal.jpg",
    "/images/configurator/textures/wall/wfnhfaq_2K_Roughness.jpg",
    "/images/configurator/textures/wall/wfnhfaq_2K_AO.jpg",
    "/images/configurator/textures/wall/wfnhfaq_2K_Displacement.jpg",
  ])

  wall_texture.wrapS = THREE.RepeatWrapping
  wall_texture.wrapT = THREE.RepeatWrapping
  wall_texture.repeat.set(7.5, 7.5)
  wall_texture.colorSpace = THREE.SRGBColorSpace

  wall_normalMap.wrapS = THREE.RepeatWrapping
  wall_normalMap.wrapT = THREE.RepeatWrapping
  wall_normalMap.repeat.set(7.5, 7.5)

  wall_roughnessMap.wrapS = THREE.RepeatWrapping
  wall_roughnessMap.wrapT = THREE.RepeatWrapping
  wall_roughnessMap.repeat.set(7.5, 7.5)

  wall_aoMap.wrapS = THREE.RepeatWrapping
  wall_aoMap.wrapT = THREE.RepeatWrapping
  wall_aoMap.repeat.set(7.5, 7.5)

  wall_displacementMap.wrapS = THREE.RepeatWrapping
  wall_displacementMap.wrapT = THREE.RepeatWrapping
  wall_displacementMap.repeat.set(7.5, 7.5)

  return (
    <>
      {/* floor */}
      <Plane
        rotation={[-Math.PI / 2, 0, 0]}
        position={[width / 2, 0, 365]}
        // castShadow
        receiveShadow
        args={[920, 730]}
      >
        <meshPhysicalMaterial
          map={floor_texture}
          normalMap={floor_normalMap}
          aoMap={floor_armMap}
          roughnessMap={floor_armMap}
          metalnessMap={floor_armMap}
          {...Config.material.floor}
        />
      </Plane>

      {/* wall back*/}
      <Plane position={[width / 2, 230, 0]} args={[920, 460]} receiveShadow>
        <meshPhysicalMaterial
          map={wall_texture}
          normalMap={wall_normalMap}
          aoMap={wall_aoMap}
          roughnessMap={wall_roughnessMap}
          displacementMap={wall_displacementMap}
          {...Config.material.wall_back}
        />
      </Plane>

      {/* wall right */}
      <Plane
        position={[width / 2 + 460, 230, 365]}
        rotation={[0, Math.PI / 2, 0]}
        args={[730, 460]}
        receiveShadow
      >
        <meshPhysicalMaterial
          map={wall_texture}
          normalMap={wall_normalMap}
          aoMap={wall_aoMap}
          roughnessMap={wall_roughnessMap}
          displacementMap={wall_displacementMap}
          {...Config.material.wall_right}
          side={THREE.BackSide}
        />
      </Plane>

      {/* wall left */}
      <Plane
        position={[width / 2 - 460, 230, 365]}
        rotation={[0, Math.PI / 2, 0]}
        args={[730, 460]}
        receiveShadow
      >
        <meshPhysicalMaterial
          map={wall_texture}
          normalMap={wall_normalMap}
          aoMap={wall_aoMap}
          roughnessMap={wall_roughnessMap}
          displacementMap={wall_displacementMap}
          {...Config.material.wall_left}
        />
      </Plane>
    </>
  )
})

export default BackgroundGroup
