import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // useLocation,
import Layout from "../../../Layouts/Layout";
import { AllCategory, DeleteSingleCategory } from "../../../api/api";
import AdminSideBar from "../../../components/admin/AdminSideBar";
import WelcomeTopBar from "../../../components/admin/WelcomeTopBar";
import Loader from "../../../components/loaders/Loader";

const Collections = () => {
  const auth = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false)
  const [selectedDelete, setSelectedDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const getAllCategories = async () => {
    setLoading(true);
    const { data, error } = await AllCategory();
    if (data) {
      setLoading(false);
      setCategories(data?.categories);
    } else if (error) {
      toast.error(error?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleDeleteCategory = (e) => {
    setDeleteModal(true);
    setSelectedDelete(e);
  };

  const logoutUser = () => {
    localStorage.setItem("schrankdesign-app-user-token", null);
    navigate("/");
  };
  const deleteCategory = async (flag) => {
    setDeleteLoading(true);
    const { data, error } = await DeleteSingleCategory(selectedDelete, {confirmFlag: flag});
    if (data) {
      setDeleteLoading(false);
      getAllCategories();
      setDeleteModal(false);
      setConfirmModal(false)
      toast.success(data?.message);
    } else if (error) {
      setDeleteLoading(false);
      setDeleteModal(false);
      setConfirmModal(true)
    }
  };

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
            <AdminSideBar />
          </div>
          <div className="col-span-12 lg:col-span-10">
            <div className="flex">
              <Link
                to="/dashboard/admin/collections/create"
                className="ml-auto "
              >
                <button className="site-button py-1.5 px-3 md:py-2 md:px-4 hover:px-5 transition-all duration-300 text-sm">
                  Create
                </button>
              </Link>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg lg:w-[100%] mx-auto mt-5">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Banner Image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Update
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Delete
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {categories &&
                    categories?.map((item) => (
                      <tr
                        key={item?._id}
                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {item?.name}
                        </th>
                        <td className="px-6 py-4">
                          <img
                            src={item?.image?.data}
                            alt=""
                            className="w-10 h-10 rounded-full"
                          />
                        </td>
                        <td className="px-6 py-4">
                          {item?.bannerImage && (
                            <img
                              src={item?.bannerImage?.data}
                              alt=""
                              className="w-10 h-10 rounded-full"
                            />
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            to={`/dashboard/admin/collection/update/${item?._id}`}
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
                                className="lucide lucide-refresh-ccw"
                              >
                                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                <path d="M3 3v5h5" />
                                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                                <path d="M16 16h5v5" />
                              </svg>
                            </button>
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDeleteCategory(item?._id)}
                            className="px-3 py-1.5 rounded-md text-red-500 hover:bg-red-700 hover:text-white :bg-red-700 transition-all duration-300"
                          >
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
                              className="lucide lucide-trash-2"
                            >
                              <path d="M3 6h18" />
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                              <line x1="10" x2="10" y1="11" y2="17" />
                              <line x1="14" x2="14" y1="11" y2="17" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {categories?.length < 1 && (
                <div className="flex my-5">
                  <h3 className="font-semibold mx-auto text-gray-700 italic">
                    Sorry No Categories Found
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      {deleteModal && (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white rounded-lg shadow-lg p-6 h-auto w-[80%] md:w-[60%] lg:w-[40%] 2xl:w-[30%] overflow-y-auto z-50">
              <div className="flex">
                <h1 className="flex text-xl md:text-2xl lg:text-2xl mx-auto font-semibold">
                  Are you sure?
                </h1>
              </div>
              <div className="flex mt-10">
                <button
                  onClick={ () => {
                    deleteCategory(false)
                  }}
                  className="site-button ml-auto mr-3 py-2 px-4 hover:px-5  text-sm font-normal flex"
                >
                  Yes
                  {deleteLoading && (
                    <div className="ml-2 mt-1 animate-spin rounded-full h-4 w-4 border-t-4 border-white border-solid"></div>
                  )}
                </button>
                <button
                  onClick={() => setDeleteModal(false)}
                  className="site-button mr-auto ml-3 py-2 px-4 hover:px-5  text-sm font-normal bg-red-500 hover:bg-red-700"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {confirmModal && (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white rounded-lg shadow-lg p-6 h-auto w-[80%] md:w-[60%] lg:w-[40%] 2xl:w-[30%] overflow-y-auto z-50">
              <div className="flex">
                <h1 className="flex text-xl md:text-2xl lg:text-2xl mx-auto font-semibold">
                  There is some products in this category.
                  Are you sure?
                </h1>
              </div>
              <div className="flex mt-10">
                <button
                  onClick={ () => {
                    deleteCategory(true)
                  }}
                  className="site-button ml-auto mr-3 py-2 px-4 hover:px-5  text-sm font-normal flex"
                >
                  Yes
                  {deleteLoading && (
                    <div className="ml-2 mt-1 animate-spin rounded-full h-4 w-4 border-t-4 border-white border-solid"></div>
                  )}
                </button>
                <button
                  onClick={() => setConfirmModal(false)}
                  className="site-button mr-auto ml-3 py-2 px-4 hover:px-5  text-sm font-normal bg-red-500 hover:bg-red-700"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Collections;
