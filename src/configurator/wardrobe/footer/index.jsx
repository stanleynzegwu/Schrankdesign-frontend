import { Button } from "@material-tailwind/react"
import React, { useEffect, useState } from "react"

import FavIcon from "../../../assets/icons/fav_icon.svg"
import CartIcon from "../../../assets/icons/cart_icon.svg"
import useFurnishingStore from "../zustand/furnishingStore"
import useCalcStore from "../zustand/calcStore"
import Config from "../../config"
import {
  getDoorHeight,
  getDoorWidth,
  getDrawerPlateScale,
  getInternalDrawerScale,
  getOuterDrawerScale,
} from "../utils/getInfo"
import useDimensionStore from "../zustand/dimensionStore"
import { roundNumber } from "../utils/formatNumber"
import { jsPDF } from "jspdf"
import { autoTable } from "jspdf-autotable"
import priceIcon from "../../../assets/icons/priceIcon.png";
import partlistIcon from "../../../assets/icons/partlistIcon.png";

const Footer = React.memo(function Footer() {
  const storedUser = localStorage.getItem("schrankdesign-app-user");
  const auth = JSON.parse(storedUser);
  const platesInfo = useFurnishingStore.use.platesInfo()
  const furnishingAssets = useFurnishingStore.use.furnishingAssets()
  const doorAssets = useFurnishingStore.use.doorAssets()
  const ledAssets = useFurnishingStore.use.ledAssets()

  const calcInfo = useCalcStore.use.calcInfo()

  const depth = useDimensionStore.use.depth()
  const elementsCount = useDimensionStore.use.elementsCount()

  const [priceData, setPriceData] = useState({})
  const [partlistData, setPartlistData] = useState({})

  useEffect(() => {
    if (Object.keys(calcInfo).length === 0) return
    const furnishingPlates = []
    for (const asset of furnishingAssets) {
      if (asset.type === Config.furnishing.type.shelf)
        furnishingPlates.push({
          color: "White",
          id: asset.type,
          length: asset.scale[0],
          thickness: asset.scale[1],
          depth: asset.scale[2],
        })
      else if (
        asset.type === Config.furnishing.type.drawer ||
        asset.type === Config.furnishing.type.internalDrawer
      ) {
        const bodyScale = getDrawerPlateScale(asset.scale)
        furnishingPlates.push({
          color: "White",
          id: "Drawer-Side",
          length: bodyScale.left_right[2],
          depth: bodyScale.left_right[1],
          thickness: bodyScale.left_right[0],
        })
        furnishingPlates.push({
          color: "White",
          id: "Drawer-Side",
          length: bodyScale.left_right[2],
          depth: bodyScale.left_right[1],
          thickness: bodyScale.left_right[0],
        })
        furnishingPlates.push({
          color: "White",
          id: "Drawer-Bottom",
          length: bodyScale.bottom[0],
          depth: bodyScale.bottom[2],
          thickness: bodyScale.bottom[1],
        })
        furnishingPlates.push({
          color: "White",
          id: "Drawer-Back",
          length: bodyScale.back[1],
          depth: bodyScale.back[0],
          thickness: bodyScale.back[2],
        })

        if (asset.type === Config.furnishing.type.drawer) {
          const outerDrawerScale = getOuterDrawerScale(
            asset.scale,
            depth,
            (asset.inDivider ? asset.d_xIndex : asset.xIndex) === 0
              ? Config.elementIndex.first
              : asset.xIndex === elementsCount - 1
              ? Config.elementIndex.last
              : Config.elementIndex.middle,
            asset.topShelfDistance
          )
          // console.log(outerDrawerScale)
          // furnishingPlates.push({
          //   color: "White",
          //   id: "Drawer-Front",
          //   length: outerDrawerScale.front[0],
          //   depth: outerDrawerScale.front[1],
          //   thickness: outerDrawerScale.front[2],
          // })

          // if (asset.topVisible)
          //   furnishingPlates.push({
          //     color: "White",
          //     id: "Shelf",
          //     length: outerDrawerScale.top[0],
          //     depth: outerDrawerScale.top[2],
          //     thickness: outerDrawerScale.top[1],
          //   })

          // if (asset.bottomVisible)
          //   furnishingPlates.push({
          //     color: "White",
          //     id: "Shelf",
          //     length: outerDrawerScale.bottom[0],
          //     depth: outerDrawerScale.bottom[2],
          //     thickness: outerDrawerScale.bottom[1],
          //   })
        } else if (asset.type === Config.furnishing.type.internalDrawer) {
          const internalDrawerScale = getInternalDrawerScale(asset.scale, depth)

          furnishingPlates.push({
            color: "White",
            id: "Drawer-Front",
            length: internalDrawerScale.front[0],
            depth: internalDrawerScale.front[1],
            thickness: internalDrawerScale.front[2],
          })

          furnishingPlates.push({
            color: "White",
            id: "Drawer-Side",
            length: internalDrawerScale.side[2],
            depth: internalDrawerScale.side[1],
            thickness: internalDrawerScale.side[0],
          })

          if (asset.topVisible)
            furnishingPlates.push({
              color: "White",
              id: "Shelf",
              length: internalDrawerScale.top[0],
              depth: internalDrawerScale.top[2],
              thickness: internalDrawerScale.top[1],
            })

          if (asset.bottomVisible)
            furnishingPlates.push({
              color: "White",
              id: "Shelf",
              length: internalDrawerScale.bottom[0],
              depth: internalDrawerScale.bottom[2],
              thickness: internalDrawerScale.bottom[1],
            })
        }
      }
    }

    for (const asset of doorAssets) {
      const width = getDoorWidth(asset.scale[0], asset.elementIndex)
      const height = getDoorHeight(
        asset.scale[1],
        asset.topAsset,
        asset.bottomAsset
      )
      if (asset.doorType.includes("double")) {
        furnishingPlates.push({
          color: "White",
          id: asset.type,
          length: height,
          depth: width / 2 - Config.furnishing.default.frontInterval,
          thickness: asset.scale[2],
        })
        furnishingPlates.push({
          color: "White",
          id: asset.type,
          length: height,
          depth: width / 2 - Config.furnishing.default.frontInterval,
          thickness: asset.scale[2],
        })
      } else {
        furnishingPlates.push({
          color: "White",
          id: asset.type,
          length: height,
          depth: width,
          thickness: asset.scale[2],
        })
      }
    }

    const totalPlates = [...platesInfo, ...furnishingPlates]

    const plate_info = {}
    const asset_info = {}

    let cnc_time_total = 0
    for (const plate of totalPlates) {
      const key = `${plate.color}-${(plate.thickness * 10).toString()}`
      if (!plate_info[key]) {
        plate_info[key] = {}
        plate_info[key]["Plate-pcs-type"] = 0
        plate_info[key]["Cut-Plate-m-pcs"] = 0
        plate_info[key]["Plate-m2-type"] = 0
        plate_info[key]["Edge-m-type"] = 0
        plate_info[key]["Edge-pcs-type"] = 0
      }
      plate_info[key]["Plate-pcs-type"]++
      plate_info[key]["Cut-Plate-m-pcs"] +=
        ((plate.length + plate.depth) * 2) / 100
      plate_info[key]["Plate-m2-type"] +=
        (((plate.length * plate.depth) / 10000) *
          (100 + calcInfo.info["Plate-waste"])) /
        100

      if (calcInfo["plates_types"][plate.id]) {
        cnc_time_total = roundNumber(
          cnc_time_total + Number(calcInfo["plates_types"][plate.id]["cnc_time_pcs"])
        )
        const edge_type = calcInfo["plates_types"][plate.id]["edge_type"]
        if (
          edge_type.includes("V") ||
          edge_type.includes("H") ||
          edge_type.includes("L") ||
          edge_type.includes("R")
        ) {
          plate_info[key]["Edge-pcs-type"] += 1
          if (edge_type.includes("V"))
            plate_info[key]["Edge-m-type"] += plate.length / 100
          if (edge_type.includes("H"))
            plate_info[key]["Edge-m-type"] += plate.length / 100
          if (edge_type.includes("L"))
            plate_info[key]["Edge-m-type"] += plate.depth / 100
          if (edge_type.includes("R"))
            plate_info[key]["Edge-m-type"] += plate.depth / 100
        }

        for (const asset_data of calcInfo["plates_types"][plate.id].list) {
          if (asset_data.functions[0] === "Add-Distance") {
            for (const distanceRange of asset_data.add_distance) {
              if (
                plate[distanceRange.functions_distance[0].toLowerCase()] >
                  Number(distanceRange.functions_from[0]) / 10 &&
                plate[distanceRange.functions_distance[0].toLowerCase()] <=
                  Number(distanceRange.functions_to[0]) / 10
              ) {
                if (!asset_info[asset_data.child_config_id[0]])
                  asset_info[asset_data.child_config_id[0]] = 0

                asset_info[asset_data.child_config_id[0]] += Number(
                  distanceRange.functions_quantity[0]
                )
                break
              }
            }
          } else if (asset_data.functions[0] === "Add-Qty") {
            if (!asset_info[asset_data.child_config_id[0]])
              asset_info[asset_data.child_config_id[0]] = 0

            asset_info[asset_data.child_config_id[0]] += Number(
              asset_data.qty[0]
            )
          }
        }
      }
    }

    const partlist_data = {}
    partlist_data.plates = []
    const partlist_plates = partlist_data.plates
    for (const plate of totalPlates) {
      let counts = 0
      partlist_plates.forEach((item) => {
        if (item.Plate === plate.id) counts++
      })

      const result = {
        "Material-Name": `${plate.color}-${plate.thickness * 10}`,
        Length: roundNumber(plate.length * 10),
        Depth: roundNumber(plate.depth * 10),
        Plate: plate.id,
        Index: counts + 1,
        Edge: "",
        "Edge-Length": 0,
      }

      // Calculate edge length
      if (calcInfo["plates_types"][plate.id]) {
        const edgeType = calcInfo["plates_types"][plate.id]["edge_type"]
        result["Edge"] = edgeType

        if (edgeType.includes("V"))
          result["Edge-Length"] = roundNumber(
            result["Edge-Length"] + plate.length * 10
          )
        if (edgeType.includes("H"))
          result["Edge-Length"] = roundNumber(
            result["Edge-Length"] + plate.length * 10
          )
        if (edgeType.includes("L"))
          result["Edge-Length"] = roundNumber(
            result["Edge-Length"] + plate.depth * 10
          )
        if (edgeType.includes("R"))
          result["Edge-Length"] = roundNumber(
            result["Edge-Length"] + plate.depth * 10
          )
      }

      partlist_plates.push(result)
    }
    partlist_data.assets = asset_info
    setPartlistData(partlist_data)

    const priceInfo = {}
    priceInfo["Plate-Cost"] = {}
    const plate_cost = priceInfo["Plate-Cost"]

    Object.keys(plate_info).forEach((key) => {
      plate_cost[key] = {}
    })
    plate_cost["Total"] = {}
    plate_cost["Total"]["Cut-Plate-m-pcs"] = 0
    plate_cost["Total"]["Plate-m2-type"] = 0
    plate_cost["Total"]["Plate-pcs-type"] = 0
    plate_cost["Total"]["Cut-Plate-time-pcs-type"] = 0
    plate_cost["Total"]["Cut-Plate-time-m-type"] = 0
    plate_cost["Total"]["Cut-Plate-time-type"] = 0
    plate_cost["Total"]["Cut-Plate-time-cost-type"] = 0
    plate_cost["Total"]["Plate-mat-cost-type"] = 0
    plate_cost["Total"]["Plate-cost-type"] = 0

    plate_cost["Unit"] = {
      "Cut-Plate-m-pcs": " m",
      "Plate-m2-type": " m\xB2",
      "Cut-Plate-time-pcs-type": " hr",
      "Cut-Plate-time-m-type": " hr",
      "Cut-Plate-time-type": " hr",
      "Cut-Plate-time-cost-type": " €",
      "Plate-mat-cost-type": " €",
      "Plate-cost-type": " €",
    }

    Object.keys(plate_info).forEach((key) => {
      plate_cost[key]["Cut-Plate-m-pcs"] = roundNumber(
        plate_info[key]["Cut-Plate-m-pcs"]
      )
      plate_cost["Total"]["Cut-Plate-m-pcs"] = roundNumber(
        plate_cost["Total"]["Cut-Plate-m-pcs"] +
          plate_cost[key]["Cut-Plate-m-pcs"]
      )

      plate_cost[key]["Plate-m2-type"] = roundNumber(
        plate_info[key]["Plate-m2-type"]
      )
      plate_cost["Total"]["Plate-m2-type"] = roundNumber(
        plate_cost["Total"]["Plate-m2-type"] + plate_cost[key]["Plate-m2-type"]
      )

      plate_cost[key]["Plate-pcs-type"] = plate_info[key]["Plate-pcs-type"]
      plate_cost["Total"]["Plate-pcs-type"] = roundNumber(
        plate_cost["Total"]["Plate-pcs-type"] +
          plate_cost[key]["Plate-pcs-type"]
      )

      plate_cost[key]["Cut-Plate-time-pcs-type"] = roundNumber(
        (plate_info[key]["Plate-pcs-type"] *
          calcInfo.info["Cut-Plate-time-pcs"]) /
          60
      )
      plate_cost["Total"]["Cut-Plate-time-pcs-type"] = roundNumber(
        plate_cost["Total"]["Cut-Plate-time-pcs-type"] +
          plate_cost[key]["Cut-Plate-time-pcs-type"]
      )

      plate_cost[key]["Cut-Plate-time-m-type"] = roundNumber(
        (plate_cost[key]["Cut-Plate-m-pcs"] *
          calcInfo.info["Cut-Plate-time-m"]) /
          60
      )
      plate_cost["Total"]["Cut-Plate-time-m-type"] = roundNumber(
        plate_cost["Total"]["Cut-Plate-time-m-type"] +
          plate_cost[key]["Cut-Plate-time-m-type"]
      )

      plate_cost[key]["Cut-Plate-time-type"] = roundNumber(
        calcInfo.info["Cut-Prep-time"] / 60 +
          plate_cost[key]["Cut-Plate-time-pcs-type"] +
          plate_cost[key]["Cut-Plate-time-m-type"]
      )
      plate_cost["Total"]["Cut-Plate-time-type"] = roundNumber(
        plate_cost["Total"]["Cut-Plate-time-type"] +
          plate_cost[key]["Cut-Plate-time-type"]
      )

      plate_cost[key]["Cut-Plate-time-cost-type"] = roundNumber(
        calcInfo.info["Cut-Cost-h"] * plate_cost[key]["Cut-Plate-time-type"]
      )
      plate_cost["Total"]["Cut-Plate-time-cost-type"] = roundNumber(
        plate_cost["Total"]["Cut-Plate-time-cost-type"] +
          plate_cost[key]["Cut-Plate-time-cost-type"]
      )

      plate_cost[key]["Plate-mat-cost-type"] = roundNumber(
        plate_cost[key]["Plate-m2-type"] *
          calcInfo.plates_edges[key]?.plate_price || 0
      )
      plate_cost["Total"]["Plate-mat-cost-type"] = roundNumber(
        plate_cost["Total"]["Plate-mat-cost-type"] +
          plate_cost[key]["Plate-mat-cost-type"]
      )

      plate_cost[key]["Plate-cost-type"] = roundNumber(
        plate_cost[key]["Cut-Plate-time-cost-type"] +
          plate_cost[key]["Plate-mat-cost-type"]
      )
      plate_cost["Total"]["Plate-cost-type"] = roundNumber(
        plate_cost["Total"]["Plate-cost-type"] +
          plate_cost[key]["Plate-cost-type"]
      )
    })

    priceInfo["Edge-Cost"] = {}
    const edge_cost = priceInfo["Edge-Cost"]
    Object.keys(plate_info).forEach((key) => {
      edge_cost[key] = {}
    })
    edge_cost["Total"] = {}
    edge_cost["Total"]["Edge-m-type"] = 0
    edge_cost["Total"]["Edge-pcs-type"] = 0
    edge_cost["Total"]["Edge-time-type"] = 0
    edge_cost["Total"]["Edge-time-cost-type"] = 0
    edge_cost["Total"]["Edge-mat-cost-type"] = 0
    edge_cost["Total"]["Edge-cost-type"] = 0

    edge_cost["Unit"] = {
      "Edge-m-type": " m",
      "Edge-time-type": " hr",
      "Edge-time-cost-type": " €",
      "Edge-mat-cost-type": " €",
      "Edge-cost-type": " €",
    }

    Object.keys(plate_info).forEach((key) => {
      edge_cost[key]["Edge-m-type"] = roundNumber(
        plate_info[key]["Edge-m-type"]
      )
      edge_cost["Total"]["Edge-m-type"] = roundNumber(
        edge_cost["Total"]["Edge-m-type"] + edge_cost[key]["Edge-m-type"]
      )

      edge_cost[key]["Edge-pcs-type"] = plate_info[key]["Edge-pcs-type"]
      edge_cost["Total"]["Edge-pcs-type"] = roundNumber(
        edge_cost["Total"]["Edge-pcs-type"] + edge_cost[key]["Edge-pcs-type"]
      )

      edge_cost[key]["Edge-time-type"] = roundNumber(
        (edge_cost[key]["Edge-pcs-type"] * calcInfo.info["Edge-time-pcs"]) / 60
      )
      edge_cost["Total"]["Edge-time-type"] = roundNumber(
        edge_cost["Total"]["Edge-time-type"] + edge_cost[key]["Edge-time-type"]
      )

      edge_cost[key]["Edge-time-cost-type"] = roundNumber(
        edge_cost[key]["Edge-time-type"] * calcInfo.info["Edge-Cost-h"]
      )
      edge_cost["Total"]["Edge-time-cost-type"] = roundNumber(
        edge_cost["Total"]["Edge-time-cost-type"] +
          edge_cost[key]["Edge-time-cost-type"]
      )

      edge_cost[key]["Edge-mat-cost-type"] = roundNumber(
        edge_cost[key]["Edge-m-type"] *
          calcInfo.plates_edges[key]?.edge_price || 0
      )
      edge_cost["Total"]["Edge-mat-cost-type"] = roundNumber(
        edge_cost["Total"]["Edge-mat-cost-type"] +
          edge_cost[key]["Edge-mat-cost-type"]
      )

      edge_cost[key]["Edge-cost-type"] = roundNumber(
        edge_cost[key]["Edge-time-cost-type"] +
          edge_cost[key]["Edge-mat-cost-type"]
      )
      edge_cost["Total"]["Edge-cost-type"] = roundNumber(
        edge_cost["Total"]["Edge-cost-type"] + edge_cost[key]["Edge-cost-type"]
      )
    })

    priceInfo["CNC-Cost"] = {}
    const cnc_cost = priceInfo["CNC-Cost"]
    cnc_cost["Unit"] = {
      "CNC-time-total": " hr",
      "CNC-cost-total": " €",
    }
    // console.log(calcInfo.info["CNC-Prep-time"])
    cnc_cost["Plates-pcs-total"] = plate_cost["Total"]["Plate-pcs-type"]
    cnc_cost["CNC-time-total"] = roundNumber(
      (cnc_time_total + calcInfo.info["CNC-Prep-time"]) / 60
    )
    cnc_cost["CNC-cost-total"] = roundNumber(
      cnc_cost["CNC-time-total"] * calcInfo.info["CNC-Cost-h"]
    )

    priceInfo["Asset-Cost"] = {}
    const asset_cost = priceInfo["Asset-Cost"]
    Object.keys(asset_info).forEach((key) => {
      asset_cost[calcInfo.assets[key]["name"]] = {}
    })
    asset_cost["Total"] = {}
    asset_cost["Total"]["Asset-pcs-type"] = 0
    asset_cost["Total"]["Asset-cost-type"] = 0
    asset_cost["Unit"] = {
      "Asset-cost-type": " €",
    }

    Object.keys(asset_info).forEach((key) => {
      const name = calcInfo.assets[key]["name"]

      asset_cost[name]["Asset-pcs-type"] = asset_info[key]
      asset_cost["Total"]["Asset-pcs-type"] = roundNumber(
        asset_cost["Total"]["Asset-pcs-type"] +
          asset_cost[name]["Asset-pcs-type"]
      )

      asset_cost[name]["Asset-cost-type"] = roundNumber(
        asset_cost[name]["Asset-pcs-type"] * calcInfo.assets[key].price
      )
      asset_cost["Total"]["Asset-cost-type"] = roundNumber(
        asset_cost["Total"]["Asset-cost-type"] +
          asset_cost[name]["Asset-cost-type"]
      )
    })

    priceInfo["Construction-Cost"] = {}

    const con_cost = priceInfo["Construction-Cost"]

    con_cost["Unit"] = {
      "Con-Plate-time-total": " min",
      "Con-Asset-time-total": " min",
      "Con-time-total": " min",
      "Con-cost-total": " €",
    }
    con_cost["Plates-pcs-total"] = plate_cost["Total"]["Plate-pcs-type"]
    con_cost["Con-Plate-time-total"] = roundNumber(
      con_cost["Plates-pcs-total"] * calcInfo.info["Con-Plate-time-pcs"]
    )
    con_cost["Con-Asset-time-total"] = 0
    Object.keys(asset_info).forEach((key) => {
      con_cost["Con-Asset-time-total"] = roundNumber(
        con_cost["Con-Asset-time-total"] +
          asset_info[key] * calcInfo.assets[key].con_asset_time_pcs
      )
    })
    con_cost["Con-time-total"] = roundNumber(
      con_cost["Con-Plate-time-total"] +
        con_cost["Con-Asset-time-total"] +
        calcInfo.info["CNC-Prep-time"]
    )
    con_cost["Con-cost-total"] = roundNumber(
      (calcInfo.info["Con-Cost-h"] * con_cost["Con-time-total"]) / 60
    )

    priceInfo["Packing-Cost"] = {}

    const packing_cost = priceInfo["Packing-Cost"]
    packing_cost["Unit"] = {
      "Pack-Asset-time-total": " hr",
      "Pack-Plate-time-total": " hr",
      "Pack-time-total": " hr",
      "Pack-cost-total": " €",
    }

    packing_cost["Plates-pcs-total"] = plate_cost["Total"]["Plate-pcs-type"]
    packing_cost["Asset-pcs-total"] = asset_cost["Total"]["Asset-pcs-type"]
    packing_cost["Pack-Asset-time-total"] = 0
    Object.keys(asset_info).forEach((key) => {
      packing_cost["Pack-Asset-time-total"] = roundNumber(
        (packing_cost["Pack-Asset-time-total"] +
          asset_info[key] * calcInfo.assets[key].pack_asset_time_pcs) /
          60
      )
    })
    packing_cost["Pack-Plate-time-total"] = roundNumber(
      (packing_cost["Plates-pcs-total"] *
        calcInfo.info["Pack-Plate-time-pcs"]) /
        60
    )
    packing_cost["Pack-time-total"] = roundNumber(
      packing_cost["Pack-Asset-time-total"] +
        packing_cost["Pack-Plate-time-total"] +
        calcInfo.info["Pack-Prep-time"] / 60
    )
    packing_cost["Pack-cost-total"] = roundNumber(
      packing_cost["Pack-time-total"] * calcInfo.info["Pack-Cost-h"]
    )

    priceInfo["Sum-till-Plate"] = roundNumber(
      con_cost["Con-cost-total"] + plate_cost["Total"]["Plate-cost-type"]
    )
    priceInfo["Sum-till-Edge"] = roundNumber(
      priceInfo["Sum-till-Plate"] + edge_cost["Total"]["Edge-cost-type"]
    )
    priceInfo["Sum-till-CNC"] = roundNumber(
      priceInfo["Sum-till-Edge"] + cnc_cost["CNC-cost-total"]
    )
    priceInfo["Sum-till-Asset"] = roundNumber(
      priceInfo["Sum-till-CNC"] + asset_cost["Total"]["Asset-cost-type"]
    )
    priceInfo["Sum-till-Pack"] = roundNumber(
      priceInfo["Sum-till-Asset"] + packing_cost["Pack-cost-total"]
    )
    priceInfo["Sum-till-PackingFee"] = roundNumber(
      priceInfo["Sum-till-Pack"] + calcInfo.info["Packing-Fee"]
    )
    priceInfo["Sum-till-Profit"] = roundNumber(
      priceInfo["Sum-till-PackingFee"] * (1 + calcInfo.info["Profit"] / 100)
    )
    priceInfo["Sum-till-AdsCost"] = roundNumber(
      priceInfo["Sum-till-Profit"] * (1 + calcInfo.info["Ads-Cost"] / 100)
    )
    priceInfo["Sum-till-Fee1"] = roundNumber(
      priceInfo["Sum-till-AdsCost"] + calcInfo.info["Fee-1"]
    )
    priceInfo["Sum-till-Fee2"] = roundNumber(
      priceInfo["Sum-till-Fee1"] + calcInfo.info["Fee-2"]
    )
    priceInfo["Sum-till-Fee3"] = roundNumber(
      priceInfo["Sum-till-Fee2"] * (1 + calcInfo.info["Fee-3"] / 100)
    )
    priceInfo["End-Price"] = roundNumber(
      priceInfo["Sum-till-Fee3"] * (1 + calcInfo.info["MwsT"] / 100)
    )

    setPriceData(priceInfo)
  }, [platesInfo, furnishingAssets, doorAssets, ledAssets, calcInfo, elementsCount])

  return (
    <>
      <div className="w-full h-[63px] flex-none bg-[#E5E5E5] z-50">
        <div className="flex justify-between items-center h-full px-[12px] ">
          <div className="flex justify-start items-center gap-2">
            <span className="text-[#000] text-[28px]">
              {priceData["End-Price"]}€
            </span>
            <div className="flex flex-col justify-start">
              <span className="text-[#000] text-[12px]">
                inkl. MwSt zzgl. Lieferkosten
              </span>
              <span className="text-[#36695C] text-[15px]">
                Lieferung in 4-5 Wochen{" "}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-[30px]">
          {auth?.role == 1 && (
            <>
              <Button
                variant="filled"
                className="bg-[#ffffff] border border-black text-[#000000] normal-case text-[14px] flex items-center gap-2 rounded-[2px] pl-[10px] pr-[6px] h-[39px]"
                onClick={() => {
                  const doc = new jsPDF("l")

                  doc.text(
                    "PartList Information",
                    doc.internal.pageSize.width / 2,
                    15,
                    { align: "center" }
                  )
                  doc.text("Plates", 14, 30)

                  doc.autoTable({
                    startY: 35,
                    head: [
                      Object.keys(
                        partlistData.plates[Object.keys(partlistData.plates)[0]]
                      )
                        .filter((key) => key !== "Index")
                        .reduce((acc, key) => {
                          acc[key] = key
                          return acc
                        }, {}),
                    ],
                    body: Object.keys(partlistData.plates).map((item) => {
                      const obj = {}
                      Object.keys(partlistData.plates[item])
                        .filter((key) => key !== "Index")
                        .forEach((col) => {
                          if (
                            col === "Length" ||
                            col === "Depth" ||
                            col === "Edge-Length"
                          )
                            obj[col] = `${partlistData.plates[item][col]} mm`
                          else if (col === "Plate")
                            obj[
                              col
                            ] = `${partlistData.plates[item][col]}-${partlistData.plates[item]["Index"]}`
                          else obj[col] = partlistData.plates[item][col]
                        })
                      return obj
                    }),
                    styles: { valign: "middle", halign: "right" },
                    didDrawPage: function () {
                      // Footer
                      var str = "Page " + doc.internal.getNumberOfPages()

                      doc.setFontSize(10)

                      // jsPDF 1.4+ uses getHeight, <1.4 uses .height
                      var pageSize = doc.internal.pageSize
                      var pageHeight = pageSize.height
                        ? pageSize.height
                        : pageSize.getHeight()
                      doc.text(str, pageSize.width - 20, pageHeight - 10)
                    },
                  })

                  doc.text("Edges", 14, doc.lastAutoTable.finalY + 15)
                  doc.autoTable({
                    startY: doc.lastAutoTable.finalY + 20,
                    head: [
                      {
                        "Edge-mat-name": "Material-Name",
                        "Edge-m-type": "Edge-Length",
                      },
                    ],
                    body: Object.keys(priceData["Edge-Cost"])
                      .filter((key) => key !== "Unit" && key !== "Total")
                      .map((item) => {
                        return {
                          "Edge-mat-name": item,
                          "Edge-m-type": `${
                            priceData["Edge-Cost"][item]["Edge-m-type"]
                          } ${
                            priceData["Edge-Cost"].Unit["Edge-m-type"]
                              ? priceData["Edge-Cost"].Unit["Edge-m-type"]
                              : ""
                          }`,
                        }
                      }),
                    styles: { valign: "middle", halign: "right" },
                    didDrawPage: function () {
                      // Footer
                      var str = "Page " + doc.internal.getNumberOfPages()

                      doc.setFontSize(10)

                      // jsPDF 1.4+ uses getHeight, <1.4 uses .height
                      var pageSize = doc.internal.pageSize
                      var pageHeight = pageSize.height
                        ? pageSize.height
                        : pageSize.getHeight()
                      doc.text(str, pageSize.width - 20, pageHeight - 10)
                    },
                  })

                  doc.text("Assets", 14, doc.lastAutoTable.finalY + 15)
                  doc.autoTable({
                    startY: doc.lastAutoTable.finalY + 20,
                    head: [
                      {
                        "Asset Name": "Asset Name",
                        "Supplier ID": "Supplier ID",
                        Quantity: "Quantity",
                      },
                    ],
                    body: Object.keys(partlistData.assets).map((key) => {
                      return {
                        "Asset Name": calcInfo.assets[key]["name"],
                        "Supplier ID": calcInfo.assets[key]["supplier_id"],
                        Quantity: partlistData.assets[key],
                      }
                    }),
                    styles: { valign: "middle", halign: "right" },
                    didDrawPage: function () {
                      // Footer
                      var str = "Page " + doc.internal.getNumberOfPages()

                      doc.setFontSize(10)

                      // jsPDF 1.4+ uses getHeight, <1.4 uses .height
                      var pageSize = doc.internal.pageSize
                      var pageHeight = pageSize.height
                        ? pageSize.height
                        : pageSize.getHeight()
                      doc.text(str, pageSize.width - 20, pageHeight - 10)
                    },
                  })

                  const pageNumber = doc.internal.getNumberOfPages()

                  doc.setPage(pageNumber)

                  doc.save("partlist.pdf")
                }}
              >
                <img src={partlistIcon}></img>
                Partlist Download
              </Button>
              <Button
                variant="filled"
                className="bg-[#ffffff] border border-black text-[#000000] normal-case text-[14px] flex items-center gap-2 rounded-[2px] pl-[10px] pr-[6px] h-[39px]"
                onClick={() => {
                  const doc = new jsPDF("l")

                  doc.text(
                    "Calculation Information",
                    doc.internal.pageSize.width / 2,
                    15,
                    { align: "center" }
                  )
                  doc.text("Construction Cost", 14, 30)

                  doc.autoTable({
                    startY: 35,
                    head: [
                      Object.keys(priceData["Construction-Cost"])
                        .filter((key) => key !== "Unit")
                        .reduce((acc, key) => {
                          acc[key] = key
                          return acc
                        }, {}),
                    ],
                    body: [
                      Object.keys(priceData["Construction-Cost"])
                        .filter((key) => key !== "Unit")
                        .reduce((acc, key) => {
                          acc[key] = `${priceData["Construction-Cost"][key]} ${
                            priceData["Construction-Cost"]["Unit"][key]
                              ? priceData["Construction-Cost"]["Unit"][key]
                              : ""
                          }`
                          return acc
                        }, {}),
                    ],
                    styles: { valign: "middle", halign: "right" },
                    didDrawPage: function () {
                      // Footer
                      var str = "Page " + doc.internal.getNumberOfPages()

                      doc.setFontSize(10)

                      // jsPDF 1.4+ uses getHeight, <1.4 uses .height
                      var pageSize = doc.internal.pageSize
                      var pageHeight = pageSize.height
                        ? pageSize.height
                        : pageSize.getHeight()
                      doc.text(str, pageSize.width - 20, pageHeight - 10)
                    },
                  })

                  doc.text("Plate Cost", 14, doc.lastAutoTable.finalY + 15)
                  doc.autoTable({
                    startY: doc.lastAutoTable.finalY + 20,
                    head: [
                      {
                        "Plate-mat-name": "Plate-mat-name",
                        ...Object.keys(
                          priceData["Plate-Cost"][
                            Object.keys(priceData["Plate-Cost"])[0]
                          ]
                        ).reduce((acc, key) => {
                          acc[key] = key
                          return acc
                        }, {}),
                      },
                    ],
                    body: Object.keys(priceData["Plate-Cost"])
                      .filter((key) => key !== "Unit")
                      .map((item) => {
                        const obj = { "Plate-mat-name": item }
                        Object.keys(priceData["Plate-Cost"][item]).forEach(
                          (col) => {
                            obj[col] = `${priceData["Plate-Cost"][item][col]} ${
                              priceData["Plate-Cost"].Unit[col]
                                ? priceData["Plate-Cost"].Unit[col]
                                : ""
                            }`
                          }
                        )
                        return obj
                      }),
                    styles: { valign: "middle", halign: "right" },
                  })

                  doc.text("Edge Cost", 14, doc.lastAutoTable.finalY + 15)
                  doc.autoTable({
                    startY: doc.lastAutoTable.finalY + 20,
                    head: [
                      {
                        "Edge-mat-name": "Edge-mat-name",
                        ...Object.keys(
                          priceData["Edge-Cost"][
                            Object.keys(priceData["Edge-Cost"])[0]
                          ]
                        ).reduce((acc, key) => {
                          acc[key] = key
                          return acc
                        }, {}),
                      },
                    ],
                    body: Object.keys(priceData["Edge-Cost"])
                      .filter((key) => key !== "Unit")
                      .map((item) => {
                        const obj = { "Edge-mat-name": item }
                        Object.keys(priceData["Edge-Cost"][item]).forEach(
                          (col) => {
                            obj[col] = `${priceData["Edge-Cost"][item][col]} ${
                              priceData["Edge-Cost"].Unit[col]
                                ? priceData["Edge-Cost"].Unit[col]
                                : ""
                            }`
                          }
                        )
                        return obj
                      }),
                    styles: { valign: "middle", halign: "right" },
                  })

                  doc.text("CNC Cost", 14, doc.lastAutoTable.finalY + 15)
                  doc.autoTable({
                    startY: doc.lastAutoTable.finalY + 20,
                    head: [
                      Object.keys(priceData["CNC-Cost"])
                        .filter((key) => key !== "Unit")
                        .reduce((acc, key) => {
                          acc[key] = key
                          return acc
                        }, {}),
                    ],
                    body: [
                      Object.keys(priceData["CNC-Cost"])
                        .filter((key) => key !== "Unit")
                        .reduce((acc, key) => {
                          acc[key] = `${priceData["CNC-Cost"][key]} ${
                            priceData["CNC-Cost"]["Unit"][key]
                              ? priceData["CNC-Cost"]["Unit"][key]
                              : ""
                          }`
                          return acc
                        }, {}),
                    ],
                    styles: {
                      valign: "middle",
                      overflow: "hidden",
                      halign: "right",
                    },
                  })

                  doc.text("Asset Cost", 14, doc.lastAutoTable.finalY + 15)
                  doc.autoTable({
                    startY: doc.lastAutoTable.finalY + 20,
                    head: [
                      {
                        "Asset-mat-name": "Asset-mat-name",
                        ...Object.keys(
                          priceData["Asset-Cost"][
                            Object.keys(priceData["Asset-Cost"])[0]
                          ]
                        ).reduce((acc, key) => {
                          acc[key] = key
                          return acc
                        }, {}),
                      },
                    ],
                    body: Object.keys(priceData["Asset-Cost"])
                      .filter((key) => key !== "Unit")
                      .map((item) => {
                        const obj = { "Asset-mat-name": item }
                        Object.keys(priceData["Asset-Cost"][item]).forEach(
                          (col) => {
                            obj[col] = `${priceData["Asset-Cost"][item][col]} ${
                              priceData["Asset-Cost"].Unit[col]
                                ? priceData["Asset-Cost"].Unit[col]
                                : ""
                            }`
                          }
                        )
                        return obj
                      }),
                    styles: {
                      valign: "middle",
                      overflow: "hidden",
                      halign: "right",
                    },
                  })

                  doc.text("Packing Cost", 14, doc.lastAutoTable.finalY + 15)
                  doc.autoTable({
                    startY: doc.lastAutoTable.finalY + 20,
                    head: [
                      Object.keys(priceData["Packing-Cost"])
                        .filter((key) => key !== "Unit")
                        .reduce((acc, key) => {
                          acc[key] = key
                          return acc
                        }, {}),
                    ],
                    body: [
                      Object.keys(priceData["Packing-Cost"])
                        .filter((key) => key !== "Unit")
                        .reduce((acc, key) => {
                          acc[key] = `${priceData["Packing-Cost"][key]} ${
                            priceData["Packing-Cost"]["Unit"][key]
                              ? priceData["Packing-Cost"]["Unit"][key]
                              : ""
                          }`
                          return acc
                        }, {}),
                    ],
                    styles: {
                      valign: "middle",
                      overflow: "hidden",
                      halign: "right",
                    },
                  })

                  doc.text("End Price", 14, doc.lastAutoTable.finalY + 15)
                  doc.autoTable({
                    startY: doc.lastAutoTable.finalY + 20,
                    head: [
                      [
                        "Costruction Cost",
                        "Plate Cost",
                        "Edge Cost",
                        "CNC Cost",
                        "Asset Cost",
                        "Packing Cost",
                        "Fees(Packing-Fee)",
                      ],
                    ],
                    body: [
                      [
                        priceData["Construction-Cost"]["Con-cost-total"] + " €",
                        priceData["Plate-Cost"]["Total"]["Plate-cost-type"] +
                          " €",
                        priceData["Edge-Cost"]["Total"]["Edge-cost-type"] + " €",
                        priceData["CNC-Cost"]["CNC-cost-total"] + " €",
                        priceData["Asset-Cost"]["Total"]["Asset-cost-type"] +
                          " €",
                        priceData["Packing-Cost"]["Pack-cost-total"] + " €",
                        calcInfo.info["Packing-Fee"] + " %",
                      ],
                      [
                        priceData["Construction-Cost"]["Con-cost-total"] + " €",
                        priceData["Sum-till-Plate"] + " €",
                        priceData["Sum-till-Edge"] + " €",
                        priceData["Sum-till-CNC"] + " €",
                        priceData["Sum-till-Asset"] + " €",
                        priceData["Sum-till-Pack"] + " €",
                        priceData["Sum-till-PackingFee"] + " €",
                      ],
                    ],
                    styles: {
                      valign: "middle",
                      overflow: "hidden",
                      halign: "right",
                    },
                  })
                  doc.autoTable({
                    startY: doc.lastAutoTable.finalY,
                    head: [
                      [
                        "Fees(Profit)",
                        "Fees(Ads-Cost)",
                        "Fees(Extra-1)",
                        "Fees(Extra-2)",
                        "Fees(Extra-3)",
                        "Fees(MwsT)",
                        "End Price",
                      ],
                    ],
                    body: [
                      [
                        calcInfo.info["Profit"] + " %",
                        calcInfo.info["Ads-Cost"] + " %",
                        calcInfo.info["Fee-1"] + " €",
                        calcInfo.info["Fee-2"] + " €",
                        calcInfo.info["Fee-3"] + " %",
                        calcInfo.info["MwsT"] + " %",
                      ],
                      [
                        priceData["Sum-till-Profit"] + " €",
                        priceData["Sum-till-AdsCost"] + " €",
                        priceData["Sum-till-Fee1"] + " €",
                        priceData["Sum-till-Fee2"] + " €",
                        priceData["Sum-till-Fee3"] + " €",
                        priceData["End-Price"] + " €",
                        priceData["End-Price"] + " €",
                      ],
                    ],
                    styles: {
                      valign: "middle",
                      overflow: "hidden",
                      halign: "right",
                    },
                    didDrawPage: function () {
                      // Footer
                      var str = "Page " + doc.internal.getNumberOfPages()

                      doc.setFontSize(10)

                      // jsPDF 1.4+ uses getHeight, <1.4 uses .height
                      var pageSize = doc.internal.pageSize
                      var pageHeight = pageSize.height
                        ? pageSize.height
                        : pageSize.getHeight()
                      doc.text(str, pageSize.width - 20, pageHeight - 10)
                    },
                  })

                  doc.text(
                    `End Price: ${priceData["End-Price"]}€`,
                    doc.internal.pageSize.width / 2,
                    doc.lastAutoTable.finalY + 30,
                    { align: "center" }
                  )

                  const pageNumber = doc.internal.getNumberOfPages()

                  doc.setPage(pageNumber)

                  doc.save("calculation.pdf")
                }}
              >
                <img src={priceIcon}></img>
                Price Download
              </Button>
            </>
          )}
            <Button className="bg-[#36695C] text-[#FFF] flex items-center gap-2 rounded-[2px] px-[29px] py-[11px] h-[43px]">
              <img src={FavIcon} />
              Design Speichern
            </Button>
            <Button className="bg-[#36695C] text-[#FFF] flex items-center gap-2 rounded-[2px] px-[29px] py-[11px] h-[43px]">
              <img src={CartIcon} />
              In Den Warenkorb
            </Button>
          </div>
        </div>
      </div>
    </>
  )
})

export default Footer
