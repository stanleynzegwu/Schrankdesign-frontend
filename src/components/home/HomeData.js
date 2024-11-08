const bannerIcons = [
  {
    id: 0,
    title: "KURZE LIEFERZEIT",
    img: "/images/home/icons_banner_1.avif",
  },
  {
    id: 1,
    title: "BERATUNG VOM TISCHLER",
    img: "/images/home/icons_banner_2.avif",
  },
  {
    id: 2,
    title: "BEZAHLUNG NACH LIEFERUNG",
    img: "/images/home/icons_banner_3.avif",
  },
  {
    id: 3,
    title: "TOP KUNDENBEWERTUNGEN",
    img: "/images/home/icons_banner_4.avif",
  },
];

const reviewsData = [
  {
    id: 0,
    title: "Toller Schrank nach Maß",
    subtitle: "Absolut begeistert!",
    name: "Sofia",
    date: "10/07/2022",
    img: "/images/home/review_1.avif",
    product: "Wardrobe (K+G)",
  },
  {
    id: 1,
    title: "Funktional und stilvoll!",
    subtitle: "Wohnzimmer komplettiert",
    name: "Sabine",
    date: "12/17/2022",
    img: "/images/home/review_2.avif",
    product: " Kleiderschrank (K+G+K) ",
  },
  {
    id: 2,
    title: "Qualität Pur",
    subtitle: "Einfach qualität bis ins",
    name: "Luca",
    date: "04/07/2023",
    img: "/images/home/review_3.avif",
    product: "Wardrobe (K+G)",
  },
  {
    id: 3,
    title: "Einbauschrank nach ",
    subtitle: "Maß",
    name: "Sofia",
    date: "10/07/2022",
    img: "/images/home/review_1.avif",
    product: " Kleiderschrank (K+G+K) ",
  },
  {
    id: 4,
    title: "Funktional und stilvoll!",
    subtitle: "Wohnzimmer komplettiert",
    name: "Sabine",
    date: "12/17/2022",
    img: "/images/home/review_2.avif",
    product: " Kleiderschrank (K+G+K) ",
  },
  {
    id: 5,
    title: "Qualität Pur",
    subtitle: "Einfach qualität bis ins",
    name: "Luca",
    date: "04/07/2023",
    img: "/images/home/review_3.avif",
    product: "Wardrobe (K+G)",
  },
  {
    id: 6,
    title: "Toller Schrank nach Maß",
    subtitle: "Absolut begeistert!",
    name: "Sofia",
    date: "10/07/2022",
    img: "/images/home/review_1.avif",
    product: "Wardrobe (K+G)",
  },
  {
    id: 7,
    title: "Funktional und stilvoll!",
    subtitle: "Wohnzimmer komplettiert",
    name: "Sabine",
    date: "12/17/2022",
    img: "/images/home/review_2.avif",
    product: " Kleiderschrank (K+G+K) ",
  },
  {
    id: 8,
    title: "Qualität Pur",
    subtitle: "Einfach qualität bis ins",
    name: "Luca",
    date: "04/07/2023",
    img: "/images/home/review_3.avif",
    product: "Wardrobe (K+G)",
  },
  {
    id: 9,
    title: "Qualität Pur",
    subtitle: "Einfach qualität bis ins",
    name: "Luca",
    date: "04/07/2023",
  },
];

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
    slug: "kleiderschrank-(k+g+k)",
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
    slug: "kleiderschrank-(k+g)",
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
    slug: "kleiderschrank-(k)",
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
    slug: "designer-lowboard-dante",
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
    slug: "designer-lowboard-dante",
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
    slug: "designer-lowboard-dante",
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
    slug: "designer-lowboard-dante",
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
    slug: "designer-lowboard-dante",
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
    slug: "designer-lowboard",
  },
];

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

export { productsData, reviewsData, bannerIcons, bottomSliderData };
// const storeCart = [
//   {
//     id: "657b777ea204441ca18f8232",
//     name: "Kleiderschrank (K+G+K)",
//     subtitle: "5 Bewertungen",
//     rating: 5,
//     minDimension: "130cm",
//     maxDimension: "260cm",
//     price: 830,
//   },
//   {
//     id: "657b777ea204441ca18f8234",
//     name: "Kleiderschrank (K+G+K)",
//     subtitle: "5 Bewertungen",
//     rating: 5,
//     minDimension: "130cm",
//     maxDimension: "260cm",
//     price: 1000,
//   },
//   {
//     id: "657b777ea204441ca18f8237",
//     name: "Kleiderschrank (K+G+K)",
//     subtitle: "5 Bewertungen",
//     rating: 5,
//     minDimension: "130cm",
//     maxDimension: "260cm",
//     price: 470,
//   },
// ];
