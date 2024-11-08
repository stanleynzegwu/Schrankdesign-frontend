import React from "react";
import { Fade, Slide } from "react-awesome-reveal";

const CommanBanner = () => {
  return (
    <>
      <Slide triggerOnce={true} right>
        <div className="banner_4 relative grid">
          <div className="bg-black absolute inset-0 opacity-20"></div>
          <Fade triggerOnce={true}>
            <div className="bg-transparent z-20 relative inset-0 h-full grid">
              <div className="my-auto ml-auto lg:mr-14">
                <Fade triggerOnce={true} bottom>
                  <div className="bg-white rounded-2xl shadow-2xl md:py-10 py-5 p-10 md:p-14 mx-auto lg:mx-0 lg:ml-auto w-[90%] md:w-[70%] lg:w-[50%]">
                    <h6 className="text-sm leading-relaxed font-medium">
                      JETZT ANMELDEN UND KEINE ANGEBOTE MEHR VERPASSEN!
                    </h6>
                    <h5 className="mt-2 md:mt-4 lg:mt-8 leading-normal md:leading-loose font-bold">
                      Erhalte 5% Rabatt bei Anmeldung zum Newsletter und werde
                      als Erster über neue Möbel-Modelle und Rabatt-Aktionen
                      informiert .
                    </h5>
                    <div className="mt-3 lg:mt-5 md:grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="relative z-0 w-full group">
                        <input
                          type="email"
                          name="floating_email"
                          id="floating_email"
                          className="block h-full p-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="floating_email"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Deine E-Mail
                        </label>
                      </div>
                      <button className="site-button mt-3 md:mt-0 py-2">
                        registrieren
                      </button>
                    </div>
                  </div>
                </Fade>
              </div>
            </div>
          </Fade>
        </div>
      </Slide>
    </>
  );
};

export default CommanBanner;
