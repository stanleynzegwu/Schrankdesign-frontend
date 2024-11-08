import { Splide, SplideSlide } from "@splidejs/react-splide";
import React from "react";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import BottomProducts from "../common/BottomProducts";
const matIcons = [
  {
    id: 0,
    title: "HOLZWERKSTOFF",
    subtitle:
      "Unsere Plattenwerkstoffe von Kaindl sind durch die hochwertige Beschichtung robust und langlebig zugleich, damit deine Möbel jahrelang halten .",
    img: "/images/quality/single_quality_images/mat_icons/fing.webp",
  },
  {
    id: 1,
    title: "SCHUBKASTEN",
    subtitle:
      "Dank des Soft-Close-Systems von Blum sind unsere Schubkästen sehr leichtgängig und supersilent, was für ein angenehmes und ruhiges Schließen sorgt.",
    img: "/images/quality/single_quality_images/mat_icons/port.webp",
  },
  {
    id: 2,
    title: "VERBINDER",
    subtitle:
      "Unsere Möbelverbinder von Hettich sind bekannt für ihre hochwertige Qualität und Zuverlässigkeit, die sicherstellen, dass deine Möbel stabil und langlebig sind.",
    img: "/images/quality/single_quality_images/mat_icons/scr.webp",
  },
  {
    id: 3,
    title: "MATERIALSTÄRKE",
    subtitle:
      "Wir verwenden für den Korpus und die Fronten ausschließlich 19 mm starke Materialien und für Rückwände 8 mm, um ein robustes und langlebiges Möbel zu gewährleisten",
    img: "/images/quality/single_quality_images/mat_icons/material.png",
  },
];
const Material = ({ title }) => {
  return (
    <>
      {/* TopBanner */}
      <div
        style={{
          backgroundImage: `url(${import.meta.env.PUBLIC_URL}/images/quality/single_quality_images/mat_banner.webp)`,
        }}
        className="h-[300px] lg:h-[500px] bg-cover bg-center relative"
      >
        <div className="bg-black absolute inset-0 opacity-40"></div>

        <Fade triggerOnce={true} top>
          <div className="text-center text-white absolute inset-0 grid">
            <div className="my-auto">
              <h6 className="text-sm font-semibold tracking-wide">
                HOCHWERTIG
              </h6>
              <h1 className="text-3xl my-4 md:text-5xl font-bold">{title}</h1>
              <p className="mt-10 w-[80%] md:w-[50%] mx-auto font-semibold">
                Die Wahl hochwertiger Materialien ist der erste Schritt in
                Richtung Design-Exzellenz..
              </p>
            </div>
          </div>
        </Fade>
      </div>
      <div className="md:w-[90%] mx-auto p-5">
        {/* Start Row */}
        <div className="flex">
          <Link to="/">
            <div className="text-gray-600">Start</div>
          </Link>
          <div className="mx-2">/</div>
          <div>{title && title}</div>
        </div>
      </div>
      {/* Left Right Section */}
      <Zoom triggerOnce={true}>
        <div className="w-[95%] lg:w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-8 md:p-5 lg:p-10 rounded-2xl shadow-2xl mt-5">
          <div className="p-5">
            <img
              src="/images/quality/single_quality_images/mat.webp"
              alt=""
              className="rounded-2xl image-zoom"
            />
          </div>
          <div className="p-5 my-auto">
            <h4 className="text-3xl md:text-4xl font-semibold">
              Hochwertige Materialien
            </h4>
            <p className="mt-2 md:mt-5 leading-relaxed md:leading-loose">
              Wir verwenden nur die hochwertigsten Materialien für unsere Möbel,
              um sicherzustellen, dass sie langlebig und von höchster Qualität
              sind. Dazu gehören Markenbeschläge von renommierten Herstellern
              wie Blum und Hettich, die für ihre Langlebigkeit und Haltbarkeit
              bekannt sind. Auch die verwendeten Plattenmaterialien stammen von
              führenden Herstellern wie Kaindl oder Pfleiderer, die außerdem für
              Ihre hohe Qualität und Langlebigkeit bekannt sind.
            </p>
            <p className="font-semibold mt-2 md:mt-5 leading-relaxed md:leading-loose">
              Um sicherzustellen, dass unsere Möbel die bestmögliche Qualität
              aufweisen, unterziehen wir in regelmäßigen Abständen alle
              verwendeten Materialien zusätzlichen Qualitätskontrollen. So
              stellen wir sicher, dass jedes Möbelstück, das wir produzieren,
              unseren hohen Qualitätsstandards entspricht.
            </p>
          </div>
        </div>
      </Zoom>
      {/* tools and cars icon banner */}
      <div className="bg-[#F5F5F5] mt-10 md:p-5 md:py-7">
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* --------------------------Desktop Icons----------------------------- */}
          {matIcons &&
            matIcons.map((item) => (
              <Slide triggerOnce={true} bottom key={item?.id}>
                <div className="text-center px-5">
                  <div className="mb-4 flex justify-center">
                    <img src={item?.img} alt="" className="max-w-[70px]" />
                  </div>
                  <div>
                    <p className="text-[#5a8560] font-semibold text-sm">
                      {item?.title}
                    </p>
                    <p className="text-[#5a8560] mt-4">{item?.subtitle}</p>
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
            {matIcons &&
              matIcons.map((item) => (
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
                        <p className="text-[#5a8560] mt-4">{item?.subtitle}</p>
                      </div>
                    </div>
                  </Zoom>
                </SplideSlide>
              ))}
          </Splide>
        </div>
      </div>

      {/* ----------------------------Bottom Products------------------------ */}
      <BottomProducts />
    </>
  );
};

export default Material;
