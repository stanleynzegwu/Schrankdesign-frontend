import React from "react";
import { Fade, Zoom } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import BottomProducts from "../common/BottomProducts";
const Mobel = ({ title }) => {
  return (
    <>
      {/* TopBanner */}
      <div
        style={{
          backgroundImage: `url(${import.meta.env.PUBLIC_URL}/images/quality/single_quality_images/mobel_banner.webp)`,
        }}
        className="h-[300px] lg:h-[400px] bg-cover bg-center relative"
      >
        <div className="bg-black absolute inset-0 opacity-40"></div>
        <Fade triggerOnce={true} top>
          <div className="text-center text-white absolute inset-0 grid">
            <div className="my-auto">
              <h1 className="text-3xl my-4 md:text-5xl font-bold">{title}</h1>
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
              src="/images/quality/single_quality_images/mobel.webp"
              alt=""
              className="rounded-2xl image-zoom"
            />
          </div>
          <div className="p-5 my-auto">
            <h4 className="text-3xl md:text-4xl font-semibold">Planungsbüro</h4>
            <p className="mt-2 md:mt-5 leading-relaxed md:leading-loose">
              Falls du eine besondere Größe, Farbe oder Ausstattung für dein
              Möbelstück wünschst, bieten wir dir die Möglichkeit einer
              maßgeschneiderten Anfertigung. Auch wenn du eine Skizze oder ein
              Foto hast, von einem Möbelstück, das du gerne nachbauen lassen
              möchtest, stehen wir dir gerne zur Verfügung. Unsere erfahrenen
              Tischler und Techniker setzen deine Vorstellungen gekonnt um.
            </p>
            <p className="font-semibold mt-2">
              Zögere nicht uns zu kontaktieren, wir beraten dich gerne bei all
              deinen Fragen und Wünschen.
            </p>
          </div>
        </div>
      </Zoom>
      {/* Quote */}
      <div className="bg-[#F5F5F5] py-10 md:p-10 flex">
        <Fade triggerOnce={true} bottom>
          <div className="w-[90%] md:w-[80%] lg:w-[50%] mx-auto bg-white rounded-xl shadow-2xl p-10">
            <div>
              <svg
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 101 80"
                className="h-10 w-10 lg:h-16 lg:w-16 text-[#CDDACF] fill-[#CDDACF] mx-auto lg:mx-0"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 41.77V0h41.604v41.77L20.026 80H.987L21.72 41.77H0zm59.396 0V0H101v41.77L79.422 80H60.383l20.732-38.23H59.396z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h6 className="mt-3 text-[#5a8560]">NACH SKIZZE</h6>
            <div className="font-bold text-lg md:text-2xl mt-5 md:mt-3 md:leading-relaxed text-[#5a8560]">
              Bei uns erhältst du alles aus einer Hand - von der Planung über
              die Beratung bis hin zur Umsetzung deiner individuellen Möbel.
            </div>
          </div>
        </Fade>
      </div>

      {/* Three Box Section */}
      <div>
        <div className="lg:w-[90%] mx-auto py-5 p-10">
          <Fade triggerOnce={true} bottom>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-5 md:mt-10">
              <div className="mt-4 md:mt-0">
                <img
                  src="/images/quality/single_quality_images/mobel_1.webp"
                  alt=""
                  className="image-zoom rounded-2xl"
                />
                <div className="flex mt-5 mb-3">
                  <h6 className="mx-auto text-2xl font-semibold">Beratung</h6>
                </div>
                <p className="text-gray-700 leading-relaxed text-base w-[90%] mx-auto">
                  Ein persönliches Beratungsgespräch ist der erste Schritt für
                  die perfekte Umsetzung deines Vorhabens. Mit viel Know-how und
                  gutem Rat nehmen wir uns Zeit für dich.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <img
                  src="/images/quality/single_quality_images/mobel_2.webp"
                  alt=""
                  className="image-zoom rounded-2xl"
                />
                <div className="flex mt-5 mb-3">
                  <h6 className="mx-auto text-2xl font-semibold">Planung</h6>
                </div>
                <p className="text-gray-700 leading-relaxed text-base w-[90%] mx-auto">
                  Bei der Planung wird an alles gedacht. Funktion und Design
                  werden in eleganter Weise in Einklang gebracht. Unsere
                  handwerkliche Erfahrung ist der Schlüssel zum Gelingen.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <img
                  src="/images/quality/single_quality_images/mobel_3.webp"
                  alt=""
                  className="image-zoom rounded-2xl"
                />
                <div className="flex mt-5 mb-3">
                  <h6 className="mx-auto text-2xl font-semibold">Umsetzung</h6>
                </div>
                <p className="text-gray-700 leading-relaxed text-base w-[90%] mx-auto">
                  Die Entwürfe setzen wir in höchster Qualität um. Mit
                  handwerklichem Geschick und einem modernen Maschinenpark
                  realisieren wir jedes Detail mit absoluter Präzision.
                </p>
              </div>
            </div>
          </Fade>
        </div>
      </div>
      {/* Center Box */}
      <div className="flex md:p-10 itema-center">
        <div className="bg-white rounded-2xl shadow-2xl p-5 md:p-10 w-[90%] 2xl:w-[30%] mx-auto text-center items-center">
          <h6 className="text-lg font-semibold">Wir sind für dich da!</h6>
          <div className="my-2 md:my-4 text-lg md:text-2xl items-center flex w-max mx-auto">
            <h3 className="font-semibold">Beratung </h3>
            <span className="text-[#5a8560] font-semibold ml-2">
              <a href="tel:+49 341 65673302">+49 341 65673302</a>
            </span>
          </div>
          <div className="my-2 md:my-4 text-lg md:text-2xl items-center flex w-max mx-auto">
            <h3 className="font-semibold">Email </h3>
            <span className="text-[#5a8560] font-semibold ml-2">
              <a href="mailto:info@Schrankdesign.de">Info@Schrankdesign.de</a>
            </span>
          </div>
          <div className="my-2 md:my-4 text-lg md:text-2xl items-center flex w-max mx-auto">
            <h3 className="font-semibold">Mo - Fr 9:30 - 18:00 Uhr </h3>
          </div>
        </div>
      </div>
      {/* ----------------------------Bottom Products------------------------ */}
      <BottomProducts />
    </>
  );
};

export default Mobel;
