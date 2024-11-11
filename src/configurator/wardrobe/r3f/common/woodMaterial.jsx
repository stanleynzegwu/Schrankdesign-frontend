/* eslint-disable react/no-unknown-property */
import React, { useCallback, useEffect, useState } from "react"
import Config from "../../../config"
import { useLoader } from "@react-three/fiber"
import * as THREE from "three"
const baseUrl = 'https://storage.googleapis.com/schrankdesign-uploads/textures/';
const WoodMaterial = React.memo(function WoodMaterial({ mName, type }) {
  const [wood_texture, wood_normalMap, wood_armMap, wood_metalMap, wood_roughMap] = 
    useLoader(THREE.TextureLoader, [
      mName.map,
      mName.normalMap,
      mName.aoMap,
      mName.metalnessMap,
      mName.roughnessMap
    ])
  const [property, setProperty] = useState()
  useEffect(() => {
    if (typeof mName === 'string') {
      // property = Config.material[mName]
      setProperty(Config.material[mName])
    } else {
      // property = mName.property
      setProperty(mName.property)
    }
  }, [property])
  wood_texture.wrapS = wood_texture.wrapT = THREE.RepeatWrapping

  wood_normalMap.wrapS = wood_normalMap.wrapT = THREE.RepeatWrapping

  wood_armMap.wrapS = wood_armMap.wrapT = THREE.RepeatWrapping

  const onBeoforeCompile = useCallback((shader) => {
    shader.vertexShader = shader.vertexShader.replace(
      "#include <uv_vertex>",
      `
        #include <uv_vertex>
        #ifdef USE_MAP
          vec4 wnorm = modelMatrix * vec4(normal,0.);
          vec3 anorm = abs(normalize(wnorm.xyz));
          vec4 wpos = modelMatrix * vec4(position,1.);
          wpos.xyz -= modelMatrix[3].xyz;
          if((anorm.x>anorm.y)&&(anorm.x>anorm.z))
            vMapUv = wpos.zy;
          else if((anorm.y>anorm.x)&&(anorm.y>anorm.z))
            vMapUv = wpos.${
              type === Config.plate.type.floor ||
              type === Config.plate.type.back
                ? "zx"
                : "xz"
            };
          else
            vMapUv = wpos.${
              type === Config.plate.type.floor ||
              type === Config.plate.type.plinth
                ? "yx"
                : "xy"
            };
        #endif

        #ifdef USE_ALPHAMAP
          vAlphaMapUv = vMapUv;
        #endif

        #ifdef USE_LIGHTMAP
          vLightMapUv = vMapUv;
        #endif

        #ifdef USE_AOMAP
          vAoMapUv = vMapUv;
        #endif

        #ifdef USE_BUMPMAP
          vBumpMapUv =vMapUv;
        #endif

        #ifdef USE_NORMALMAP
          vNormalMapUv =vMapUv;
        #endif

        #ifdef USE_DISPLACEMENTMAP
          vDisplacementMapUv = vMapUv;
        #endif

        #ifdef USE_EMISSIVEMAP
          vEmissiveMapUv = vMapUv;
        #endif

        #ifdef USE_METALNESSMAP
          vMetalnessMapUv = vMapUv;
        #endif

        #ifdef USE_ROUGHNESSMAP
          vRoughnessMapUv =  vMapUv;
        #endif

        vMapUv=vMapUv*.5+.5;
      `
    )
  }, [])
  const adjustUVs = (geometry, type) => {
    const positionAttribute = geometry.getAttribute('position');
    const uvAttribute = geometry.getAttribute('uv');

    const uvs = [];
    const positions = positionAttribute.array;
    const n = positions.length / 3;

    for (let i = 0; i < n; i++) {
      const x = positions[i * 3];
      const y = positions[i * 3 + 1];
      const z = positions[i * 3 + 2];

      let u, v;
      if ((type === Config.plate.type.floor || type === Config.plate.type.back) && Math.abs(y) > Math.abs(z)) {
        u = x;
        v = z;
      } else if (Math.abs(x) > Math.abs(z)) {
        u = z;
        v = y;
      } else {
        u = x;
        v = y;
      }

      uvs.push((u + 1) / 2, (v + 1) / 2);
    }

    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  };

  useEffect(() => {
    const geometry = new THREE.BoxGeometry(); // Replace with your geometry
    adjustUVs(geometry, type);
  }, [type]);

  return (
    <>
      <meshPhysicalMaterial
        onBeforeCompile={onBeoforeCompile}
        customProgramCacheKey={() => type}
        attach="material"
        map={wood_texture}
        normalMap={wood_normalMap}
        aoMap={wood_armMap}
        roughnessMap={wood_roughMap}
        metalnessMap={wood_metalMap}
        {...mName.property}
      />
    </>
  )
})

export default WoodMaterial
