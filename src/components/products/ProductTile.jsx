// import { Fade } from "react-awesome-reveal";
// import IconStar from "/images/products/star.svg?url";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addToBasket } from "../../store/features/cart/cartSlice";
// import toast from "react-hot-toast";
// import { ReactSVG } from "react-svg";
// import { useState } from "react";

// const ProductTile = ({
//   id,
//   defaultImg,
//   hoverImg,
//   name,
//   subtitle,
//   rating,
//   minDimension,
//   maxDimension,
//   price,
//   buttonText,
//   link,
//   quantity,
//   // configId
// }) => {
//   const dispatch = useDispatch();
//   const generateStars = () => {
//     const starArray = [];
//     for (let i = 0; i < rating; i++) {
//       starArray.push(
//         <span key={i}>
//           <ReactSVG
//             src={IconStar}
//             className="text-yellow-400 fill-yellow-400 mr-2 text-xs h-5 w-5"
//           />
//         </span>
//       );
//     }
//     return starArray;
//   };

//   const handleAddToCart = async () => {
//     const product = {
//       id,
//       defaultImg,
//       hoverImg,
//       name,
//       subtitle,
//       rating,
//       minDimension,
//       maxDimension,
//       price,
//     };
//     dispatch(addToBasket(product));
//     toast.success("Added to Cart.");
//   };

//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <>
//       <div
//         key={id}
//         className="bg-Sv3n-grey2 shadow-sm single_product cursor-pointer mt-2 md:mt-5"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <Link to={link}>
//           <Fade>
//             <img
//               src={defaultImg}
//               alt=""
//               className={`cursor-pointer w-max image1 ${isHovered ? "hidden" : "visible"}`}
//             />
//           </Fade>
//           <Fade>
//             <img
//               src={hoverImg}
//               alt=""
//               className={`cursor-pointer w-max image2 ${isHovered ? "visible" : "hidden"}`}
//             />
//           </Fade>
//         </Link>
//         <div className="text-center my-2 pb-4">
//           <h5 className="text-xl mt-4 font-medium">{name}</h5>

//           {rating && (
//             <div className="flex my-2 mx-auto w-max">
//               {rating > 0 && <div className="flex w-max">{generateStars()}</div>}
//               {!rating && (
//                 <div className="flex w-max">
//                   {" "}
//                   <ReactSVG
//                     src={IconStar}
//                     className="text-yellow-400 fill-yellow-400 mr-2 text-xs h-5 w-5 invisible"
//                   />
//                 </div>
//               )}
//             </div>
//           )}
//           {subtitle && (
//             <div className="flex my-2 mx-auto w-max">
//               <p className="w-max">{subtitle}</p>
//             </div>
//           )}
//           <h5 className="text-lg font-medium mt-2">
//             Dimensions {minDimension} - {maxDimension}
//           </h5>
//           <div className="mt-2 text-base">ab {price} €</div>
//           {buttonText && (
//             <button onClick={handleAddToCart} className="site-button mt-4 text-base font-light">
//               {buttonText}
//             </button>
//           )}
//           {quantity && <p className="mt-4 italic text-gray-600">Quantity: {quantity}</p>}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductTile;

////////////////////////////////////////////////////////////////////////
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import pro_icon from "../../assets/icons/slide.png";

const ProductTile = ({
  id,
  defaultImg,
  hoverImg,
  category,
  name,
  subtitle,
  rating,
  minDimension,
  maxDimension,
  price,
  buttonText,
  link,
  quantity,
  // configId
}) => {
  return (
    <>
      <div className="rounded-md hover:rounded-md hover:scale-100 duration-300">
        <div
          key={id}
          className="relative group bg-Sv3n-grey2 shadow-sm single_product cursor-pointer mt-2 md:mt-5"
        >
          <Link to={link}>
            <Fade>
              <img
                src={defaultImg}
                alt="product_image"
                className={`cursor-pointer w-max image1 visible group-hover:hidden `}
              />
            </Fade>
            <Fade>
              <img
                src={hoverImg}
                alt="product_image"
                className={`cursor-pointer w-max image2 hidden group-hover:visible `}
              />
            </Fade>
          </Link>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <button className="flex mt-2 py-1 px-4 bg-white text-sm text-black border border-black rounded-md mx-auto items-center">
              <img src={pro_icon} width={14} height={14} alt="" />
              Jetzt Designen
            </button>
          </div>
        </div>
        <div className="flex gird-col-2 gap-2 bg-[#f5f5f5] p-4 pt-6">
          <div className="flex flex-col">
            <p className="text-lg text-[#507081]">{`${category} "${name}"`}</p>
            <p className="my-2 text-[#718a98]">
              Dimensions {minDimension} - {maxDimension}
            </p>
            <div className="flex justify-center">
              <img src="/images/productimage/3.png" alt="" className="mr-auto" width={24} />
              <img src="/images/productimage/5.png" alt="" className="mx-auto" width={24} />
              <img src="/images/productimage/7.png" alt="" className="mx-auto" width={24} />
              <img src="/images/productimage/2.png" alt="" className="ml-auto" width={24} />
              <p className="text-black"> + 21 </p>
            </div>
          </div>
          <div className="flex my-auto mb-[0px] ml-auto bg-[#f5f5f5]">
            <div className="flex flex-col">
              <p className="line-through">14443 €</p>
              <p className="text-[#b12704]">{price} €</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductTile;
