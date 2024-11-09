// import React, { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";
// import "swiper/css/grid";
// import { FreeMode, Navigation, Thumbs } from "swiper/modules";
// import { Swiper as SwiperClass } from "swiper/types";
// import { Grid, Pagination } from "swiper/modules";
// interface DetailImagProps {
//   img: string[];
// }

// const DetailImag: React.FC<DetailImagProps> = ({ img }) => {
//   const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
//   const detailImg = [
//     "/images/productimage/detail/1.png",
//     "/images/productimage/detail/2.png",
//     "/images/productimage/detail/3.png",
//     "/images/productimage/detail/4.png",
//     "/images/productimage/detail/5.png",
//     "/images/productimage/detail/6.png",
//     "/images/productimage/detail/7.png",
//     "/images/productimage/detail/8.png",
//   ];

//   return (
//     <>
//       <main className="main-swiper-content grid gap-4">
//         <div className="grid grid-cols-3 gap-4">
//           <div className="col-span-2">
//             <div className="image-container">
//               <img
//                 src={img[0] ? img[0] : detailImg[0]}
//                 alt={`Thumbnail`}
//                 className="zoom-image object-cover"
//               />
//             </div>
//           </div>
//           <div className="col-span-1 grid gap-4">
//             <div className="image-container1">
//               <img
//                 src={img[1] ? img[1] : detailImg[1]}
//                 alt={`Thumbnail`}
//                 className="zoom-image object-cover"
//               />
//             </div>
//             <div className="image-container">
//               <img
//                 src={img[2] ? img[2] : detailImg[2]}
//                 alt={`Thumbnail`}
//                 className="zoom-image object-cover"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="grid grid-cols-2 gap-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div className="image-container">
//               <img
//                 src={img[3] ? img[3] : detailImg[3]}
//                 alt={`Thumbnail`}
//                 className="zoom-image object-cover"
//               />
//             </div>
//             <div className="image-container">
//               <img
//                 src={img[4] ? img[4] : detailImg[4]}
//                 alt={`Thumbnail`}
//                 className="zoom-image object-cover"
//               />
//             </div>
//             <div className="image-container">
//               <img
//                 src={img[5] ? img[5] : detailImg[5]}
//                 alt={`Thumbnail`}
//                 className="zoom-image object-cover"
//               />
//             </div>
//             <div className="image-container">
//               <img
//                 src={img[6] ? img[6] : detailImg[6]}
//                 alt={`Thumbnail`}
//                 className="zoom-image object-cover"
//               />
//             </div>
//           </div>
//           <div>
//             <div className="image-container">
//               <img
//                 src={img[7] ? img[7] : detailImg[7]}
//                 alt={`Thumbnail`}
//                 className="zoom-image object-cover"
//               />
//             </div>
//           </div>
//         </div>
//       </main>
//       <main className="sub-swiper-content">
//         <Swiper
//           loop={true}
//           spaceBetween={10}
//           // navigation={true}
//           thumbs={{ swiper: thumbsSwiper ? thumbsSwiper : undefined }}
//           modules={[FreeMode, Thumbs]}
//           className="mySwiper2"
//         >
//           {detailImg.map((src, index) => (
//             <SwiperSlide key={index}>
//               <div className="image-container">
//                 <img src={src} alt={`Thumbnail ${index + 1}`} className="zoom-image" />
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//         <Swiper
//           // onSwiper={setThumbsSwiper}
//           loop={true}
//           spaceBetween={10}
//           slidesPerView={4}
//           freeMode={true}
//           watchSlidesProgress={true}
//           modules={[FreeMode, Navigation, Thumbs]}
//           className="mySwiper"
//         >
//           {detailImg.map((src, index) => (
//             <SwiperSlide key={index}>
//               <div className="image-container">
//                 <img
//                   src={img[index] ? img[index] : src}
//                   alt={`Thumbnail ${index + 1}`}
//                   className="zoom-image"
//                 />
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </main>
//     </>
//   );
// };

// export default DetailImag;

