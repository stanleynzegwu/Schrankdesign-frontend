/* eslint-disable react/no-unknown-property */
import { Cylinder } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { RoundedBoxGeometry } from "three-stdlib";
import { Geometry, Base, Subtraction } from "@react-three/csg";
import FittingPanelGroup from "./fittingPanelGroup";
import FeetGroup from "./FeetGroup";

import React, { useMemo, useEffect, useState, Suspense } from "react";
extend({ RoundedBoxGeometry });

import Config from "../../config";
import Plate from "./common/Plate";
import {
  calculateAboveFloorInfo,
  calculateBackPanelInfo,
  calculateGlidersPosXInfo,
  calculatePlatesInfo,
  calculateSidesPanelInfo,
  calculatePlinthXInfo,
} from "../utils/getInfo";
import CustomMaterial from "./common/customMaterial";
import ColorMaterial from "./common/colorMaterial";
import WoodMaterial from "./common/woodMaterial";
import EWidthControl from "./eWidthControl";
import useDimensionStore from "../zustand/dimensionStore";
import useFurnishingStore from "../zustand/furnishingStore";
import useColorStore from "../zustand/colorStore";

const ExteriorPlates = React.memo(function ExteriorPlates() {
  const width = useDimensionStore.use.width();
  const height = useDimensionStore.use.height();
  const depth = useDimensionStore.use.depth();
  const elementsWidths = useDimensionStore.use.elementsWidths();
  const baseType = useDimensionStore.use.baseType();
  const enableCutout = useDimensionStore.use.enableCutout();
  const cutoutDepth = useDimensionStore.use.cutoutDepth();
  const cutoutHeight = useDimensionStore.use.cutoutHeight();

  const setPlatesInfo = useFurnishingStore.use.setPlatesInfo();
  const korpusType = useDimensionStore.use.korpusType();
  const korpusMaterial = useDimensionStore.use.korpusMaterial();
  const withOutFeet = useDimensionStore.use.withOutFeet();
  const withFeet = useDimensionStore.use.withFeet();
  const hanging = useDimensionStore.use.hanging()

  const bodyType = useColorStore.use.bodyType();
  const bodyTexture = useColorStore.use.bodyTexture()

  // pos and size of left, right, middleside panels
  const sidesPanelInfo = useMemo(
    () => calculateSidesPanelInfo(baseType, elementsWidths, height, depth),
    [baseType, elementsWidths, height, depth]
  );

  // pos and size of above floors
  const aboveFloorInfo = useMemo(
    () => calculateAboveFloorInfo(elementsWidths, height, depth, korpusType),
    [elementsWidths, height, depth, korpusType]
  );
  // pos and size of back panels
  const backPanelInfo = useMemo(
    () => calculateBackPanelInfo(elementsWidths, height, baseType),
    [elementsWidths, height, baseType]
  );

  // pos and size of plinth plates
  const plinthXInfo = useMemo(
    () => calculatePlinthXInfo(elementsWidths),
    [elementsWidths]
  );

  useEffect(() => {
    const calculatedPlatesInfo = calculatePlatesInfo(
      sidesPanelInfo,
      aboveFloorInfo,
      backPanelInfo,
      plinthXInfo,
      width,
      depth,
      korpusType
    );
    setPlatesInfo(calculatedPlatesInfo);
  }, [height, baseType, elementsWidths, depth, korpusType]);

  const glidersPosXInfo = useMemo(
    () => calculateGlidersPosXInfo(elementsWidths),
    [elementsWidths]
  );

  return (
    <>
      {
        // sidespanel
        sidesPanelInfo.map((info, index) => {
          if (index > 0 && index < elementsWidths.length) {
            return (
              <Plate
                args={[
                  info.size[0],
                  korpusType == Config.korpusType.outerShap ||
                  korpusType == Config.korpusType.topShap ||
                  korpusType == Config.korpusType.uShap ||
                  korpusType == Config.korpusType.innerShap ||
                  korpusType == Config.korpusType.innerShap2
                    ? withOutFeet === true || hanging === true
                      ? info.size[1] - 1.9 + Config.plate.plinthHeight
                      : info.size[1] - 1.9
                    : withOutFeet === true || hanging === true
                    ? info.size[1] + Config.plate.plinthHeight
                    : info.size[1],
                  korpusType == Config.korpusType.innerShap2
                    ? info.size[2] + 1.9
                    : info.size[2],
                ]}
                position={[
                  info.pos[0],
                  korpusType == Config.korpusType.outerShap ||
                  korpusType == Config.korpusType.topShap ||
                  korpusType == Config.korpusType.uShap ||
                  korpusType == Config.korpusType.innerShap ||
                  korpusType == Config.korpusType.innerShap2
                    ? withOutFeet === true || hanging === true
                      ? info.pos[1] - 0.95 - Config.plate.plinthHeight / 2
                      : info.pos[1] - 0.95
                    : withOutFeet === true || hanging === true
                    ? info.pos[1] - Config.plate.plinthHeight / 2
                    : info.pos[1],
                  korpusType == Config.korpusType.innerShap2
                    ? info.pos[2] + 0.95
                    : info.pos[2],
                ]}
                type={Config.plate.type.side}
                category={Config.color.category.body}
                key={index}
              />
            );
          } else {
            return (
              <mesh
                position={[
                  info.pos[0],
                  korpusType == Config.korpusType.outerShap ||
                  korpusType == Config.korpusType.topShap ||
                  korpusType == Config.korpusType.uShap ||
                  korpusType == Config.korpusType.innerShap ||
                  korpusType == Config.korpusType.innerShap2
                    ? withFeet
                      ? info.pos[1] - 0.95 + Config.plate.plinthHeight / 2
                      : info.pos[1] - 0.95
                    : withFeet
                    ? info.pos[1] + Config.plate.plinthHeight / 2
                    : info.pos[1],
                  korpusType == Config.korpusType.uShap ||
                  korpusType == Config.korpusType.innerShap ||
                  korpusType == Config.korpusType.innerShap2
                    ? info.pos[2] + 0.95
                    : info.pos[2],
                ]}
                key={index}
                rotation={[0, 0, Math.PI / 2]}
                castShadow
                receiveShadow
              >
                <Geometry useGroups>
                  <Base>
                    {korpusType == Config.korpusType.topShap ||
                    korpusType == Config.korpusType.outerShap ? (
                      <roundedBoxGeometry
                        args={[
                          withFeet
                            ? info.size[1] - 1.9 - Config.plate.plinthHeight
                            : info.size[1] - 1.9,
                          info.size[0],
                          info.size[2],
                          4,
                          Config.plate.radius,
                        ]}
                      />
                    ) : korpusType == Config.korpusType.uShap ||
                      korpusType == Config.korpusType.innerShap ||
                      korpusType == Config.korpusType.innerShap2 ? (
                      <roundedBoxGeometry
                        args={[
                          withFeet
                            ? info.size[1] - 1.9 - Config.plate.plinthHeight
                            : info.size[1] - 1.9,
                          info.size[0],
                          info.size[2] + 1.9,
                          4,
                          Config.plate.radius,
                        ]}
                      />
                    ) : (
                      <roundedBoxGeometry
                        args={[
                          withFeet
                            ? info.size[1] - Config.plate.plinthHeight
                            : info.size[1],
                          info.size[0],
                          info.size[2],
                          4,
                          Config.plate.radius,
                        ]}
                      />
                    )}
                    {bodyType === Config.color.type.color ? (
                      <ColorMaterial mName={bodyTexture} type={Config.plate.type.side} />
                    ) : (
                      <WoodMaterial mName={bodyTexture} type={Config.plate.type.side} />
                    )}
                    {/* <CustomMaterial
                      category={Config.color.category.body}
                      type={Config.plate.type.side}
                    /> */}
                  </Base>
                  <Subtraction
                    position={[
                      -info.size[1] / 2 + cutoutHeight / 2 - 0.25,
                      0,
                      -info.size[2] / 2 + cutoutDepth / 2 - 0.25,
                    ]}
                  >
                    <boxGeometry
                      args={
                        enableCutout
                          ? [cutoutHeight, Config.plate.thickness, cutoutDepth]
                          : [0, 0, 0]
                      }
                    />
                  </Subtraction>
                </Geometry>
              </mesh>
            );
          }
        })
      }

      {/* // above floor */}
      {aboveFloorInfo.map((info, index) => (
        <Plate
          key={index}
          args={info.size}
          position={info.pos}
          type={Config.plate.type.floor}
          category={Config.color.category.body}
        />
      ))
      }

      {backPanelInfo.map((info, index) => (
        <Plate
          key={index}
          args={[
            info.size[0],
            withOutFeet === true || hanging === true
              ? info.size[1] + Config.plate.plinthHeight
              : info.size[1],
            info.size[2],
          ]}
          position={[
            info.pos[0],
            withOutFeet === true || hanging === true
              ? info.pos[1] - Config.plate.plinthHeight / 2
              : info.pos[1],
            info.pos[2],
          ]}
          type={Config.plate.type.back}
          category={Config.color.category.body}
        />
      ))}
      {/* //////////////////////////////////////////////////////////////////// */}
      {/* plinth */}
      {plinthXInfo.map((info, index) => (
        <group key={index}>
          {withOutFeet === false && withFeet === false && hanging === false && (
            <Plate
              args={[
                info.width,
                Config.plate.plinthHeight,
                Config.plate.thickness,
              ]}
              position={[
                info.xPos,
                Config.plate.plinthHeight / 2,
                depth -
                  Config.plate.thickness / 2 -
                  Config.plate.plinthIncident,
              ]}
              visible={baseType === Config.baseType.panel}
              type={Config.plate.type.plinth}
              category={Config.color.category.body}
            />
          )}

          {korpusType === Config.korpusType.innerShap ||
          korpusType === Config.korpusType.innerShap2 ? (
            <Plate
              args={[info.width, Config.plate.thickness, depth]}
              position={[
                info.xPos,
                withOutFeet === true || hanging === true
                  ? (baseType == Config.baseType.panel
                      ? 0
                      : Config.glider.height) +
                    Config.plate.thickness / 2
                  : (baseType == Config.baseType.panel
                      ? Config.plate.plinthHeight
                      : Config.glider.height) +
                    Config.plate.thickness / 2,
                depth / 2 + 1.9,
              ]}
              type={Config.plate.type.floor}
              korpusMaterial={korpusMaterial}
              category={Config.color.category.body}
            />
          ) : (
            <Plate
              args={[info.width, Config.plate.thickness, depth]}
              position={[
                info.xPos,
                withOutFeet === true || hanging === true
                  ? (baseType == Config.baseType.panel
                      ? 0
                      : Config.glider.height) +
                    Config.plate.thickness / 2
                  : (baseType == Config.baseType.panel
                      ? Config.plate.plinthHeight
                      : Config.glider.height) +
                    Config.plate.thickness / 2,
                depth / 2,
              ]}
              type={Config.plate.type.floor}
              korpusMaterial={korpusMaterial}
              category={Config.color.category.body}
            />
          )}
        </group>
      ))}
      {/* gliders */}
      {glidersPosXInfo.map((info, index) => (
        <group key={index} visible={baseType === Config.baseType.gliders}>
          <Cylinder
            args={[
              Config.glider.radius,
              Config.glider.radius,
              Config.glider.height,
            ]}
            position={[
              info,
              Config.glider.height / 2,
              Config.plate.thickness + Config.glider.radius,
            ]}
            material={Config.glider.material}
          />
          <Cylinder
            args={[
              Config.glider.radius,
              Config.glider.radius,
              Config.glider.height,
            ]}
            position={[
              info,
              Config.glider.height / 2,
              depth - Config.plate.thickness - Config.glider.radius,
            ]}
            material={Config.glider.material}
          />
        </group>
      ))}

      {/* { withFeet === true && (<FeetGroup />)} */}
      <Suspense fallback={null}>
        <FeetGroup />
      </Suspense>
      <FittingPanelGroup />

      <EWidthControl />
    </>
  );
});

export default ExteriorPlates;
