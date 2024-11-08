// import { useEffect, useState } from "react";
// import ConfigRiview from "../../../components/productDetail/configReiview";
// import Mark from "../../../components/productDetail/mark";
// import Frame from "./frame";
// import ProductDetail from "./productDetails";
// import Slide from "./slide";
// import { GetSingleProduct } from "../../../api/api";

// const imgUrl = "/images/products/mark/";

// const reviewsData = {
//   stars: 3,
//   title: "Schrankdesign Rating basierend auf 2597 Bewertungen",
// };

// const markData = [
//   {
//     id: 0,
//     img: "etikett.png",
//     title: "Made in Germany",
//     description: "Direkt von Leipzig zu Ihnen",
//   },
//   {
//     id: 1,
//     img: "holzflugzeug.png",
//     title: "Made in Germany",
//     description: "Direkt von Leipzig zu Ihnen",
//   },
//   {
//     id: 2,
//     img: "Group.png",
//     title: "Made in Germany",
//     description: "Direkt von Leipzig zu Ihnen",
//   },
//   {
//     id: 3,
//     img: "qualitat.png",
//     title: "Made in Germany",
//     description: "Direkt von Leipzig zu Ihnen",
//   },
// ];

// export default function Corner(props) {
//   const { configId } = props; // slug
//   const { stars, title } = reviewsData;
//   const [rating, setRating] = useState();
//   const [imagesIndex, setImagesIndex] = useState();
//   // const [productDescription, setProductDescription] = useState()
//   const [detailImage, setDetailImage] = useState();
//   const [detailImg, setDetailImg] = useState([]);
//   // const [productName, setProductName] = useState()

//   const [productInfo, setProductInfo] = useState({});

//   useEffect(() => {
//     let tempdetailImg = [];
//     for (let i = 8 * imagesIndex; i < 8 * imagesIndex + 8; i++) {
//       tempdetailImg.push(detailImage[i]);
//     }
//     setDetailImg(tempdetailImg);
//   }, [detailImage, imagesIndex]);

//   useEffect(() => {
//     const getProduct = async () => {
//       // setPageLoading(true);
//       const { data, error } = await GetSingleProduct(configId);
//       if (data) {
//         setRating(data?.product?.rating);
//         setImagesIndex(data?.product?.imagesIndex);
//         // setProductDescription(data?.product?.productDescription)
//         const detailImages = data?.product.detailImages;
//         const length = Number(detailImages[detailImages.length - 1].pos);
//         let tempFileList = [];
//         for (let i = 0; i < length + 1; i++) {
//           let flag = true;
//           detailImages.map((image) => {
//             if (Number(image.pos) === i) {
//               tempFileList.push(image.image);
//               flag = false;
//             }
//           });
//           if (flag) {
//             tempFileList.push(undefined);
//           }
//         }
//         setDetailImage(tempFileList);
//         setProductInfo({
//           name: data?.product?.name,
//           description: data?.product?.productDescription,
//           number: configId,
//         });
//         // setProductName(data?.product?.)
//         // setPageLoading(false);
//       } else if (error) {
//         // console.log(error);
//         // setPageLoading(true);
//       }
//     };
//     getProduct();
//     //eslint-disable-next-line
//   }, []);

//   return (
//     <>
//       <div className="flex px-4" id="galery">
//         <ConfigRiview stars={rating ? rating : stars} title={title} />
//         {markData.map(({ id, img, title, description }) => (
//           <Mark key={id} img={imgUrl + img} title={title} description={description} id={id} />
//         ))}
//       </div>
//       <Frame imagesIndex={imagesIndex} setImagesIndex={setImagesIndex} detailImg={detailImg} />
//       <ProductDetail product={productInfo} />
//       <Slide />
//     </>
//   );
// }

import { useEffect, useState } from "react";
import ConfigRiview from "../../../components/productDetail/configReiview";
import Mark from "../../../components/productDetail/mark";
import Frame from "./frame";
import ProductDetail from "./productDetails";
import Slide from "./slide";
import { GetSingleProduct } from "../../../api/api";

const imgUrl = "/images/products/mark/";

const reviewsData = {
  stars: 3,
  title: "Schrankdesign Rating basierend auf 2597 Bewertungen",
};

const markData = [
  {
    id: 0,
    img: "etikett.png",
    title: "Made in Germany",
    description: "Direkt von Leipzig zu Ihnen",
  },
  {
    id: 1,
    img: "holzflugzeug.png",
    title: "Made in Germany",
    description: "Direkt von Leipzig zu Ihnen",
  },
  {
    id: 2,
    img: "Group.png",
    title: "Made in Germany",
    description: "Direkt von Leipzig zu Ihnen",
  },
  {
    id: 3,
    img: "qualitat.png",
    title: "Made in Germany",
    description: "Direkt von Leipzig zu Ihnen",
  },
];

export default function Corner(props) {
  const { configId } = props; // slug
  const { stars, title } = reviewsData;
  const [rating, setRating] = useState();
  const [imagesIndex, setImagesIndex] = useState();
  const [productInfo, setProductInfo] = useState({});

  const [product, setProduct] = useState({});
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      const { data, error } = await GetSingleProduct(configId);
      if (data) {
        setProductInfo({
          name: data?.product?.name,
          description: data?.product?.productDescription,
          number: configId,
        });
        setProduct(data?.product);
        setRating(data?.product?.rating);
        setPageLoading(false);
      } else {
        console.log(error);
      }
    };
    getProduct();
  }, []);

  return (
    <>
      <div className="flex px-4" id="galery">
        <ConfigRiview stars={rating ? rating : stars} title={title} />
        {markData.map(({ id, img, title, description }) => (
          <Mark key={id} img={imgUrl + img} title={title} description={description} id={id} />
        ))}
      </div>
      <Frame
        imagesIndex={imagesIndex}
        setImagesIndex={setImagesIndex}
        product={product}
        pageLoading={pageLoading}
      />
      <ProductDetail product={productInfo} />
      <Slide />
    </>
  );
}
