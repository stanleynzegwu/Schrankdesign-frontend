import { Button } from "@material-tailwind/react"
import { useEffect } from "react"

import FrontIcon from "../../../assets/icons/show_front.svg"
import DimensionIcon from "../../../assets/icons/show_dimension.svg"
import AllIcon from "../../../assets/icons/show_all.svg"

import Config from "../../config"
import useCornerStore from "../zustand/cornerStore"

export default function ViewOption() {
  const viewOption = useCornerStore.use.viewOption()
  const setViewOption = useCornerStore.use.setViewOption()
  const setShowDimensions = useCornerStore.use.setShowDimensions()

  useEffect(() => {
    if (viewOption === Config.view.dimension) setShowDimensions(true)
    else setShowDimensions(false)
  }, [viewOption])

  return (
    <div className="bg-[#F6F6F6] absolute top-[9px] right-[7px] px-[12px] py-[8px]">
      <Button
        className={`${
          viewOption === Config.view.front ? "bg-[#456779]" : "bg-[#949494]"
        } h-[40px] rounded-[2px] mb-1 flex flex-start items-center gap-2 w-full normal-case text-[14px] underline pl-[15px] pr-[9px]`}
        onClick={() => {
          setViewOption(Config.view.front)
        }}
      >
        <img src={FrontIcon} className="mr-[10px]" />
        Ansicht : Vorne
      </Button>
      {open && (
        <>
          <Button
            className={`${
              viewOption === Config.view.dimension
                ? "bg-[#456779]"
                : "bg-[#949494]"
            } h-[40px] rounded-[2px] mb-1 flex flex-start items-center gap-2 w-full normal-case text-[14px] underline pl-[8px] pr-[9px]`}
            onClick={() => {
              setViewOption(Config.view.dimension)
            }}
          >
            <img src={DimensionIcon} className="mr-[10px]" />
            Ansicht : Maße
          </Button>
          <Button
            className={`${
              viewOption === Config.view.around
                ? "bg-[#456779]"
                : "bg-[#949494]"
            } h-[40px] rounded-[2px] mb-1 flex flex-start items-center gap-2 w-full normal-case text-[14px] underline pl-[5px] pr-[9px]`}
            onClick={() => {
              setViewOption(Config.view.around)
            }}
          >
            <img src={AllIcon} />
            Ansicht : 180 °
          </Button>
        </>
      )}
    </div>
  )
}
