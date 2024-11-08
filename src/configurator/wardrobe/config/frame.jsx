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
  1: { cloudColor: "Eich-Kasch", mainColor: "Eiche/Kashmir" },
  2: { cloudColor: "Weiß", mainColor: "Weiß" },
  3: { cloudColor: "Kaschmir", mainColor: "Kaschmir" },
  4: { cloudColor: "Taupe", mainColor: "Taupe" },
  5: { cloudColor: "Magnolia", mainColor: "Magnolia" },
  6: { cloudColor: "Graph-Eich-Fu", mainColor: "Eiche-Furnier/Graphitgrau" },
  7: { cloudColor: "Graphit", mainColor: "Graphitgrau" },
  8: { cloudColor: "Achatgrau", mainColor: "Achatgrau" },
  9: { cloudColor: "B-Green", mainColor: "Black-Green" },
  10: { cloudColor: "Eiche-Fu", mainColor: "Eiche-Funier" },
  11: { cloudColor: "Eiche", mainColor: "Eiche-Dekor" },
  12: { cloudColor: "Schwarz", mainColor: "Schwarz" },
  13: { cloudColor: "Nuss-Fu", mainColor: "Nuss-Furnier" },
  14: { cloudColor: "B-Blue", mainColor: "Black-Blue" },
  15: { cloudColor: "Acai", mainColor: "Acai" },
  16: { cloudColor: "Cameroon", mainColor: "Cameroon-Brown" },
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
                !imagesIndex && productColor[index + 1].cloudColor == product?.baseColor
                  ? "box-border border-black border-[2px]"
                  : null
              }`}
              onClick={() => setImagesIndex(index + 1)}
            >
              <img src={image} alt={`Product ${index + 1}`} className="object-contain" />
              {/* Tooltip */}
              {/* <div
                className={`absolute hidden group-hover:flex items-center -bottom-8 left-1/2 -translate-x-1/2 w-max h-5 px-3 py-1 text-sm text-black bg-[#D9D9D9] shadow rounded whitespace-nowrap`}
              > */}
              <div
                className={`absolute hidden group-hover:flex items-center -bottom-8 ${
                  index === productImages.length - 1
                    ? "right-0 translate-x-0"
                    : "left-1/2 -translate-x-1/2"
                }  w-max h-5 px-3 py-1 text-sm text-black bg-[#D9D9D9] shadow rounded whitespace-nowrap`}
              >
                <span
                  className={`${
                    index === productImages.length - 1 ? "colorTooltip edge" : " colorTooltip"
                  } inline-block font-medium`}
                >
                  {productColor[index + 1].mainColor}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <DetailImag product={product} imagesIndex={imagesIndex} pageLoading={pageLoading} />
    </div>
  );
}
