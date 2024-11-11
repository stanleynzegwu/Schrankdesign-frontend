import React, { useEffect, useMemo } from "react";
import { Griff } from "../common/griff";

const GriffComponent = React.memo(function GriffComponent({
  spaceRef,
  initialScale,
  initialDoorType,
  initialDoorCategory,
  initialElementIndex,
  position,
}) {
  useEffect(() => {
    // console.log(initialScale, "here")
  }, []);
  // console.log(initialScale, "here");
  return (
    <group position={position}>
      <Griff
        spaceScale={initialScale}
        door_type={initialDoorType}
        door_category={initialDoorCategory}
        elementIndex={initialElementIndex}
        visible={true}
        withAnimation={true}
      />
    </group>
  );
});

export default GriffComponent;
