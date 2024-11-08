import { Splide, SplideSlide } from "@splidejs/react-splide";
import React from "react";
import { Fade } from "react-awesome-reveal";
import { bottomSliderData } from "./HomeData";

const SecondReviews = () => {
  return (
    <>
      <div className="my-5 mt-8 reviews_home_section">
        <h1 className="mx-auto w-max font-bold text-2xl md:text-3xl lg:text-5xl">
          Werte und Erfahrung
        </h1>
        <div className="-mt-10 md:mt-0">
          <Splide
            options={{
              perPage: 3,
              perMove: 1,
              gap: "40px",
              mediaQuery: "max",
              breakpoints: {
                500: {
                  perPage: 1,
                },
              },
            }}
          >
            {bottomSliderData &&
              bottomSliderData.map((item) => (
                <SplideSlide key={item?.id}>
                  <div className="mt-2">
                    <Fade>
                      <img
                        src={item?.image}
                        alt=""
                        className="rounded-2xl image-zoom cursor-pointer"
                      />
                    </Fade>
                    <div className="my-4 w-max mx-auto ">
                      <h4 className="text-2xl font-semibold">{item?.title}</h4>
                    </div>
                    <div className="p-2">
                      <p className="leading-relaxed">{item?.text}</p>
                    </div>
                  </div>
                </SplideSlide>
              ))}
          </Splide>
        </div>
      </div>
    </>
  );
};

export default SecondReviews;
