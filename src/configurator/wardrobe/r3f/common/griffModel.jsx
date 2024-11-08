import React, { useRef, useEffect, useMemo } from 'react'

export function GriffModel(props) {
  const {
    rotation,
    position,
    scale,
    object,
    type
  } = props
  const model =  useMemo(() => object.clone(), [object]);
  return (
    <primitive dispose={null} object={model} scale={[scale, scale, scale]} rotation={rotation}/>
  )
}