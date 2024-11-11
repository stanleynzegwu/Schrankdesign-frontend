import InfoIcon from "@src/assets/icons/info_icon.svg"

export default function GriffTextureCard(props) {
  const { imageUrl, type, texture_type } = props

  return (
    <div className="relative">
      <div className="cursor-pointer border border-black rounded-[10px]">
        <img src={imageUrl} draggable={false} className="w-full " />
      </div>
      <div className="absolute right-0 top-0 cursor-target">
        <img src={InfoIcon} />
      </div>
    </div>
  )
}
