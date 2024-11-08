import { useEffect, useState } from "react"
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react"
import WardrobeSize from "./wardrobeSize"
import BaseboardCutout from "./baseboardCutout"
import FittingPanel from "./fittingPanel"
import ElementWidth from "./elementWidth"
import KorpusFrom from "./KorpusForm"

import InfoIconS from "../../../../assets/icons/info_icon_s.svg"
import TriangleLeft from "../../../../assets/icons/triangle_left.svg"
import TriangleDown from "../../../../assets/icons/triangle_down.svg"
import Config from "../../../config"
import useDimensionStore from "../../zustand/dimensionStore"
import useCornerStore from "../../zustand/cornerStore"

function Icon({ id, open }) {
  return (
    <div className="flex flex-row gap-3">
      {id === open && (
        <>
          <div className="flex flex-row items-center justify-center gap-2 bg-[#36695C] w-[118px] h-[30px] border border-black border-opacity-30 rounded-[5px] pt-[-3px] box-shadow-custom">
            <img src={InfoIconS} />
            <span className="font-semibold text-sm text-white">
              {id === "size" ? "Aufmaßhilfe" : "Ratgeber"}
            </span>
          </div>
          <img src={TriangleLeft} className="pt-1" />
        </>
      )}
      {id !== open && <img src={TriangleDown} className="pt-1" />}
    </div>
  )
}

export default function Dimensions(props) {
  const [open, setOpen] = useState("size")
  const baseCutout = useDimensionStore.use.baseCutout()
  const externalPanel = useDimensionStore.use.externalPanel()
  const korpusFormA = useDimensionStore.use.korpusFormA()
  const enableCutout = useDimensionStore.use.enableCutout()
  const setCornerView = useDimensionStore.use.setCornerView()

  const setViewOption = useCornerStore.use.setViewOption()

  const { activeTab } = props
  const handleOpen = (value) => setOpen(open === value ? "none" : value)

  useEffect(() => {
    if (open === "baseboard") {
      if (enableCutout) {
        setCornerView(true)
        setViewOption(Config.view.around)
      }
    } else setCornerView(false)
  }, [open])

  useEffect(() => {
    if (activeTab === "dimensions") {
      if (open === "baseboard" && enableCutout) {
        setCornerView(true)
        setViewOption(Config.view.around)
      }
    } else setCornerView(false)
  }, [activeTab])

  return (
    <>
      <Accordion open={open === "size"} icon={<Icon id="size" open={open} />}>
        <AccordionHeader
          onClick={() => handleOpen("size")}
          className={`${
            open === "size"
              ? "bg-[#577E60] text-[#FFF]"
              : "bg-[#E5E5E5] text-[#456779]"
          } py-2 pl-6 pr-4 border-b-0 border-t-[1px] border-t-[#000000]`}
        >
          <span className="pt-1">Außen-Maße</span>
        </AccordionHeader>
        <AccordionBody className="custom-scrollbar px-10 overflow-y-auto max-h-[calc(100vh-460px)]">
          <WardrobeSize />
        </AccordionBody>
      </Accordion>
      <Accordion
        open={open === "elementWidth"}
        icon={<Icon id="elementWidth" open={open} />}
      >
        <AccordionHeader
          onClick={() => handleOpen("elementWidth")}
          className={`${
            open === "elementWidth"
              ? "bg-[#577E60] text-[#FFF]"
              : "bg-[#E5E5E5] text-[#456779]"
          } py-2 pl-6 pr-4 border-b-0 border-t-[1px] border-t-[#000000]`}
        >
          Spalten-Anzahl
        </AccordionHeader>
        <AccordionBody className="custom-scrollbar overflow-y-auto max-h-[calc(100vh-460px)]">
          <ElementWidth />
        </AccordionBody>
      </Accordion>
      {baseCutout && (
        <Accordion
          open={open === "baseboard"}
          icon={<Icon id="baseboard" open={open} />}
        >
          <AccordionHeader
            onClick={() => handleOpen("baseboard")}
            className={`${
              open === "baseboard"
                ? "bg-[#577E60] text-[#FFF]"
                : "bg-[#E5E5E5] text-[#456779]"
            } py-2 pl-6 pr-4 border-b-0 border-t-[1px] border-t-[#000000]`}
          >
            Sockel-Ausschnitt
          </AccordionHeader>
          <AccordionBody className="px-10 custom-scrollbar overflow-y-auto max-h-[calc(100vh-460px)]">
            <BaseboardCutout />
          </AccordionBody>
        </Accordion>
      )}
      {externalPanel && (
        <Accordion
          open={open === "fittingPanel"}
          icon={<Icon id="fittingPanel" open={open} />}
        >
          <AccordionHeader
            onClick={() => handleOpen("fittingPanel")}
            className={`${
              open === "fittingPanel"
                ? "bg-[#577E60] text-[#FFF]"
                : "bg-[#E5E5E5] text-[#456779]"
            } py-2 pl-6 pr-4 border-b-0 border-t-[1px] border-t-[#000000]`}
          >
            Außen-Blenden
          </AccordionHeader>
          <AccordionBody className="px-10 custom-scrollbar overflow-y-auto max-h-[calc(100vh-460px)]">
            <FittingPanel />
          </AccordionBody>
        </Accordion>
      )}
      {korpusFormA.active && (
        <Accordion
          open={open === "korpusPanel"}
          icon={<Icon id="korpusPanel" open={open} />}
        >
          <AccordionHeader
            onClick={() => handleOpen("korpusPanel")}
            className={`${
              open === "korpusPanel"
                ? "bg-[#577E60] text-[#FFF]"
                : "bg-[#E5E5E5] text-[#456779]"
            } py-2 pl-6 pr-4 border-b-0 border-t-[1px] border-t-[#000000]`}
          >
            Korpus-Form
          </AccordionHeader>
          <AccordionBody className="px-10 custom-scrollbar overflow-y-auto max-h-[calc(100vh-460px)]">
            <KorpusFrom />
          </AccordionBody>
        </Accordion>
      )}
    </>
  )
}
