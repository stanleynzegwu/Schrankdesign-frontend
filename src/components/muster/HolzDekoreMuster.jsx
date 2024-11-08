import { useState } from "react";
import { holzDekoreData } from "./MusterData";
import {
  addToMusterBasket,
  removeFromMusterBasket,
} from "../../store/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import MusterCheckoutModel from "../modals/MusterCheckoutModel";

const HolzDekoreMuster = () => {
  const dispatch = useDispatch();
  const [HolzDekoreactiveSlide, setHolzDekoreactiveSlide] = useState(0);
  const [seltectedHolzDekore, setSelectedHolzDekore] = useState({});
  const [selectedholzDekoreItem, setSelectedholzDekoreItem] = useState(
    holzDekoreData.length > 0 ? holzDekoreData[0].id : null
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = (id) => {
    const checkbox = document.getElementById(`HDcheckbox-${id}`);
    if (seltectedHolzDekore) {
      handleselectedHolzDekore(id);
    }
    if (checkbox.checked) {
      const newMusteritem = holzDekoreData.find((item) => item.id === id);
      dispatch(addToMusterBasket(newMusteritem));
      setModalOpen(true);
    } else {
      dispatch(removeFromMusterBasket({ id: id }));
    }
  };

  // const openModal = (id) => {
  //
  //   const checkbox = document.getElementById(`link-checkbox-${id}`); // Adjust the ID to be unique
  //   if (seltectedHolzDekore) {
  //     handleselectedHolzDekore(id);
  //   }
  //   if (checkbox.checked) {
  //

  //     const newMusteritem = holzDekoreData.find((item) => item.id === id);
  //     dispatch(addToMusterBasket(newMusteritem));

  //     setModalOpen(true);
  //   } else {
  //     dispatch(removeFromMusterBasket({ id: id }));
  //   }
  // };
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleHolzDekoreSlideButtonClick = (index) => {
    setHolzDekoreactiveSlide(index);
  };
  const handleselectedHolzDekore = (id) => {
    const selectHolzDekore = holzDekoreData.find((item) => item.id === id);
    setSelectedholzDekoreItem(id);

    setSelectedHolzDekore(selectHolzDekore);
  };
  return (
    <>
      {" "}
      <div className="mt-24">
        <div className="">
          <p className="text-xl text-gray-800 font-bold ml-8">Holz-Dekore</p>
        </div>
        <div className="grid  md:grid-cols-12 pt-1 pl-5 pr-5 pb-5">
          <div className="w-full md:col-span-5  p-3">
            <div className="p-3  bg-white border border-gray rounded-2xl custom-shadow">
              <div
                id="indicators-carousel"
                className="relative w-full "
                data-carousel="static"
              >
                {/* Carousel wrapper */}
                <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                  {/* Item 1 */}
                  <div
                    className={`duration-700 ease-in-out ${
                      HolzDekoreactiveSlide === 0 ? "block" : "hidden"
                    }`}
                    data-carousel-item="active"
                  >
                    <img
                      src={
                        seltectedHolzDekore.image || holzDekoreData[0]?.image
                      }
                      className="hover:scale-125 transition-all duration-500 cursor-pointer absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                      alt="missing"
                    />
                  </div>
                  {/* Item 2 */}
                  <div
                    className={`duration-700 ease-in-out ${
                      HolzDekoreactiveSlide === 1 ? "block" : "hidden"
                    }`}
                    data-carousel-item
                  >
                    <img
                      src={
                        seltectedHolzDekore.image2 || holzDekoreData[0]?.image2
                      }
                      className="hover:scale-125 transition-all duration-500 cursor-pointer absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                      alt="..."
                    />
                  </div>
                </div>
                {/* Slider indicators */}
                <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
                  <button
                    type="button"
                    className={`w-3 h-3 rounded-full bg-black ${
                      HolzDekoreactiveSlide === 0 ? "opacity-100" : "opacity-50"
                    }`}
                    aria-current="true"
                    aria-label="Slide 1"
                    onClick={() => handleHolzDekoreSlideButtonClick(0)}
                  />
                  <button
                    type="button"
                    className={`w-3 h-3 rounded-full bg-black ${
                      HolzDekoreactiveSlide === 1 ? "opacity-100" : "opacity-50"
                    }`}
                    aria-current="true"
                    aria-label="Slide 2"
                    onClick={() => handleHolzDekoreSlideButtonClick(1)}
                  />
                </div>
              </div>
              <div className="p-5">
                <p className="text-center font-bold text-xl">
                  {seltectedHolzDekore.name || holzDekoreData[0]?.name} Dekore
                </p>
                <div className="p-4 flex justify-between">
                  <div className="text-center">
                    <img
                      src="/images/muster/2.webp"
                      alt="missing"
                      className="w-1/3 h-auto ml-10"
                    />
                    <p className="mt-2 text-sm">Dezente Struktur</p>
                  </div>
                  <div className="text-center">
                    <img
                      src="/images/muster/3.webp"
                      alt="missing"
                      className="w-1/3 h-auto ml-10"
                    />
                    <p className="mt-2 text-sm">Matt Effekt</p>
                  </div>
                  <div className="text-center">
                    <img
                      src="/images/muster/1.webp"
                      alt="missing"
                      className="w-1/3 h-auto ml-10"
                    />
                    <p className="mt-2 text-sm">Langlebiges Dekor</p>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    className="w-1/2 focus:outline-none text-white bg-[#547C5A] hover:bg-[#547C5A] focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    <span className="text-lg font-bold"> Muster Bestellen</span>
                  </button>
                </div>
                <div className="text-center flex justify-center items-center mt-10 mb-14">
                  <img
                    src="/images/muster/arrow.webp"
                    alt=""
                    className="w-1/12 h-auto mx-1"
                    onClick={() => handleHolzDekoreSlideButtonClick(0)}
                  />

                  <img
                    src="/images/muster/right-arrow.webp"
                    alt=""
                    className="w-1/12 h-auto mx-1"
                    onClick={() => handleHolzDekoreSlideButtonClick(1)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:col-span-7 ml-5">
            <div className="p-4">
              <div className="grid md:grid-cols-12 gap-4">
                {holzDekoreData.map((item) => (
                  <div key={item.id} className="w-full col-span-3">
                    <div className="mb-2 text-center">
                      <div className="relative">
                        <img
                          className={`w-full rounded-xl ${
                            selectedholzDekoreItem === item.id
                              ? "border border-black border-2"
                              : ""
                          }`}
                          src={item.image}
                          alt="dummy-image"
                          onClick={() => {
                            handleselectedHolzDekore(item.id);
                          }}
                        />
                        <div className="absolute bottom-0 right-0 text-white p-2 rounded ">
                          <input
                            id={`HDcheckbox-${item.id}`}
                            type="checkbox"
                            defaultChecked={false}
                            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded"
                            onChange={() => openModal(item.id)}
                          />
                        </div>
                      </div>
                      <p className="mt-2 text-sm">{item.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <MusterCheckoutModel show={isModalOpen} close={closeModal} />
    </>
  );
};

export default HolzDekoreMuster;
