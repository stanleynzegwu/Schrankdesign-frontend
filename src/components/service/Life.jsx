import { Link } from "react-router-dom"
import { Fade, Slide, Zoom } from "react-awesome-reveal"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import BottomProducts from "../common/BottomProducts"

const lifeIcons = [
  {
    id: 0,
    title: "KURZE LIEFERZEIT",
    subtitle:
      "Durch unseren modernen Maschinenpark sind wir in der Lage schnell deine Möbel herzustellen.",
    img: "/images/servicee/single/icons/kurze.avif",
  },
  {
    id: 1,
    title: "NACHHALTIG VERPACKT",
    subtitle:
      "Wir verpacken deine Möbel nachhaltig auf Holzpaletten und recyelten Kunstoffen, schonend für die Umwelt.",
    img: "/images/servicee/single/icons/verpack.webp",
  },
  {
    id: 2,
    title: "SICHER VERPACKT",
    subtitle:
      "Mit unserem sorgfältig gepackten Palettenversand kommen deine Möbel sicher bei dir Zuhause an.",
    img: "/images/servicee/single/icons/sicher.avif",
  },
  {
    id: 3,
    title: "SORGFÄLTIG MONTIERT",
    subtitle:
      "Unser Montageservice gewährleistet dir 100% Sicherheit, dass alles reibungslos verläuft.",
    img: "/images/servicee/single/icons/sorge.webp",
  },
]
const Life = ({ title }) => {
  return (
    <>
      <div className="md:w-[90%] mx-auto p-5">
        <div className="flex">
          <Link to="/">
            <div className="text-gray-600">Start</div>
          </Link>
          <div className="mx-2">/</div>
          <div>{title && title}</div>
        </div>
      </div>
      {/* TopBanner */}
      <div
        style={{
          backgroundImage: `url(${import.meta.env.PUBLIC_URL}/images/servicee/single/liferung.webp)`,
        }}
        className="h-[300px] lg:h-[600px] bg-cover bg-center relative"
      >
        <div className="bg-black absolute inset-0 opacity-30"></div>
        <Fade triggerOnce={true} top>
          <div className="absolute inset-0 grid">
            <div className="my-auto bg-white w-[80%] md:w-[60%] lg:w-[40%] 2xl:w-[30%] mx-auto p-5 lg:p-10 rounded-2xl shadow-2xl">
              <h1 className="text-2xl my-2 md:my-4 md:text-4xl font-bold">
                {title}
              </h1>
              <p className="text-sm md:text-base lg:mt-10 mx-auto">
                Als Kunde hast du die Wahl, das Möbelstück selbst aufzubauen,
                vormontiert geliefert zu bekommen oder einen Montageservice vor
                Ort in Anspruch zu nehmen. Wir unterstützen dich bei deiner
                Entscheidung
              </p>
            </div>
          </div>
        </Fade>
      </div>
      {/* tools and cars icon banner */}
      <div className="bg-[#F5F5F5] md:p-5 md:py-7">
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* --------------------------Desktop Icons----------------------------- */}
          {lifeIcons &&
            lifeIcons.map((item) => (
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
            {lifeIcons &&
              lifeIcons.map((item) => (
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
      <div className="md:w-[90%] mx-auto p-5">
        {/* Three Box Section */}
        <div>
          <div className="lg:w-[95%] mx-auto p-10">
            <div className="text-center">
              <div>
                <h1 className="my-5 font-bold text-2xl md:text-3xl lg:text-5xl">
                  Montageservice
                </h1>
              </div>
            </div>
            <Fade triggerOnce={true} bottom>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-5 md:mt-10">
                <div>
                  <img
                    src="/images/servicee/single/life_1.webp"
                    alt=""
                    className="image-zoom rounded-2xl"
                  />
                  <div className="flex mt-5 mb-3">
                    <h6 className="text-2xl font-semibold">
                      In Einzelteilen geliefert
                    </h6>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base">
                    Du bekommst dein Möbel in Einzelteilen. Diese werden auf
                    einer gut geschützten Palette geliefert und du kannst es
                    dank der beigefügten Anleitung unkompliziert selbst
                    zusammenbauen und montieren.
                  </p>
                </div>
                <div>
                  <img
                    src="/images/servicee/single/life_2.webp"
                    alt=""
                    className="image-zoom rounded-2xl"
                  />
                  <div className="flex mt-5 mb-3">
                    <h6 className="text-2xl font-semibold">
                      Fertig zusammengebaut
                    </h6>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base">
                    Du bekommst dein Möbel bereits komplett zusammengebaut
                    geliefert. Es wird für dich schon bei uns in Leipzig fertig
                    vormontiert und auf einer Palette gut verpackt geliefert.
                  </p>
                </div>
                <div>
                  <img
                    src="/images/servicee/single/life_3.webp"
                    alt=""
                    className="image-zoom rounded-2xl"
                  />
                  <div className="flex mt-5 mb-3">
                    <h6 className="text-2xl font-semibold">
                      Montageservice Vor Ort
                    </h6>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base">
                    Du bekommst dein Möbel in Einzelteilen , es wird aber von
                    einem unserer Montagetechniker bei dir vor Ort montiert.
                    Hierfür werden wir telefonisch einen Termin mit dir
                    vereinbaren
                  </p>
                </div>
              </div>
            </Fade>
          </div>
        </div>
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
            <h6 className="mt-3 text-[#5a8560] text-sm">NACH SKIZZE</h6>
            <div className="font-bold text-lg md:text-2xl mt-2 md:mt-5 md:leading-relaxed text-[#5a8560]">
              Du entscheidest, ob du die Lieferung bis zur ersten Bordsteinkante
              oder bis zum Aufstellungsort wünschst. Wenn du letztere Option
              wählst, bringen wir das Möbelstück bis in deine Wohnung.
            </div>
          </div>
        </Fade>
      </div>
      <div className="md:w-[90%] mx-auto p-5">
        {/* Three Box Section */}
        <div>
          <div className="lg:w-[70%] mx-auto p-10">
            <div className="text-center">
              <div>
                <h1 className="my-5 font-bold text-2xl md:text-3xl lg:text-5xl">
                  Lieferung
                </h1>
              </div>
            </div>
            <Fade triggerOnce={true} bottom>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 mt-5 md:mt-10">
                <div>
                  <img
                    src="/images/servicee/single/life_5.webp"
                    alt=""
                    className="image-zoom rounded-2xl"
                  />
                  <div className="flex mt-5 mb-3">
                    <h6 className="text-2xl font-semibold">
                      Lieferung bis Bordsteinkante
                    </h6>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base">
                    Deine Lieferung wird bis an den Bordstein geliefert und du
                    musst sie dann selbst mit Hilfe einer zweiten Person in
                    deine Wohnung tragen.
                  </p>
                </div>
                <div>
                  <img
                    src="/images/servicee/single/life_6.webp"
                    alt=""
                    className="image-zoom rounded-2xl"
                  />
                  <div className="flex mt-5 mb-3">
                    <h6 className="text-2xl font-semibold">
                      Lieferung bis Aufstellungsort
                    </h6>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base">
                    Wir Liefern bis zum Aufstellungsort . Dabei wird sie mit dem
                    Zweimann-Lieferdienst ausgeliefert und bis in die 4. Etage
                    deines Wohnhauses getragen.
                  </p>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </div>
      {/* Bottom Products */}
      <BottomProducts />
    </>
  )
}

export default Life
