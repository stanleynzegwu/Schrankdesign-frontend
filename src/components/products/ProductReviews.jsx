// import React from "react";
import IconStar from "/images/products/star.svg?url";

const ProductReviews = ({ stars, date, name, title, description }) => {
  const generateStars = (e) => {
    const starArray = [];
    for (let i = 0; i < e; i++) {
      starArray.push(
        <span key={i}>
          <img src={IconStar} className="text-yellow-400 fill-yellow-400 mr-1 text-xs h-5 w-5" />
        </span>
      );
    }
    return starArray;
  };
  return (
    <>
      <div className="p-2 md:p-4 border-b mb-2">
        {/* Reviews and Date */}
        <div className="flex">
          <div className="flex">{generateStars(stars)}</div>
          <div className="ml-auto">
            <p className="text-gray-500 italic">{date}</p>
          </div>
        </div>
        {/* profile & name */}
        <div className="flex mt-1 md:mt-2 items-center">
          <img src="/images/avatar-.jpg" alt="" className="h-10 w-10" />
          <h6 className="text-gray-500 text-lg ml-2">{name}</h6>
        </div>
        {/* Content */}
        <div className="text-base md:text-lg font-bold mt-4 mb-2">{title}</div>
        <p className="text-base md:tracking-wide md:leading-relaxed">
          {description}
        </p>
      </div>
    </>
  );
};

export default ProductReviews;
