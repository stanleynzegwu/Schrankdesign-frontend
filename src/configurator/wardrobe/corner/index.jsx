import { useSelector } from "react-redux"
import DividerInfo from "./dividerInfo"
import { Box, Button } from "@mui/material"
import useCornerStore from "../zustand/cornerStore"

export default function Corner() {
  const { showDividerInfo } = useSelector((state) => state.corner)
  const openDoor = useCornerStore.use.openDoor()
  const setOpenDoor = useCornerStore.use.setOpenDoor()

  return (
    <div className="absolute right-[20px] bottom-[160px]">
      <Box gap={1} sx={{ display: "flex", flexDirection: "column" }}>
        {showDividerInfo && <DividerInfo />}
        <Button
          variant="contained"
          onClick={() => {
            setOpenDoor(!openDoor)
          }}
        >
          {openDoor ? `Close` : `Open`} Door
        </Button>
      </Box>
    </div>
  )
}
