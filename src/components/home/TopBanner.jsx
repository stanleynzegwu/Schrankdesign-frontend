import React from "react";
import { Fade } from "react-awesome-reveal";

const TopBanner = () => {
  return (
    <>
      <div className="banner relative">
        <div className="bg-black absolute inset-0 opacity-40"></div>
        <Fade triggerOnce={true} right>
          <div className="bg-transparent md:w-[50%] ml-10 md:ml-28 text-white z-20 relative pt-20 pb-10">
            <h5 className="text-lg md:text-xl font-bold">
              Individuell konfigurierbar
            </h5>
            <h2 className="mt-10 text-3xl md:text-6xl  font-bold">
              Modern & Zeitlos
            </h2>
            <p className="mt-10 font-bold text-base md:text-lg">
              "Die Schönheit des Lebens offenbart sich in den kleinen Dingen,
              wie in der perfekten Form eines Stuhls oder der Geschichte, die in
              einem alten Schrank verborgen liegt."
            </p>
            <button className="site-button mt-10">jetzt konfigurieren</button>
          </div>
        </Fade>
      </div>
    </>
  );
};
export default TopBanner;
