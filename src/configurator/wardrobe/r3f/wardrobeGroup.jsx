/* eslint-disable react/no-unknown-property */
import ExteriorPlates from "./exteriorPlates";
import DimensionGroup from "./dimensionGroup";
import FurnishingGroup from "./furnishingGroup";
import { useThree } from "@react-three/fiber";
import React, { Suspense, useEffect } from "react";
import useDimensionStore from "../zustand/dimensionStore";
import Config from "../../config";
import useCornerStore from "../zustand/cornerStore";
import BackgroundGroup from "./backgroundGroup";

const WardrobeGroup = React.memo(function WardrobeGroup() {
  const width = useDimensionStore.use.width();
  const height = useDimensionStore.use.height();
  const depth = useDimensionStore.use.depth();
  const hanging = useDimensionStore.use.hanging();
  const hangingSize = useDimensionStore.use.hangingSize();
  const isCornerView = useDimensionStore.use.isCornerView();
  const withFeet = useDimensionStore.use.withFeet();

  const viewOption = useCornerStore.use.viewOption();

  const elementsCount = useDimensionStore.use.elementsCount();
  const elementsWidths = useDimensionStore.use.elementsWidths();
  const { camera, controls } = useThree();
  useEffect(() => {

    const cameraScaleH = height/40
    const cameraScaleW = 3*width/200
    let cameraScale = cameraScaleH > cameraScaleW ? cameraScaleH : cameraScaleW
    // console.log(cameraScale)
    if (controls === null) return;

    if (
      viewOption === Config.view.front ||
      viewOption === Config.view.dimension
    ) {
      // camera.position.set(
      //   0,
      //   0,
      //   width > 600 ? 8 : width < 300 && height < 100 ? 4 : 6
      // );
      camera.position.set(0, 0, cameraScale)
      controls.target.set(0, 0, 0);
      controls.enabled = false;
      controls.update();
    } else {
      controls.enabled = true;
      if (isCornerView) {
        camera.position.set(-3, -1, 0);
        controls.target.set(0, -1 + (240 - height) / 240, 0);
        controls.update();
      } else {
        camera.position.set(0, 0, cameraScale);
        controls.target.set(0, 0, 0);
        controls.update();
      }
    }
  }, [viewOption, isCornerView, width, height]);
  return (
        <group
          dispose={null}
          position={[-width / 200, -height / 200, -depth / 200]}
          scale={[0.01, 0.01, 0.01]}
          castShadow
        >
          <group
            position={[
              0,
              hanging === true ? 25 : withFeet ? hangingSize : 0,
              0,
            ]}
          >
            {elementsCount !== 0 && (
              <Suspense fallback={null}>
                <ExteriorPlates />
              </Suspense>
            )}
            <Suspense fallback={null}>
              <FurnishingGroup />
            </Suspense>
          </group>

          <DimensionGroup />

          <BackgroundGroup />
        </group>
  );
});

export default WardrobeGroup;
