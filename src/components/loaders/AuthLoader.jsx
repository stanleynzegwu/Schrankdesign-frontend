import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthLoader = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((preValue) => --preValue);
    }, 1000);
    count === 0 && navigate(`/${path}`, { state: location.pathname });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <h1 className="mr-5">Redirecting you in {count} seconds</h1>
        <div className="animate-spin rounded-full border-t-4 border-blue-500 border-opacity-50 h-14 w-14"></div>
      </div>
    </div>
  );
};

export default AuthLoader;