/////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";
// import "swiper/css/grid";
// import { FreeMode, Navigation, Thumbs } from "swiper/modules";
// import { Swiper as SwiperClass } from "swiper/types";
// import { Grid, Pagination } from "swiper/modules";
// interface DetailImagProps {
//   img: string[];
//   product: {
//     categoryName: string;
//     name: string;
//     baseColor: string;
//   };
//   imagesIndex: number;
// }
// const productColor = {
//   1: "Eich-Kasch",
//   2: "Weiß",
//   3: "Kaschmir",
//   4: "Taupe",
//   5: "Magnolia",
//   6: "Eiche-Fu",
//   7: "Graphit",
//   8: "Achatgrau",
//   9: "B-Green",
//   10: "Eiche-Fu",
//   11: "Eiche",
//   12: "Schwarz",
//   13: "Nuss-Fu",
//   14: "B-Blue",
//   15: "Acai",
//   16: "Cameroon",
// };
// const imgBaseUrl = "https://storage.googleapis.com/schrankdesign-uploads";

// const DetailImag: React.FC<DetailImagProps> = ({ img, product, imagesIndex }) => {
//   console.log(product);
//   const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
//   const detailImg = [
//     "/images/productimage/detail/1.png",
//     "/images/productimage/detail/2.png",
//     "/images/productimage/detail/3.png",
//     "/images/productimage/detail/4.png",
//     "/images/productimage/detail/5.png",
//     "/images/productimage/detail/6.png",
//     "/images/productimage/detail/7.png",
//     "/images/productimage/detail/8.png",
//   ];

//   return (
//     <>
//       <div className="w-full grid grid-rows-7 grid-cols-2 gap-2 lg:gap-4">
//         {/* Normal-Picture */}
//         <div className="w-full row-span-4 col-span-2 grid grid-cols-3 grid-rows-2 gap-2 lg:gap-4">
//           <img
//             // src={img[0] ? img[0] : detailImg[0]}
//             src={`${imgBaseUrl}/Produktbilder/${product?.categoryName}/${
//               product?.name
//             }/Normal-Picture/${product?.name}_${
//               imagesIndex ? productColor[imagesIndex] : product?.baseColor
//             }-1.avif`}
//             alt={`Thumbnail`}
//             className="col-span-2 row-span-2 object-cover"
//           />
//           <img
//             src={`${imgBaseUrl}/Produktbilder/${product?.categoryName}/${
//               product?.name
//             }/Normal-Picture/${product?.name}_${
//               imagesIndex ? productColor[imagesIndex] : product?.baseColor
//             }-2.avif`}
//             alt={`Thumbnail`}
//             className="col-span-1 row-span-1 object-cover"
//           />
//           <img
//             src={`${imgBaseUrl}/Produktbilder/${product?.categoryName}/${
//               product?.name
//             }/Normal-Picture/${product?.name}_${
//               imagesIndex ? productColor[imagesIndex] : product?.baseColor
//             }-3.avif`}
//             alt={`Thumbnail`}
//             className="col-span-1 row-span-1 object-cover"
//           />
//         </div>

//         {/* Feet */}
//         <div className="w-full row-span-3 col-span-2 grid grid-cols-4 grid-rows-2 gap-2 lg:gap-4">
//           <div className="col-span-2 row-span-2 grid grid-cols-2 grid-rows-2 gap-2 lg:gap-4">
//             <img
//               src={img[0] ? img[0] : detailImg[0]}
//               alt={`Thumbnail`}
//               className="col-span-1 row-span-1 "
//             />
//             <img
//               src={img[0] ? img[0] : detailImg[0]}
//               alt={`Thumbnail`}
//               className="col-span-1 row-span-1 "
//             />
//             <img
//               src={img[0] ? img[0] : detailImg[0]}
//               alt={`Thumbnail`}
//               className="col-span-1 row-span-1"
//             />
//             <img
//               src={img[0] ? img[0] : detailImg[0]}
//               alt={`Thumbnail`}
//               className="col-span-1 row-span-1 "
//             />
//           </div>

//           <img
//             src={img[0] ? img[0] : detailImg[0]}
//             alt={`Thumbnail`}
//             className="col-span-2 row-span-2 bg-yellow-200"
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default DetailImag;
//////////////////////////////////////////////////////////////////////

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/grid";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper/types";
import { Grid, Pagination } from "swiper/modules";
interface DetailImagProps {
  img: string[];
  product: {
    categoryName: string;
    name: string;
    baseColor: string;
  };
  imagesIndex: number;
  pageLoading: boolean;
}
const productColor = {
  1: "Eich-Kasch",
  2: "Weiß",
  3: "Kaschmir",
  4: "Taupe",
  5: "Magnolia",
  6: "Graph-Eich-Fu",
  7: "Graphit",
  8: "Achatgrau",
  9: "B-Green",
  10: "Eiche-Fu",
  11: "Eiche",
  12: "Schwarz",
  13: "Nuss-Fu",
  14: "B-Blue",
  15: "Acai",
  16: "Cameroon",
};
const imgBaseUrl = "https://storage.googleapis.com/schrankdesign-uploads";

