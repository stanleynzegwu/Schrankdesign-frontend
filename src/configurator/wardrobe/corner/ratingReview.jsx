import { Rating } from "@material-tailwind/react"
import ReviewIcon from "../../../assets/icons/review_icon.svg"
import StarIcon from "../../../assets/icons/star_icon.svg"

export default function RatingReview() {
  return (
    <div className="absolute right-[21px] bottom-[15px] w-[141px] h-[66px] rounded-[3px] border border-black bg-[#F6F6F6] flex flex-1">
      <div>
        <img src={ReviewIcon} className="ml-[-2px] mt-[-1px] w-[45px]" />
      </div>
      <div className="flex flex-col items-center gap-1.5 pt-1 w-full">
        <Rating
          ratedIcon={<img src={StarIcon} className="w-[13px] h-[13px]" />}
          readonly
          value={5}
        />
        <p className="text-[14px] leading-none">4.8 / 5</p>
        <p className="text-[15px] font-bold leading-none">SEHR GUT</p>
      </div>
    </div>
  )
}
