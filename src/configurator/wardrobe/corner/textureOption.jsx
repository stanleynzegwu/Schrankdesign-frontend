import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import settingIcon from "../../../assets/icons/setting.png";
import MuiInput from "@mui/material/Input";
import { styled } from "@mui/material/styles";
import useColorStore from "../zustand/colorStore";
import LevaBody from "../common/LevaBody";
import LevaFront from "../common/LevaFront";
export default function TextureOption() {
  const storedUser = localStorage.getItem("schrankdesign-app-user");
  const auth = JSON.parse(storedUser);
  const [configOption, setConfigOption] = useState(false);
  const [bodyOption, setBodyOption] = useState(false);
  const [type, setType] = useState("none");
  // console.log(type)
  return (
    <>
      {auth?.role === 1 && (
        <div className="bg-[#F6F6F6] absolute top-[165px] right-[7px] px-[12px] py-[8px] w-[188px]">
          <div className="relative gap-2">
            <Button
              className={`${
                bodyOption ? "bg-[#456779]" : "bg-[#949494]"
              } h-[40px] rounded-[2px] mb-1 flex flex-start items-center gap-2 w-full normal-case text-[14px] underline pl-[15px] pr-[9px]`}
              onClick={() => {
                setConfigOption(!configOption);
                setBodyOption(!bodyOption);
              }}
            >
              <img src={settingIcon} className="w-[22px] h-[22px]" alt="Settings" />
              Texture
            </Button>
            {configOption && <LevaBody type={"body"} />}
            {/* {configOption && type === "front" && <LevaFront type={"front"} />} */}
          </div>
        </div>
      )}
    </>
  );
}
