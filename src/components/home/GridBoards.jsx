import React from "react";
import { Zoom } from "react-awesome-reveal";
const GridBoards = () => {
  return (
    <>
      <div className="p-5 mt-4 md:mt-10">
        <div className="md:w-[90%] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10">
            {/* 1st column */}
            <div className="relative cursor-pointer image-zoom">
              <img
                src="/images/home/grid_baord_1.webp"
                alt=""
                className="rounded-3xl"
              />
              <div className="bg-black opacity-30 absolute inset-0 rounded-3xl"></div>
              <div className="absolute inset-0 rounded-3xl flex justify-center items-center">
                <Zoom triggerOnce={true}>
                  <h1 className="text-white text-3xl font-bold">Kommoden</h1>
                </Zoom>
              </div>
            </div>
            {/* 2nd column */}
            <div className="grid gap-4 lg:gap-10">
              {/* top */}
              <div className="relative cursor-pointer image-zoom">
                <img
                  src="/images/home/grid_board_2.webp"
                  alt=""
                  className="rounded-3xl"
                />
                <div className="bg-black opacity-30 absolute inset-0 rounded-3xl"></div>
                <div className="absolute inset-0 rounded-3xl flex justify-center items-center">
                  <Zoom triggerOnce={true}>
                    <h1 className="text-white text-3xl font-bold">
                      Sideboards
                    </h1>
                  </Zoom>
                </div>
              </div>
              {/* bottom */}
              <div className="relative cursor-pointer image-zoom">
                <img
                  src="/images/home/grid_board_3.webp"
                  alt=""
                  className="rounded-3xl"
                />
                <div className="bg-black opacity-30 absolute inset-0 rounded-3xl"></div>
                <div className="absolute inset-0 rounded-3xl flex justify-center items-center">
                  <Zoom triggerOnce={true}>
                    <h1 className="text-white text-3xl font-bold">Lowboards</h1>
                  </Zoom>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GridBoards;
