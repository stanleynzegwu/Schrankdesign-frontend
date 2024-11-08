import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Slide, Zoom } from "react-awesome-reveal";
import { bannerIcons } from "./HomeData";

const BannerIcons = () => {
  return (
    <>
      <div className="bg-[#F5F5F5] md:p-5 md:py-7">
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* --------------------------Desktop Icons----------------------------- */}
          {bannerIcons &&
            bannerIcons.map((item) => (
              <Slide triggerOnce={true} bottom key={item?.id}>
                <div className="text-center px-[48px]">
                  <div className="mb-4 flex justify-center">
                    <img src={item?.img} alt="" className="max-w-[70px]" />
                  </div>
                  <div>
                    <p className="text-black font-medium text-sm">
                      {item?.title}
                    </p>
                  </div>
                </div>
              </Slide>
            ))}
          {/* ----------------------------Mobile Slider Icons--------------------- */}
        </div>
        <div className="lg:hidden">
          <Splide
            options={{
              type: "loop",
              autoplay: true,
              perPage: 1,
              arrows: false,
              interval: 3000,
            }}
          >
            {bannerIcons &&
              bannerIcons.map((item) => (
                <SplideSlide key={item?.id}>
                  <Zoom>
                    <div className="text-center px-[48px]">
                      <div className="mb-4 flex justify-center">
                        <img src={item?.img} alt="" className="max-w-[70px]" />
                      </div>
                      <div>
                        <p className="text-black font-medium text-sm">
                          {item?.title}
                        </p>
                      </div>
                    </div>
                  </Zoom>
                </SplideSlide>
              ))}
          </Splide>
        </div>
      </div>
    </>
  );
};

export default BannerIcons;