const DetailImag: React.FC<DetailImagProps> = ({ product, imagesIndex, pageLoading }) => {
  //   console.log(product);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const loading_img = "/images/loadingImg.jpg";
  const detailImg = [
    "/images/productimage/detail/1.png",
    "/images/productimage/detail/2.png",
    "/images/productimage/detail/3.png",
    "/images/productimage/detail/4.png",
    "/images/productimage/detail/5.png",
    "/images/productimage/detail/6.png",
    "/images/productimage/detail/7.png",
    "/images/productimage/detail/8.png",
  ];

  return (
    <>
      <div className="lg:px-10 w-full grid grid-rows-7 grid-cols-2 gap-2 lg:gap-4">
        {/* Normal-Picture */}
        <div className="w-full row-span-4 col-span-2 grid grid-cols-3 grid-rows-2 gap-2 lg:gap-4">
          <div className="overflow-hidden col-span-2 row-span-2">
            <img
              src={
                pageLoading
                  ? loading_img
                  : `${imgBaseUrl}/Produktbilder/${product?.categoryName}/${
                      product?.name
                    }/Normal-Picture/${product?.name}_${
                      imagesIndex ? productColor[imagesIndex] : product?.baseColor
                    }-1.avif`
              }
              alt={`Thumbnail`}
              className="w-full h-full transition-transform duration-300 ease-in-out object-cover hover:scale-105"
            />
          </div>
          <div className="overflow-hidden col-span-1 row-span-1">
            <img
              src={
                pageLoading
                  ? loading_img
                  : `${imgBaseUrl}/Produktbilder/${product?.categoryName}/${
                      product?.name
                    }/Normal-Picture/${product?.name}_${
                      imagesIndex ? productColor[imagesIndex] : product?.baseColor
                    }-2.avif`
              }
              alt={`Thumbnail`}
              className="w-full h-full transition-transform duration-300 ease-in-out object-cover hover:scale-105"
            />
          </div>
          <div className="overflow-hidden col-span-1 row-span-1">
            <img
              src={
                pageLoading
                  ? loading_img
                  : `${imgBaseUrl}/Produktbilder/${product?.categoryName}/${
                      product?.name
                    }/Normal-Picture/${product?.name}_${
                      imagesIndex ? productColor[imagesIndex] : product?.baseColor
                    }-3.avif`
              }
              alt={`Thumbnail`}
              className="w-full h-full transition-transform duration-300 ease-in-out object-cover hover:scale-105"
            />
          </div>
        </div>

        {/* Feet */}
        <div className="w-full row-span-3 col-span-2 grid grid-cols-4 grid-rows-2 gap-2 lg:gap-4">
          <div className="col-span-2 row-span-2 grid grid-cols-2 grid-rows-2 gap-2 lg:gap-4">
            <div className="overflow-hidden col-span-1 row-span-1">
              <img
                src={detailImg[0]}
                alt={`Thumbnail`}
                className="w-full h-full transition-transform duration-300 ease-in-out object-cover hover:scale-105"
              />
            </div>
            <div className="overflow-hidden col-span-1 row-span-1">
              <img
                src={detailImg[0]}
                alt={`Thumbnail`}
                className="w-full h-full transition-transform duration-300 ease-in-out object-cover hover:scale-105"
              />
            </div>
            <div className="overflow-hidden col-span-1 row-span-1">
              <img
                src={detailImg[0]}
                alt={`Thumbnail`}
                className="w-full h-full transition-transform duration-300 ease-in-out object-cover hover:scale-105"
              />
            </div>
            <div className="overflow-hidden col-span-1 row-span-1">
              <img
                src={detailImg[0]}
                alt={`Thumbnail`}
                className="w-full h-full transition-transform duration-300 ease-in-out object-cover hover:scale-105"
              />
            </div>
          </div>
          <div className="overflow-hidden col-span-2 row-span-2">
            <img
              src={detailImg[0]}
              alt={`Thumbnail`}
              className="w-full h-full transition-transform duration-300 ease-in-out object-cover hover:scale-105 "
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailImag;
