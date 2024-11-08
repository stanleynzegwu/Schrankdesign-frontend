// import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { removeFromMusterBasket } from "../../store/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const MusterCheckoutModel = ({ show, close }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storeMusterCart = useSelector((state) => state.basket.musterItems);
  // const firstItemCategory = storeMusterCart.length > 0 ? storeMusterCart[0].category : undefined;

  const removemuster = (id) => {
    dispatch(removeFromMusterBasket({ id: id }));
  };
  const handleButtonClick = () => {
    navigate("/pages/checkout"); // Use navigate function to navigate to the desired path
  };

  const calculateTotalPrice = () => {
    const additionalItemCost = 2; // Cost for each item beyond the first 4

    // Filter items based on category ("Holz-Furniere")
    const holzFurniereItems = storeMusterCart.filter(
      (item) => item.category === "Holz-Furniere"
    );

    // If there are items with "Holz-Furniere" category, calculate their actual price
    if (holzFurniereItems.length > 0) {
      const actualHolzFurnierePrice = holzFurniereItems.reduce(
        (total, item) => total + item.price,
        0
      );

      // Calculate the default price for the other remaining items
      const remainingItems = storeMusterCart.filter(
        (item) => item.category !== "Holz-Furniere"
      );

      const basePrice = 0; // Set your base price here
      // const firstFourItems = remainingItems.slice(0, 4);
      const extraItems = remainingItems.slice(4);
      const extraItemsCost = extraItems.length * additionalItemCost;

      // Calculate the grand total
      return actualHolzFurnierePrice + basePrice + extraItemsCost;
    }

    // If there are no "Holz-Furniere" items, calculate the price based on the default logic
    const basePrice = 0; // Set your base price here
    // const firstFourItems = storeMusterCart.slice(0, 4);
    const extraItems = storeMusterCart.slice(4);
    const extraItemsCost = extraItems.length * additionalItemCost;

    // Calculate the grand total
    return basePrice + extraItemsCost;
  };

  return (
    <>
      <div
        className={`${
          show ? "" : "hidden"
        } custom-shadow  rounded-2xl fixed top-1/2 transform -translate-y-1/2 right-2 z-40 h-80 overflow-y-auto duration-700 flex flex-col bg-white w-[90%] lg:w-[30%] text-gray-900 transition-all`}
      >
        <div className="">
          <div className="p-4 flex justify-between border-b border-solid border-green-700 rounded-t">
            <h1 className="text-md font-bold  ">Muster Auswahl</h1>
            <svg
              fill="#000000"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 32.071 32.071"
              onClick={close}
            >
              <g>
                <path
                  d="M31.436,31.435c-0.846,0.848-2.217,0.848-3.062,0l-6.168-6.168l-0.254,3.13c-0.045,0.533-0.276,1.008-0.627,1.357
                    c-0.435,0.434-1.05,0.682-1.707,0.627c-1.192-0.097-2.082-1.143-1.983-2.334l0.635-7.797c0.088-1.06,0.926-1.896,1.981-1.984
                    l7.798-0.635c1.19-0.095,2.237,0.791,2.334,1.985c0.098,1.189-0.791,2.234-1.982,2.334l-3.129,0.253l6.168,6.168
                    C32.281,29.219,32.281,30.591,31.436,31.435z M12.454,1.69c-0.658-0.054-1.272,0.193-1.707,0.627
                    c-0.352,0.351-0.582,0.822-0.627,1.354L9.864,6.802L3.698,0.636C2.852-0.212,1.48-0.211,0.636,0.634
                    c-0.846,0.848-0.846,2.219,0,3.064l6.166,6.167L3.673,10.12c-1.191,0.098-2.08,1.143-1.982,2.334
                    c0.096,1.193,1.141,2.08,2.334,1.984l7.797-0.634c1.055-0.086,1.896-0.927,1.982-1.985l0.635-7.797
                    C14.534,2.833,13.646,1.788,12.454,1.69z M11.819,18.269l-7.797-0.636c-1.191-0.096-2.236,0.792-2.334,1.984
                    c-0.055,0.659,0.193,1.271,0.627,1.707c0.352,0.35,0.826,0.583,1.357,0.628l3.131,0.253l-6.167,6.169
                    c-0.846,0.846-0.846,2.217,0,3.062c0.846,0.848,2.217,0.849,3.062,0l6.168-6.166l0.254,3.128c0.099,1.192,1.144,2.08,2.334,1.983
                    c1.195-0.098,2.08-1.143,1.984-2.334l-0.635-7.797C13.716,19.196,12.877,18.355,11.819,18.269z M20.25,13.805l7.798,0.635
                    c1.19,0.097,2.235-0.791,2.334-1.983c0.055-0.66-0.193-1.273-0.627-1.708c-0.353-0.35-0.822-0.582-1.355-0.627l-3.131-0.255
                    L31.435,3.7c0.848-0.846,0.848-2.217,0.002-3.062c-0.848-0.847-2.219-0.847-3.064,0l-6.166,6.167L21.95,3.676
                    c-0.098-1.193-1.143-2.081-2.334-1.983c-1.191,0.097-2.08,1.142-1.982,2.333l0.633,7.798C18.352,12.878,19.191,13.716,20.25,13.805
                    z"
                />
              </g>
            </svg>
          </div>
        </div>
        <div className="mb-6 flex-grow">
          <div className="p-3">
            <ul>
              {storeMusterCart &&
                storeMusterCart?.map((item, index) => (
                  <li key={item.id} className="flex ">
                    <svg
                      fill="#39912A"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 30 30"
                      width="20px"
                      height="20px"
                      onClick={() => {
                        removemuster(item.id);
                      }}
                    >
                      {" "}
                      <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M16.414,15 c0,0,3.139,3.139,3.293,3.293c0.391,0.391,0.391,1.024,0,1.414c-0.391,0.391-1.024,0.391-1.414,0C18.139,19.554,15,16.414,15,16.414 s-3.139,3.139-3.293,3.293c-0.391,0.391-1.024,0.391-1.414,0c-0.391-0.391-0.391-1.024,0-1.414C10.446,18.139,13.586,15,13.586,15 s-3.139-3.139-3.293-3.293c-0.391-0.391-0.391-1.024,0-1.414c0.391-0.391,1.024-0.391,1.414,0C11.861,10.446,15,13.586,15,13.586 s3.139-3.139,3.293-3.293c0.391-0.391,1.024-0.391,1.414,0c0.391,0.391,0.391,1.024,0,1.414C19.554,11.861,16.414,15,16.414,15z" />
                    </svg>
                    <p className="ml-2">
                      {item.name}{" "}
                      {item.category === "Holz-Furniere"
                        ? item.price
                        : index < 4
                        ? 0
                        : 2}{" "}
                      €
                    </p>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="p-4 flex justify-between border-t border-green-700">
          <button
            className="bg-black hover:bg-black text-white font-bold py-2 px-4 rounded"
            onClick={handleButtonClick}
          >
            Bestellen
          </button>

          <p className="text-md font-bold ">
            Gesamt {calculateTotalPrice().toFixed(2)} €
          </p>
        </div>
      </div>
    </>
  );
};

export default MusterCheckoutModel;
