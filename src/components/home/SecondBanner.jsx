import React from "react";

import { Fade, Slide } from "react-awesome-reveal";
const SecondBanner = () => {
  return (
    <>
      <Slide triggerOnce={true} right>
        <div className="banner_2 relative">
          <div className="bg-black absolute inset-0 opacity-40"></div>
          <Fade bottom>
            <div className="bg-transparent md:w-[50%] ml-10 md:ml-28 text-white z-20 relative pt-20 pb-10">
              <h5 className="text-lg md:text-xl font-bold">
                "MODERNE FORMEN UND LIEBE, BEIDES ERFORDERT MUT UND
                RISIKOBEREITSCHAFT."
              </h5>
              <h2 className="mt-10 text-3xl md:text-6xl  font-bold">
                Moderne Formen und Liebe
              </h2>

              <button className="site-button mt-10 lg:mt-20">
                Designe deine Zukunft
              </button>
            </div>
          </Fade>
        </div>
      </Slide>
    </>
  );
};

export default SecondBanner;
