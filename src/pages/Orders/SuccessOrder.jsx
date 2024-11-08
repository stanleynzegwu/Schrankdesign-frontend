import React, { useEffect } from "react";
import Layout from "../../Layouts/Layout";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { emptyBasket } from "../../store/features/cart/cartSlice";

const SuccessOrder = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(emptyBasket());
    // localStorage.removeItem("schrankdesign-app-cart");
  }, [dispatch]);
  return (
    <Layout>
      <div className="w-[90%] md:w-[50%] my-5 p-5 rounded-xl shadow-2xl mx-auto">
        <div className="felx text-center p-10">
          <h1 className=" text-xl lg:text-2xl font-bold">
            Your order is placed successfully...!
          </h1>
          <Link to="/" className="mt-5">
            <button className="site-button py-2 mt-5 md:mt-10">Go Back</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default SuccessOrder;
