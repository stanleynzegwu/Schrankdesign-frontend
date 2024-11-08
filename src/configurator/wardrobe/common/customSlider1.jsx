import { Slider, styled } from "@mui/material"

const CustomSlider1 = styled(Slider)(() => ({
  color: "#36695C",
  "& .MuiSlider-rail": {
    color: "#545454",
    height: 5,
  },
  "& .MuiSlider-thumb": {
    width: "18.5px",
    height: "37px",
    borderRadius: "5px",
  },
  marginTop: "4px",
}))

export default CustomSlider1