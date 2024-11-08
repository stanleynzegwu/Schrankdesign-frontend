import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import BottomProducts from "../common/BottomProducts";
const germanIcons = [
  {
    id: 0,
    title: "KURZE TRANSPORTWEGE",
    subtitle:
      "Durch kurze Transportwege, können wir die Umweltbelastung reduzieren und sicherstellen, dass dein Möbel schnell bei dir ankommt.",
    img: "/images/quality/single_quality_images/german_icons/car.avif",
  },
  {
    id: 1,
    title: "FACHPERSONAL",
    subtitle:
      "Unser gut ausgebildetes Personal ermöglicht uns, die bestmögliche Qualität und hochwertigsten Möbel herzustellen.",
    img: "/images/quality/single_quality_images/german_icons/tools.webp",
  },
  {
    id: 2,
    title: "HÖCHSTE QUALITÄT",
    subtitle:
      "Durch den Einsatz von Materialien aus Europa garantieren wir dir, die Produktion eines qualitativ hochwertigen Möbels.",
    img: "/images/quality/single_quality_images/german_icons/diam.avif",
  },
  {
    id: 3,
    title: "REGIONALITÄT",
    subtitle:
      "Dank unserer direkten Regionalität aus Leipzig sind wir in der Lage, sofort auf deine Anfragen zu reagieren und dich schnellstmöglich zu beliefern.",
    img: "/images/quality/single_quality_images/german_icons/reg.avif",
  },
];

const GermanComponent = ({ title }) => {
  return (
    <>
      {/* TopBanner */}

      <div
        style={{
          backgroundImage: `url(${import.meta.env.PUBLIC_URL}/images/quality/single_quality_images/german_banner.webp)`,
        }}
        className="h-[300px] lg:h-[400px] bg-cover bg-center relative"
      >
        <div className="bg-black absolute inset-0 opacity-40"></div>
        <Fade triggerOnce={true} top>
          <div className="text-center text-white absolute inset-0 grid">
            <div className="my-auto">
              <h6 className="text-xs">IN LEIPZIG ZUHAUSE</h6>
              <h1 className="text-3xl my-4 md:text-4xl font-bold">{title}</h1>
              <p className="mt-10 w-[80%] md:w-[50%] mx-auto">
                Bei Schrankdesign.de produzieren wir nachhaltig und qualitativ
                hochwertige Möbel und das direkt in Leipzig .
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
              src="/images/quality/single_quality_images/german.webp"
              alt=""
              className="rounded-2xl image-zoom"
            />
          </div>
          <div className="p-5 my-auto">
            <h4 className="text-3xl md:text-4xl font-semibold">
              Direkt aus Leipzig
            </h4>
            <p className="mt-2 md:mt-5 leading-relaxed md:leading-loose">
              Bei Schrankdesign.de sind wir stolz darauf, dass alle unsere Möbel
              in Deutschland hergestellt werden. Durch die Verwendung von
              hochwertigen Materialien und die Arbeit unseres gut ausgebildeten
              Personals können wir sicherstellen, dass unsere Produkte von
              höchster Qualität sind. Ein großer Vorteil unserer Produktion in
              Leipzig ist, dass wir die Umweltbelastung durch kurze
              Transportwege reduzieren können. Im Gegensatz zu importierten
              Möbeln müssen unsere Produkte nicht Tausende von Kilometern
              zurücklegen, bevor sie bei unseren Kunden ankommen. Dies spart
              nicht nur Energie, sondern reduziert auch die Emissionen, die
              durch den Transport verursacht werden.
            </p>
          </div>
        </div>
      </Zoom>
      {/* tools and cars icon banner */}
      <div className="bg-[#F5F5F5] mt-10 md:p-5 md:py-7">
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* --------------------------Desktop Icons----------------------------- */}
          {germanIcons &&
            germanIcons.map((item) => (
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
            {germanIcons &&
              germanIcons.map((item) => (
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
      {/* Three Box Section */}
      <div>
        <div className="lg:w-[90%] mx-auto py-5 p-10">
          <div className="text-center">
            <div>
              <h1 className="my-5 font-bold text-2xl md:text-3xl lg:text-5xl">
                Handwerk & Moderne Fertigung
              </h1>
            </div>
          </div>
          <Fade triggerOnce={true} bottom>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-5 md:mt-10">
              <div className="mt-4 md:mt-0">
                <img
                  src="/images/quality/single_quality_images/german_1.webp"
                  alt=""
                  className="image-zoom rounded-2xl"
                />
                <div className="flex mt-5 mb-3">
                  <h6 className="mx-auto text-2xl font-semibold">
                    Hochwertiges Material
                  </h6>
                </div>
                <p className="text-gray-700 leading-relaxed text-base w-[90%] mx-auto">
                  Durch die Verwendung von Markenbeschlägen wie Blum und Hettich
                  oder Plattenmaterialien von Kaindl, können wir dir die
                  höchstmögliche Qualität an Möbeln bieten. Und das zu einem
                  Spitzen Preis.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <img
                  src="/images/quality/single_quality_images/german_2.webp"
                  alt=""
                  className="image-zoom rounded-2xl"
                />
                <div className="flex mt-5 mb-3">
                  <h6 className="mx-auto text-2xl font-semibold">
                    Echte Handarbeit
                  </h6>
                </div>
                <p className="text-gray-700 leading-relaxed text-base w-[90%] mx-auto">
                  Unsere gut ausgebildeten Mitarbeiter sorgen für den letzten
                  Schliff deines Möbels, bevor unser Meister sie einer
                  abschließenden Qualitätskontrolle unterzieht. Erst danach
                  verlässt dein Möbel unser Werk.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <img
                  src="/images/quality/single_quality_images/german_3.webp"
                  alt=""
                  className="image-zoom rounded-2xl"
                />
                <div className="flex mt-5 mb-3">
                  <h6 className="mx-auto text-2xl font-semibold">
                    Moderne Fertigung
                  </h6>
                </div>
                <p className="text-gray-700 leading-relaxed text-base w-[90%] mx-auto">
                  Dank unserer hochmodernen Fertigungstechnologie und gut
                  ausgerüsteten Produktionsstätte sind wir in der Lage,
                  gleichbleibend höchste Qualität zu liefern und das zu einem
                  unschlagbaren Preis.
                </p>
              </div>
            </div>
          </Fade>
        </div>
      </div>
      {/* ----------------------------Bottom Products------------------------ */}
      <BottomProducts />
    </>
  );
};

export default GermanComponent;
