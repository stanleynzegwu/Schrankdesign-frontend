import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImpressumModal from "../../components/modals/ImpressumModal";
import DatenschutzerklärungModal from "../../components/modals/DatenschutzerklärungModal";
import VersandModal from "../../components/modals/VersandModal";
import AGBModal from "../../components/modals/AGBModal";
import WiderrufsrechtModa from "../../components/modals/WiderrufsrechtModa";
import { IoBagHandleOutline } from "react-icons/io5";
import CheckOutForm from "../../components/Form/checkOutForm";
import { useSelector } from "react-redux";
import { PayPalButtons } from "@paypal/react-paypal-js";
import Paypal from "../../components/Payments/Paypal";
import GooglePayButton from "@google-pay/button-react";
import Klarna from "../../components/Payments/Klarna";

const Checkout = () => {
  const storeMusterCart = useSelector((state) => state.basket.musterItems);
  const storeCart = useSelector((state) => state.basket.items);
  const initialCounts = JSON.parse(localStorage.getItem("productCounts")) || {};
  const [grandTotalPrice, setGrandTotalPrice] = useState("");
  const [productCounts, setProductCounts] = useState(initialCounts);

  const totalCartProductPrice = storeCart.reduce((accumulator, currentItem) => {
    const count = productCounts[currentItem.id] || 1;
    return accumulator + count * currentItem.price;
  }, 0);
  const [isImpressumModalOpen, setIsImpressumModalOpen] = useState(false);
  const [isAGBModalOpen, setIsAGBModalOpen] = useState(false);
  const [isWiderrufsrechtModalOpen, setIsWiderrufsrechtModalOpen] = useState(false);
  const [isDatenschutzerklärungModalOpen, setIsDatenschutzerklärungModalOpen] = useState(false);
  const [isVersandModalOpen, setIsVersandModalOpen] = useState(false);
  const [data, setData] = useState({
    productname: "",
    prouductprice: "",
  });
  useEffect(() => {
    if (storeMusterCart.length > 0 || storeCart.length > 0) {
      // Concatenate names from both storeMusterCart and storeCart
      const allProductNames = [
        ...storeMusterCart.map((item) => item.name),
        ...storeCart.map((item) => item.name),
      ];

      // Combine the names into a single string
      const productName = allProductNames.join(", ");

      // Calculate the total price based on your logic (e.g., grandTotalPrice)
      const productPrice = calculateTotalMusterPrice() + totalCartProductPrice;

      setData({
        productname: productName,
        prouductprice: productPrice,
      });
    }
  }, [storeMusterCart, storeCart]);

  // CALCULATE MUSTER ITEMS  PRICE
  const calculateTotalMusterPrice = () => {
    const additionalItemCost = 2; // Cost for each item beyond the first 4

    // Filter items based on category ("Holz-Furniere")
    const holzFurniereItems = storeMusterCart.filter((item) => item.category === "Holz-Furniere");

    // If there are items with "Holz-Furniere" category, calculate their actual price
    if (holzFurniereItems.length > 0) {
      const actualHolzFurnierePrice = holzFurniereItems.reduce(
        (total, item) => total + item.price,
        0
      );

      // Calculate the default price for the other remaining items
      const remainingItems = storeMusterCart.filter((item) => item.category !== "Holz-Furniere");

      const basePrice = 0; // Set your base price here
      const firstFourItems = remainingItems.slice(0, 4);
      const extraItems = remainingItems.slice(4);
      const extraItemsCost = extraItems.length * additionalItemCost;

      // Calculate the grand total
      return actualHolzFurnierePrice + basePrice + extraItemsCost;
    }

    // If there are no "Holz-Furniere" items, calculate the price based on the default logic
    const basePrice = 0; // Set your base price here
    const firstFourItems = storeMusterCart.slice(0, 4);
    const extraItems = storeMusterCart.slice(4);
    const extraItemsCost = extraItems.length * additionalItemCost;

    // Calculate the grand total
    return basePrice + extraItemsCost;
  };

  const closeImpressumModalModal = () => {
    setIsImpressumModalOpen(false);
  };
  const closeAGBModalModal = () => {
    setIsAGBModalOpen(false);
  };
  const closeWiderrufsrechtModalModal = () => {
    setIsWiderrufsrechtModalOpen(false);
  };
  const closeDatenschutzerklärungModalModal = () => {
    setIsDatenschutzerklärungModalOpen(false);
  };
  const closeVersandModalModal = () => {
    setIsVersandModalOpen(false);
  };

  const handleWiderrufsrecht = () => {
    setIsWiderrufsrechtModalOpen(true);
  };
  const handleImpressum = () => {
    setIsImpressumModalOpen(true);
  };
  const handleAGB = () => {
    setIsAGBModalOpen(true);
  };
  const handleDatenschutzerklärung = () => {
    setIsDatenschutzerklärungModalOpen(true);
  };
  const handleVersand = () => {
    setIsVersandModalOpen(true);
  };

  useEffect(() => {
    setGrandTotalPrice(calculateTotalMusterPrice() + totalCartProductPrice);
  }, []);

  return (
    <>
      <div className="">
        <div className="dev-sec">
          <div>
            <Link to="/">
              <img
                src="/images/logo.avif"
                alt=""
                className="max-w-[170px] md:max-w-[255px] image-zoom cursor-pointer"
              />
            </Link>
          </div>

          <div>
            <Link to="/pages/cart">
              <IoBagHandleOutline />
            </Link>
          </div>
        </div>
      </div>

      <hr />
      <div className="flex">
        <div className="w-1/2 ">
          <div className="pl-10">
            <div className="pl-16 pr-10">
              <p className="text-center m-5 text-gray-500">Express Checkout</p>

              <div className=" flex_btn ">
                <button
                  className="bg-blue-700   text-white font-bold py-2 px-4 rounded h-14"
                  aria-label="Google Pay"
                  style={{ backgroundColor: "#4770EF" }}
                >
                  <span className="text-2xl" style={{ color: "white" }}>
                    Stripe
                  </span>
                </button>
                <div className="h-14">
                  <Paypal height="55" color="gold" data={data} />
                </div>
                <button
                  className=" flex   text-white font-bold py-3 px-4 rounded h-14"
                  aria-label="Google Pay"
                  style={{ backgroundColor: "black" }}
                >
                  <span className=" ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="27"
                      viewBox="0 0 24 24"
                      width="38"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                      <path d="M1 1h22v22H1z" fill="none" />
                    </svg>
                  </span>
                  <span className="text-2xl" style={{ color: "white" }}>
                    Pay
                  </span>
                </button>{" "}
                <button
                  className="bg-black   text-white font-bold py-2 px-4 rounded h-14 "
                  aria-label="Google Pay"
                >
                  <span className="text-2xl" style={{ color: "white" }}>
                    Klarna
                  </span>
                </button>
              </div>
              <div className="flex items-center mb-10">
                <div className="flex-1 border-t border-gray-300"></div>
                <p className="mx-2 text-center text-gray-500">ODER</p>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>
            </div>
            <CheckOutForm data={data} />
          </div>
          <div className=" mt-5 flex-1 border-t border-gray-300"></div>
          <div className=" flex justify-center p-5">
            <button className="ml-3 underline" onClick={handleWiderrufsrecht}>
              Widerrufsrecht
            </button>
            <button className="ml-3 underline" onClick={handleVersand}>
              Versand
            </button>
            <button className="ml-3 underline" onClick={handleDatenschutzerklärung}>
              Datenschutzerklärung
            </button>
            <button className="ml-3 underline" onClick={handleAGB}>
              AGB
            </button>
            <button className="ml-3 underline" onClick={handleImpressum}>
              Impressum
            </button>
          </div>
          <div>
            {/* Modal */}
            {isImpressumModalOpen && (
              <ImpressumModal show={isImpressumModalOpen} handleClose={closeImpressumModalModal} />
            )}
          </div>

          <div>
            {/* Modal */}
            {isDatenschutzerklärungModalOpen && (
              <DatenschutzerklärungModal handleClose={closeDatenschutzerklärungModalModal} />
            )}
          </div>

          <div>
            {/* Modal */}
            {isVersandModalOpen && <VersandModal handleClose={closeVersandModalModal} />}
          </div>

          <div>
            {/* Modal */}
            {isWiderrufsrechtModalOpen && (
              <WiderrufsrechtModa handleClose={closeWiderrufsrechtModalModal} />
            )}
          </div>

          <div>
            {/* Modal */}
            {isAGBModalOpen && <AGBModal handleClose={closeAGBModalModal} />}
          </div>
        </div>
        <div className="w-1/2  cart-p">
          {storeMusterCart ? (
            <>
              <div className="  ml-20 mr-24 mt-14 ">
                <div className="grid  md:grid-cols-12 pt-1  pr-5 pb-5">
                  {storeCart?.map((item, i) => (
                    <>
                      <div className="relative  w-full md:col-span-2  border-2 border-gray-300  mb-5 rounded-xl">
                        <div className="absolute top-0 right-0 px-3 py-2  inline-block -translate-y-1/2 translate-x-1/2  rounded-full bg-gray-400   text-white text-xs">
                          {productCounts[item.id] || 1}
                        </div>

                        <img className="rounded-xl" src={item.defaultImg} alt="missing" />
                      </div>
                      <div className="w-full md:col-span-8   pl-5 pt-5 text-gray-400 ">
                        {item.name}
                      </div>
                      <div className="w-full md:col-span-2    pt-5 ">
                        {item?.price * (productCounts[item.id] || 1)} €
                      </div>
                    </>
                  ))}
                  {storeMusterCart?.map((item, i) => (
                    <>
                      <div className="w-full md:col-span-2  border-2 border-gray-300  mb-5 rounded-xl">
                        <img className="rounded-xl" src={item.image} alt="" />
                      </div>
                      <div className="w-full md:col-span-8   pl-5 pt-5 text-gray-400 ">
                        {item.name}
                      </div>
                      <div className="w-full md:col-span-2    pt-5 ">{item.price}.00 €</div>
                    </>
                  ))}
                </div>
                <div className="grid  md:grid-cols-12   pr-5 pb-5">
                  <div className="  md:col-span-10    pt-5 ">
                    <input
                      type="email"
                      placeholder="Rabattcode"
                      className="peer h-full w-full rounded-[7px]  !border  !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50"
                    />
                  </div>
                  <div className="w-full md:col-span-2    pt-5 ">
                    <button
                      type="button"
                      className="ml-2 text-gray-900 bg-[#ECECEC] border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium  text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 "
                    >
                      Anwenden
                    </button>
                  </div>
                </div>

                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Zwischensumme</p>
                  <p>{grandTotalPrice} €</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Versand</p>
                  <p>Kostenlos</p>
                </div>
                <div className="flex justify-between mt-5">
                  <p className="text-lg font-bold">Summe</p>
                  <p className="font-bold ">{grandTotalPrice} €</p>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center p-10">
              <Klarna />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Checkout;
