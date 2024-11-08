import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Zoom, Slide, Fade } from "react-awesome-reveal";
import CommanBanner from "../common/CommanBanner";
import Slider from "react-slick";
import { musterIcons, musterCounterIcons } from "../muster/MusterData";
import FarbDekoreMuster from "../muster/FarbDekoreMuster";
import HolzDekoreMuster from "../muster/HolzDekoreMuster";
import HolzFurniereMuster from "../muster/HolzFurniereMuster";

const bottomSliderData = [
  {
    id: 0,
    image: "/images/home/bottom_slider_1.webp",
    title: "Individuell",
    text: "Mit unserem individuellen Möbel-Konfigurator kannst du ganz einfach dein persönliches Designerstück kreieren. Entwerfe es nach deinen Wünschen und erwecke es zum Leben!",
  },
  {
    id: 1,
    image: "/images/home/bottom_slider_2.webp",
    title: "Nachaltig",
    text: "Verantwortungsvoller Umgang mit Holz als Rohstoff und Regionalität aus Leipzig sichern unsere Nachhaltigkeit. Unsere Möbel schonen die Umwelt und unterstützen die Region",
  },
  {
    id: 2,
    image: "/images/home/bottom_slider_3.webp",
    title: "Beratung",
    text: "Unsere Tischler bieten dir persönliche und kompetente Beratung bei der Wahl deiner Möbel. Lass dich von unseren Fachleuten beraten und finde genau das, was du suchst!",
  },
  {
    id: 3,
    image: "/images/home/bottom_slider_4.webp",
    title: "Qualität",
    text: "Unsere Möbel sind aus hochwertigen Materialien gefertigt und mit Sorgfalt hergestellt, damit du lange Freude daran hast. Bei uns bekommst du die beste Qualität!",
  },
];
const Muster = ({ title }) => {
  return (
    <>
      <div className="md:w-[90%] mx-auto p-5">
        {/* Start Row */}
        <div className="flex">
          <Link to="/">
            <div className="text-gray-600">Start</div>
          </Link>
          <div className="mx-2">/</div>
          <div>{title && title}</div>
        </div>
        {/* Left Right Section */}
        <Slide triggerOnce={true} right>
          <div className=" mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-8 md:p-5 lg:p-10 rounded-2xl shadow-2xl mt-5">
            <div className="p-5">
              <img
                src="/images/servicee/single/muster.webp"
                alt=""
                className="rounded-2xl image-zoom"
              />
            </div>
            <div className="p-5 my-auto">
              <h4 className="text-3xl md:text-4xl font-semibold">
                Wähle deine Muster
              </h4>
              <p className="mt-2 md:mt-5 leading-relaxed md:leading-loose font-medium">
                Auf unserer Seite kannst du dich durch die Vielfalt unserer
                Muster inspirieren lassen und deine Wunschmöbel perfekt an
                deinen Einrichtungsstil und deine Farbvorlieben anpassen. Mit
                unserem Musterbestellservice hast du die Möglichkeit, dich von
                der Qualität unserer Materialien und der Farbgenauigkeit unserer
                Produkte zu überzeugen, bevor du eine endgültige Bestellung
                aufgibst. So kannst du sicher sein, dass die Möbel, die du
                erhältst, deinen Anforderungen entsprechen. Probiere es jetzt
                aus und bestelle deine Muster noch heute!
              </p>
            </div>
          </div>
        </Slide>
      </div>
      {/* Counter Icons */}
      <div className="py-4 px-4 md:p-10 bg-[#F5F5F5]">
        <div className="md:w-[95%] mx-auto md:p-5">
          <h1 className="text-2xl md:text-3xl lg:text-4xl mx-auto font-bold">
            So einfach funktioniert's:
          </h1>
          <div className="mt-5 hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* --------------------------Desktop Icons----------------------------- */}
            {musterCounterIcons &&
              musterCounterIcons.map((item) => (
                <Slide triggerOnce={true} bottom key={item?.id}>
                  <div className="text-center px-5 mt-5">
                    <div className="mb-4 flex justify-center">
                      <img src={item?.img} alt="" className="max-w-[150px]" />
                    </div>
                    <div>
                      <p className="tracking-wider font-semibold text-sm">
                        {item?.title}
                      </p>
                      <p className="leading-loose mt-4">{item?.subtitle}</p>
                    </div>
                  </div>
                </Slide>
              ))}
            {/* ----------------------------Mobile Slider Icons--------------------- */}
          </div>
        </div>
      </div>
      {/* Muster detail */}

      <div className="">
        <p className="m-10 text-center text-4xl font-bold text-[#282828] p-5">
          Wählen Sie Ihre Musterdekore
        </p>
        <FarbDekoreMuster />

        <HolzDekoreMuster />

        <HolzFurniereMuster />
      </div>

      <div className="lg:hidden md:mt-5">
        <Splide
          options={{
            type: "loop",
            autoplay: true,
            perPage: 1,
            arrows: false,
            interval: 3000,
          }}
        >
          {musterCounterIcons &&
            musterCounterIcons.map((item) => (
              <SplideSlide key={item?.id}>
                <Zoom>
                  <div className="text-center">
                    <div className="mb-4 flex justify-center">
                      <img src={item?.img} alt="" className="max-w-[90px]" />
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
      {/* tools and cars icon banner */}
      <div className="bg-[#F5F5F5] md:p-5 md:py-7">
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* --------------------------Desktop Icons----------------------------- */}
          {musterIcons &&
            musterIcons.map((item) => (
              <Slide triggerOnce={true} bottom key={item?.id}>
                <div className="text-center px-5">
                  <div className="mb-4 flex justify-center">
                    <img src={item?.img} alt="" className="max-w-[70px]" />
                  </div>
                  <div>
                    <p className="tracking-wider font-semibold text-sm">
                      {item?.title}
                    </p>
                    <p className="leading-loose mt-4">{item?.subtitle}</p>
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
            {musterIcons &&
              musterIcons.map((item) => (
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
      {/* Common Banner */}
      <CommanBanner />
    </>
  );
};

export default Muster;
