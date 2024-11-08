import { useCallback } from "react"
import Switch from "react-switch"

import FittingAll from "../../../../assets/icons/fitting_all.svg"
import FittingLeft from "../../../../assets/icons/fitting_left.svg"
import FittingRight from "../../../../assets/icons/fitting_right.svg"
import FittingTop from "../../../../assets/icons/fitting_top.svg"
// import InfoIcon from "../../../../assets/icons/info_icon.svg"
import { InfoIcon } from "@src/components/icons";

import { Grid } from "@mui/material"
import Config from "../../../config"
import useDimensionStore from "../../zustand/dimensionStore"

export default function FittingPanel() {
  const enableFittingPanel = useDimensionStore.use.enableFittingPanel()
  const fittingType = useDimensionStore.use.fittingType()
  const setEnableFittingPanel = useDimensionStore.use.setEnableFittingPanel()
  const setFittingType = useDimensionStore.use.setFittingType()

  const handleChange = useCallback(() => {
    if (enableFittingPanel) {
      setEnableFittingPanel(false)
    } else {
      setEnableFittingPanel(true)
    }
  }, [enableFittingPanel])

  return (
    <>
      <h1 className="mb-4 text-[16px] text-[#000]">
        Wählen Sie, ob Sie Außen-Blenden für Ihren Schrank wünschen, um einen
        nahtlosen Einbau zu erzielen.Eigenes Zuschneiden erforderlich
      </h1>
      <div className="flex justify-center">
        <Switch
          checked={enableFittingPanel}
          onChange={handleChange}
          borderRadius={26}
          width={143}
          height={47}
          handleDiameter={47}
          offColor="#36695C"
          onColor="#36695C"
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
      {enableFittingPanel && (
        <Grid container spacing={2} sx={{ marginTop: 1, marginBottom: 3 }}>
          <Grid item xs={6}>
            <div className="flex flex-col items-center">
              <div className="h-[124px] relative">
                <img src={FittingAll} />
                <div className="absolute right-0 top-0 cursor-target">
                  <InfoIcon />
                </div>
              </div>
              <button
                className="mt-2 w-[137px] text-[18px] text-[#F6F6F6] box-shadow-custom rounded-[5px] border-[1px] border-opacity-30 border-black normal-case"
                style={
                  fittingType === Config.fittingType.all
                    ? { background: "#36695C" }
                    : { background: "#BDBCBC" }
                }
                onClick={() => {
                  setFittingType(Config.fittingType.all)
                }}
              >
                Umlaufend
              </button>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="flex flex-col items-center">
              <div className="h-[124px] relative">
                <img src={FittingRight} />
                <div className="absolute right-0 top-0 cursor-target">
                  <InfoIcon />
                </div>
              </div>
              <button
                className="mt-2 w-[137px] text-[18px] text-[#F6F6F6] box-shadow-custom rounded-[5px] border-[1px] border-opacity-30 border-black normal-case"
                style={
                  fittingType === Config.fittingType.right
                    ? { background: "#36695C" }
                    : { background: "#BDBCBC" }
                }
                onClick={() => {
                  setFittingType(Config.fittingType.right)
                }}
              >
                Rechts/Oben
              </button>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="flex flex-col items-center">
              <div className="h-[124px] relative">
                <img src={FittingLeft} />
                <div className="absolute right-0 top-0 cursor-target">
                  <img src={InfoIcon} />
                </div>
              </div>
              <button
                className="mt-2 w-[137px] text-[18px] text-[#F6F6F6] box-shadow-custom rounded-[5px] border-[1px] border-opacity-30 border-black normal-case"
                style={
                  fittingType === Config.fittingType.left
                    ? { background: "#36695C" }
                    : { background: "#BDBCBC" }
                }
                onClick={() => {
                  setFittingType(Config.fittingType.left)
                }}
              >
                Links/Oben
              </button>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="flex flex-col items-center">
              <div className="h-[124px] relative">
                <img src={FittingTop} />
                <div className="absolute right-0 top-0 cursor-target">
                  <InfoIcon />
                </div>
              </div>
              <button
                className="mt-2 w-[137px] text-[18px] text-[#F6F6F6] box-shadow-custom rounded-[5px] border-[1px] border-opacity-30 border-black normal-case"
                style={
                  fittingType === Config.fittingType.top
                    ? { background: "#36695C" }
                    : { background: "#BDBCBC" }
                }
                onClick={() => {
                  setFittingType(Config.fittingType.top)
                }}
              >
                Oben
              </button>
            </div>
          </Grid>
        </Grid>
      )}
    </>
  )
}
