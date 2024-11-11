import React, { Suspense, useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { FeetModel } from "./common/feet";
import Config from "../../config";
import useDimensionStore from "../zustand/dimensionStore";
import { useFBX, useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { FBXLoader, GLTFLoader } from "three-stdlib";
import { getFeetInfo } from "../utils/getInfo";

const FeetGroup = React.memo(function FeetGroup() {
  const modelHeight = 25;
  const [modelScale, setModelScale] = useState();
  const feet = useDimensionStore.use.feet();
  const setFeetCount = useDimensionStore.use.setFeetCount();
  const feetIndex = useDimensionStore.use.feetIndex();
  const feetListIndex = useDimensionStore.use.feetListIndex();
  const depth = useDimensionStore.use.depth();
  const width = useDimensionStore.use.width();
  const setHangingSize = useDimensionStore.use.setHangingSize();
  const hangingSize = useDimensionStore.use.hangingSize();
  const withFeet = useDimensionStore.use.withFeet();

  const [feets, setFeets] = useState({});

  const feetInfo = useMemo(() => {
    return getFeetInfo(feet, width, feetIndex, feetListIndex);
  }, [feet, width, feetIndex, feetListIndex]);
  const [feetsInfo, setFeetsInfo] = useState({})

  let model = feetInfo?.gltf ? useLoader(FBXLoader, feetInfo.gltf) : undefined;
  let middleModel = [];

  useEffect(() => {
    if (model) {
      const box = new THREE.Box3().setFromObject(model);
      const size = new THREE.Vector3();
      const modelSize = box.getSize(size);
      if (feetInfo.feetHeight) {
        setModelScale(feetInfo.feetHeight / modelSize.y);
      }else {
        setModelScale(modelHeight / modelSize.y);
      }
      setFeets(feetInfo);
    }
    setFeetCount((feetInfo.middleFeetCount+2)*2)
  }, [feetInfo, feets]);

  useEffect(() => {
    if (feetInfo.feetHeight) {
      setHangingSize(feetInfo.feetHeight - Config.plate.plinthHeight);
    } else {
      setHangingSize(modelHeight - Config.plate.plinthHeight);
    }
  }, [hangingSize, feetInfo]);

  for (let i = 0; i < feetInfo.middleFeetCount; i++) {
    middleModel.push(i);
  }
  return (
    <group>
      {modelScale !== undefined && withFeet && model !== undefined && (
        <>
          //* Front Feet
          <FeetModel
            rotation={[0, (feets.offSet * Math.PI) / 180, 0]}
            scale={modelScale}
            object={model}
            position={[
              feets.frontFeetX,
              Config.plate.plinthHeight,
              depth - feets.frontFeetZ,
            ]}
            offSet={[feets.xOffset, feets.yOffset, feets.zOffset]}
          />
          <FeetModel
            rotation={[0, (feets.offSet * Math.PI) / 180 + Math.PI / 2, 0]}
            scale={modelScale}
            object={model}
            position={[
              width - feets.frontFeetX,
              Config.plate.plinthHeight,
              depth - feets.frontFeetZ,
            ]}
            offSet={[feets.xOffset, feets.yOffset, feets.zOffset]}
          />
          //* Back Feet
          <FeetModel
            rotation={[0, (feets.offSet * Math.PI) / 180 + Math.PI * 3 / 2, 0]}
            scale={modelScale}
            object={model}
            position={[
              feets.backFeetX,
              Config.plate.plinthHeight,
              feets.backFeetZ,
            ]}
            offSet={[feets.xOffset, feets.yOffset, feets.zOffset]}
          />
          <FeetModel
            rotation={[0, (feets.offSet * Math.PI) / 180 + Math.PI, 0]}
            scale={modelScale}
            object={model}
            position={[
              width - feets.backFeetX,
              Config.plate.plinthHeight,
              feets.backFeetZ,
            ]}
            offSet={[feets.xOffset, feets.yOffset, feets.zOffset]}
          />
          //* middle Feet
          {middleModel.map((middle, index) => {
            return (
              <>
                <FeetModel
                  rotation={[
                    0,
                    ((feets.offSet + feets.middleOffset) * Math.PI) / 180,
                    0,
                  ]}
                  scale={modelScale}
                  object={model}
                  position={[
                    feets.frontFeetX + feets.middleGap * (index + 1),
                    Config.plate.plinthHeight,
                    depth - feets.frontFeetZ,
                  ]}
                  offSet={[feets.xOffset, feets.yOffset, feets.zOffset]}
                />
                <FeetModel
                  rotation={[
                    0,
                    ((feets.offSet + feets.middleOffset) * Math.PI) / 180 + Math.PI,
                    0,
                  ]}
                  scale={modelScale}
                  object={model}
                  position={[
                    feets.backFeetX + feets.middleGap * (index + 1),
                    Config.plate.plinthHeight,
                    feets.backFeetZ,
                  ]}
                  offSet={[feets.xOffset, feets.yOffset, feets.zOffset]}
                />
              </>
            );
            // }
          })}
        </>
      )}
    </group>
  );
});

export default FeetGroup;
