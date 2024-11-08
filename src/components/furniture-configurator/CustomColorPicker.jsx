import React, {memo, useState} from "react";
import { SketchPicker } from "react-color";

const CustomColorpicker = React.memo(function CustomColorpicker({
    color,
    setColor,
    colorPicker,
    setColorPicker
}){
    // const [color, setColor] = useState(color);
    const handleColorChange = (newColor) => {
        setColor(newColor.hex);
    };


    return (
        <div className="absolute top-[40px] z-50 bg-[#ffffff]">
            <SketchPicker
                className=""
                color={color}
                onChange={handleColorChange} 
            />
            <button className=" right-[-20px] top-[210px] font-[karla] text-white font-bold bg-[#456779] rounded-[5px] px-[9px] py-[4px] shadow-lg" 
                onClick={() => {setColorPicker(false)}}
                type="button"
            >O K</button>
        </div>
    )
})

export default CustomColorpicker