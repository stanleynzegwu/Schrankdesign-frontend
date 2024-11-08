import Layout from "../../Layouts/Layout";
import Slider from "react-slick";
import { useState } from "react";
import { useParams } from "react-router";
import IconStar from "/images/products/star.svg?url";
import ProductReviews from "../../components/products/ProductReviews";
import ThirdReviews from "../../components/home/ThirdReviews";
import BottomProducts from "../../components/common/BottomProducts";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";

const forbDecor = [
  {
    id: 0,

    img: "/images/products/detail_product/color_icons/1.png",
    title: "Image 1",
  },
  {
    id: 1,

    img: "/images/products/detail_product/color_icons/2.png",
    title: "Image 2",
  },
  {
    id: 2,

    img: "/images/products/detail_product/color_icons/3.png",
    title: "Image 3",
  },
  {
    id: 3,

    img: "/images/products/detail_product/color_icons/4.png",
    title: "Image 4",
  },
  {
    id: 4,

    img: "/images/products/detail_product/color_icons/5.png",
    title: "Image 5",
  },
  {
    id: 5,

    img: "/images/products/detail_product/color_icons/6.png",
    title: "Image 6",
  },
  {
    id: 6,

    img: "/images/products/detail_product/color_icons/7.png",
    title: "Image 7",
  },
  {
    id: 7,

    img: "/images/products/detail_product/color_icons/8.png",
    title: "Image 8",
  },
  {
    id: 8,

    img: "/images/products/detail_product/color_icons/9.png",
    title: "Image 9",
  },
  {
    id: 9,

    img: "/images/products/detail_product/color_icons/10.png",
    title: "Image 10",
  },
  {
    id: 10,

    img: "/images/products/detail_product/color_icons/11.png",
    title: "Image 11",
  },
];
const reviewsData = [
  {
    id: 0,
    stars: 5,
    date: "12/17/2022",
    name: "Sabine",
    title: "Maßgeschneiderter Schrank nach meinen Wünschen",
    description:
      "Mein maßgefertigter Schrank ist genau das, was ich mir gewünscht habe. Der Online-Konfigurator war leicht zu bedienen und die Qualität ist hervorragend. Ich werde diesen Service auf jeden Fall weiterempfehlen.",
  },
  {
    id: 1,
    stars: 5,
    date: "09/14/2022",
    name: "Matteo",
    title: "Einfach und effektiv!",
    description:
      "Tolle Erfahrung von Anfang bis Ende. Der Online-Konfigurator war einfach zu bedienen und die Lieferung erfolgte ohne Probleme. Die Qualität der Möbel ist ausgezeichnet. Ich bin wirklich beeindruckt!",
  },
  {
    id: 2,
    stars: 5,
    date: "06/02/2022",
    name: "Michael",
    title: "Perfekter Schrank für unser Schlafzimmer",
    description:
      "Endlich ein Schlafzimmerschrank, der perfekt zu uns passt. Der Online-Konfigurator war einfach zu bedienen und das Ergebnis ist fantastisch. Unser Schrank ist ein echter Hingucker!",
  },
  {
    id: 3,
    stars: 5,
    date: "08/09/2021",
    name: "Andrei",
    title: "Maßgefertigte Einbaumöbel fürs Wohnzimmer",
    description:
      "Ich habe maßgefertigte Einbaumöbel für mein Wohnzimmer bestellt, und ich könnte nicht zufriedener sein. Der Online-Konfigurator war einfach zu bedienen, und die Lieferung und Montage verliefen problemlos. Mein Wohnzimmer ist nun perfekt!",
  },
  {
    id: 4,
    stars: 5,
    date: "07/02/2021",
    name: "Gabriel",
    title: "Beeindruckend",
    description:
      "Wow, ich bin beeindruckt! Mein Schrank passt perfekt in mein Zimmer. Der Online-Konfigurator war kinderleicht, die Lieferung schnell und problemlos. Super!",
  },
  {
    id: 5,
    stars: 5,
    date: "07/02/2021",
    name: "Gabriel",
    title: "Beeindruckend",
    description:
      "Wow, ich bin beeindruckt! Mein Schrank passt perfekt in mein Zimmer. Der Online-Konfigurator war kinderleicht, die Lieferung schnell und problemlos. Super!",
  },
];

