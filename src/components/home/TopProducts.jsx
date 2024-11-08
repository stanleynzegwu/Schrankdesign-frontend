// import React from "react";
import ProductTile from "../products/ProductTile";
const productsData = [
  {
    id: 0,
    images: {
      default: "/images/home/products/01.webp",
      hover: "/images/home/products/11.webp",
    },
    name: "Kleiderschrank (K+G+K)",

    rating: 5,
    subtitle: "5 Bewertungen",
    dimensions: {
      min: "130cm",
      max: "260cm",
    },
    price: "830.00",
  },
  {
    id: 1,
    images: {
      default: "/images/home/products/02.webp",
      hover: "/images/home/products/22.webp",
    },
    name: "Kleiderschrank (K+G)",
    rating: 5,
    subtitle: "7 Bewertungen",
    dimensions: {
      min: "100cm",
      max: "190cm",
    },
    price: "635.00",
  },
  {
    id: 2,
    images: {
      default: "/images/home/products/03.webp",
      hover: "/images/home/products/33.webp",
    },
    name: "Kleiderschrank (K)",
    rating: 5,
    subtitle: "7 Bewertungen",
    dimensions: {
      min: "30cm",
      max: "70cm",
    },
    price: "370.00",
  },
  {
    id: 3,
    images: {
      default: "/images/home/products/04.webp",
      hover: "/images/home/products/44.webp",
    },
    name: `Designer Lowboard "Dante"`,
    rating: 3,
    subtitle: "",
    dimensions: {
      min: "00cm",
      max: "70cm",
    },
    price: "370.00",
  },
  {
    id: 4,
    images: {
      default: "/images/home/products/05.webp",
      hover: "/images/home/products/55.webp",
    },
    name: `Designer Lowboard "Dante"`,
    rating: 4,
    subtitle: "",
    dimensions: {
      min: "60cm",
      max: "70cm",
    },
    price: "370.00",
  },
  {
    id: 5,
    images: {
      default: "/images/home/products/06.webp",
      hover: "/images/home/products/66.webp",
    },
    name: `Designer Lowboard "Dante"`,
    rating: 3,
    subtitle: "",
    dimensions: {
      min: "60cm",
      max: "70cm",
    },
    price: "370.00",
  },
  {
    id: 6,
    images: {
      default: "/images/home/products/07.webp",
      hover: "/images/home/products/77.webp",
    },
    name: `Designer Lowboard "Dante"`,
    rating: 2,
    subtitle: "",
    dimensions: {
      min: "60cm",
      max: "70cm",
    },
    price: "570.00",
  },
  {
    id: 7,
    images: {
      default: "/images/home/products/08.webp",
      hover: "/images/home/products/88.webp",
    },
    name: `Designer Lowboard "Dante"`,
    rating: 1,
    subtitle: "",
    dimensions: {
      min: "150cm",
      max: "670cm",
    },
    price: "1670.00",
  },
  {
    id: 8,
    images: {
      default: "/images/home/products/09.webp",
      hover: "/images/home/products/99.webp",
    },
    name: `Designer Lowboard"`,
    rating: 0,
    subtitle: "",
    dimensions: {
      min: "60cm",
      max: "70cm",
    },
    price: "570.00",
  },
];
const TopProducts = () => {
  return (
    <>
      <div className="my-4 mt-5 md:mt-14 bg-white">
        <h1 className="mx-auto w-max font-bold text-2xl md:text-3xl lg:text-5xl text-black">
          Designermöbel nach Maß
        </h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 w-[90%] mx-auto mt-5 text-black">
          {productsData &&
            productsData.map((item) => (
              <ProductTile
                key={item?.id}
                id={item?.id}
                defaultImg={item?.images?.default}
                hoverImg={item?.images?.hover}
                name={item?.name}
                rating={item?.rating}
                subtitle={item?.subtitle}
                minDimension={item?.dimensions?.min}
                maxDimension={item?.dimensions?.max}
                price={item?.price}
                buttonText="jetzt konfigurieren"
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default TopProducts;
