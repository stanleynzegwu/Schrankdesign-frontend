import { useCallback, useEffect, useState } from "react";
import Config from "../../../config";
import { formatNumber } from "../../utils/formatNumber";
import CustomSlider1 from "../../common/customSlider1";
import PlusIcon from "../../../../assets/icons/plus_icon.svg";
import MinusIcon from "../../../../assets/icons/minus_icon.svg";
import useDimensionStore from "../../zustand/dimensionStore";
import useFurnishingStore from "../../zustand/furnishingStore";
// import toast from "react-hot-toast";

export default function WardrobeSize() {
  const width = useDimensionStore.use.width();
  const height = useDimensionStore.use.height();
  const depth = useDimensionStore.use.depth();
  const elementsCount = useDimensionStore.use.elementsCount();
  const manual = useDimensionStore.use.manual();
  const elementsWidths = useDimensionStore.use.elementsWidths();
  const setWidth = useDimensionStore.use.setWidth();
  const setHeight = useDimensionStore.use.setHeight();
  const setDepth = useDimensionStore.use.setDepth();
  const setElementsCount = useDimensionStore.use.setElementsCount();
  const setElementsWidths = useDimensionStore.use.setElementsWidths();
  const eWidthsFixed = useDimensionStore.use.eWidthsFixed();

  const minLength = useDimensionStore.use.minLength();
  // const minHeight = useDimensionStore.use.minHeight();



  // use temp variables for just showing on UI
  const [tempWidth, setTempWidth] = useState(width.toFixed(0));
  const [tempHeight, setTempHeight] = useState(height.toFixed(0));
  const [tempDepth, setTempDepth] = useState(depth.toFixed(0));

  // For the comparison with maxheight of furnishingAssets
  const maxHeight = useFurnishingStore.use.maxHeight();
  const maxDepth = useFurnishingStore.use.maxDepth();

  useEffect(() => {
    setTempWidth(width.toFixed(0));
  }, [width]);

  useEffect(() => {
    // console.log("herererer", maxHeight)
  }, [maxHeight]);

  const handleWidth = useCallback(
    (w) => {
      if (w === width) return;
      if (!manual) {
        // standard
        let numberofElement = Math.floor(
          (w - Config.plate.thickness) /
            (Config.plate.maxDoorLength + Config.plate.thickness)
        );
        // in the case of exactly different
        if (
          w !=
          numberofElement * Config.plate.maxDoorLength +
            (numberofElement + 1) * Config.plate.thickness
        ) {
          numberofElement++;
        }

        const elements = [];

        let tempElementWidth = Number(
          (
            (w - Config.plate.thickness) / numberofElement -
            Config.plate.thickness
          ).toFixed(1)
        );

        if (tempElementWidth < minLength) {
          numberofElement = Math.floor(
            (w - Config.plate.thickness) / (minLength + Config.plate.thickness)
          );
        }

        if (w == 35) 
          numberofElement = 1

        for (let index = 0; index < numberofElement; index++) {
          elements.push(
            Number(
              (
                (w - Config.plate.thickness) / numberofElement -
                Config.plate.thickness
              ).toFixed(1)
            )
          );
        }

        setElementsWidths(elements);

        setElementsCount(numberofElement);

        setWidth(w);
      } else {
        // manual case
        const widthRange = [
          {
            min: Config.plate.thickness,
            max: Config.plate.thickness,
          },
        ];
        const fixedSum = [Config.plate.thickness];
        const fixedCount = [0];

        for (let index = 0; index < elementsCount; index++) {
          if (eWidthsFixed[index]) {
            widthRange.push({
              min:
                widthRange[index].min +
                elementsWidths[index] +
                Config.plate.thickness,
              max:
                widthRange[index].max +
                elementsWidths[index] +
                Config.plate.thickness,
            });
            fixedSum.push(
              fixedSum[index] + elementsWidths[index] + Config.plate.thickness
            );
            fixedCount.push(fixedCount[index] + 1);
          } else {
            widthRange.push({
              min:
                widthRange[index].min +
                // Config.plate.minWidth +
                minLength +
                Config.plate.thickness,
              max:
                widthRange[index].max +
                Config.plate.maxDoubleDoorLength +
                Config.plate.thickness,
            });
            fixedSum.push(fixedSum[index]);
            fixedCount.push(fixedCount[index]);
          }
        }

        let count = elementsCount;

        if (w < widthRange[elementsCount].min) {
          // reduce number of elements
          while (count > 0 && w < widthRange[count].min) count--;

          if (count == 0) {
            initializeElements(elementsCount - 1);
            return;
          }

          // if last index is fixed then initialize with count - 1
          if (eWidthsFixed[count - 1]) {
            initializeElements(count - 1);
            return;
          }
        } else if (w > widthRange[elementsCount].max) {
          // increase number of elements
          let maxWidth = widthRange[elementsCount].max;
          while (w > maxWidth) {
            count++;
            maxWidth =
              maxWidth +
              Config.plate.maxDoubleDoorLength +
              Config.plate.thickness;
          }
        }

        let expectedDistance = Number(
          (
            (w - fixedSum[count > elementsCount ? elementsCount : count]) /
              (count -
                fixedCount[count > elementsCount ? elementsCount : count]) -
            Config.plate.thickness
          ).toFixed(1)
        );

        const elements = [];
        for (let index = 0; index < count; index++) {
          if (eWidthsFixed[index]) {
            elements.push(elementsWidths[index]);
          } else {
            elements.push(expectedDistance);
          }
        }

        setElementsWidths(elements);

        setWidth(w);

        if (count != elementsCount) {
          setElementsCount(count);
        }
      }
    },
    [width, elementsCount, manual, elementsWidths]
  );

  // initialize element widths with current value and count size
  const initializeElements = (count) => {
    if (count < 1) return;
    const elements = [];
    let expectedWidth = 0;

    for (let index = 0; index < count; index++) {
      if (eWidthsFixed[index]) {
        elements.push(elementsWidths[index]);
      } else {
        elements.push(Config.plate.minWidth);
      }
      expectedWidth += elements[index] + Config.plate.thickness;
    }

    expectedWidth += Config.plate.thickness;

    setElementsWidths(elements);

    setElementsCount(elements.length);

    setWidth(expectedWidth);
    setTempWidth(expectedWidth.toFixed(0));
  };

  const changeWidth = useCallback((e) => {
    validateWidth(formatNumber(e.target.value));
  }, []);

  const validateWidth = useCallback(
    (temp) => {
      if (temp < Math.floor(minLength+ Config.plate.thickness*2)) {
        alert("width should be greater than " + minLength.toString() + "cm.");
        setTempWidth(Math.floor(minLength+ Config.plate.thickness*2).toString());
        handleWidth(minLength + Config.plate.thickness*2);
      } else if (temp > Config.plate.maxWidth) {
        alert(
          "width should be less than " +
            Config.plate.maxWidth.toString() +
            "cm."
        );
        setTempWidth(Config.plate.maxWidth.toString());
        handleWidth(Config.plate.maxWidth);
      } else {
        setTempWidth(temp.toFixed(0));
        handleWidth(temp);
      }
    },
    [width]
  );

  const changeHeight = useCallback((e) => {
    validateHeight(formatNumber(e.target.value));
  }, []);

  const validateHeight = useCallback(
    (temp) => {
      if (maxHeight != 0 && temp < maxHeight) {
        alert(
          "The height cannot be reduced below " +
            maxHeight.toFixed(0) +
            "cm due to an equipment element. Please adjust the interior if necessary."
        );
        setTempHeight(height.toFixed(0));
      } else if (temp < Config.plate.minHeight) {
        alert(
          "Height should be greater than " +
            Config.plate.minHeight.toString() +
            "cm."
        );
        setTempHeight(Config.plate.minHeight.toString());
        setHeight(Config.plate.minHeight);
      } else if (temp > Config.plate.maxHeight) {
        alert(
          "Height should be less than " +
            Config.plate.maxHeight.toString() +
            "cm."
        );
        setTempHeight(Config.plate.maxHeight.toString());
        setHeight(Config.plate.maxHeight);
      } else {
        setTempHeight(temp.toFixed(0));
        setHeight(temp);
      }
    },
    [maxHeight, height]
  );

  const changeDepth = useCallback((e) => {
    validateDepth(formatNumber(e.target.value));
  }, []);

  const validateDepth = useCallback(
    (temp) => {
      if (temp < maxDepth) {
        alert(
          "The depth cannot be reduced below " +
            maxDepth.toFixed(0) +
            "cm due to an equipment element. Please adjust the interior if necessary."
        );
        setTempDepth(depth.toFixed(0));
      } else if (temp < Config.plate.minDepth) {
        alert(
          "Depth should be greater than " +
            Config.plate.minDepth.toString() +
            "cm."
        );
        setTempDepth(Config.plate.minDepth.toString());
        setDepth(Config.plate.minDepth);
      } else if (temp > Config.plate.maxDepth) {
        alert(
          "Depth should be less than " +
            Config.plate.maxDepth.toString() +
            "cm."
        );
        setTempDepth(Config.plate.maxDepth.toString());
        setDepth(Config.plate.maxDepth);
      } else {
        setTempDepth(temp.toFixed(0));
        setDepth(temp);
      }
    },
    [maxDepth, depth]
  );

  return (
    <>
      <div className="flex flex-row justify-between items-center mt-2">
        <div className="text-[#36695C] text-3xl/none font-bold">Breite</div>
        <div className="flex flex-row justify-between items-center gap-1 rounded-[5px] border-[1px] border-[#545454] w-[117px] h-[37px] px-5">
          <input
            type="number"
            className="bg-[#FFF] text-xl text-[#000] h-5 w-12 focus:outline-none focus:border-none"
            value={tempWidth}
            onChange={(e) => {
              setTempWidth(e.target.value);
            }}
            onBlur={changeWidth}
          />
          <span className="text-xl text-[#000]">cm</span>
        </div>
      </div>
      <div className="flex gap-x-4 mt-3">
        <button
          className="w-[37px] h-[37px] p-[0px] bg-transparent flex-none rounded-[5px] border-[1px] border-[#545454]"
          onClick={() => {
            validateWidth(width - 1);
          }}
        >
          <img src={MinusIcon} className="w-[37px]" />
        </button>
        <CustomSlider1
          aria-label="width"
          value={Number(tempWidth)}
          onChange={(e) =>{
            validateWidth(formatNumber(e.target.value))
          }}
          min={Math.floor(minLength+ Config.plate.thickness*2)+1}
          max={Config.plate.maxWidth}
        />
        <button
          className="w-[37px] h-[37px] p-[0px] bg-transparent flex-none rounded-[5px] border-[1px] border-[#545454]"
          onClick={() => {
            validateWidth(width + 1);
          }}
        >
          <img src={PlusIcon} className="w-[37px]" />
        </button>
      </div>

      <div className="flex flex-row justify-between items-center mt-6">
        <div className="text-[#36695C] text-3xl/none font-bold">Höhe</div>
        <div className="flex flex-row justify-between items-center gap-1 rounded-[5px] border-[1px] border-[#545454] w-[117px] h-[37px] px-5">
          <input
            type="number"
            className="bg-[#FFF] text-xl text-[#000] h-5 w-12 focus:outline-none focus:border-none"
            value={tempHeight}
            onChange={(e) => {
              setTempHeight(e.target.value);
            }}
            onBlur={changeHeight}
          />
          <span className="text-xl text-[#000]">cm</span>
        </div>
      </div>
      <div className="flex gap-x-4 mt-3">
        <button
          className="w-[37px] h-[37px] p-[0px] bg-transparent flex-none rounded-[5px] border-[1px] border-[#545454]"
          onClick={() => {
            validateHeight(height - 1);
          }}
        >
          <img src={MinusIcon} className="w-[37px]" />
        </button>
        <CustomSlider1
          aria-label="width"
          value={Number(tempHeight)}
          onChange={changeHeight}
          min={maxHeight}
          max={Config.plate.maxHeight}
        />
        <button
          className="w-[37px] h-[37px] p-[0px] bg-transparent flex-none rounded-[5px] border-[1px] border-[#545454]"
          onClick={() => {
            validateHeight(height + 1);
          }}
        >
          <img src={PlusIcon} alt="plus" className="w-[37px]" />
        </button>
      </div>
      <div className="flex flex-row justify-between items-center mt-6">
        <div className="text-[#36695C] text-3xl/none font-bold">Tiefe</div>
        <div className="flex flex-row justify-between items-center gap-1 rounded-[5px] border-[1px] border-[#545454] w-[117px] h-[37px] px-5">
          <input
            type="number"
            className="bg-[#FFF] text-xl text-[#000] h-5 w-12 focus:outline-none focus:border-none"
            value={tempDepth}
            onChange={(e) => {
              setTempDepth(e.target.value);
            }}
            onBlur={changeDepth}
          />
          <span className="text-xl text-[#000]">cm</span>
        </div>
      </div>
      <div className="flex gap-x-4 mt-3 mb-1">
        <button
          className="w-[37px] h-[37px] p-[0px] bg-transparent flex-none rounded-[5px] border-[1px] border-[#545454]"
          onClick={() => {
            validateDepth(depth - 1);
          }}
        >
          <img src={MinusIcon} className="w-[37px]" />
        </button>
        <CustomSlider1
          aria-label="width"
          value={Number(tempDepth)}
          onChange={changeDepth}
          min={maxDepth}
          max={Config.plate.maxDepth}
        />
        <button
          className="w-[37px] h-[37px] p-[0px] bg-transparent flex-none rounded-[5px] border-[1px] border-[#545454]"
          onClick={() => {
            validateDepth(depth + 1);
          }}
        >
          <img src={PlusIcon} className="w-[37px]" />
        </button>
      </div>
    </>
  );
}
