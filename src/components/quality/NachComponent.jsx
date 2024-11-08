import React from "react";
import { Fade, Zoom } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import BottomProducts from "../common/BottomProducts";
const nachhaltigkeit = ({ title }) => {
  return (
    <>
      <>
        {/* TopBanner */}

        <div
          style={{
            backgroundImage: `url(${import.meta.env.PUBLIC_URL}/images/quality/single_quality_images/nach_banner.webp)`,
          }}
          className="h-[300px] bg-cover bg-center relative"
        >
          <div className="bg-black absolute inset-0 opacity-40"></div>
          <Fade triggerOnce={true} top>
            <div className="text-center text-white absolute inset-0 grid">
              <h1 className="text-3xl md:text-4xl font-bold my-auto">
                {title}
              </h1>
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

          {/* Left Right Section */}
          <Zoom triggerOnce={true}>
            <div className="w-[95%] lg:w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-8 md:p-5 lg:p-10 rounded-2xl shadow-2xl mt-5">
              <div className="p-5">
                <img
                  src="/images/quality/single_quality_images/Nachhaltig.webp"
                  alt=""
                  className="rounded-2xl image-zoom"
                />
              </div>
              <div className="p-5 my-auto">
                <h4 className="text-3xl md:text-4xl font-semibold">
                  Aus Liebe zur Natur
                </h4>
                <p className="mt-2 md:mt-5 leading-relaxed md:leading-loose">
                  Bei Schrankdesign.de legen wir großen Wert auf Nachhaltigkeit.
                  Unsere Möbel werden aus natürlichen FSC-Zertifizierten
                  Materialien hergestellt, die aus nachhaltigen Quellen stammen.
                  Wir verwenden auch umweltfreundliche Farben und Lacke, um
                  sicherzustellen, dass unsere Produkte sowohl für die Umwelt
                  als auch für die Gesundheit unserer Kunden sicher sind.Unser
                  Ziel ist es, Möbel zu schaffen, die sowohl funktional als auch
                  umweltfreundlich sind, damit unsere Kunden mit gutem Gewissen
                  einkaufen können.
                </p>
              </div>
            </div>
          </Zoom>
        </div>
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
              <div className="font-bold text-lg md:text-2xl mt-5 md:mt-5 md:leading-relaxed text-[#5a8560]">
                Nachhaltigkeit ist die Verantwortung, die uns die Vergangenheit
                auferlegt hat, um die Zukunft zu gestalten.
              </div>
            </div>
          </Fade>
        </div>
        {/* Three Box Section */}
        <div>
          <div className="lg:w-[90%] mx-auto p-10">
            <div className="text-center">
              <div>
                <h6 className="uppercase text-sm font-semibold">NACHHALTIG</h6>
                <h1 className="my-5 font-bold text-2xl md:text-3xl lg:text-5xl">
                  Unser Beitrag zum Umweltschutz
                </h1>
              </div>
            </div>
            <Fade triggerOnce={true} bottom>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-5 md:mt-10">
                <div>
                  <img
                    src="/images/quality/single_quality_images/nac_1.webp"
                    alt=""
                    className="image-zoom rounded-2xl"
                  />
                  <div className="flex mt-5 mb-3">
                    <h6 className="mx-auto text-2xl font-semibold">
                      FSC-Zertifiziert
                    </h6>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base w-[90%] mx-auto">
                    Bei Schrankdesign verwenden wir ausschließlich
                    FSC-zertifiziertes Holz aus nachhaltigem Anbau, um einen
                    positiven Beitrag für die Umwelt zu leisten.
                  </p>
                </div>
                <div>
                  <img
                    src="/images/quality/single_quality_images/nac-2.webp"
                    alt=""
                    className="image-zoom rounded-2xl"
                  />
                  <div className="flex mt-5 mb-3">
                    <h6 className="mx-auto text-2xl font-semibold">
                      Ressourcenrecycling
                    </h6>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base w-[90%] mx-auto">
                    Um Ressourcen zu schonen und die Umweltbelastung zu
                    reduzieren, heizen wir bei Schrankdesign.de mit unseren
                    Holzresten und verpressten Holzbriketts.
                  </p>
                </div>
                <div>
                  <img
                    src="/images/quality/single_quality_images/nac_3.jpg"
                    alt=""
                    className="image-zoom rounded-2xl"
                  />
                  <div className="flex mt-5 mb-3">
                    <h6 className="mx-auto text-2xl font-semibold">
                      Verpackung
                    </h6>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base w-[90%] mx-auto">
                    Wir verwenden bei Schrankdesign ausschließlich
                    verpackungsmaterialien aus Holz und Pappe sowie recyceltem
                    Kunststoff , um unseren Beitrag zum Umweltschutz zu leisten.
                  </p>
                </div>
              </div>
            </Fade>
          </div>
        </div>
        {/* ----------------------------Bottom Products------------------------ */}
        <BottomProducts />
      </>
    </>
  );
};

export default nachhaltigkeit;
