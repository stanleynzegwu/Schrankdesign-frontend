/* eslint-disable react/no-unknown-property */
import { Typography } from "@mui/material"
import { Html, Line } from "@react-three/drei"
import React from "react"

const DimensionLine = React.memo(function DimensionLine(props) {
  const { points, value, center, endDir, lineWidth, isBig } = props

  return (
    <>
      {value > 0 && (
        <>
          {endDir === "Y" && (
            <>
              <Line
                points={[
                  [points[0][0], points[0][1] - 3, points[0][2]],
                  [points[0][0], points[0][1] + 3, points[0][2]],
                ]}
                color="black"
                lineWidth={lineWidth}
              />
              <Line
                points={[
                  [points[1][0], points[1][1] - 3, points[1][2]],
                  [points[1][0], points[1][1] + 3, points[1][2]],
                ]}
                color="black"
                lineWidth={lineWidth}
              />
            </>
          )}
          {endDir === "X" && (
            <>
              <Line
                points={[
                  [points[0][0] - 3, points[0][1], points[0][2]],
                  [points[0][0] + 3, points[0][1], points[0][2]],
                ]}
                color="black"
                lineWidth={lineWidth}
              />
              <Line
                points={[
                  [points[1][0] - 3, points[1][1], points[1][2]],
                  [points[1][0] + 3, points[1][1], points[1][2]],
                ]}
                color="black"
                lineWidth={lineWidth}
              />
            </>
          )}
          <Line points={points} color="black" lineWidth={lineWidth} />
          <Html position={center} center>
            <div
              className={
                isBig
                  ? "border-[2px] border-black border-solid rounded-[5px] bg-[#F6F6F6]"
                  : "border-[1px] border-black border-solid rounded-[5px] bg-[#F6F6F6]"
              }
            >
              <Typography
                sx={
                  isBig
                    ? {
                        color: "#36695C",
                        fontFamily: "Karla",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: "800",
                        lineHeight: "normal",
                        whiteSpace: "nowrap",
                        paddingX: "3px",
                      }
                    : {
                        fontFamily: "Karla",
                        fontSize: "13px",
                        fontStyle: "normal",
                        fontWeight: "700",
                        lineHeight: "normal",
                        whiteSpace: "nowrap",
                        paddingX: "3px",
                      }
                }
              >
                {value + " cm"}
              </Typography>
            </div>
          </Html>
        </>
      )}
    </>
  )
})

export default DimensionLine
