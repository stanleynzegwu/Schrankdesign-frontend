import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminSideBar = () => {
  const [active, setActive] = useState(false);
  const toggleNavbar = () => {
    setActive(!active);
  };

  return (
    <div>
      <div className="hidden lg:block">
        <ul className="space-y-4 font-medium">

          <Link to="/dashboard/admin/users">
            <li className="w-full pb-4 pt-2  border-b">
              <h4 className="text-xl font-semibold">Users</h4>
            </li>
          </Link>
          <Link to="/dashboard/admin/collections">
            <li className="w-full pb-4 pt-2  border-b">
              <h4 className="text-xl font-semibold">Collections</h4>
            </li>
          </Link>
          <Link to="/dashboard/admin/products">
            <li className="w-full pb-4 pt-2  border-b">
              <h4 className="text-xl font-semibold">Products</h4>
            </li>
          </Link>
          <Link to="/dashboard/admin/orders">
            <li className="w-full pb-4 pt-2  border-b">
              <h4 className="text-xl font-semibold">Orders</h4>
            </li>
          </Link>
          <a href="/dashboard/furniture-configurator/plates/home" target="_blank" rel="noopener noreferrer">
            <li className="w-full pb-4 pt-2  border-b">
              <h4 className="text-xl font-semibold">Configurator</h4>
            </li>
          </a>
        </ul>
      </div>
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
          </div>
        </div>
      </div>
      {/* ------------------------------- */}
      <div
        className={`${active === true ? "" : " -translate-x-full"
          } fixed top-0 left-0 z-40 h-screen p-4 pl-6 overflow-y-auto duration-700 bg-white w-[50%] text-gray-900 transition-all`}
      >
        <button
          type="button"
          onClick={(e) => setActive(false)}
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
            <Link to="/dashboard/admin">
              <li className="w-full pb-4 pt-2  border-b">
                <h4 className="text-xl font-semibold">Dashboard</h4>
              </li>
            </Link>
            <Link to="/dashboard/admin/users">
              <li className="w-full pb-4 pt-2 border-b">
                <h4 className="text-xl font-semibold">Users</h4>
              </li>
            </Link>
            <Link to="/dashboard/admin/collections">
              <li className="w-full pb-4 pt-2 border-b">
                <h4 className="text-xl font-semibold">Collecions</h4>
              </li>
            </Link>
            <Link to="/dashboard/admin/products">
              <li className="w-full pb-4 pt-2 border-b">
                <h4 className="text-xl font-semibold">Products</h4>
              </li>
            </Link>
            <Link to="/dashboard/admin/orders">
              <li className="w-full pb-4 pt-2 border-b">
                <h4 className="text-xl font-semibold">Orders</h4>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
