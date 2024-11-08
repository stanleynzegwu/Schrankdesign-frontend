/* eslint-disable react/no-unknown-property */
import React, { useMemo, useEffect, useState } from "react";
import Config from "../../../config";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
const baseUrl =
  "https://storage.googleapis.com/schrankdesign-uploads/textures/";
const ColorMaterial = React.memo(function ColorMaterial({ mName }) {
  // console.log(mName)
  const [_texture, _normalMap] = 
    mName.initial  ?
    useLoader(
    THREE.TextureLoader,
    [
      `/images/configurator/textures/color/type0.jpg`,
      `/images/configurator/textures/color/type0_normal.jpg`,

    ]) : useLoader(
      THREE.TextureLoader,
      [
        mName.map,
        mName.normalMap,
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
  _texture.wrapS = THREE.RepeatWrapping;
  _texture.wrapT = THREE.RepeatWrapping;
  _texture.repeat.set(0.005, 0.005);
  _texture.colorSpace = THREE.SRGBColorSpace;

  _normalMap.wrapS = THREE.RepeatWrapping;
  _normalMap.wrapT = THREE.RepeatWrapping;
  _normalMap.repeat.set(0.005, 0.005);

  return (
    <meshPhysicalMaterial
      map={_texture}
      normalMap={_normalMap}
      {...mName.property}
    />
  );
});

export default ColorMaterial;
