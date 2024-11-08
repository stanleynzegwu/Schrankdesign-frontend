import React from "react"
import DimensionLine from "../common/dimensionLine"

const MeasureComponent = React.memo(function MeasureComponent({
  measureInfo,
  showMeasure,
  depth,
}) {
  return (
    <>
      {showMeasure && (
        <>
          <DimensionLine
            points={[
              [measureInfo.posX, measureInfo.aboveTop, depth],
              [measureInfo.posX, measureInfo.aboveBottom, depth],
            ]}
            endDir="X"
            value={parseInt(measureInfo.aboveTop - measureInfo.aboveBottom)}
            center={[
              measureInfo.posX,
              (measureInfo.aboveTop + measureInfo.aboveBottom) / 2,
              depth,
            ]}
            lineWidth={1.8}
            isBig={false}
          />
          <DimensionLine
            points={[
              [measureInfo.posX, measureInfo.belowTop, depth],
              [measureInfo.posX, measureInfo.belowBottom, depth],
            ]}
            endDir="X"
            value={parseInt(measureInfo.belowTop - measureInfo.belowBottom)}
            center={[
              measureInfo.posX,
              (measureInfo.belowTop + measureInfo.belowBottom) / 2,
              depth,
            ]}
            lineWidth={1.8}
            isBig={false}
          />
        </>
      )}
    </>
  )
})

export default MeasureComponent
