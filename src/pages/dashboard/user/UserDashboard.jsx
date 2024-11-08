import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../../Layouts/Layout";
import WelcomeTopBar from "../../../components/admin/WelcomeTopBar";
import UserSideBar from "../../../components/user/UserSideBar";

const UserDashboard = () => {
  const auth = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.setItem("schrankdesign-app-user-token", null);
    navigate("/");
  };
  return (
    <Layout>
      <div className="w-[90%] mx-auto rounded-2xl shadow-2xl my-5 p-10">
        <WelcomeTopBar
          auth={auth}
          logoutUser={logoutUser}
          dispatch={dispatch}
          link={"/dashboard/user/profile"}
        />
        <div className="md:mt-5 grid grid-cols-12 lg:gap-10">
          <div className="lg:col-span-2">
            <UserSideBar />
          </div>
          <div className="col-span-12 lg:col-span-10"></div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
