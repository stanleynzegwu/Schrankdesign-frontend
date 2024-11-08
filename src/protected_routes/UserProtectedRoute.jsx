import React, { useEffect, useState } from "react";
import { UserProtectedRoute } from "../api/api";
import { Outlet } from "react-router-dom";
import AuthLoader from "../components/loaders/AuthLoader";
import toast from "react-hot-toast";

const UserPrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkUserAuth = async () => {
      const { data, error } = await UserProtectedRoute();
      if (data) {
        setOk(true);
        setLoading(false);
      } else if (error) {
        toast.error("Unauthorized Access");
        setOk(false);
        setLoading(false);
        localStorage.removeItem("schrankdesign-app-user");
        localStorage.removeItem("schrankdesign-app-user-token");
      }
    };
    checkUserAuth();
  }, []);
  return <>{!loading && (ok ? <Outlet /> : <AuthLoader path="" />)}</>;
};

export default UserPrivateRoute;
