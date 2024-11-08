import React from "react";
import { Slide } from "react-awesome-reveal";
import CommanBanner from "../common/CommanBanner";
import BottomProducts from "../common/BottomProducts";
const Konkat = () => {
  return (
    <>
      {/* Top Box */}
      <div className="flex md:p-10 itema-center mt-5 md:mt-0">
        <div className="bg-white rounded-2xl shadow-2xl p-5 md:p-10 w-[90%] 2xl:w-[60%] mx-auto text-center items-center cursor-pointer image-zoom">
          <h6 className="text-base font-semibold uppercase tracking-wider">
            Support
          </h6>
          <div className="my-2 md:my-4 text-2xl md:text-4xl items-center flex w-max mx-auto">
            <h3 className="font-semibold">Beratung & Kontakt</h3>
          </div>
          <div className="text-[#5a8560] font-semibold my-2 md:my-4 text-base md:text-2xl items-center mx-auto">
            <p className="py-2 md:py-3">
              Wir verbinden kreative Beratung mit fachlichem Know-how
            </p>
            <p className="py-2 md:py-3">
              und beraten dich durch gut ausgebildete Tischler.
            </p>
          </div>
        </div>
      </div>
      {/* Center Box */}
      <div className="flex md:p-10 itema-center mt-5 md:mt-0">
        <div className="bg-white rounded-2xl shadow-2xl p-5 md:p-10 w-[90%] 2xl:w-[30%] mx-auto text-center items-center image-zoom">
          <h6 className="text-lg font-semibold">Wir sind für dich da!</h6>
          <div className="my-2 md:my-4 text-lg md:text-2xl items-center flex w-max mx-auto">
            <h3 className="font-semibold">Beratung </h3>
            <span className="text-[#5a8560] font-semibold ml-2">
              <a href="tel:+49 341 65673302">+49 341 65673302</a>
            </span>
          </div>
          <div className="my-2 md:my-4 text-lg md:text-2xl items-center flex w-max mx-auto">
            <h3 className="font-semibold">Email </h3>
            <span className="text-[#5a8560] font-semibold ml-2">
              <a href="mailto:info@Schrankdesign.de">Info@Schrankdesign.de</a>
            </span>
          </div>
          <div className="my-2 md:my-4 text-lg md:text-2xl items-center flex w-max mx-auto">
            <h3 className="font-semibold">Mo - Fr 9:30 - 18:00 Uhr </h3>
          </div>
        </div>
      </div>

      <div className="md:w-[90%] mx-auto p-5">
        {/* Left Right Section */}
        <Slide triggerOnce={true} right>
          <div className=" mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-8 md:p-5 lg:p-10 rounded-2xl shadow-2xl mt-5">
            <div className="p-5">
              <img
                src="/images/servicee/single/fragen.webp"
                alt=""
                className="rounded-2xl image-zoom"
              />
            </div>
            <div className="p-5 my-auto">
              <h4 className="text-3xl md:text-4xl font-semibold">
                Du hast Fragen?
              </h4>
              <p className="mt-2 md:mt-5 leading-relaxed md:leading-loose font-medium">
                Kein Problem, wir helfen dir gern. Egal ob es um Versand,
                Materialien, Qualität oder kreative Beratung geht - unser Team
                aus ausgebildeten Tischlern und Fachpersonal steht dir jederzeit
                zur Verfügung. Wir beraten dich umfassend und individuell, damit
                du genau das bekommst, was du dir wünschst. Vertraue auf unsere
                Erfahrung und Kompetenz und lass uns gemeinsam dein Projekt
                verwirklichen.
              </p>
            </div>
          </div>
        </Slide>
      </div>
      {/* Center Form */}
      <div className="bg-[#F5F5F5] p-5 md:p-10">
        <div className="md:w-[70%] lg:w-[60%] 2xl:w-[40%] mx-auto bg-white rounded-2xl shadow-xl p-10">
          <div className="text-center">
            <h1 className="my-4 text-4xl font-semibold"> Kontaktiere uns</h1>
          </div>
          <form action="">
            <div className="relative z-0 w-full group mt-10">
              <input
                type="email"
                name="floating_email"
                id="floating_email"
                className="block h-full p-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white  focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Name
              </label>
            </div>
            <div className="relative z-0 w-full group mt-10">
              <input
                type="email"
                name="floating_email"
                id="floating_email"
                className="block h-full p-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white  focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email
              </label>
            </div>
            <div className="relative z-0 w-full group mt-10">
              <input
                type="email"
                name="floating_email"
                id="floating_email"
                className="block h-full p-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white  focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Telefonummer
              </label>
            </div>
            <div className="relative z-0 w-full group mt-10">
              <select
                name="floating_subject"
                id="floating_subject"
                className="block h-full p-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                placeholder=" "
                required
              >
                <option defaultValue=""></option>
                <option value="Us">Us</option>
              </select>
              <label
                htmlFor="floating_subject"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Betreff
              </label>
            </div>

            <div className="relative z-0 w-full group mt-10">
              <textarea
                type="email"
                name="floating_email"
                id="floating_email"
                className="block h-full p-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white  focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Nachricht
              </label>
            </div>
            <div>
              <button className="mt-10 w-full site-button">senden</button>
            </div>
          </form>
        </div>
      </div>
      {/* Common Banner */}
      <CommanBanner />
      {/* Bottom Products */}
      <BottomProducts />
    </>
  );
};

export default Konkat;
