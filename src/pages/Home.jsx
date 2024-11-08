import React from "react";

import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/sea-green";
import "@splidejs/react-splide/css/skyblue";

// or only core styles
import "@splidejs/react-splide/css/core";

import Layout from "../Layouts/Layout";
import BottomProducts from "../components/common/BottomProducts";
import CommanBanner from "../components/common/CommanBanner";
import TopProducts from "../components/home/TopProducts";
import BannerIcons from "../components/home/BannerIcons";
import GridBoards from "../components/home/GridBoards";
import SecondBanner from "../components/home/SecondBanner";
import SecondReviews from "../components/home/SecondReviews";
import ThirdBanner from "../components/home/ThirdBanner";
import ThirdReviews from "../components/home/ThirdReviews";
import TopBanner from "../components/home/TopBanner";
import ReviewsBanner from "../components/home/TopReviewsBanner";

const Home = () => {
  return (
    <Layout>
      {/* ------------------------Top Banner--------------------------------- */}
      <TopBanner />
      {/* ----------------------------Icons Banner--------------------------- */}
      <BannerIcons />
      {/* ----------------------------First Reviews Banner------------------- */}
      <ReviewsBanner />
      {/* ----------------------------Products------------------------------- */}
      <TopProducts />
      {/* ----------------------------Quote---------------------------------- */}
      <div className="mt-14">
        <div className="w-[90%] lg:w-[60%] mx-auto">
          <div>
            <svg
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 101 80"
              className="h-10 w-10 lg:h-24 lg:w-24 text-gray-300 fill-gray-300 mx-auto lg:mx-0"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 41.77V0h41.604v41.77L20.026 80H.987L21.72 41.77H0zm59.396 0V0H101v41.77L79.422 80H60.383l20.732-38.23H59.396z"
                fill="currentColor"
              />
            </svg>
            <h1 className="text-xl lg:text-3xl font-bold relative lg:top-[-70px] lg:left-[70px]">
              "Schönheit ist die Mischung aus Form und Funktion, die das Auge
              erfreut und das Herz inspiriert."
            </h1>
            <p className="my-4 lg:top-[-30px] lg:left-[70px] relative">
              Louis Sullivan
            </p>
          </div>
        </div>
      </div>
      {/* ----------------------------Second Banner-------------------------- */}
      <SecondBanner />
      {/* ----------------------------GRID Boards---------------------------- */}
      <GridBoards />
      {/* ----------------------------Second Reviews------------------------- */}
      <SecondReviews />
      {/* ----------------------------Third Banner--------------------------- */}
      <ThirdBanner />
      {/* ----------------------------Third Reviews-------------------------- */}
      <ThirdReviews />
      {/* ----------------------------Fourth Banner-------------------------- */}
      <CommanBanner />
      {/* ----------------------------Bottom Products------------------------ */}
      <BottomProducts />
    </Layout>
  );
};

export default Home;
