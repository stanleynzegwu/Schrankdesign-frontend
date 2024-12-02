import { useState, useEffect } from "react";
import { folder, Leva, useControls } from "leva";
import useColorStore from "../zustand/colorStore";

export default function LevaBody({ type }) {
  const bodyTexture = useColorStore.use.bodyTexture();
  const setBodyTexture = useColorStore.use.setBodyTexture();
  const frontTexture = useColorStore.use.frontTexture();
  const setFrontTexture = useColorStore.use.setFrontTexture();

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

    mapf,
    normalMapf,
    aoMapf,
    metalnessMapf,
    roughnessMapf,
    roughf,
    metalf,
    normalXf,
    normalYf,
    aointensityf,
    envIntensityf,
    reflectf,
    specularf,
    iorsf,
    clearCoatf,
  } = useControls({
    BodyTexture: folder(
      {
        map: {
          value: null, // Initial value can be a URL or null
          image: bodyTexture.map,
        },
        normalMap: {
          value: null, // Initial value can be a URL or null
          image: bodyTexture.normalMap,
        },
        aoMap: {
          value: null, // Initial value can be a URL or null
          image: bodyTexture.aoMap,
        },
        metalnessMap: {
          value: null, // Initial value can be a URL or null
          image: bodyTexture.metalnessMap,
        },
        roughnessMap: {
          value: null, // Initial value can be a URL or null
          image: bodyTexture.roughnessMap,
        },
        rough: { value: bodyTexture.property.roughness, min: 0, max: 1 },
        metal: { value: bodyTexture.property.metalness, min: 0, max: 1 },
        normalX: { value: bodyTexture.property.normalScale[0], min: 0, max: 1 },
        normalY: { value: bodyTexture.property.normalScale[1], min: 0, max: 1 },
        aointensity: { value: bodyTexture.property.aoMapIntensity, min: 0, max: 1 },
        envIntensity: { value: bodyTexture.property.envMapIntensity, min: 0, max: 1 },
        reflect: { value: bodyTexture.property.reflectivity, min: 0, max: 1 },
        specular: { value: bodyTexture.property.specularIntensity, min: 0, max: 1 },
        iors: { value: bodyTexture.property.ior, min: 0, max: 2.33 },
        clearCoat: { value: bodyTexture.property.clearcoat, min: 0, max: 1 },
      },
      { collapsed: true }
    ),
    FrontTexture: folder(
      {
        mapf: {
          value: null, // Initial value can be a URL or null
          image: frontTexture.map,
        },
        normalMapf: {
          value: null, // Initial value can be a URL or null
          image: frontTexture.normalMap,
        },
        aoMapf: {
          value: null, // Initial value can be a URL or null
          image: frontTexture.aoMap,
        },
        metalnessMapf: {
          value: null, // Initial value can be a URL or null
          image: frontTexture.metalnessMap,
        },
        roughnessMapf: {
          value: null, // Initial value can be a URL or null
          image: frontTexture.roughnessMap,
        },
        roughf: { value: frontTexture.property.roughness, min: 0, max: 1 },
        metalf: { value: frontTexture.property.metalness, min: 0, max: 1 },
        normalXf: { value: frontTexture.property.normalScale[0], min: 0, max: 1 },
        normalYf: { value: frontTexture.property.normalScale[1], min: 0, max: 1 },
        aointensityf: { value: frontTexture.property.aoMapIntensity, min: 0, max: 1 },
        envIntensityf: { value: frontTexture.property.envMapIntensity, min: 0, max: 1 },
        reflectf: { value: frontTexture.property.reflectivity, min: 0, max: 1 },
        specularf: { value: frontTexture.property.specularIntensity, min: 0, max: 1 },
        iorsf: { value: frontTexture.property.ior, min: 0, max: 2.33 },
        clearCoatf: { value: frontTexture.property.clearcoat, min: 0, max: 1 },
      },
      { collapsed: true }
    ),
  });

  useEffect(() => {
    // const tempMap = typeof map === "string" ?  map : bodyTexture.map;
    // const tempNormalMap = typeof normalMap === "string" ?  normalMap : bodyTexture.normalMap;
    // const tempAoMap = typeof aoMap === "string" ?  aoMap : bodyTexture.aoMap;
    // const tempMetalnessMap = typeof metalnessMap === "string" ?  metalnessMap : bodyTexture.metalnessMap;
    // const tempRoughnessMap = typeof roughnessMap === "string" ?  roughnessMap : bodyTexture.roughnessMap;
    setBodyTexture({
      ...bodyTexture,
      map: map,
      normalMap: normalMap,
      aoMap: aoMap,
      roughnessMap: roughnessMap,
      metalnessMap: metalnessMap,
      property: {
        aoMapIntensity: aointensity,
        normalScale: [normalX, normalY],
        ior: iors,
        roughness: rough,
        metalness: metal,
        reflectivity: reflect,
        specularIntensity: specular,
        envMapIntensity: envIntensity,
        clearcoat: clearCoat,
      },
    });

    // const tempMapf = frontTexture.map;
    // const tempNormalMapf = frontTexture.normalMap;
    // const tempAoMapf = frontTexture.aoMap;
    // const tempMetalnessMapf = frontTexture.metalnessMap;
    // const tempRoughnessMapf = frontTexture.roughnessMap;
    setFrontTexture({
      ...frontTexture,
      map: mapf,
      normalMap: normalMapf,
      aoMap: aoMapf,
      roughnessMap: roughnessMapf,
      metalnessMap: metalnessMapf,
      property: {
        aoMapIntensity: aointensityf,
        normalScale: [normalXf, normalYf],
        ior: iorsf,
        roughness: roughf,
        metalness: metalf,
        reflectivity: reflectf,
        specularIntensity: specularf,
        envMapIntensity: envIntensityf,
        clearcoat: clearCoatf,
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

    mapf,
    normalMapf,
    aoMapf,
    metalnessMapf,
    roughnessMapf,
    roughf,
    metalf,
    normalXf,
    normalYf,
    aointensityf,
    envIntensityf,
    reflectf,
    specularf,
    iorsf,
    clearCoatf,
  ]);

  return <Leva />;
}
