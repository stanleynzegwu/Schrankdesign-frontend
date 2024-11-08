import { useCallback } from "react"
import Config from "../../config"

// import InfoIcon from "../../../assets/icons/info_icon.svg"
import { InfoIcon } from "@src/components/icons";
import useDndStore from "../zustand/dndStore"
import useCornerStore from "../zustand/cornerStore"

export default function ProductCard(props) {
  const { imageUrl, title, type, drawerHeight, drawerType, door_type, flap_type } = props
  const setType = useDndStore.use.setType()
  const setDoorType = useDndStore.use.setDoorType()
  const setDrawerHeight = useDndStore.use.setDrawerHeight()
  const setDrawerType = useDndStore.use.setDrawerType()
  const setDrawerTopDistance = useDndStore.use.setDrawerTopDistance()
  const setProductDragging = useDndStore.use.setProductDragging()
  const setFlapType = useDndStore.use.setFlapType()
  const setShowDimensions = useCornerStore.use.setShowDimensions()

  const handleDragStart = useCallback(
    (event) => {
      // event.dataTransfer.setData("application/dnd", nodeType)
      event.dataTransfer.effectAllowed = "move"

      // Create an image element with a transparent source
      const transparentImage = new Image()
      transparentImage.src =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAA5ElEQVR42mJ0VcBwAABIP4PjlWIxRS8BPD+DAzO7Z2FgGIC9AGZJ/UdMCLGedTkxnhRJTDF3AAdEwARHg4ArJCA1DKAgQwAKjAdKpS5gACg4ArCCAQEAAgLAjQozIAQAA1kO6BpMAiGABABFgQAVABIQAAEoAIBAAASKAAgEAAEiAAgEAABIoACCwB8Mz5zW0WiAAAAAElFTkSuQmCC"

      // Set the transparent image as the drag image
      event.dataTransfer.setDragImage(transparentImage, 0, 0)
      setProductDragging(true)
      setType(type)
      if (drawerHeight !== undefined) {
        setDrawerHeight(drawerHeight)
        setDrawerType(drawerType)
      } 
      if (type === Config.furnishing.type.drawer)
        setDrawerTopDistance(Config.furnishing.drawer.topShelfDistance)

      if (type === Config.furnishing.type.door) {
        setDoorType(door_type)
      }

      if (type === Config.furnishing.type.flap)
        setFlapType(flap_type)
      
      setShowDimensions(false)
    },
    [type, drawerHeight, flap_type]
  )

  return (
    <div className="relative">
      <div
        className={`${
          title === undefined ? "" : "p-3 border border-black"
        } cursor-pointer bg-[#f5f5f5]`}
        onDragStart={handleDragStart}
        draggable
      >
        <img src={imageUrl} className="mb-1" draggable={false} />
      </div>
      <div className="my-1 text-lg text-black text-center">{title}</div>
      <div className="absolute right-0 top-0 cursor-target">
        <InfoIcon />
      </div>
    </div>
  )
}
