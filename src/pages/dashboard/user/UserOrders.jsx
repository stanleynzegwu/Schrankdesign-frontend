import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../../Layouts/Layout";
import { GetSingleUserOrders } from "../../../api/api";
import WelcomeTopBar from "../../../components/admin/WelcomeTopBar";
import Loader from "../../../components/loaders/Loader";
import UserSideBar from "../../../components/user/UserSideBar";

const UserOrders = () => {
  const auth = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);

  const logoutUser = () => {
    localStorage.setItem("schrankdesign-app-user-token", null);
    navigate("/");
  };
  const getUserOrders = async () => {
    setLoading(true);
    const { data, error } = await GetSingleUserOrders();
    if (data) {
      setLoading(false);
      setOrders(data?.orders);
    } else if (error) {
      toast.error(error?.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <Layout>
      {loading && <Loader />}
      <div className="w-[90%] mx-auto rounded-2xl shadow-2xl my-5 p-5 md:p-10 text-black">
        <WelcomeTopBar
          auth={auth}
          logoutUser={logoutUser}
          dispatch={dispatch}
          link={"/dashboard/admin/profile"}
        />
        <div className="mt-5 grid grid-cols-12 lg:gap-10">
          <div className="lg:col-span-2">
            <UserSideBar />
          </div>
          <div className="col-span-12 lg:col-span-10">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg lg:w-[100%] mx-auto mt-5">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Your Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      No of Products
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Amount Paid
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Details
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {orders &&
                    orders?.map((item) => (
                      <tr
                        key={item?._id}
                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {item?.user?.name}
                        </th>
                        <td className="px-6 py-4">{item?.products?.length}</td>
                        <td className="px-6 py-4">{item?.status}</td>
                        <td className="px-6 py-4 text-[#5a8560] font-semibold">
                          {item?.totalAmount}
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            to={`/dashboard/user/orders/detail/${item?._id}`}
                          >
                            <button className="px-3 py-1.5 rounded-md text-[#5a8560] hover:bg-[#5a8560] hover:text-white :bg-red-700 transition-all duration-300">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-truck"
                              >
                                <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" />
                                <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2" />
                                <circle cx="7" cy="18" r="2" />
                                <path d="M15 18H9" />
                                <circle cx="17" cy="18" r="2" />
                              </svg>
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {orders?.length < 1 && (
                <div className="flex my-5">
                  <h3 className="font-semibold mx-auto text-gray-700 italic">
                    Sorry No Orders Found
                  </h3>
                </div>
              )}
            </div>
            <div className="flex mt-4">
              <p className="ml-auto font-semibold text-base italic text-gray-600">
                Showing {orders && orders.length} Orders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserOrders;
