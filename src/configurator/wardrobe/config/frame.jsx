// import React from "react";
// import DetailImag from "../../../components/productDetail/detail.tsx";
// import { Link } from "react-router-dom";

// export default function Frame(props) {
//   // const getColor = {
//   //   '0':'Acai',
//   //   '1':'Achatgrau',
//   //   '2':'B-Blue',
//   //   '3':'B-Green'
//   // }
//   const { imagesIndex, setImagesIndex, detailImg } = props;
//   const productImages = Array.from(
//     { length: 16 },
//     (_, index) => `/images/productimage/${index + 1}.png`
//   );
//   return (
//     <div className="p-4 bg-[#F6F6F6]">
//       <div className="flex my-2 mb-8">
//         <div className="w-1/3 flex items-center font-">
//           <ul className="flex text-[#456779] h-[35px]">
//             <li className="mr-8 text-lg nav_link text-[35px] ">
//               <a href="#root">Designen</a>
//             </li>
//             <li className="mr-8 text-lg nav_link text-[35px]">
//               <a href="#galery">Galerie</a>
//             </li>
//             <li className="mr-8 text-lg nav_link text-[35px]">
//               <a href="#detail">Details</a>
//             </li>
//           </ul>
//         </div>
//         <div className="w-2/3 flex justify-end items-center">
//           {productImages.map((image, index) => (
//             <div
//               key={index}
//               className={`shadow-lg mr-1 ml-1 rounded-[10px] cursor-pointer ${
//                 imagesIndex === index ? "box-border border-black border-[2px]" : null
//               }`}
//               onClick={(e) => setImagesIndex(index)}
//             >
//               <img src={image} alt={`Product ${index + 1}`} />
//             </div>
//           ))}
//         </div>
//       </div>
//       <DetailImag img={detailImg} />
//     </div>
//   );
// }

import React from "react";
import DetailImag from "../../../components/productDetail/detail.tsx";

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

export default function Frame(props) {
  const { imagesIndex, setImagesIndex, product, pageLoading } = props;
  const productImages = Array.from(
    { length: 16 },
    (_, index) => `/images/productimage/${index + 1}.png`
  );
  return (
    <div className="p-4 bg-[#F6F6F6]">
      <div className="flex my-2 mb-8">
        <div className="w-1/3 flex items-center font-">
          <ul className="flex text-[#456779] h-[35px]">
            <li className="mr-8 text-lg nav_link text-[35px] ">
              <a href="#root">Designen</a>
            </li>
            <li className="mr-8 text-lg nav_link text-[35px]">
              <a href="#galery">Galerie</a>
            </li>
            <li className="mr-8 text-lg nav_link text-[35px]">
              <a href="#detail">Details</a>
            </li>
          </ul>
        </div>
        {/* Highlight the image based on the following criteria:
        - If no `imagesIndex` is set, use the `baseColor` index by default.
        - Otherwise, display the image specified by the current `imagesIndex`. */}
        <div className="w-2/3 flex justify-end items-center">
          {productImages.map((image, index) => (
            <div
              key={index}
              className={`w-8 h-8 relative group shadow-lg mr-1 ml-1 rounded-[10px] cursor-pointer ${
                imagesIndex !== index + 1 &&
                "hover:box-border hover:border-gray-300 hover:border-[2px]"
              } ${imagesIndex === index + 1 ? "box-border border-black border-[2px]" : null} ${
                !imagesIndex && productColor[index + 1] == product?.baseColor
                  ? "box-border border-black border-[2px]"
                  : null
              }`}
              onClick={(e) => setImagesIndex(index + 1)}
            >
              <img src={image} alt={`Product ${index + 1}`} className="object-contain " />
              {/* Tooltip */}
              <div className="absolute hidden group-hover:flex items-center -bottom-8 left-1/2 -translate-x-1/2 w-max h-6 px-3 py-1 text-sm text-black bg-white shadow rounded whitespace-nowrap">
                <span className="inline-block">{productColor[index + 1]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <DetailImag product={product} imagesIndex={imagesIndex} pageLoading={pageLoading} />
    </div>
  );
}
