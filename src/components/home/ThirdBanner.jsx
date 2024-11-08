import React from "react";
import { Fade, Slide } from "react-awesome-reveal";
const ThirdBanner = () => {
  return (
    <>
      <Slide triggerOnce={true} right>
        <div className="banner_3 relative grid">
          <div className="bg-black absolute inset-0 opacity-40"></div>
          <Fade>
            <div className="bg-transparent  text-white z-20 relative inset-0 h-full grid">
              <div className="text-center mt-auto mb-10">
                <h2 className="mt-10 text-3xl md:text-6xl  font-bold">
                  Design und Gefühl
                </h2>

                <p className="mt-7 md:mt-10 font-bold text-base md:text-lg">
                  "Ein schönes Möbelstück ist die perfekte Verbindung aus
                  Ästhetik und Funktionalität"
                </p>

                <button className="site-button mt-5 lg:mt-10">
                  Designe deine Zukunft
                </button>
              </div>
            </div>
          </Fade>
        </div>
      </Slide>
    </>
  );
};

export default ThirdBanner;
