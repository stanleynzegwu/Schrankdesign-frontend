import { useCallback, useEffect } from "react";
import Switch from "react-switch";

import WardrobeShape from "../../../../assets/icons/Wardrobe-Shape.png";
import OuterShape from "../../../../assets/icons/Outer-Shape.png"
import TopShape from "../../../../assets/icons/Top-Shape.png"
import UShape from "../../../../assets/icons/U-Shape.png"
import InnerShape from "../../../../assets/icons/Inner-Shape.png"
import FullInnerShape from "../../../../assets/icons/Full-Inner-Shape.png"
import InfoIcon from "../../../../assets/icons/info_icon.svg";

import { Grid } from "@mui/material";
import Config from "../../../config";
import useDimensionStore from "../../zustand/dimensionStore";

export default function KorpusFrom() {
  const korpusFormA = useDimensionStore.use.korpusFormA()
  const korpusForm = useDimensionStore.use.korpusForm();
  const korpusType = useDimensionStore.use.korpusType();
  const setKorpusForm = useDimensionStore.use.setKorpusForm();
  const setKorpusType = useDimensionStore.use.setKorpusType();
  const setKorpusMaterial = useDimensionStore.use.setKorpusMaterial();
  useEffect(() => {
    const korpusProperty = Object.keys(korpusFormA.value)
    for (let i = 0; i < korpusProperty.length; i++) {
      const property = korpusProperty[i]
      if(korpusFormA.value[property]) {
        if (property === 'wardrobe') {
          setKorpusType(Config.korpusType.empty)
        }
        if (property === 'outer') {
          setKorpusType(Config.korpusType.outerShap)
        }
        if (property === 'top') {
          setKorpusType(Config.korpusType.topShap)
        }
        if (property === 'uShape') {
          setKorpusType(Config.korpusType.uShap)
        }
        if (property === 'inner') {
          setKorpusType(Config.korpusType.innerShap)
        }
        if (property === 'fullInner') {
          setKorpusType(Config.korpusType.innerShap2)
        }
        break
      }
    }
  }, [korpusFormA])

  return (
    <>
      <Grid container spacing={2} sx={{ marginTop: 1, marginBottom: 3 }}>
        {korpusFormA.value.wardrobe && (
          <Grid item xs={6}>
            <div className="flex flex-col items-center">
              <div className="h-[124px] relative">
                <img src={WardrobeShape} alt="Wardrobe Shape" />
                <div className="absolute right-0 top-0 cursor-target">
                  <img src={InfoIcon} />
                </div>
              </div>
              <button
                className="mt-2 w-[137px] text-[18px] text-[#F6F6F6] box-shadow-custom rounded-[5px] border-[1px] border-opacity-30 border-black normal-case"
                style={
                  korpusType === Config.korpusType.empty
                    ? { background: "#36695C" }
                    : { background: "#BDBCBC" }
                }
                onClick={() => {
                  setKorpusType(Config.korpusType.empty);
                  setKorpusMaterial(false);
                }}
              >
                Wardrobe
              </button>
            </div>
          </Grid>
        )}
        {korpusFormA.value.outer && (
          <Grid item xs={6}>
            <div className="flex flex-col items-center">
              <div className="h-[124px] relative">
              <img src={OuterShape} alt="Wardrobe Shape" />
                <div className="absolute right-0 top-0 cursor-target">
                  <img src={InfoIcon} />
                </div>
              </div>
              <button
                className="mt-2 w-[137px] text-[18px] text-[#F6F6F6] box-shadow-custom rounded-[5px] border-[1px] border-opacity-30 border-black normal-case"
                style={
                  korpusType === Config.korpusType.outerShap
                    ? { background: "#36695C" }
                    : { background: "#BDBCBC" }
                }
                onClick={() => {
                  setKorpusType(Config.korpusType.outerShap);
                  setKorpusMaterial(true);
                }}
              >
                Outer-Shape
              </button>
            </div>
          </Grid>
        )}
        {korpusFormA.value.top && (
          <Grid item xs={6}>
            <div className="flex flex-col items-center">
              <div className="h-[124px] relative">
              <img src={TopShape} alt="Wardrobe Shape" />
                <div className="absolute right-0 top-0 cursor-target">
                  <img src={InfoIcon} />
                </div>
              </div>
              <button
                className="mt-2 w-[137px] text-[18px] text-[#F6F6F6] box-shadow-custom rounded-[5px] border-[1px] border-opacity-30 border-black normal-case"
                style={
                  korpusType === Config.korpusType.topShap
                    ? { background: "#36695C" }
                    : { background: "#BDBCBC" }
                }
                onClick={() => {
                  setKorpusType(Config.korpusType.topShap);
                  setKorpusMaterial(true);
                }}
              >
                Top-Shape
              </button>
            </div>
          </Grid>
        )}
        {korpusFormA.value['uShape'] && (
          <Grid item xs={6}>
            <div className="flex flex-col items-center">
              <div className="h-[124px] relative">
              <img src={UShape} alt="Wardrobe Shape" />
                <div className="absolute right-0 top-0 cursor-target">
                  <img src={InfoIcon} />
                </div>
              </div>
              <button
                className="mt-2 w-[137px] text-[18px] text-[#F6F6F6] box-shadow-custom rounded-[5px] border-[1px] border-opacity-30 border-black normal-case"
                style={
                  korpusType === Config.korpusType.uShap
                    ? { background: "#36695C" }
                    : { background: "#BDBCBC" }
                }
                onClick={() => {
                  // console.log("here")
                  setKorpusType(Config.korpusType.uShap);
                  setKorpusMaterial(true);
                }}
              >
                U-Shape
              </button>
            </div>
          </Grid>
        )}
        {korpusFormA.value.inner && (
          <Grid item xs={6}>
            <div className="flex flex-col items-center">
              <div className="h-[124px] relative">
              <img src={InnerShape} alt="Wardrobe Shape" />
                <div className="absolute right-0 top-0 cursor-target">
                  <img src={InfoIcon} />
                </div>
              </div>
              <button
                className="mt-2 w-[137px] text-[18px] text-[#F6F6F6] box-shadow-custom rounded-[5px] border-[1px] border-opacity-30 border-black normal-case"
                style={
                  korpusType === Config.korpusType.innerShap
                    ? { background: "#36695C" }
                    : { background: "#BDBCBC" }
                }
                onClick={() => {
                  setKorpusType(Config.korpusType.innerShap);
                  setKorpusMaterial(true);
                }}
              >
                Innenr-Shape
              </button>
            </div>
          </Grid>
        )}
        {korpusFormA.value.fullInner && (
          <Grid item xs={6}>
            <div className="flex flex-col items-center">
              <div className="h-[124px] relative">
              <img src={FullInnerShape} alt="Wardrobe Shape" />
                <div className="absolute right-0 top-0 cursor-target">
                  <img src={InfoIcon} />
                </div>
              </div>
              <button
                className="mt-2 w-[137px] text-[18px] text-[#F6F6F6] box-shadow-custom rounded-[5px] border-[1px] border-opacity-30 border-black normal-case"
                style={
                  korpusType === Config.korpusType.innerShap2
                    ? { background: "#36695C" }
                    : { background: "#BDBCBC" }
                }
                onClick={() => {
                  setKorpusType(Config.korpusType.innerShap2);
                  setKorpusMaterial(true);
                }}
              >
                Full-Shape
              </button>
            </div>
          </Grid>
        )}
      </Grid>
    </>
  );
}
