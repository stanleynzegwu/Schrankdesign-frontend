import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import pro_icon from "../../../assets/icons/slide.png";

const slides = [
  {
    src: "/images/products/detail_product/4.png",
    title: "Sideboard 'Quinn'",
    dim: "1234 * 840 * H 60 cm",
    oldPrice: "777",
    currentPrice: "324",
  },
];

export default function Slide() {
  const options = {
    type: "loop",
    perPage: 4,
    breakpoints: {
      960: {
        perPage: 2,
      },
      550: {
        perPage: 1,
      },
    },
    perMove: 1,
    gap: "1rem",
    autoplay: true,
    interval: 1000,
    pauseOnHover: true,
    wheel: true,
    updateOnMove: true,
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-[2.5rem] text-[#456779] mt-[40px] text-center">
        Ähnliche Produkte
      </h1>
      <Splide options={options}>
        {slides.map((slide, index) => (
          <SplideSlide
            key={index}
            className="rounded-md hover:rounded-md hover:-translate-y-1 hover:scale-100 hover:bg-indigo-500 duration-300"
          >
            <div key={index} className="relative bg-[#f5f5f5]">
              <img
                src={slide.src}
                alt={`Slide ${index + 1}`}
                className="w-full rounded-md shadow-xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <button className="flex mt-2 py-1 px-4 bg-white text-sm text-black border border-black rounded-md mx-auto items-center">
                  <img src={pro_icon} width={14} height={14} alt="" />
                  Jetzt Designen
                </button>
              </div>
            </div>
            <div className="flex gird-col-2 gap-2 bg-[#f5f5f5] p-4 pt-6">
              <div className="flex flex-col">
                <p className="text-lg text-[#507081]">{slide.title}</p>
                <p className="my-2 text-[#718a98]">{slide.dim}</p>
                <div className="flex justify-center">
                  <img
                    src="/images/productimage/3.png"
                    alt=""
                    className="mr-auto"
                    width={24}
                  />
                  <img
                    src="/images/productimage/5.png"
                    alt=""
                    className="mx-auto"
                    width={24}
                  />
                  <img
                    src="/images/productimage/7.png"
                    alt=""
                    className="mx-auto"
                    width={24}
                  />
                  <img
                    src="/images/productimage/2.png"
                    alt=""
                    className="ml-auto"
                    width={24}
                  />
                  <p className="text-black"> + 21 </p>
                </div>
              </div>
              <div className="flex my-auto mb-[0px] ml-auto bg-[#f5f5f5]">
                <div className="flex flex-col">
                  <p className="line-through">{slide.oldPrice}$</p>
                  <p className="text-[#b12704]">{slide.currentPrice}$</p>
                </div>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}
