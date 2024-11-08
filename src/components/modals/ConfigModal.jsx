import React from "react";

const ConfigModal = React.memo(function  ConfigModal({setAction, setModal }) {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50" style={{zIndex: 10000000000000000}}>
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-[#D9D9D9] border border-red-600 rounded-lg shadow-lg p-6 h-auto w-[80%] md:w-[60%] lg:w-[40%] 2xl:w-[30%] overflow-y-auto z-50">
          <div className="flex justify-center">
            <img src="/images/info.png"></img>
          </div>
          <div className="flex justify-center text-xl">
              Do you really want to load a new configuration?
          </div>
          <div className="flex mt-10">
            <button
              onClick={() =>setAction(true)}
              className="site-button ml-auto mr-3 py-2 px-4 hover:px-5  text-sm font-normal"
            >
              Yes
            </button>
            <button
              onClick={() => setModal(false)}
              className="site-button mr-auto ml-3 py-2 px-4 hover:px-5  text-sm font-normal"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
});

export default ConfigModal;
