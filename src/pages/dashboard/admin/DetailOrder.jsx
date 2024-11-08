import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../../../Layouts/Layout";
import { GetSingleOrder } from "../../../api/api";
import Loader from "../../../components/loaders/Loader";

const DetailOrder = () => {
  const parms = useParams();

  const [products, setProducts] = useState(null);
  const [user, setUser] = useState(null);
  const [date, setDate] = useState(null);
  const [total, setTotal] = useState(null);
  const [order, setOrder] = useState(null);

  const [pageLoading, setPageLoading] = useState(false);

  const getOrder = async () => {
    setPageLoading(true);
    const { data, error } = await GetSingleOrder(parms?.id);
    if (data) {
      setUser(data?.orders?.user);
      setProducts(data?.orders?.products);
      const originalDate = new Date(data?.orders?.createdAt);
      const formattedDate = originalDate.toLocaleString();
      setDate(formattedDate);
      setTotal(data?.orders?.totalAmount);
      setOrder(data?.orders);
      setPageLoading(false);
    } else if (error) {
      console.log(error);
      setPageLoading(true);
    }
  };

  useEffect(() => {
    getOrder();
    //eslint-disable-next-line
  }, []);

  const createBlobUrl = (data, contentType) => {
    const byteArray = new Uint8Array(data);
    const blob = new Blob([byteArray], { type: contentType });
    return URL.createObjectURL(blob);
  };

  return (
    <Layout>
      {pageLoading && <Loader />}
      <div className="p-2 py-4 md:p-5 bg-gray-100">
        <div className="w-[95%] md:w-[90%] mx-auto">
          {/* -----------------------------------top row--------------------- */}
          <div className="flex">
            <div className="w-max bg-gray-200 rounded-lg px-2 flex items-center gap-2">
              <div className="bg-gray-700 p-1 rounded-full"></div>
              <div>Paid</div>
            </div>
            <div className="w-max bg-gray-200 rounded-lg px-2 flex items-center gap-2 ml-2">
              <div className="bg-gray-700 p-1 rounded-full"></div>
              <div>Executed</div>
            </div>
            <div className="w-max bg-gray-200 rounded-lg px-2 flex items-center gap-2 ml-2">
              <div className="bg-gray-700 p-1 rounded-full"></div>
              <div>Archived</div>
            </div>
          </div>
          <div className="mt-2 text-gray-600">{date}</div>
          {/* ---------------------------------------------------------------------------- */}
          <div className="mt-5">
            <div className="grid grid-cols-12 gap-4 md:gap-8">
              {/* right column mobile display */}
              <div className="col-span-12 md:col-span-4 block md:hidden">
                <div className="rounded-md bg-white shadow-xl p-3">
                  <div className="p-3">
                    <h5 className="font-semibold">Remarks</h5>
                    <p className="text-gray-600 mt-4">
                      No comments from the customer
                    </p>
                  </div>
                </div>
                <div className="rounded-md bg-white shadow-xl p-3 mt-3">
                  <div className="p-3">
                    <h5 className="font-semibold">Customer</h5>
                    <h4 className="mt-2 text-[#5a8560] font-semibold">
                      {user?.name}
                    </h4>
                    <p className="mt-1 text-gray-600">1 order</p>
                    {/* Customer Information */}
                    <div className="mt-4">
                      <div className="flex items-center">
                        <h5 className="font-semibold">Contact Information</h5>
                        <span className="ml-auto">
                          <Link
                            to={`/dashboard/admin/users/update/${user?._id}`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              class="lucide lucide-pencil"
                            >
                              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                              <path d="m15 5 4 4" />
                            </svg>
                          </Link>
                        </span>
                      </div>
                      <h4 className="mt-2 text-[#5a8560] font-semibold">
                        <Link to={`mailto:${user?.email}`}>{user?.email}</Link>
                      </h4>
                      <p className="mt-1 text-gray-600">No Telephone Number</p>
                    </div>
                    {/* Delivery Address */}
                    <div className="mt-4">
                      <h5 className="font-semibold">Delivery Address</h5>
                      <h4 className="mt-1 text-gray-500">
                        {order?.deliveryAddress}
                      </h4>
                    </div>
                    {/* Billing Address */}
                    <div className="mt-4">
                      <h5 className="font-semibold">Billing Address</h5>
                      <h4 className="mt-1 text-gray-500">
                        {order?.deliveryAddress === order?.billingAddress ? (
                          "Same as the Delivery Address"
                        ) : (
                          <>{order?.billingAddress}</>
                        )}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-8">
                {/* left 1st row */}
                <div className="rounded-md bg-white shadow-xl p-3">
                  {/* Paid with icon */}
                  <div className="flex text-sm bg-green-300 px-2 py-1 rounded-md w-max text-gray-500 font-semibold">
                    <span className="mr-1">
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
                        className="lucide lucide-truck"
                      >
                        <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" />
                        <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2" />
                        <circle cx="7" cy="18" r="2" />
                        <path d="M15 18H9" />
                        <circle cx="17" cy="18" r="2" />
                      </svg>
                    </span>
                    Paid
                  </div>
                  {/* Products Row */}
                  <div className="border border-gray-200 my-3 mt-4 rounded-md">
                    {products &&
                      products?.map((item) => (
                        <div
                          key={item?._id}
                          className="flex px-2 md:px-4 py-3 border-b-2"
                        >
                          {/* Left Section Image and title */}
                          <div className="">
                            <div className="flex">
                              <div className="">
                                <img
                                  src={createBlobUrl(
                                    item?.product?.defaultImage?.data?.data
                                  )}
                                  alt=""
                                  className="h-10 w-10 rounded-md"
                                />
                              </div>
                              <div className="ml-2 md:ml-4 flex items-center">
                                <p className="text-[#5a8560] text-sm font-semibold">
                                  {item?.product?.name}
                                </p>
                              </div>
                            </div>
                          </div>
                          {/* Center Section Price and Quantity */}
                          <div className="flex justify-between ml-auto">
                            € {item?.product?.price} * {item?.quantity}
                          </div>

                          {/* Total Price */}
                          <div className="ml-5 md:ml-10 lg:ml-20">
                            <p className="text-[#5a8560] font-semibold">
                              € {item?.product?.price}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                {/* left 2nd row */}
                <div className="rounded-md bg-white shadow-xl p-3 mt-5">
                  {/* Paid with icon */}
                  <div className="flex text-sm bg-gray-300 px-2 py-1 rounded-md w-max text-gray-500 font-semibold">
                    <span className="mr-1">
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
                        className="lucide lucide-truck"
                      >
                        <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" />
                        <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2" />
                        <circle cx="7" cy="18" r="2" />
                        <path d="M15 18H9" />
                        <circle cx="17" cy="18" r="2" />
                      </svg>
                    </span>
                    Paid
                  </div>
                  <div className="border border-gray-200 my-2 mt-4 rounded-md">
                    {/* Subtotal */}
                    <div className="flex justify-between px-4 pt-3 pb-2">
                      <div>
                        <h5>Subtotal</h5>
                      </div>
                      <div>{products?.length} items</div>
                      <div>€ {total}</div>
                    </div>
                    {/* Total */}
                    <div className="flex justify-between px-4 pt-2 pb-3">
                      <div>
                        <h5 className="font-semibold">In Total</h5>
                      </div>
                      <div className="font-semibold">€ {total}</div>
                    </div>
                    <hr />
                    <div className="flex justify-between px-4 py-3">
                      <div>
                        <h5>Paid by customer</h5>
                      </div>
                      <div>€ {total}</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* right coloumn */}
              <div className="col-span-12 md:col-span-4 hidden md:block">
                <div className="rounded-md bg-white shadow-xl p-3">
                  <div className="p-3">
                    <h5 className="font-semibold">Remarks</h5>
                    <p className="text-gray-600 mt-4">
                      No comments from the customer
                    </p>
                  </div>
                </div>
                <div className="rounded-md bg-white shadow-xl p-3 mt-3">
                  <div className="p-3">
                    <h5 className="font-semibold">Customer</h5>
                    <h4 className="mt-2 text-[#5a8560] font-semibold">
                      {user?.name}
                    </h4>
                    <p className="mt-1 text-gray-600">1 order</p>
                    {/* Customer Information */}
                    <div className="mt-4">
                      <div className="flex items-center">
                        <h5 className="font-semibold">Contact Information</h5>
                        <span className="ml-auto">
                          <Link
                            to={`/dashboard/admin/users/update/${user?._id}`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              class="lucide lucide-pencil"
                            >
                              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                              <path d="m15 5 4 4" />
                            </svg>
                          </Link>
                        </span>
                      </div>
                      <h4 className="mt-2 text-[#5a8560] font-semibold">
                        <Link to={`mailto:${user?.email}`}>{user?.email}</Link>
                      </h4>
                      <p className="mt-2 text-gray-600">No Telephone Number</p>
                    </div>
                    {/* Delivery Address */}
                    <div className="mt-4">
                      <h5 className="font-semibold">Delivery Address</h5>
                      <h4 className="mt-1 text-gray-500">
                        {order?.deliveryAddress}
                      </h4>
                    </div>
                    {/* Billing Address */}
                    <div className="mt-4">
                      <h5 className="font-semibold">Billing Address</h5>
                      <h4 className="mt-1 text-gray-500">
                        {order?.deliveryAddress === order?.billingAddress ? (
                          "Same as the Delivery Address"
                        ) : (
                          <>{order?.billingAddress}</>
                        )}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailOrder;
