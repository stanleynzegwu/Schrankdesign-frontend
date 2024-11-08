import Switch from "react-switch"
import { useCallback, useState } from "react"
import CustomSlider1 from "../../common/customSlider1"

import Config from "../../../config"
import { formatNumber } from "../../utils/formatNumber"

import PlusIcon from "../../../../assets/icons/plus_icon.svg"
import MinusIcon from "../../../../assets/icons/minus_icon.svg"
import Cutout1 from "../../../../assets/icons/cutout1.svg"
import useDimensionStore from "../../zustand/dimensionStore"
import useCornerStore from "../../zustand/cornerStore"

export default function BaseboardCutout() {
  const baseType = useDimensionStore.use.baseType()
  const enableCutout = useDimensionStore.use.enableCutout()
  const cutoutDepth = useDimensionStore.use.cutoutDepth()
  const cutoutHeight = useDimensionStore.use.cutoutHeight()
  const setEnableCoutout = useDimensionStore.use.setEnableCoutout()
  const setCutoutDepth = useDimensionStore.use.setCutoutDepth()
  const setCutoutHeight = useDimensionStore.use.setCutoutHeight()
  const setCornerView = useDimensionStore.use.setCornerView()

  const setViewOption = useCornerStore.use.setViewOption()

  const [tempDepth, setTempDepth] = useState(cutoutDepth.toFixed(1))
  const [tempHeight, setTempHeight] = useState(cutoutHeight.toFixed(1))

  const handleDepth = (value) => {
    let expectedDepth = value

    if (value > Config.cutout.maxDepth) {
      expectedDepth = Config.cutout.maxDepth
      setTempDepth(Config.cutout.maxDepth.toFixed(1))
    } else if (value < Config.cutout.minDepth) {
      expectedDepth = Config.cutout.minDepth
      setTempDepth(Config.cutout.minDepth.toFixed(1))
    } else {
      setTempDepth(expectedDepth.toFixed(1))
    }

    setCutoutDepth(expectedDepth)
  }

  const handleHeight = (value) => {
    let expectedHeight = value

    if (value > Config.cutout.maxHeight) {
      expectedHeight = Config.cutout.maxHeight
      setTempHeight(Config.cutout.maxHeight.toFixed(1))
    } else if (value < Config.cutout.minHeight) {
      expectedHeight = Config.cutout.minHeight
      setTempHeight(Config.cutout.minHeight.toFixed(1))
    } else {
      setTempHeight(expectedHeight.toFixed(1))
    }

    setCutoutHeight(expectedHeight)
  }

  const handleChange = useCallback(() => {
    if (enableCutout) {
      setEnableCoutout(false)
      setCornerView(false)
      setViewOption(Config.view.around)
    } else {
      setEnableCoutout(true)
      setCornerView(true)
      setViewOption(Config.view.around)
    }
  }, [enableCutout])

  return (
    <>
      <h1 className="mb-4 text-[16px] text-[#000]">
        Hier können Sie einen Fußleistenausschnitt anfertigen, sodass Ihr
        Schrank direkt an der Wand stehen kann
      </h1>
      <div className="flex justify-center mb-5">
        <Switch
          checked={enableCutout}
          onChange={handleChange}
          borderRadius={26}
          width={143}
          height={47}
          handleDiameter={47}
          offColor="#456779"
          onColor="#456779"
          className="react-switch"
          id="small-raidus-switch"
          uncheckedHandleIcon={
            <div
              style={{
                background: "#F6F6F6",
                borderRadius: "26px",
                color: "#000",
                width: "57px",
                height: "37px",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "5px",
                marginLeft: "8px",
              }}
            >
              Ohne
            </div>
          }
          checkedHandleIcon={
            <div
              style={{
                background: "#F6F6F6",
                borderRadius: "26px",
                color: "#000",
                width: "57px",
                height: "37px",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "5px",
                marginLeft: "-18px",
              }}
            >
              Mit
            </div>
          }
          uncheckedIcon={<div></div>}
          checkedIcon={<div></div>}
        />
      </div>
      {enableCutout && (
        <>
          <div className="flex flex-row justify-between items-center mt-5">
            <h1 className="text-[#36695C] text-2xl/none font-bold">
              Höhe-Ausschnitt
            </h1>
            <div className="flex flex-row justify-between items-center gap-1 rounded-[5px] border-[1px] border-[#545454] w-[87px] h-[37px] px-3">
              <input
                type="number"
                className="bg-[#FFF] text-xl text-center text-[#000] h-5 w-8 focus:outline-none focus:border-none"
                disabled={baseType == Config.baseType.gliders || !enableCutout}
                value={tempHeight}
                onChange={(e) => {
                  setTempHeight(e.target.value)
                }}
                onBlur={(e) => {
                  handleHeight(formatNumber(e.target.value))
                }}
              />
              <span className="text-xl text-[#000]">cm</span>
            </div>
          </div>
          <div className="flex gap-x-4 mt-2">
            <button
              className="w-[37px] h-[37px] p-[0px] bg-transparent flex-none rounded-[5px] border-[1px] border-[#545454]"
              onClick={() => {
                handleHeight(cutoutHeight - 0.1)
              }}
            >
              <img src={MinusIcon} className="w-[37px]" />
            </button>
            <CustomSlider1
              aria-label="height"
              value={Number(tempHeight)}
              onChange={(e) => handleHeight(formatNumber(e.target.value))}
              min={Config.cutout.minHeight}
              max={Config.cutout.maxHeight}
              step={0.1}
            />
            <button
              className="w-[37px] h-[37px] p-[0px] bg-transparent flex-none rounded-[5px] border-[1px] border-[#545454]"
              onClick={() => {
                handleHeight(cutoutHeight + 0.1)
              }}
            >
              <img src={PlusIcon} className="w-[37px]" />
            </button>
          </div>
          <div className="flex flex-row justify-between items-center mt-5">
            <h1 className="text-[#36695C] text-2xl/none font-bold">
              Tiefe-Ausschnitt
            </h1>
            <div className="flex flex-row justify-between items-center gap-1 rounded-[5px] border-[1px] border-[#545454] w-[87px] h-[37px] px-3">
              <input
                type="number"
                className="bg-[#FFF] text-xl text-center text-[#000] h-5 w-8 focus:outline-none focus:border-none"
                disabled={baseType == Config.baseType.gliders || !enableCutout}
                value={tempDepth}
                onChange={(e) => {
                  setTempDepth(e.target.value)
                }}
                onBlur={(e) => {
                  handleDepth(formatNumber(e.target.value))
                }}
              />
              <span className="text-xl text-[#000]">cm</span>
            </div>
          </div>
          <div className="flex gap-x-4 mt-2">
            <button
              className="w-[37px] h-[37px] p-[0px] bg-transparent flex-none rounded-[5px] border-[1px] border-[#545454]"
              onClick={() => {
                handleDepth(cutoutDepth - 0.1)
              }}
            >
              <img src={MinusIcon} className="w-[37px]" />
            </button>
            <CustomSlider1
              aria-label="depth"
              value={Number(tempDepth)}
              onChange={(e) => handleDepth(formatNumber(e.target.value))}
              min={Config.cutout.minDepth}
              max={Config.cutout.maxDepth}
              step={0.1}
            />
            <button
              className="w-[37px] h-[37px] p-[0px] bg-transparent flex-none rounded-[5px] border-[1px] border-[#545454]"
              onClick={() => {
                handleDepth(cutoutDepth + 0.1)
              }}
            >
              <img src={PlusIcon} alt="plus" className="w-[37px]" />
            </button>
          </div>
          <div className="mt-3 mr-3 mb-3">
            <img src={Cutout1} className="ml-auto" />
          </div>
        </>
      )}
    </>
  )
}
