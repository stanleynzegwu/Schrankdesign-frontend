import InfoIcon from "@src/assets/icons/info_icon.svg"

export default function GriffCard(props) {
  const { imageUrl, type, griff_type, className } = props

  return (
    <div className="relative">
      <div className={className}
      >
        <img src={imageUrl} draggable={false} className="rounded-[10px] h-[95px]"/>
      </div>
      <div className="absolute right-0 top-0 cursor-target">
        <img src={InfoIcon} />
      </div>
    </div>
  )
}
