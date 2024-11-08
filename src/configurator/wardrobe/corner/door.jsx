import { Button } from "@material-tailwind/react"
import doorIcon from "../../../assets/icons/door.png";
import { useSelector } from "react-redux"
import useCornerStore from "../zustand/cornerStore"
export default function Door() {
    const storedUser = localStorage.getItem("schrankdesign-app-user");
    const auth = JSON.parse(storedUser);
    const { showDividerInfo } = useSelector((state) => state.corner)
    const openDoor = useCornerStore.use.openDoor()
    const setOpenDoor = useCornerStore.use.setOpenDoor()
  return (
    <div className="absolute left-[423px] bottom-[20px] ">
      <Button
        className=" bg-[#456779] text-[#ffffff] normal-case text-[14px] flex items-center gap-2 rounded-[2px] px-[20px] h-[39px] focus:bg-[#456779] active:bg-[#456779]"
        onClick={() => {
          setOpenDoor(!openDoor)
        }}
      >
        <img src={doorIcon}></img>
        {openDoor ? `schließen` : `Öffnen`} Tür
      </Button>
    </div>   
  )
}
