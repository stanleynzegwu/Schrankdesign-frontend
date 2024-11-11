import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { Fragment } from "react";

import Config from "../../../config";
import { formatNumber } from "../../utils/formatNumber";

import PlusIcon from "../../../../assets/icons/plus_icon.svg";
import MinusIcon from "../../../../assets/icons/minus_icon.svg";
import SpliteIcon from "../../../../assets/icons/splite_icon.svg";
import CustomSlider1 from "../../common/customSlider1";
import InputSlider from "../../common/inputSlider";
import useDimensionStore from "../../zustand/dimensionStore";

export default function ElementWidth() {
  const width = useDimensionStore.use.width();
  const elementsCount = useDimensionStore.use.elementsCount();
  const manual = useDimensionStore.use.manual();
  const elementsWidths = useDimensionStore.use.elementsWidths();
  const setWidth = useDimensionStore.use.setWidth();
  const setManual = useDimensionStore.use.setManual();
  const setElementsCount = useDimensionStore.use.setElementsCount();
  const setElementsWidths = useDimensionStore.use.setElementsWidths();
  const eWidthsFixed = useDimensionStore.use.eWidthsFixed();
  const setEWidthsFixed = useDimensionStore.use.setEWidthsFixed();
  const minLength = useDimensionStore.use.minLength();

  const [tempEWidths, setTempEWidths] = useState();
  const [tempECount, setTempECount] = useState(elementsCount);

  const [showWidths, setShowWidths] = useState(false);
  const [countRange, setCountRange] = useState({ min: 2, max: 7 });
  useEffect(() => {
    let remainedWidth = width - Config.plate.thickness;
    let fixedCount = 0;
    elementsWidths.forEach((item, index) => {
      if (eWidthsFixed[index]) {
        remainedWidth = remainedWidth - item - Config.plate.thickness;
        fixedCount++;
      }
    });
    setCountRange({
      min:
        Math.ceil(remainedWidth / (Config.plate.maxDoubleDoorLength + Config.plate.thickness)) +
        fixedCount,
      max: Math.floor(remainedWidth / (minLength + Config.plate.thickness)) + fixedCount,
    });
    setTempECount(elementsCount);
    setTempEWidths(elementsWidths);
  }, [width, elementsWidths, eWidthsFixed, minLength]);

  const initializeElements = (count) => {
    if (count < 1) return;
    const elements = [];
    let expectedWidth = 0;

    for (let index = 0; index < count; index++) {
      if (eWidthsFixed[index]) {
        elements.push(Number(tempEWidths[index]));
      } else {
        elements.push(Config.plate.minDoorLength);
      }
      expectedWidth += elements[index] + Config.plate.thickness;
    }

    expectedWidth += Config.plate.thickness;

    setElementsWidths(elements);
    setTempEWidths(elements.map((value) => value.toFixed(1)));

    setElementsCount(elements.length);
    setTempECount(elements.length);

    setWidth(expectedWidth);
  };

  const handleElements = (currentIndex, value, fixedArray) => {
    if (elementsWidths[currentIndex] == value) return;

    let widthRemainder = width;
    let fixedCount = 0;

    for (let index = 0; index < elementsCount; index++) {
      // current value is already fixed
      if (fixedArray[index]) {
        widthRemainder =
          widthRemainder -
          (index == currentIndex ? value : elementsWidths[index]) -
          Config.plate.thickness;
        fixedCount++;
      }
    }

    if (widthRemainder < Config.plate.minDoorLength + 2 * Config.plate.thickness) {
      if (fixedCount == elementsCount) {
        initializeElements(elementsCount);
      } else {
        initializeElements(elementsCount - 1);
      }
    } else {
      let remainedCount = elementsCount - fixedCount;
      while (
        remainedCount > 0 &&
        ((widthRemainder - Config.plate.thickness) / remainedCount - Config.plate.thickness <
          Config.plate.minDoorLength ||
          (widthRemainder - Config.plate.thickness) / remainedCount - Config.plate.thickness >
            Config.plate.maxDoubleDoorLength)
      ) {
        remainedCount--;
      }

      if (currentIndex >= remainedCount + fixedCount) {
        // initialize with minimum door length
        // console.log("initialize with minimum door length")
        initializeElements(currentIndex);
      } else {
        const elementDistance = Number(
          (
            (widthRemainder - Config.plate.thickness) / remainedCount -
            Config.plate.thickness
          ).toFixed(1)
        );

        const elements = [];
        for (let i = 0; i < remainedCount + fixedCount; i++) {
          if (fixedArray[i]) {
            elements.push(i == currentIndex ? value : elementsWidths[i]);
          } else {
            elements.push(elementDistance);
          }
        }

        setElementsWidths(elements);
        setTempEWidths(elements.map((value) => value.toFixed(1)));

        setElementsCount(elements.length);
        setTempECount(elements.length);
      }
    }
  };

  const handleECounts = (eCount) => {
    if (eCount == elementsCount) return true;

    let widthRemainder = width;
    let fixedCount = 0;

    for (let index = 0; index < eCount; index++) {
      if (eWidthsFixed[index]) {
        widthRemainder = widthRemainder - elementsWidths[index] - Config.plate.thickness;
        fixedCount++;
      }
    }

    if (eCount == fixedCount) {
      initializeElements(eCount);
    } else {
      const expectedDistance = Number(
        (
          (widthRemainder - Config.plate.thickness) / (eCount - fixedCount) -
          Config.plate.thickness
        ).toFixed(1)
      );

      // update actual elementsCount if width is between min and max door length
      if (
        expectedDistance >= Config.plate.minDoorLength &&
        expectedDistance <= Config.plate.maxDoubleDoorLength
      ) {
        const elements = [];
        for (let index = 0; index < eCount; index++) {
          if (eWidthsFixed[index]) {
            elements.push(elementsWidths[index]);
          } else {
            elements.push(expectedDistance);
          }
        }

        setTempEWidths(elements.map((value) => value.toFixed(1)));
        setElementsWidths(elements);

        setElementsCount(eCount);
      } else if (expectedDistance < Config.plate.minDoorLength) {
        //adjustment while deceasing eCount
        let count = eCount;
        while (
          (widthRemainder - Config.plate.thickness) / (count - fixedCount) -
            Config.plate.thickness <
          Config.plate.minDoorLength
        )
          count--;

        const adjustedDistance = Number(
          (
            (widthRemainder - Config.plate.thickness) / (count - fixedCount) -
            Config.plate.thickness
          ).toFixed(1)
        );

        const elements = [];
        for (let index = 0; index < count; index++) {
          if (eWidthsFixed[index]) {
            elements.push(elementsWidths[index]);
          } else {
            elements.push(adjustedDistance);
          }
        }

        setTempEWidths(elements.map((value) => value.toFixed(1)));
        setElementsWidths(elements);

        setTempECount(count);
        setElementsCount(count);
      } else {
        return false;
      }
    }

    return true;
  };

  const onHandleCountBlur = (value) => {
    if (!manual) {
      setManual(true);
    }

    if (value < 1) alert("Only more than 1 elements should exist.");
    else {
      const count = parseInt(value);
      setTempECount(count);
      const result = handleECounts(count);
      if (!result) {
        alert("Adjust number of elements so door length should be between 25 and 60");
      }
    }
  };

  const onHandleWidthBlur = (value, index) => {
    if (value >= minLength && value <= Config.plate.maxDoubleDoorLength) {
      if (!manual) {
        setManual(true);
      }

      const fixedArray = [...eWidthsFixed];
      if (value != elementsWidths[index]) {
        fixedArray[index] = true;
        setEWidthsFixed(fixedArray);
      }

      const temp = formatNumber(value);
      setTempEWidths(
        tempEWidths.map((origin, indexL) => (indexL == index ? temp.toFixed(1) : origin))
      );
      handleElements(index, temp, fixedArray);
    } else {
      alert("Element width should be between" + minLength + " and 120");
    }
  };

  const handleEqualElement = () => {
    setEWidthsFixed(Array(elementsCount).fill(false));

    const expectedDistance = Number(
      ((width - Config.plate.thickness) / elementsCount - Config.plate.thickness).toFixed(1)
    );

    const elements = [];
    for (let index = 0; index < elementsCount; index++) {
      elements.push(expectedDistance);
    }

    setTempEWidths(elements.map((value) => value.toFixed(1)));
    setElementsWidths(elements);
  };

  return (
    <div>
      <div className="px-10 mt-2 mb-5">
        <div className="flex flex-row justify-between items-center mb-3">
          <div className="text-[#456779] text-3xl/none font-bold">Anzahl-Spalten</div>
          <input
            type="number"
            className="w-[37px] h-[37px] font-bold text-center rounded-[5px] border-[1px] border-[#545454] bg-[#FFF] text-xl text-[#000]"
            value={tempECount}
            onChange={(e) => {
              setTempECount(e.target.value);
            }}
            onBlur={(e) => onHandleCountBlur(e.target.value)}
          />
        </div>
        <div className="flex gap-x-4">
          <button
            className="w-[37px] h-[37px] p-[0px] bg-transparent flex-none rounded-[5px] border-[1px] border-[#545454]"
            onClick={() => {
              if (tempECount - 1 < countRange.min) return;
              setTempECount(tempECount - 1);
              onHandleCountBlur(tempECount - 1);
            }}
          >
            <img src={MinusIcon} className="w-[37px]" />
          </button>
          <CustomSlider1
            aria-label="width"
            value={Number(tempECount)}
            onChange={(e) => onHandleCountBlur(e.target.value)}
            min={countRange.min}
            max={countRange.max}
          />
          {/* {console.log(countRange)} */}
          <button
            className="w-[37px] h-[37px] p-[0px] bg-transparent flex-none rounded-[5px] border-[1px] border-[#545454]"
            onClick={() => {
              if (tempECount + 1 > countRange.max) return;
              setTempECount(tempECount + 1);
              onHandleCountBlur(tempECount + 1);
            }}
          >
            <img src={PlusIcon} className="w-[37px]" />
          </button>
        </div>
      </div>

      <div className="flex justify-center mb-3">
        <Button
          onClick={() => setShowWidths(!showWidths)}
          className="flex justify-center items-center gap-2 box-shadow-custom normal-case"
          style={
            !showWidths
              ? {
                  background: "#577E60",
                  border: "solid 1px",
                  borderColor: "rgba(0, 0, 0, 0.3)",
                  color: "#FFF",
                  fontWeight: "bold",
                  fontSize: "14px",
                  padding: "7px",
                  borderRadius: "5px",
                }
              : {
                  background: "#9DA39A",
                  border: "solid 1px",
                  borderColor: "#9DA39A",
                  color: "#FFF",
                  fontWeight: "bold",
                  fontSize: "14px",
                  padding: "7px",
                  borderRadius: "0px",
                  width: "-webkit-fill-available",
                }
          }
        >
          <img src={SpliteIcon} />
          Spalten individuell aufteilen
        </Button>
      </div>

      <div className="px-10">
        {showWidths &&
          Array(elementsCount)
            .fill(0)
            .map((item, index) => (
              <Fragment key={index}>
                <div className="text-[#456779] text-xl/none font-bold mt-3">Spalte {index + 1}</div>
                <div className="flex gap-x-12 mt-1 items-center">
                  <button
                    className="w-[29px] h-[29px] p-[0px] mt-1 flex-none justify-center bg-transparent rounded-[5px] border-[1px] border-[#545454]"
                    onClick={() => {
                      if (Number(tempEWidths[index]) - 1 < minLength) {
                        alert("Element width should be between" + minLength + " and 120");
                        return;
                      }

                      setTempEWidths(
                        tempEWidths.map((origin, indexL) =>
                          indexL == index ? Number(tempEWidths[index]) - 1 : origin
                        )
                      );
                      onHandleWidthBlur(Number(tempEWidths[index]) - 1, index);
                    }}
                  >
                    <img src={MinusIcon} className="w-[21px] ml-[3px]" />
                  </button>
                  <InputSlider
                    aria-label="width"
                    value={tempEWidths[index]}
                    onChange={(e) => {
                      // console.log(e.target.value)
                      setTempEWidths(
                        tempEWidths.map((origin, indexL) =>
                          indexL == index ? e.target.value : origin
                        )
                      );
                    }}
                    onBlur={(e) => {
                      if (tempEWidths[index] < minLength) {
                        setTempEWidths(
                          tempEWidths.map((origin, indexL) =>
                            indexL == index ? minLength : origin
                          )
                        );
                        onHandleWidthBlur(minLength, index);
                        alert("Element width should be between" + minLength + " and 120");
                      } else onHandleWidthBlur(e.target.value, index);
                    }}
                    min={minLength}
                    max={Config.plate.maxDoubleDoorLength}
                    sliderValue={elementsWidths[index]}
                  />
                  <button
                    className="w-[29px] h-[29px] p-[0px] mt-1 flex-none justify-center bg-transparent rounded-[5px] border-[1px] border-[#545454]"
                    onClick={() => {
                      if (Number(tempEWidths[index]) + 1 > Config.plate.maxDoubleDoorLength) return;

                      setTempEWidths(
                        tempEWidths.map((origin, indexL) =>
                          indexL == index ? Number(tempEWidths[index]) + 1 : origin
                        )
                      );
                      onHandleWidthBlur(Number(tempEWidths[index]) + 1, index);
                    }}
                  >
                    <img src={PlusIcon} className="w-[21px] ml-[3px]" />
                  </button>
                </div>
              </Fragment>
            ))}
      </div>

      {showWidths && (
        <div className="flex justify-center items-center mt-4 mb-2">
          <Button
            onClick={handleEqualElement}
            className="flex justify-center items-center gap-2 box-shadow-custom normal-case"
            style={{
              background: "#577E60",
              border: "solid 1px",
              borderColor: "rgba(0, 0, 0, 0.3)",
              color: "#FFF",
              fontWeight: "bold",
              fontSize: "14px",
              padding: "7px",
            }}
          >
            <img src={SpliteIcon} />
            Spalten gleichmäßig aufteilen
          </Button>
        </div>
      )}
    </div>
  );
}
