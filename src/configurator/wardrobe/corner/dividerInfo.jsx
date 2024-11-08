import { Box, Button, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

import CustomSlider from "../common/customSlider"
import Config from "../../config"
import { setShowDividerInfo } from "../../../store/wardrobe/corner/slice"
import useFurnishingStore from "../zustand/furnishingStore"

export default function DividerInfo() {
  const { assetInfo } = useSelector((state) => state.corner)

  const updateDividerAsset = useFurnishingStore.use.updateDividerAsset()

  const [dividerHeight, setDividerHeight] = useState(assetInfo.scale[1])
  const [leftWidth, setLeftWidth] = useState(assetInfo.leftWidth)

  // const [minHeight, setMinHeight] = useState(30)

  useEffect(() => {
    setDividerHeight(assetInfo.scale[1])
    setLeftWidth(assetInfo.leftWidth)

    // furnishingAssets.forEach((asset) => {
    //   if (
    //     asset.inDivider &&
    //     asset.d_xIndex === assetInfo.xIndex &&
    //     asset.d_yIndex === assetInfo.yIndex
    //   ) {
    //     const tempHeight = getMaxHeight(
    //       asset.position[1],
    //       asset.scale[1],
    //       asset.type
    //     )
    //     if (tempHeight > minHeight) setMinHeight(tempHeight)
    //   }
    // })
  }, [assetInfo])

  const dispatch = useDispatch()

  const handleHeight = (e) => {
    setDividerHeight(e.target.value)
  }

  const handleLeftWidth = (e) => {
    setLeftWidth(e.target.value)
  }

  const handleHeightCommitted = () => {
    const payload = { xIndex: assetInfo.xIndex, yPos: assetInfo.yPos }

    if (dividerHeight < assetInfo.maxHeight - 30) {
      payload.topShelfVisible = true
      payload.scale = [assetInfo.scale[0], dividerHeight, assetInfo.scale[2]]
      payload.position = [
        assetInfo.position[0],
        assetInfo.bottom + dividerHeight / 2,
        assetInfo.position[2],
      ]
    } else {
      setDividerHeight(assetInfo.maxHeight)
      payload.scale = [
        assetInfo.scale[0],
        assetInfo.maxHeight,
        assetInfo.scale[2],
      ]
      payload.position = [
        assetInfo.position[0],
        assetInfo.bottom + assetInfo.maxHeight / 2,
        assetInfo.position[2],
      ]
      payload.topShelfVisible =
        assetInfo.topAsset === Config.furnishing.type.slopingFloor ||
        assetInfo.topAsset === Config.furnishing.type.clothesLift ||
        assetInfo.topAsset === Config.furnishing.type.clothesRail ||
        assetInfo.topAsset === Config.furnishing.type.pantsPullout
          ? true
          : false
    }
    updateDividerAsset(payload)
  }

  const handleWidthCommitted = () => {
    const payload = {
      xIndex: assetInfo.xIndex,
      yPos: assetInfo.yPos,
      leftWidth,
    }
    updateDividerAsset(payload)
  }

  return (
    <Box sx={{ width: "300px" }} m={2} mr={4}>
      <Typography textAlign={"center"} mb={3} color={"red"}>
        Divider Information
      </Typography>
      <CustomSlider
        title="Height"
        min={30}
        max={assetInfo.maxHeight}
        value={dividerHeight}
        onChange={handleHeight}
        onChangeCommitted={handleHeightCommitted}
      />
      <CustomSlider
        title="Left Width"
        min={Config.furnishing.divider.minWidth}
        max={
          assetInfo.scale[0] -
          Config.furnishing.divider.minWidth -
          Config.furnishing.divider.thickness
        }
        value={leftWidth}
        onChange={handleLeftWidth}
        onChangeCommitted={handleWidthCommitted}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(setShowDividerInfo(false))
          }}
        >
          OK
        </Button>
      </Box>
    </Box>
  )
}
