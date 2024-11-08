import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{zIndex: 1000000000000000}}>
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="">
        <div className="animate-spin rounded-full border-t-4 border-white border-opacity-50 h-14 w-14"></div>
      </div>
    </div>
  );
};

export default Loader;
