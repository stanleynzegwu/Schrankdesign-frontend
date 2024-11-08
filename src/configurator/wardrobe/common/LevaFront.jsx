import { useState, useEffect } from "react";
import { Leva, useControls } from "leva";
import useColorStore from "../zustand/colorStore";

export default function LevaFront() {
  const bodyTexture = useColorStore.use.bodyTexture();
  const setBodyTexture = useColorStore.use.setBodyTexture();
  const frontTexture = useColorStore.use.frontTexture();
  const setFrontTexture = useColorStore.use.setFrontTexture();
//   useEffect(() => {
//     useControls.set({
//       map: {
//         value: null, // Initial value can be a URL or null
//         image: true,
//       },
//     });
//   }, []);
  const {
    map,
    normalMap,
    aoMap,
    metalnessMap,
    roughnessMap,
    rough,
    metal,
    normalX,
    normalY,
    aointensity,
    envIntensity,
    reflect,
    specular,
    iors,
    clearCoat,
  } = useControls({
    map: {
      value: null, // Initial value can be a URL or null
      image: frontTexture.map,
    },
    normalMap: {
      value: null, // Initial value can be a URL or null
      image: frontTexture.normalMap,
    },
    aoMap: {
      value: null, // Initial value can be a URL or null
      image: frontTexture.aoMap,
    },
    metalnessMap: {
      value: null, // Initial value can be a URL or null
      image: frontTexture.metalnessMap,
    },
    roughnessMap: {
      value: null, // Initial value can be a URL or null
      image: frontTexture.roughnessMap,
    },
    rough: { value: frontTexture.property.roughness, min: 0, max: 1 },
    metal: { value: frontTexture.property.metalness, min: 0, max: 1 },
    normalX: { value: frontTexture.property.normalScale[0], min: 0, max: 1 },
    normalY: { value: frontTexture.property.normalScale[1], min: 0, max: 1 },
    aointensity: {
      value: frontTexture.property.aoMapIntensity,
      min: 0,
      max: 1,
    },
    envIntensity: {
      value: frontTexture.property.envMapIntensity,
      min: 0,
      max: 1,
    },
    reflect: { value: frontTexture.property.reflectivity, min: 0, max: 1 },
    specular: {
      value: frontTexture.property.specularIntensity,
      min: 0,
      max: 1,
    },
    iors: { value: frontTexture.property.ior, min: 0, max: 2.33 },
    clearCoat: { value: 0, min: 0, max: 1 },
  });

  useEffect(() => {
    const tempMap = typeof map === "string" ?  map : frontTexture.map;
      const tempNormalMap = typeof normalMap === "string" ?  normalMap : frontTexture.normalMap;
      const tempAoMap = typeof aoMap === "string" ?  aoMap : frontTexture.aoMap;
      const tempMetalnessMap = typeof metalnessMap === "string" ?  metalnessMap : frontTexture.metalnessMap;
      const tempRoughnessMap = typeof roughnessMap === "string" ?  roughnessMap : frontTexture.roughnessMap;
    setFrontTexture({
      ...frontTexture,
      map: tempMap,
      normalMap: tempNormalMap,
      aoMap: tempAoMap,
      roughnessMap: tempRoughnessMap,
      metalnessMap: tempMetalnessMap,
      property: {
        aoMapIntensity: aointensity,
        normalScale: [normalX, normalY],
        ior: iors,
        roughness: rough,
        metalness: metal,
        reflectivity: reflect,
        specularIntensity: specular,
        envMapIntensity: envIntensity,
      },
    });
  }, [
    map,
    normalMap,
    aoMap,
    metalnessMap,
    roughnessMap,
    rough,
    metal,
    normalX,
    normalY,
    aointensity,
    envIntensity,
    reflect,
    specular,
    iors,
    clearCoat,
  ]);

  return <Leva />;
}
