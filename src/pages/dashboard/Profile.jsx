import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Layouts/Layout";
import { SingleUser, SingleUserUpdate } from "../../api/api";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/features/user/userSlice";
import { Fade } from "react-awesome-reveal";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const path = useLocation();
  const newPath = path?.pathname?.split("/");
  const result = newPath.slice(0, 3).join("/");

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [playerImage, setPlayerImage] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await SingleUser();
      if (data) {
        setName(data?.user?.name);
        setAnswer(data?.user?.answer);
        setPlayerImage(data?.user?.image);
      } else if (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      toast.error(`Password didn't matched`);
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("password", password);
    formData.append("answer", answer);
    formData.append("photo", image);

    const { data, error } = await SingleUserUpdate(formData);
    if (data) {
      setLoading(false);
      toast.success(data?.message);
      dispatch(
        updateUser({
          name: data?.updateUser?.name,
          email: data?.updateUser?.email,
          image: data?.updateUser?.image?.data?.data,
        })
      );
      navigate(result);
      //   location.reload();
    } else if (error) {
      setLoading(false);
      console.log("error");
      toast.error(error?.message);
    }
  };

  const createBlobUrl = (data, contentType) => {
    const byteArray = new Uint8Array(data);
    const blob = new Blob([byteArray], { type: contentType });
    return URL.createObjectURL(blob);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setPlayerImage("");
  };

  const renderProfileImage = () => {
    if (playerImage) {
      return (
        <img
          src={createBlobUrl(playerImage?.data?.data, playerImage?.contentType)}
          alt="avatar"
          className="h-20 w-20 rounded"
        />
      );
    } else if (image) {
      return (
        <img
          src={URL.createObjectURL(image)}
          alt="avatar"
          className="h-20 w-20 rounded"
        />
      );
    } else {
      return (
        <img
          src="/images/avatar-.jpg"
          alt="avatar"
          className="h-20 w-20 rounded"
        />
      );
    }
  };

  return (
    <Layout>
      <Fade>
        <div className="w-[90%] md:w-[60%] 2xl:w-[40%] p-10 rounded-2xl mt-2 mb-5 shadow-2xl mx-auto">
          <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold">
            Update Profile
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-1">
            <div></div>
            <div>
              <form
                className="max-w-md mx-auto mt-10"
                onSubmit={handleRegisterSubmit}
              >
                <div className="mb-4 w-max">
                  <label
                    htmlFor="image"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select Image
                  </label>
                  <div className="relative cursor-pointer">
                    {renderProfileImage()}
                    <input
                      type="file"
                      alt="avatar"
                      className="absolute inset-0 opacity-0"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label
                    htmlFor="name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Name
                  </label>
                </div>

                <div className="relative z-0 w-full mb-5 group mt-8">
                  <input
                    type="password"
                    name="floating_password"
                    id="floating_password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label
                    htmlFor="floating_password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Password
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group mt-8">
                  <input
                    type="password"
                    name="confirm_password"
                    id="confirm_password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <label
                    htmlFor="confirm_password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group mt-8">
                  <input
                    type="text"
                    name="recovery_question"
                    id="recovery_question"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                  <label
                    htmlFor="recovery_question"
                    className="block lg:hidden peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    What is your first pet name? (Recovery)
                  </label>
                  <label
                    htmlFor="recovery_question"
                    className="hidden lg:block peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    What is your first pet name? (Recovery Question)
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
      </Fade>
    </Layout>
  );
};

export default Profile;
