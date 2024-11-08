// import React from "react";
import IconStar from "/images/products/star.svg?url";
import { ReactSVG } from 'react-svg';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { reviewsData } from "./HomeData";

const ThirdReviews = () => {
  return (
    <>
      <div className="mt-5 md:mt-0 bg-white text-black">
        <div className="text-center p-5 md:p-10">
          <h2 className="text-2xl font-semibold">Das sagen unsere Kunden</h2>
          <div className="flex w-max mx-auto mt-4">
            <span>
              <ReactSVG src={IconStar} className="text-yellow-400 fill-yellow-400 mr-2" />
            </span>
            <span>
              <ReactSVG src={IconStar} className="text-yellow-400 fill-yellow-400 mr-2" />
            </span>
            <span>
              <ReactSVG src={IconStar} className="text-yellow-400 fill-yellow-400 mr-2" />
            </span>
            <span>
              <ReactSVG src={IconStar} className="text-yellow-400 fill-yellow-400 mr-2" />
            </span>
            <span>
              <ReactSVG src={IconStar} className="text-yellow-400 fill-yellow-400 mr-2" />
            </span>
          </div>
          <p className="mt-2">von 141 Bewertungen</p>
          {/* ------------------Reviews Slider---------------------------------- */}
          <div className="md:mt-2 reviews_home_section md:w-[70%] mx-auto">
            <Splide
              options={{
                type: "loop",
                autoplay: true,
                perPage: 3,
                interval: 4000,
                arrows: false,
                perMove: 1,
                mediaQuery: "max",
                breakpoints: {
                  500: {
                    perPage: 1,
                  },
                },
              }}
            >
              {reviewsData &&
                reviewsData.map((item) => (
                  <SplideSlide key={item?.id}>
                    <div className="text-center items-center">
                      <div className="flex w-max mx-auto mt-4">
                        <span>
                          <ReactSVG src={IconStar} className="text-yellow-400 fill-yellow-400 mr-1" />
                        </span>
                        <span>
                          <ReactSVG src={IconStar} className="text-yellow-400 fill-yellow-400 mr-1" />
                        </span>
                        <span>
                          <ReactSVG src={IconStar} className="text-yellow-400 fill-yellow-400 mr-1" />
                        </span>
                        <span>
                          <ReactSVG src={IconStar} className="text-yellow-400 fill-yellow-400 mr-1" />
                        </span>
                        <span>
                          <ReactSVG src={IconStar} className="text-yellow-400 fill-yellow-400 mr-1" />
                        </span>
                      </div>
                      {item?.title && (
                        <h5 className="font-semibold text-base mt-2">
                          {item?.title}
                        </h5>
                      )}
                      {item?.subtitle && (
                        <p className="mt-1 whitespace-normal">
                          {item?.subtitle}
                        </p>
                      )}
                      {item?.name && (
                        <h6 className="text-gray-500 mt-1">{item?.name}</h6>
                      )}
                      {item?.date && (
                        <p className="text-gray-500 italic">{item?.date}</p>
                      )}
                      {item?.img && (
                        <img
                          src={item?.img}
                          alt=""
                          className="h-14 w-14 mx-auto mt-1"
                        />
                      )}
                      {item?.product && (
                        <h6 className="text-base mt-2">{item?.product} </h6>
                      )}
                    </div>
                  </SplideSlide>
                ))}
            </Splide>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThirdReviews;
