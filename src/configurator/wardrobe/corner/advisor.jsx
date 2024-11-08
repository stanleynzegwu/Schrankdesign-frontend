import { Button } from "@material-tailwind/react"
import AvatarIcon from "../../../assets/icons/avatar.svg"

export default function Advisor() {
  return (
    <Button className="absolute left-[423px] top-[20px] bg-[#456779] text-[#FFF] normal-case text-[14px] flex items-center gap-2 rounded-[2px] pl-[10px] pr-[6px] h-[39px]">
      <img src={AvatarIcon} />
      Sofortige Beratung
    </Button>
  )
}
