import React from "react";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <>
      <div className="bg-[#f5f5f5] py-4 text-[#231e00]">
        <div className="flex flex-wrap text-center justify-evenly">
          {/* item 1 */}
          <div className="cursor-pointer ">
            <Link
              className="flex hover:text-gray-500 transition-all duration-200"
              to="tel:034165673302"
            >
              <div className="icon block align-middle bg-none pointer-events-none overflow-visible">
                <svg
                  fill="none"
                  focusable="false"
                  width="24"
                  height="24"
                  className="icon icon--picto-phone   w-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.6636 16.7325L17.6844 13.7366C17.2337 13.2827 16.4999 13.2827 16.048 13.7343L13.4005 16.3802L7.62246 10.6056L10.2734 7.95613C10.7241 7.5057 10.7253 6.77463 10.2746 6.32305L7.29311 3.33869C6.84126 2.8871 6.10976 2.8871 5.65791 3.33869L3.00462 5.98927L3 5.9858C3 14.2783 9.72568 21 18.023 21L20.6613 18.3633C21.1119 17.9129 21.1131 17.1841 20.6636 16.7325Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <div className="ml-2 text-base">0341 65673302</div>
            </Link>
          </div>
          {/* item 2 */}
          <div className="cursor-pointer hidden lg:block">
            <Link
              className="flex hover:text-gray-500 transition-all duration-200"
              to="/service/kontakt"
            >
              <div className="icon mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ionicon w-5"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z"
                    fill="none"
                    stroke="currentColor"
                    strokeMiterlimit="10"
                    strokeWidth="32"
                  ></path>
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                    d="M220 220h32v116"
                  ></path>
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    strokeWidth="32"
                    d="M208 340h88"
                  ></path>
                  <path d="M248 130a26 26 0 1026 26 26 26 0 00-26-26z"></path>
                </svg>
              </div>
              <div className="ml-2 text-base">Fachmännische Beratung</div>
            </Link>
          </div>
          {/* item 3 */}
          <div className="cursor-pointer ">
            <Link
              className="flex hover:text-gray-500 transition-all duration-200"
              to="/service/lieferung%20&%20Montage"
            >
              <div className="icon mt-0.5">
                <svg
                  fill="none"
                  focusable="false"
                  width="29"
                  height="24"
                  className="icon icon--picto-fast-delivery w-5"
                  viewBox="0 0 29 24"
                >
                  <path
                    d="M4 3H20V8M20 17H11.68C11.68 17 11 16 10 16M20 17V8M20 17H22.32M20 8H26.5L28 12.5V17H25.68C25.68 17 25 16 24 16M24 16C25 16 26 17 26 18C26 19 25 20 24 20C23 20 22 19 22 18C22 17.6527 22.1206 17.3054 22.32 17M24 16C23.3473 16 22.6946 16.426 22.32 17M10 16C11 16 12 17 12 18C12 19 11 20 10 20C9 20 8 19 8 18C8 17.6527 8.12061 17.3054 8.31996 17M10 16C9.3473 16 8.69459 16.426 8.31996 17M8.31996 17H4M10 12H3M10 8H1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <div className="ml-2 text-base animate-color-change font-bold">
                5-8 Wochen Lieferzeit.
              </div>
            </Link>
          </div>
          {/* item 4 */}
          <div className="cursor-pointer hidden lg:block">
            <Link
              className="flex hover:text-gray-500 transition-all duration-200"
              to="/service/bestellung%20&%20Konfiguration"
            >
              <div className="icon mt-0.5">
                <svg
                  fill="none"
                  focusable="false"
                  width="24"
                  height="24"
                  className="icon icon--picto-taxes w-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M4 2H20V22H4z"
                  ></path>
                  <path
                    d="M16 14H8"
                    stroke="currentColor"
                    strokeWidth="2"
                  ></path>
                  <path
                    d="M8 17H16"
                    stroke="currentColor"
                    strokeWidth="2"
                  ></path>
                  <path
                    d="M9 11L15 6"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  ></path>
                  <circle cx="14" cy="11" r="1" fill="currentColor"></circle>
                  <circle cx="10" cy="6" r="1" fill="currentColor"></circle>
                </svg>
              </div>
              <div className="ml-2 text-base">Kauf auf Rechnung</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;