const SingleProduct = () => {
  const parms = useParams();
  const [forbImage, setForbImage] = useState();
  const [hoverForbImage, setHoverForbImage] = useState();
  const [desRev, setDesRev] = useState("reviews");

  

  const settings = {
    customPaging: function () {
      return (
        <Link>
          <img
            src="/images/products/detail_product/2.png"
            alt="testing"
            className=""
          />
        </Link>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const generateStars = (e) => {
    const starArray = [];
    for (let i = 0; i < e; i++) {
      starArray.push(
        <span key={i}>
          <ReactSVG  src={IconStar} className="text-yellow-400 fill-yellow-400 mr-1 text-xs h-5 w-5" />
        </span>
      );
    }
    return starArray;
  };

  const generateSmallStars = (e) => {
    const starArray = [];
    const totalStars = 5;

    for (let i = 0; i < totalStars; i++) {
      starArray.push(
        <span key={i}>
          <ReactSVG  src={IconStar}
            className={`text-xs md:mr-1 h-4 w-4 ${
              i < e ? "text-yellow-400 fill-yellow-400" : "text-yellow-400"
            }`}
          />
        </span>
      );
    }

    return starArray;
  };

  return (
    <Layout>
      <div className="w-[95%] mx-auto">
        <div className="grid grid-cols-12">
          {/* Left Section */}
          <div className="col-span-12 lg:col-span-6 single_product_page">
            <div className="">
              <Slider {...settings} className="">
                <div className="w-[50%] ">
                  <img
                    src="/images/products/detail_product/2.png"
                    alt="testing"
                    className=""
                  />
                </div>
                <div className="w-[50%] ">
                  <img
                    src="/images/products/detail_product/3.png"
                    alt="testing"
                    className=""
                  />
                </div>
                <div className="w-[50%] ">
                  <img
                    src="/images/products/detail_product/1.png"
                    alt="testing"
                    className=""
                  />
                </div>
              </Slider>
            </div>
          </div>
          {/* Center Section */}
          <div className="col-span-12 lg:col-span-1"></div>
          {/* Right Section */}
          <div className="col-span-12 lg:col-span-5 shadow-2xl mt-20 lg:mt-0">
            <div className="p-5">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
                Kleiderschrank (K+G+K)
              </h1>
            </div>
            {/* Banner Row */}
            <div className="my-2 py-3 bg-[#EEEEEE] flex items-center">
              <div className="rounded-full px-2 ml-5 text-white bg-[#5A8560] w-max">
                1
              </div>
              <div className="ml-2"> Maße</div>
            </div>
            {/* Three Dropdowns */}
            <div className="p-2">
              <div className="grid mt-1 gap-x-4 grid-cols-9 px-5 py-2">
                <div className="col-span-1 text-start">
                  <h6 className="text-gray-600">Breite</h6>
                </div>
                <div className="col-span-7">
                  <select
                    name="floating_subject"
                    id="floating_subject"
                    className="block h-full ml-4 px-4 py-2 w-full text-sm text-gray-900 bg-transparent border rounded border-gray-400 appearance-none active:border-blue-500 focus:outline-blue-500 focus:ring-0 peer"
                    placeholder=" "
                    required
                  >
                    <option value="130">130 cm</option>
                    <option value="131">131 cm</option>
                    <option value="132">132 cm</option>
                    <option value="133">133 cm</option>
                    <option value="134">134 cm</option>
                    <option value="135">135 cm</option>
                    <option value="136">136 cm</option>
                  </select>
                </div>
              </div>
              <div className="grid mt-1 gap-x-4 grid-cols-9 px-5 py-2">
                <div className="col-span-1 text-start">
                  <h6 className="text-gray-600">Tiefe</h6>
                </div>
                <div className="col-span-7">
                  <select
                    name="floating_subject"
                    id="floating_subject"
                    className="block h-full ml-4 px-4 py-2 w-full text-sm text-gray-900 bg-transparent border rounded border-gray-400 appearance-none active:border-blue-500 focus:outline-blue-500 focus:ring-0 peer"
                    placeholder=" "
                    required
                  >
                    <option value="40">40 cm</option>
                    <option value="41">41 cm</option>
                    <option value="42">42 cm</option>
                    <option value="43">43 cm</option>
                    <option value="44">44 cm</option>
                    <option value="45">45 cm</option>
                    <option value="46">46 cm</option>
                  </select>
                </div>
              </div>

              <div className="grid mt-1 gap-x-4 grid-cols-9 px-5 py-2">
                <div className="col-span-1 text-start">
                  <h6 className="text-gray-600">Hohe</h6>
                </div>
                <div className="col-span-7">
                  <select
                    name="floating_subject"
                    id="floating_subject"
                    className="block h-full ml-4 px-4 py-2 w-full text-sm text-gray-900 bg-transparent border rounded border-gray-400 appearance-none active:border-blue-500 focus:outline-blue-500 focus:ring-0 peer"
                    placeholder=" "
                    required
                  >
                    <option value="200">200 cm</option>
                    <option value="201">201 cm</option>
                    <option value="202">202 cm</option>
                    <option value="203">203 cm</option>
                    <option value="204">204 cm</option>
                    <option value="205">205 cm</option>
                    <option value="206">206 cm</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Banner Row */}
            <div className="my-2 py-3 bg-[#EEEEEE] flex items-center">
              <div className="rounded-full px-2 ml-5 text-white bg-[#5A8560] w-max">
                2
              </div>
              <div className="ml-2"> Korpus</div>
            </div>
            <div className="px-6 py-3">
              <h6 className="text-gray-600">Farb-Dekore</h6>
              <div className="flex flex-wrap gap-4">
                {forbDecor &&
                  forbDecor.map((item) => (
                    <div key={item?.id} className={`mt-5 w-12 relative`}>
                      {hoverForbImage === item?.id && (
                        <div
                          className={`${
                            hoverForbImage === item?.id
                              ? "visible"
                              : "invisible"
                          } absolute top-[-200px] left-0 w-44 h-48 border-4 rounded-md bg-white p-2 z-10`}
                        >
                          <hr />
                          <img
                            src={`${item?.img}`}
                            alt=""
                            className="w-full h-full rounded-md"
                          />
                        </div>
                      )}
                      {/* <div className="w-24 h-24 border-4 rounded-md"></div> */}
                      <img
                        src={`${item?.img}`}
                        alt=""
                        onClick={() => setForbImage(item?.id)}
                        onMouseEnter={() => setHoverForbImage(item?.id)}
                        onMouseLeave={() => setHoverForbImage(null)}
                        className={`${
                          item?.id === forbImage &&
                          "ring-4 ring-black p-0.5 border-none"
                        } rounded cursor-pointer`}
                      />
                    </div>
                  ))}
              </div>
            </div>
            <Link className="flex justify-center mt-5" to={`/product/${parms.slug}/${parms.configId}`}>
            {/* <Link className="flex justify-center mt-5" to={`/ext/config/${parms.slug}/${parms.configId}`}> */}
              <Button
                // onClick={() => GetConfiguratureFunc()}
                variant="contained"
              >
                Configure
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ---------------------Description and Reviews---------------------- */}
      <div className="w-[90%] md:w-[60%] lg:w-[65%] mx-auto md:mt-40">
        {/* Description Reviews Toggle */}
        <div className="flex mt-10 gap-16">
          <div className="cursor-pointer" onClick={() => setDesRev("reviews")}>
            <h2
              className={`${
                desRev === "reviews" ? "text-gray-900" : "text-gray-400"
              } text-sm font-semibold uppercase tracking-widest`}
            >
              BEWERTUNGEN (5)
            </h2>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setDesRev("description")}
          >
            <h2
              className={`
            ${desRev === "description" ? "text-gray-900" : "text-gray-400"}
            text-sm font-semibold uppercase tracking-widest`}
            >
              BESCHREIBUNG
            </h2>
          </div>
        </div>
        {/* Description Reviews Toggle Bar*/}
        <div className="flex my-4 gap-16 bg-gray-300">
          <div
            className={`
          ${desRev === "reviews" ? "visible" : "invisible"}
          bg-black h-[1px] cursor-pointer`}
          >
            <h2 className="text-sm font-semibold uppercase tracking-widest invisible">
              BEWERTUNGEN (5)
            </h2>
          </div>
          <div
            className={`${
              desRev === "description" ? "visible" : "invisible"
            } bg-black h-[1px] cursor-pointer`}
          >
            <h2 className="text-sm font-semibold uppercase tracking-widest invisible">
              BESCHREIBUNG
            </h2>
          </div>
        </div>
        {desRev === "reviews" && (
          <>
            <div className="flex">
              <div className="flex">{generateStars(5)}</div>{" "}
              <p className="tracking-wider">5 Bewertungen</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-4 lg:gap-y-0 mt-4">
              {/* First coloumn */}
              <div className="grid place-content-center lg:border-r-2 mt-2">
                <div className="flex">
                  <div className="flex">{generateStars(5)}</div>{" "}
                  <p className="tracking-wider">5.00 von 5</p>
                </div>
                <p className="lg:mt-1">Basierend auf 5 Bewertungen</p>
              </div>
              {/* Second coloumn */}
              <div className="lg:border-r-2 mt-2">
                <h1 className="text-xl md:text-2xl lg:text-2xl font-bold text-center">
                  Kunden Bewertungen
                </h1>
                <div className="my-5">
                  <div className="grid grid-cols-8 gap-x-4 items-center">
                    {/* 1st row */}
                    <div className="col-span-2 lg:col-span-3 items-center">
                      <div className="flex">{generateSmallStars(5)}</div>
                    </div>
                    <div className="col-span-5 lg:col-span-4 items-center">
                      <div className="bg-[#5a8560] h-3"></div>
                    </div>
                    <div className="col-span-1  items-center text-gray-500">
                      5
                    </div>
                    {/* 2nd row */}
                    <div className="col-span-2 lg:col-span-3 items-center">
                      <div className="flex">{generateSmallStars(4)}</div>
                    </div>
                    <div className="col-span-5 lg:col-span-4 items-center">
                      <div className="bg-[#EFEFEF] h-3"></div>
                    </div>
                    <div className="col-span-1  items-center text-gray-500">
                      0
                    </div>
                    {/* 3rd row */}
                    <div className="col-span-2 lg:col-span-3 items-center">
                      <div className="flex">{generateSmallStars(3)}</div>
                    </div>
                    <div className="col-span-5 lg:col-span-4 items-center">
                      <div className="bg-[#EFEFEF] h-3"></div>
                    </div>
                    <div className="col-span-1  items-center text-gray-500">
                      0
                    </div>
                    {/* 4th row */}
                    <div className="col-span-2 lg:col-span-3 items-center">
                      <div className="flex">{generateSmallStars(2)}</div>
                    </div>
                    <div className="col-span-5 lg:col-span-4 items-center">
                      <div className="bg-[#EFEFEF] h-3"></div>
                    </div>
                    <div className="col-span-1  items-center text-gray-500">
                      0
                    </div>
                    {/* 5th row */}
                    <div className="col-span-2 lg:col-span-3 items-center">
                      <div className="flex">{generateSmallStars(1)}</div>
                    </div>
                    <div className="col-span-5 lg:col-span-4 items-center">
                      <div className="bg-[#EFEFEF] h-3"></div>
                    </div>
                    <div className="col-span-1  items-center text-gray-500">
                      0
                    </div>
                  </div>
                </div>
              </div>
              {/* Third Coloumn */}
              <div className="grid place-content-center mt-2">
                <button className="site-button text-xs px-2 py-4 hover:px-3">
                  Schreiben Sie eine Bewertung
                </button>
              </div>
            </div>
            {/* Dropdown Filter */}
            <hr className="my-2" />
            <div className="flex">
              <select
                id="filter"
                className="text-base rounded-lg block p-2.5 focus:outline-none"
              >
                <option className="text-base p-2" value="">
                  Neueste
                </option>
                <option className="text-base p-2" defaultValue="">
                  Höchste Bewertung
                </option>
                <option className="text-base p-2" value="">
                  Niedrigste Bewertung
                </option>
                <option className="text-base p-2" value="">
                  Nur Bilder
                </option>
                <option className="text-base p-2" value="">
                  Bilder zuerst
                </option>
                <option className="text-base p-2" value="">
                  Videos zuerst
                </option>
                <option className="text-base p-2" value="">
                  Am hilfreichsten
                </option>
              </select>
            </div>
            <hr className="my-2" />
            {/* Reviews */}
            {reviewsData &&
              reviewsData.map(
                ({ id, stars, date, name, title, description }) => (
                  <ProductReviews
                    key={id}
                    stars={stars}
                    date={date}
                    name={name}
                    title={title}
                    description={description}
                  />
                )
              )}
            {/* Reviews Slider */}
            {/* Bottom Products */}
          </>
        )}

        {desRev === "description" && (
          <div className="p-4">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold">
              Ihr maßgeschneiderter Kleiderschrank: Individuell, stilvoll und
              funktional
            </h1>
            <div className="my-4 mt-6">
              <h2 className="italic font-bold text-lg lg:text-xl">
                Personalisierung nach Maß
              </h2>
              <p className="mt-4 tracking-wider leading-relaxed">
                Erstellen Sie Ihren maßgeschneiderten Kleiderschrank, der
                perfekt zu Ihrem Stil, Ihren Anforderungen und Ihrem Raum passt.
                Wählen Sie aus einer breiten Palette von Farben, Oberflächen und
                Größen, um Ihren persönlichen Traumkleiderschrank zu gestalten.
              </p>
            </div>
            <div className="my-4 mt-6">
              <h2 className="italic font-bold text-lg lg:text-xl">
                Beständige Qualität
              </h2>
              <p className="mt-4 tracking-wider leading-relaxed">
                Unser maßgeschneiderter Kleiderschrank besticht durch seine
                hochwertige Verarbeitung und die Verwendung von erstklassigen
                Materialien, die Ihnen Langlebigkeit und Stabilität garantieren.
              </p>
            </div>
            <div className="my-4 mt-6">
              <h2 className="italic font-bold text-lg lg:text-xl">
                Anpassungsfähige Innenraumgestaltung
              </h2>
              <p className="mt-4 tracking-wider leading-relaxed">
                Organisieren Sie Ihren Stauraum nach Ihren Wünschen. Ob
                Kleiderstangen, Schubladen oder Fachböden – Sie entscheiden, wie
                Sie Ihre Kleidung am besten unterbringen möchten.
              </p>
            </div>
            <div className="my-4 mt-6">
              <h2 className="italic font-bold text-lg lg:text-xl">
                Elegantes Design
              </h2>
              <p className="mt-4 tracking-wider leading-relaxed">
                Der maßgeschneiderte Kleiderschrank ist nicht nur funktional,
                sondern auch ein stilvoller Blickfang in Ihrem Schlafzimmer.
                Sein zeitloses Design passt sich nahtlos an jede Einrichtung an
                und verleiht Ihrem Zuhause einen Hauch von Klasse.
              </p>
            </div>
          </div>
        )}
      </div>
      {desRev === "reviews" && <ThirdReviews />}
      <BottomProducts />
    </Layout>
  );
};

export default SingleProduct;
