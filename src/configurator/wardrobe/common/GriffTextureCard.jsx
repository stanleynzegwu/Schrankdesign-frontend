// import { useCallback } from "react"
// import Config from "../../config"

// import InfoIcon from "../../../assets/icons/info_icon.svg"
import { InfoIcon } from "@src/components/icons";

export default function GriffTextureCard(props) {
  const { imageUrl } = props; // type, texture_type

  return (
    <div className="relative">
      <div className="cursor-pointer border border-black rounded-[10px]">
        <img src={imageUrl} draggable={false} className="w-full " />
      </div>
      <div className="absolute right-0 top-0 cursor-target">
        <InfoIcon />
      </div>
    </div>
  )
}
