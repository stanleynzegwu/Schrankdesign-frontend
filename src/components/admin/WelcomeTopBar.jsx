// TopBar.js
import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../store/features/user/userSlice";
import { useSelector } from "react-redux";

const WelcomeTopBar = ({ auth, logoutUser, dispatch, link }) => {
  const image = useSelector((state) => state.user.user?.image);
  const createBlobUrl = (data, contentType) => {
    const byteArray = new Uint8Array(data);
    const blob = new Blob([byteArray], { type: contentType });
    return URL.createObjectURL(blob);
  };
  return (
    <>
      <div className="flex items-center">
        <div className="ml-auto">
          <Link to={link}>
            <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer">
              <img src={createBlobUrl(image)} alt="" />
            </div>
          </Link>
        </div>
        <button
          onClick={() => {
            logoutUser();
            dispatch(logout());
          }}
          className="mx-2 md:mx-4 site-button py-1 md:py-1.5 px-2 md:px-3 hover:px-4 text-sm cursor-pointer"
        >
          Logout
        </button>
      </div>
      <div className="flex mx-auto mt-4">
        <h3 className="text-2xl md:text-3xl mx-auto">
          Welcome,{" "}
          {auth && (
            <span className="text-[#5a8560] font-semibold">{auth?.name}</span>
          )}
        </h3>
      </div>
    </>
  );
};

export default WelcomeTopBar;
