import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AllCategory } from "../../api/api";
import { qualityData, serviceData } from "./NavData";
import TopBar from "./TopBar";

const Header = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(null);

  const auth = useSelector((state) => state.user.user);
  const storeCart = useSelector((state) => state.basket.items);

  const [productTab, setProductTab] = useState(false);
  const [qualityTab, setQualityTab] = useState(false);
  const [serviceTab, setServiceTab] = useState(false);
  const [active, setActive] = useState(false);
  const [cart, setCart] = useState(false);

  //   ------Mobile Accordion---------
  const [mobileProduct, setMobileProduct] = useState(false);
  const [mobileQuality, setMobileQuality] = useState(false);
  const [serviceQuality, setServiceQuality] = useState(false);

  const [profileLink, setProfileLink] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("schrankdesign-app-user-token")
    if (token) {
      if (auth?.role === 0) {
        setProfileLink("/dashboard/user");
      } else if (auth?.role === 1) {
        setProfileLink("/dashboard/admin");
      } else {
        setProfileLink("/pages/login");
      }
    } else {
      setProfileLink("/pages/login");
    }
  }, [auth?.role]);

  const toggleNavbar = () => {
    setActive(!active);
  };

  const toggleCart = () => {
    setCart(!cart);
  };

  const getAllCategories = async () => {
    setLoading(true);
    const { data, error } = await AllCategory();
    if (data) {
      setLoading(false);
      setCategories(data?.categories);
    } else if (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const createBlobUrl = (data, contentType) => {
    const byteArray = new Uint8Array(data);
    const blob = new Blob([byteArray], { type: contentType });
    return URL.createObjectURL(blob);
  };

  const totalCartPrice = storeCart.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.price;
  }, 0);

  return (
    <>
      <TopBar />

      {/* --------------------------Desktop ---------------------- */}
      <div className="bg-white sticky top-0 transition-all duration-300 z-max">
        <div className="w-[95%] mx-auto py-5 items-center hidden lg:flex">
          <div className="logo mr-10 w-max z-50">
            <Link to="/">
              <img
                src="/images/logo.avif"
                alt=""
                className="max-w-[170px] md:max-w-[255px] image-zoom cursor-pointer"
              />
            </Link>
          </div>
          <div className="header bg-white text-black">
            <ul className="flex">
              <li
                className="mr-8 text-lg nav_link"
                onMouseOver={(e) => {
                  e.stopPropagation();
                  setProductTab(true);
                }}
                onMouseLeave={(e) => {
                  e.stopPropagation();
                  setProductTab(false);
                }}
              >
                Produkte
              </li>
              <li
                className="mr-8 text-lg nav_link"
                onMouseOver={(e) => {
                  e.stopPropagation();
                  setQualityTab(true);
                }}
                onMouseLeave={(e) => {
                  e.stopPropagation();
                  setQualityTab(false);
                }}
              >
                Qualität
              </li>
              <li
                className="mr-8 text-lg nav_link"
                onMouseOver={(e) => {
                  e.stopPropagation();
                  setServiceTab(true);
                }}
                onMouseLeave={(e) => {
                  e.stopPropagation();
                  setServiceTab(false);
                }}
              >
                Service
              </li>
              <Link to="/service/kontakt">
                <li className="mr-8 text-lg nav_link">Beratung</li>
              </Link>
              <Link to="/quality/made%20in%20Germany">
                <li className="mr-8 text-lg nav_link">Über Uns</li>
              </Link>
              <Link to="/service/muster">
                <li className="mr-8 text-lg nav_link text-[#006400] font-semibold">
                  Kostenlose Muster
                </li>
              </Link>
            </ul>
            {productTab && (
              <div
                className=" bg-white text-black h-[auto] overflow-x-auto absolute left-0 right-0 w-full z-30"
                onMouseOver={(e) => {
                  e.stopPropagation();
                  setProductTab(true);
                }}
                onMouseLeave={(e) => {
                  e.stopPropagation();
                  setProductTab(false);
                }}
              >
                <div className=" grid grid-flow-col items-start gap-8 p-10 mt-2 w-[95%] mx-auto">
                  {categories &&
                    categories.map((item) => (
                      <Fade bottom key={item?.name}>
                        <div className="w-[240px]">
                        <Link
                          to={`/collections/${item?.name}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setProductTab(false);
                          }}
                        >
                          <p className="uppercase text-center text-gray-700 font-semibold mt-5">
                            {item?.name}
                          </p>
                        </Link>
                        </div>
                      </Fade>
                    ))}
                </div>
              </div>
            )}
            {qualityTab && (
              <div
                className="bg-white text-black h-[auto] overflow-x-auto absolute left-0 right-0 w-full z-30"
                onMouseOver={() => setQualityTab(true)}
                onMouseLeave={() => setQualityTab(false)}
              >
                <div className="grid grid-flow-col items-start p-10 mt-2 w-[95%] mx-auto transition-all duration-700">
                  {qualityData &&
                    qualityData.map((item) => (
                      <Fade bottom key={item?.id}>
                        <Link
                          to={`/quality/${
                            item?.title.charAt(0).toLowerCase() + item?.title.slice(1)
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setQualityTab(false);
                          }}
                        >
                          <div className="w-[240px] cursor-pointer">
                            <img
                              src={item?.img}
                              alt=""
                              className="image-zoom rounded-3xl cursor-pointer"
                            />
                            <p className="uppercase text-center text-gray-700 font-semibold mt-5">
                              {item?.title}
                            </p>
                          </div>
                        </Link>
                      </Fade>
                    ))}
                </div>
              </div>
            )}
            {serviceTab && (
              <div
                className=" bg-white text-black h-[auto] overflow-x-auto absolute left-0 right-0 w-full z-30"
                onMouseOver={(e) => {
                  e.stopPropagation();
                  setServiceTab(true);
                }}
                onMouseLeave={(e) => {
                  e.stopPropagation();
                  setServiceTab(false);
                }}
              >
                <div className=" grid grid-flow-col items-start p-10 mt-2 w-[95%] mx-auto transition-all duration-700">
                  {serviceData &&
                    serviceData.map((item) => (
                      <Fade bottom key={item?.id}>
                        <Link
                          to={`/service/${
                            item?.title.charAt(0).toLowerCase() + item?.title.slice(1)
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setServiceTab(false);
                          }}
                        >
                          <div className="w-[240px]">
                            <img
                              src={item?.img}
                              alt=""
                              className="image-zoom rounded-3xl cursor-pointer"
                            />
                            <p className="uppercase text-center text-gray-700 font-semibold mt-5">
                              {item?.title}
                            </p>
                          </div>
                        </Link>
                      </Fade>
                    ))}
                </div>
              </div>
            )}
          </div>
          {/* ----------------- ------------ ------------ ------- */}
          <div className="ml-auto flex items-center">
            {/* 1st */}
            <Link to="/pages/faq">
              <div className="flex items-center text-[#5a8560] cursor-pointer">
                <svg
                  fill="none"
                  focusable="false"
                  width="24"
                  height="24"
                  className="icon icon--picto-chat   "
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M18.3234 10.1404C18.3234 14.6362 14.9806 17.9327 10.473 17.9327M18.3234 10.1404C18.3234 5.64457 14.6693 2 10.1617 2C5.65412 2 2 5.0042 2 9.5C2 10.9769 2.50153 12.5042 3 13.5L2 18.2807L6.4857 16.9369C7.7184 17.6824 8.92606 17.9327 10.473 17.9327M18.3234 10.1404C19.5489 10.7827 22 12.6539 22 15C22 17.3461 21.3333 18.9776 21 19.5L21.5 22L18.5 21.5C16.6487 22.2884 12.4514 22.6788 10.473 17.9327"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <h5 className="text-lg font-semibold ml-2">FAQ</h5>
              </div>
            </Link>
            {/* 2nd */}
            <div className="mx-6">
              <svg
                focusable="false"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                className="cursor-pointer"
              >
                <path
                  d="M12.336 12.336c2.634-2.635 2.682-6.859.106-9.435-2.576-2.576-6.8-2.528-9.435.106C.373 5.642.325 9.866 2.901 12.442c2.576 2.576 6.8 2.528 9.435-.106zm0 0L17 17"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                ></path>
              </svg>
            </div>
            {/* 3rd */}
            <div className="mx-1 relative">
              <svg
                focusable="false"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                className="cursor-pointer"
                onClick={toggleCart}
              >
                <path
                  d="M0 1H4L5 11H17L19 4H8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                ></path>
                <circle
                  cx="6"
                  cy="17"
                  r="2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                ></circle>
                <circle
                  cx="16"
                  cy="17"
                  r="2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                ></circle>
              </svg>
              <div
                onClick={toggleCart}
                className="cursor-pointer inline-flex items-center justify-center text-white bg-black text-xs h-[17px] w-[17px] text-[12px] rounded-full absolute top-[-10px] right-[-12px]"
              >
                {storeCart?.length}
              </div>
            </div>
            {/* 4th */}
            <div className="mx-4">
              <Link to={`${profileLink}`}>
                <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer">
                  <svg
                    className="absolute w-10 h-10 text-gray-400 -left-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* --------------------------------Mobile------------------------- */}
      <div className="bg-white py-5 sticky -top-1 z-20 lg:hidden">
        <div className="w-[90%] mx-auto flex items-center">
          <div className="flex">
            <div>
              <button
                is="toggle-button"
                onClick={toggleNavbar}
                type="button"
                className="header__icon-wrapper tap-area hidden-desk"
                aria-controls="mobile-menu-drawer"
                aria-expanded="false"
              >
                <span className="visually-hidden"></span>
                <svg
                  focusable="false"
                  width="18"
                  height="14"
                  className="icon icon--header-hamburger   "
                  viewBox="0 0 18 14"
                >
                  <path
                    d="M0 1h18M0 13h18H0zm0-6h18H0z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="ml-4 md:ml-6 mt-1">
              <Link to="/search">
                <svg
                  focusable="false"
                  width="18"
                  height="18"
                  className="icon icon--header-search   "
                  viewBox="0 0 18 18"
                >
                  <path
                    d="M12.336 12.336c2.634-2.635 2.682-6.859.106-9.435-2.576-2.576-6.8-2.528-9.435.106C.373 5.642.325 9.866 2.901 12.442c2.576 2.576 6.8 2.528 9.435-.106zm0 0L17 17"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-2">
            <Link to="/">
              <img
                src="/images/logo.avif"
                alt=""
                className="max-w-[170px] md:max-w-[255px] image-zoom"
              />
            </Link>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <Link>
                <svg
                  focusable="false"
                  width="21"
                  height="20"
                  className="icon icon--header-shopping-cart  shopping_cart "
                  viewBox="0 0 21 20"
                  onClick={toggleCart}
                >
                  <path
                    d="M0 1H4L5 11H17L19 4H8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  ></path>
                  <circle
                    cx="6"
                    cy="17"
                    r="2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  ></circle>
                  <circle
                    cx="16"
                    cy="17"
                    r="2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  ></circle>
                </svg>
                <div
                  onClick={toggleCart}
                  className=" inline-flex items-center justify-center text-white bg-black text-xs h-[17px] w-[17px] text-[12px] rounded-full absolute top-[-8px] right-[-10px]"
                >
                  {storeCart?.length}
                </div>
              </Link>
            </div>
            <div className="ml-5">
              <Link to={`${profileLink}`}>
                <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer">
                  <svg
                    className="absolute w-10 h-10 text-gray-400 -left-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Side Bar */}
      <div
        className={`${
          active === true ? "" : " -translate-x-full"
        } fixed top-0 left-0 z-40 h-screen p-4 pl-6 overflow-y-auto duration-700 bg-white w-[90%] text-gray-900 transition-all`}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setActive(false);
          }}
          className="bg-transparent text-black rounded-lg w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="mt-8 py-4 overflow-y-auto">
          <ul className="space-y-4 font-medium">
            <li className="w-full pb-4 pt-2 border-b ">
              <div className="flex items-center">
                <h4 className="text-2xl font-semibold">Produkte</h4>
                {!mobileProduct ? (
                  <span className="ml-auto cursor-pointer" onClick={() => setMobileProduct(true)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-plus"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                  </span>
                ) : (
                  <span className="ml-auto cursor-pointer" onClick={() => setMobileProduct(false)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-minus"
                    >
                      <path d="M5 12h14" />
                    </svg>
                  </span>
                )}
              </div>
              {mobileProduct && (
                <Fade bottom>
                  <div className="transition-all">
                    <div className="mt-4 overflow-x-auto scrolling-effect pb-2">
                      <div className=" grid grid-flow-col items-start gap-3 mx-auto">
                        {categories &&
                          categories.map((item) => (
                            <Fade bottom key={item?._id}>
                              <Link
                                to={`/collections/${item?._id}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActive(false);
                                  setMobileProduct(false);
                                }}
                              >
                                <div className="w-[120px]">
                                  <img
                                    src={createBlobUrl(item?.image?.data?.data, item?.contentType)}
                                    alt=""
                                    className="image-zoom rounded-lg cursor-pointer h-[120px] w-[120px]"
                                  />
                                  <p className="uppercase text-xs text-center text-gray-700 font-semibold mt-5">
                                    {item?.name}
                                  </p>
                                </div>
                              </Link>
                            </Fade>
                          ))}
                      </div>
                    </div>
                  </div>
                </Fade>
              )}
            </li>
            <li className="w-full pb-4 pt-2 border-b ">
              <div className="flex items-center">
                <h4 className="text-2xl font-semibold">Qualität</h4>
                {!mobileQuality ? (
                  <span className="ml-auto cursor-pointer" onClick={() => setMobileQuality(true)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-plus"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                  </span>
                ) : (
                  <span className="ml-auto cursor-pointer" onClick={() => setMobileQuality(false)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-minus"
                    >
                      <path d="M5 12h14" />
                    </svg>
                  </span>
                )}
              </div>
              {mobileQuality && (
                <Fade bottom>
                  <div className="transition-all">
                    <div className="mt-4 overflow-x-auto scrolling-effect pb-2">
                      <div className=" grid grid-flow-col items-start gap-3 mx-auto">
                        {qualityData &&
                          qualityData.map((item) => (
                            <Fade bottom key={item?.id}>
                              <Link
                                to={`/quality/${
                                  item?.title.charAt(0).toLowerCase() + item?.title.slice(1)
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActive(false);
                                  setMobileQuality(false);
                                }}
                              >
                                <div className="w-[120px]">
                                  <img
                                    src={item?.img}
                                    alt=""
                                    className="image-zoom rounded-lg cursor-pointer h-[90px] w-[120px]"
                                  />
                                  <p className="uppercase text-xs text-center text-gray-700 font-semibold mt-5 whitespace-normal">
                                    {item?.title}
                                  </p>
                                </div>
                              </Link>
                            </Fade>
                          ))}
                      </div>
                    </div>
                  </div>
                </Fade>
              )}
            </li>
            <li className="w-full pb-4 pt-2 border-b ">
              <div className="flex items-center">
                <h4 className="text-2xl font-semibold">Service</h4>
                {!serviceQuality ? (
                  <span className="ml-auto cursor-pointer" onClick={() => setServiceQuality(true)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-plus"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                  </span>
                ) : (
                  <span className="ml-auto cursor-pointer" onClick={() => setServiceQuality(false)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-minus"
                    >
                      <path d="M5 12h14" />
                    </svg>
                  </span>
                )}
              </div>
              {serviceQuality && (
                <Fade bottom>
                  <div className="transition-all">
                    <div className="mt-4 overflow-x-auto scrolling-effect pb-2">
                      <div className=" grid grid-flow-col items-start gap-3 mx-auto">
                        {serviceData &&
                          serviceData.map((item) => (
                            <Fade bottom key={item?.id}>
                              <Link
                                to={`/service/${
                                  item?.title.charAt(0).toLowerCase() + item?.title.slice(1)
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActive(false);
                                  setServiceQuality(false);
                                }}
                              >
                                <div className="w-[120px]">
                                  <img
                                    src={item?.img}
                                    alt=""
                                    className="image-zoom rounded-lg cursor-pointer h-[90px] w-[120px]"
                                  />
                                  <p className="uppercase text-xs text-center text-gray-700 font-semibold mt-5 whitespace-normal">
                                    {item?.title}
                                  </p>
                                </div>
                              </Link>
                            </Fade>
                          ))}
                      </div>
                    </div>
                  </div>
                </Fade>
              )}
            </li>
            <Link to="/service/kontakt">
              <li className="w-full pb-4 pt-2 border-b">
                <h4 className="text-2xl font-semibold">Beratung</h4>
              </li>
            </Link>
            <Link to="/quality/made%20in%20Germany">
              <li className="w-full pb-4 pt-2 border-b">
                <h4 className="text-2xl font-semibold">Über Uns</h4>
              </li>
            </Link>
            <Link to="/service/muster">
              <li className="w-full pb-4 pt-2 border-b">
                <h4 className="text-2xl font-semibold">Kostenlose Muster</h4>
              </li>
            </Link>
          </ul>
        </div>
      </div>
      {/* Cart Slide Left */}
      <div
        className={`${
          cart ? "" : "translate-x-full"
        } fixed top-0 right-0 z-40 h-screen p-4 px-6 overflow-y-auto duration-700 flex flex-col bg-white w-[90%] lg:w-[30%] text-gray-900 transition-all`}
      >
        <div className="flex mt-2 lg:mt-5 items-center bg-white">
          <div>
            <svg
              focusable="false"
              width="20"
              height="20"
              viewBox="0 0 18 18"
              className="cursor-pointer"
            >
              <path
                d="M0 1H4L5 11H17L19 4H8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              ></path>
              <circle
                cx="6"
                cy="17"
                r="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              ></circle>
              <circle
                cx="16"
                cy="17"
                r="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              ></circle>
            </svg>
          </div>
          <h4 className="text-base lg:text-lg font-bold ml-5">
            {storeCart && storeCart?.length ? `${storeCart?.length} Produkte` : "Warenkorb"}
          </h4>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setCart(false);
            }}
            className="bg-transparent text-black rounded-lg w-8 h-8 ml-auto"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
        </div>
        <hr className="mt-5" />
        {storeCart && storeCart?.length > 0 ? (
          <>
            {storeCart.map((item) => (
              <div key={item?.id}>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-4 my-2">
                    <img
                      src={createBlobUrl(item?.defaultImg?.data?.data, item?.contentType)}
                      alt=""
                      className="rounded-md"
                    />
                  </div>
                  <div className="col-span-6 my-auto">
                    <h5 className="font-bold text-gray-600">{item?.name}</h5>
                    <p className="text-gray-600">
                      Dimension {item?.minDimension} - {item?.maxDimension}
                    </p>
                  </div>
                  <div className="col-span-2 my-auto font-semibold">{item?.price} €</div>
                  <div>
                    <hr />
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-auto">
              <p className="text-gray-600 underline">Notiz hinzufügen</p>
              <p className="text-gray-600 mt-1">
                inkl. MwSt, der Versand wird an der Kasse berechnet
              </p>
              <Link to="/pages/cart">
                <button className="site-button w-full py-3 flex mt-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-lock"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <p className="ml-auto">ZUR KASSE</p> <p className="mx-4">-</p>
                  <p className="mr-auto">{totalCartPrice} €</p>
                  {loading && (
                    <div className="ml-2 mt-1 animate-spin rounded-full h-4 w-4 border-t-4 border-white border-solid"></div>
                  )}
                </button>
              </Link>
              {/* <button
                onClick={
                  auth?.authUser ? createCheckoutSession : handleRedirectToLogin
                }
                className="site-button w-full py-3 flex mt-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-lock"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <p className="ml-auto">ZUR KASSE</p> <p className="mx-4">-</p>
                <p className="mr-auto">{totalCartPrice} €</p>
                {loading && (
                  <div className="ml-2 mt-1 animate-spin rounded-full h-4 w-4 border-t-4 border-white border-solid"></div>
                )}
              </button> */}
            </div>
          </>
        ) : (
          <div className=" justify-center text-center mt-[60%]">
            <p>Dein Warenkorb ist leer</p>
            <button className="site-button mt-5">jetzt konfigurieren</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
