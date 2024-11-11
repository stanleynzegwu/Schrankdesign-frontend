import React, { useEffect } from "react";
import useCalcStore from "../zustand/calcStore";
import { getDimensions } from "../utils/availableSpace";
import useFurnishingStore from "../zustand/furnishingStore";
import useDimensionStore from "../zustand/dimensionStore";
import useCornerStore from "../zustand/cornerStore";
import DimensionLine from "./common/dimensionLine";
import Config from "../../config";

const DimensionGroup = React.memo(function DimensionGroup() {
  const width = useDimensionStore.use.width();
  const height = useDimensionStore.use.height();
  const depth = useDimensionStore.use.depth();
  const elementsWidths = useDimensionStore.use.elementsWidths();
  const baseType = useDimensionStore.use.baseType();
  const hanging = useDimensionStore.use.hanging();
  const hangingSize = useDimensionStore.use.hangingSize();
  const withOutFeet = useDimensionStore.use.withOutFeet();
  const withFeet = useDimensionStore.use.withFeet();

  const elementsInfo = useCalcStore.use.elementsInfo();
  const setElementsInfo = useCalcStore.use.setElementsInfo();
  const dimensionInfo = useCalcStore.use.dimensionInfo();
  const setDimensionInfo = useCalcStore.use.setDimensionInfo();

  const furnishingAssets = useFurnishingStore.use.furnishingAssets();
  const showDimensions = useCornerStore.use.showDimensions();

  useEffect(() => {
    const calculateElementsInfo = () => {
      const updatedElementsInfo = [];
      for (let index = 0; index < elementsWidths.length; index++) {
        if (index === 0) {
          updatedElementsInfo.push(Config.plate.thickness + elementsWidths[index] / 2);
        } else {
          updatedElementsInfo.push(
            updatedElementsInfo[index - 1] +
              elementsWidths[index - 1] / 2 +
              Config.plate.thickness +
              elementsWidths[index] / 2
          );
        }
      }
      setElementsInfo(updatedElementsInfo);
    };
    calculateElementsInfo();
  }, [elementsWidths]);

  useEffect(() => {
    let elementsTop = height - Config.plate.thickness;
    let elementsBottom =
      (baseType == Config.baseType.panel ? Config.plate.plinthHeight : Config.glider.height) +
      Config.plate.thickness;

    const dividerArrays = {};

    furnishingAssets.forEach((item) => {
      if (item.inDivider) {
        const key = `${item.d_xIndex}_${item.d_yPos}`;
        if (!dividerArrays[key]) dividerArrays[key] = [];
        dividerArrays[key].push(item);
      }
    });

    Object.values(dividerArrays).forEach((sublist) => {
      sublist.sort((a, b) => {
        if (a.xIndex !== b.xIndex) return a.xIndex - b.xIndex;
        return a.position[1] - b.position[1];
      });
    });

    const f_assets = furnishingAssets
      .filter((asset) => !asset.inDivider)
      .sort((a, b) => {
        if (a.xIndex !== b.xIndex) return a.xIndex - b.xIndex;
        return a.position[1] - b.position[1];
      });

    const temp = [];

    getDimensions(f_assets, elementsTop, elementsBottom, elementsInfo, temp);

    f_assets
      .filter((asset) => asset.type === Config.furnishing.type.divider)
      .forEach((divider_asset) => {
        const d_assets = dividerArrays[divider_asset.xIndex + "_" + divider_asset.position[1]];

        const e_widths = [
          divider_asset.dividerLeftWidth,
          divider_asset.scale[0] -
            divider_asset.dividerLeftWidth -
            Config.furnishing.divider.thickness,
        ];

        const elementsXInfo = [
          divider_asset.position[0] - divider_asset.scale[0] / 2 + e_widths[0] / 2,
          divider_asset.position[0] + divider_asset.scale[0] / 2 - e_widths[1] / 2,
        ];

        elementsBottom = divider_asset.position[1] - divider_asset.scale[1] / 2;
        elementsTop =
          divider_asset.position[1] +
          divider_asset.scale[1] / 2 -
          (divider_asset.topShelfVisible ? Config.furnishing.divider.thickness : 0);

        getDimensions(d_assets, elementsTop, elementsBottom, elementsXInfo, temp);
      });

    setDimensionInfo(temp);
  }, [furnishingAssets, baseType, height, elementsInfo]);

  return (
    <>
      {showDimensions &&
        dimensionInfo.map((item, key) => (
          <group key={key}>
            <DimensionLine
              points={[
                [
                  item.x,
                  hanging ? item.top + 25 : withFeet ? item.top + hangingSize : item.top,
                  depth + 2.3,
                ],
                [
                  item.x,
                  hanging ? item.bottom + 25 : withFeet ? item.bottom + hangingSize : item.bottom,
                  depth + 2.3,
                ],
              ]}
              endDir="X"
              value={parseInt(
                withOutFeet
                  ? item.top - item.bottom + Config.plate.plinthHeight
                  : item.top - item.bottom
              )}
              center={[
                item.x,
                (hanging
                  ? item.top + item.bottom + 25
                  : withFeet
                  ? item.top + item.bottom + hangingSize
                  : item.top + item.bottom) / 2,
                depth + 2.3,
              ]}
              lineWidth={1.8}
              isBig={false}
            />
          </group>
        ))}

      {/* width */}
      <DimensionLine
        points={[
          [0, 0, depth + 80],
          [width, 0, depth + 80],
        ]}
        value={parseInt(width)}
        endDir="Y"
        center={[width / 2, 0, depth + 80]}
        lineWidth={2.5}
        isBig={true}
      />
      <DimensionLine
        points={[
          [-25, 0, 0],
          [-25, 0, depth],
        ]}
        endDir="X"
        value={parseInt(depth)}
        center={[-25, 0, depth / 2]}
        lineWidth={2.5}
        isBig={true}
      />

      {/* //* height */}
      <DimensionLine
        points={[
          [width + 15, 0, depth],
          [
            width + 15,
            hanging === true ? height + 25 : withFeet ? height + hangingSize : height,
            depth,
          ],
        ]}
        endDir="X"
        value={parseInt(hanging === true ? height + 25 : withFeet ? height + hangingSize : height)}
        center={[
          width + 15,
          hanging === true ? (height + 25) / 2 : withFeet ? height / 2 + hangingSize : height / 2,
          depth,
        ]}
        lineWidth={2.5}
        isBig={true}
      />
      {elementsInfo.map((info, index) => (
        <DimensionLine
          key={index}
          points={[
            [info - elementsWidths[index] / 2, 0, depth + 40],
            [info + elementsWidths[index] / 2, 0, depth + 40],
          ]}
          endDir="Y"
          value={parseInt(elementsWidths[index])}
          center={[info, 0, depth + 40]}
          lineWidth={1.8}
          isBig={false}
        />
      ))}
    </>
  );
});

export default DimensionGroup;
