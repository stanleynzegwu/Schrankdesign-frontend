import React, { useRef, useEffect, useMemo } from 'react'
import useDimensionStore from '../../zustand/dimensionStore'
import { useLoader } from "@react-three/fiber";
import { FBXLoader, GLTFLoader } from "three-stdlib";

export function FeetModel(props) {
  const {
    rotation,
    position,
    scale,
    object,
    offSet
  } = props
  const model =  useMemo(() => object.clone(), [object]);
  const groupRef = useRef()
  return (
    <>
    <group ref={groupRef} position={offSet}>
      <primitive dispose={null} object={model} position={position} scale={[scale, scale, scale]} rotation={rotation}/>
    </group>
    </>
  )
}