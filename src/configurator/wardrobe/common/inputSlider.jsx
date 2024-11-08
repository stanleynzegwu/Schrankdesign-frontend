import { Slider, styled, SliderThumb, Box } from "@mui/material"

const MySlider = styled(Slider)(() => ({
  color: "#36695C",
  "& .MuiSlider-rail": {
    color: "#545454",
    height: 5,
  },
  marginTop: 10,
}))

function InputThumbComponent() {
  return <div></div>
}

export default function InputSlider(props) {
  return (
    <Box className="w-full relative">
      <div
        className="flex flex-row justify-between items-center z-10 bg-white rounded-[5px] border-[1px] border-[#000] w-[85px] h-[37px] px-1 absolute -translate-x-1/2 -translate-y-1/2 top-1/2"
        style={{
          left: `${
            ((props.sliderValue - props.min) / (props.max - props.min)) * 100
          }%`,
        }}
      >
        <input
          type="number"
          className="bg-[#FFF] text-lg text-center font-bold text-[#36695C] h-5 w-11 focus:outline-none focus:border-none"
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
          min={props.min}
          max={props.max}
        />
        <span className="text-lg font-bold text-[#36695C]">cm</span>
      </div>
      <MySlider
        slots={{ thumb: InputThumbComponent }}
        min={props.min}
        max={props.max}
        value={props.sliderValue}
      />
    </Box>
  )
}
