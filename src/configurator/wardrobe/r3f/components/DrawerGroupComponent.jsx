import { useThree } from "@react-three/fiber"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"
import DrawerComponent from "./DrawerComponent"


const DrawerGroupComponent = React.memo(function DrawerGroupComponent({
  data,
}) {
  
    const spaceRef = useRef();

  return (
    <group>
      {data.map((asset, index) => (
        <DrawerComponent
        key={index} // Add a key prop
        {...asset}  // Spread operator for passing down props
        spaceRef={spaceRef}
        pointIndex={index}
      />
      ))}
    </group>
  )
})

export default DrawerGroupComponent
