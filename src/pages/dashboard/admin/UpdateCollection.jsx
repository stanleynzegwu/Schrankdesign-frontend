import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../Layouts/Layout";
import { GetSingleCategory, UpdateSingleCategory } from "../../../api/api";
import Loader from "../../../components/loaders/Loader";

const UpdateCollection = () => {
  const navigate = useNavigate();
  const parms = useParams();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [categoryTileImage, setCategoryTileImage] = useState("");
  const [categoryBannerImage, setCategoryBannerImage] = useState("");

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const formData = new FormData();
    formData.append("name", title);
    formData.append("image", image);
    if (bannerImage) {
      formData.append("bannerImage", bannerImage);
    }
    const { data, error } = await UpdateSingleCategory(parms?.id, formData);
    if (data) {
      toast.success(data?.message);
      setLoading(false);
      navigate("/dashboard/admin/collections");
    } else if (error) {
      setLoading(false);
      console.log("error");
      toast.error(error?.message);
    }
  };

  const getCategory = async () => {
    setPageLoading(true);
    const { data, error } = await GetSingleCategory(parms?.id);
    if (data) {
      setTitle(data?.category?.name);
      setCategoryTileImage(data?.category?.image);
      setCategoryBannerImage(data?.category?.bannerImage);
      setPageLoading(false);
    } else if (error) {
      console.log(error);
      setPageLoading(true);
    }
  };

  useEffect(() => {
    getCategory();
    //eslint-disable-next-line
  }, []);

  const createBlobUrl = (data, contentType) => {
    const byteArray = new Uint8Array(data);
    const blob = new Blob([byteArray], { type: contentType });
    return URL.createObjectURL(blob);
  };

  const renderTileImage = () => {
    if (categoryTileImage) {
      return (
        <img
          src={categoryTileImage?.data}
          alt="avatar"
          className="h-32 w-32 rounded"
        />
      );
    } else if (image) {
      return (
        <img
          src={URL.createObjectURL(image)}
          alt="avatar"
          className="h-32 w-32 rounded"
        />
      );
    } else {
      return (
        <img
          src="/images/avatar-.jpg"
          alt="avatar"
          className="h-32 w-32 rounded"
        />
      );
    }
  };

  const renderBannerImage = () => {
    if (categoryBannerImage) {
      return (
        <img
          src={categoryBannerImage?.data}
          alt="avatar"
          className="h-32 rounded"
        />
      );
    } else if (bannerImage) {
      return (
        <img
          src={URL.createObjectURL(bannerImage)}
          alt="avatar"
          className="h-32 rounded"
        />
      );
    } else {
      return (
        <img
          src="/images/avatar-.jpg"
          alt="avatar"
          className="h-32 w-32 rounded"
        />
      );
    }
  };

  const handleTileImageChange = (e) => {
    setImage(e.target.files[0]);
    setCategoryTileImage("");
  };
  const handleBannerImageChange = (e) => {
    setBannerImage(e.target.files[0]);
    setCategoryBannerImage("");
  };

  return (
    <Layout>
      {pageLoading && <Loader />}
      <div className="w-[90%] md:w-[60%] 2xl:w-[40%] p-10 pt-4 rounded-2xl mt-2 mb-5 shadow-2xl mx-auto">
        <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold">
          Update Collection
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-1">
          <div></div>
          <div>
            <form
              className="max-w-md mx-auto mt-10"
              onSubmit={handleRegisterSubmit}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-4">
                <div className="mb-4 col-span-12 lg:col-span-4">
                  <label
                    htmlFor="image"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select Tile Image
                  </label>
                  <div className="relative cursor-pointer">
                    {renderTileImage()}
                    <input
                      type="file"
                      alt="avatar"
                      className="absolute inset-0 opacity-0"
                      onChange={handleTileImageChange}
                    />
                  </div>
                </div>
                <div className="mb-4 col-span-12 lg:col-span-8">
                  <label
                    htmlFor="image"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select Banner Image
                  </label>
                  <div className="relative cursor-pointer">
                    {renderBannerImage()}
                    <input
                      type="file"
                      alt="avatar"
                      className="absolute inset-0 opacity-0"
                      onChange={handleBannerImageChange}
                    />
                  </div>
                </div>
              </div>

              <div className="relative z-0 w-full mb-5 group mt-4">
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label
                  htmlFor="name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Title
                </label>
              </div>

              <button
                type="submit"
                className="site-button py-2 px-4 hover:px-5 mt-3 flex"
              >
                Submit
                {loading && (
                  <div className="ml-2 mt-1 animate-spin rounded-full h-4 w-4 border-t-4 border-white border-solid"></div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateCollection;
