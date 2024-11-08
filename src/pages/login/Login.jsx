import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Layouts/Layout";
import { ForgotPassword, UserLogin } from "../../api/api";
import { login } from "../../store/features/user/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  //forgpt password
  const [forgotModal, setForgotModal] = useState(false);
  const [answer, setAnswer] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await UserLogin({
      email,
      password,
    });
    if (data) {
      setLoading(false);
      dispatch(
        login({
          name: data?.user?.name,
          email: data?.user?.email,
          role: data?.user?.role,
          image: data?.user?.image?.data?.data,
        })
      );
      toast.success(data?.message);

      localStorage.setItem("schrankdesign-app-user-token", data?.user?.token);
      if (data?.user?.role === 0) {
        navigate("/dashboard/user");
      } else if (data?.user?.role === 1) {
        navigate("/dashboard/admin");
      }
    } else if (error) {
      setLoading(false);
      console.log("error");
      toast.error(error?.message);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await ForgotPassword({
      email: forgotEmail,
      newPassword: newPassword,
      answer: answer,
    });
    if (data) {
      setLoading(false);
      setForgotModal(false);
      toast.success(data?.message);
    } else if (error) {
      setLoading(false);
      console.log("error");
      toast.error(error?.message);
    }
  };

  return (
    <Layout>
      <Fade>
        <div className="w-[95%] md:w-[60%] 2xl:w-[40%] p-5 md:p-10 rounded-2xl mt-2 mb-5 shadow-2xl mx-auto">
          {!forgotModal && (
            <>
              <Fade>
                <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold">
                  Login
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-1">
                  <div>
                    <form
                      className="max-w-md mx-auto mt-10"
                      onSubmit={handleLoginSubmit}
                    >
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="email"
                          name="floating_email"
                          id="floating_email"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label
                          htmlFor="floating_email"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Email address
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

                      <div className="flex md:mt-10 mb-5 text-sm md:text-base">
                        <Link
                          onClick={() => setForgotModal(true)}
                          className="text-[#5a8560] font-semibold mr-auto"
                        >
                          Forgot Password?
                        </Link>
                        <p className="ml-auto float-right">
                          Not a memeber?{" "}
                          <Link
                            to="/pages/register"
                            className="text-[#5a8560] font-semibold"
                          >
                            Sign Up
                          </Link>
                        </p>
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
              </Fade>
            </>
          )}
          {/* --------------------Forgot password------------------------- */}
          {forgotModal && (
            <>
              <Fade>
                <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold">
                  Forgot Password
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-1">
                  <div>
                    <form
                      className="max-w-md mx-auto mt-10"
                      onSubmit={handleForgotSubmit}
                    >
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="email"
                          name="floating_email"
                          id="floating_email"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                        />
                        <label
                          htmlFor="floating_email"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Email address
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
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <label
                          htmlFor="floating_password"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          New Password
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-5 group mt-8">
                        <input
                          type="text"
                          name="floating_password"
                          id="floating_password"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value)}
                        />
                        <label
                          htmlFor="floating_password"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          What is your first pet name? (Recovery Question)
                        </label>
                      </div>

                      <div className="flex mt-5 md:mt-10 mb-5">
                        <p className="ml-auto">
                          Already a memeber?
                          <Link
                            onClick={() => setForgotModal(false)}
                            className="text-[#5a8560] font-semibold ml-2"
                          >
                            Login
                          </Link>
                        </p>
                      </div>

                      <button
                        type="submit"
                        className="site-button py-2 px-4 hover:px-5 md:mt-3 flex"
                      >
                        Submit
                        {loading && (
                          <div className="ml-2 mt-1 animate-spin rounded-full h-4 w-4 border-t-4 border-white border-solid"></div>
                        )}
                      </button>
                    </form>
                  </div>
                  <div></div>
                </div>
              </Fade>
            </>
          )}
        </div>
      </Fade>
    </Layout>
  );
};

export default Login;
