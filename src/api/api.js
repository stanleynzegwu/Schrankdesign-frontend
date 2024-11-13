/* eslint-disable no-useless-catch */
// apiUtils.js
import axios from "axios";
// import { date } from "yup";
const baseUrl = import.meta.env.VITE_BACKEND_URL; // replace with your actual base URL

// headers and token
export const headers = () => {
  const token = localStorage.getItem("schrankdesign-app-user-token");

  // Check if the token exists before including it in headers
  const headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

//API URL'S

//  GET REQUEST
export const get = async (url, params) => {
  try {
    const res = await axios.get(`${baseUrl}${url}`, {
      params,
      headers: headers(),
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

//  POST REQUEST
export const post = async (url, data) => {
  // console.log(url,data)
  try {
    const res = await axios.post(`${baseUrl}${url}`, data, {
      headers: headers(),
    });
    // console.log(res)
    return res.data;
  } catch (err) {
    throw err;
  }
};

//  PUT REQUEST
export const put = async (url, data) => {
  try {
    const res = await axios.put(`${baseUrl}${url}`, data, {
      headers: headers(),
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

//  PATCH REQUEST
export const patch = async (url, data) => {
  try {
    const res = await axios.patch(`${baseUrl}${url}`, data, {
      headers: headers(),
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

//  DELETE REQUEST
export const Delete = async (url) => {
  try {
    const res = await axios.delete(`${baseUrl}${url}`, {
      headers: headers(),
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

//  Register Function
export const UserRegister = async (formData) => {
  try {
    const data = await post("/api/v1/user/register", formData);
    return { data, error: null };
  } catch (error) {
    console.error("Error in useRegister :", error);
    return { data: null, error: error?.response?.data };
  }
};

//Login Function
export const UserLogin = async ({ email, password }) => {
  try {
    const data = await post("/api/v1/user/login", {
      email,
      password,
    });
    return { data, error: null };
  } catch (error) {
    console.error("Error in useLogin :", error);
    return { data: null, error: error?.response?.data };
  }
};

//Single User Function
export const SingleUser = async () => {
  try {
    const data = await get("/api/v1/user/single-user");
    return { data, error: null };
  } catch (error) {
    console.error("Error in useLogin :", error);
    return { data: null, error: error?.response?.data };
  }
};

//Admin Single User Function
export const AdminSingleUser = async (id) => {
  try {
    const data = await get(`/api/v1/user/admin-single-user/${id}`);
    return { data, error: null };
  } catch (error) {
    console.error("Error in useLogin :", error);
    return { data: null, error: error?.response?.data };
  }
};

//All Users Function
export const AllUsers = async () => {
  try {
    const data = await get("/api/v1/user/get-all");
    return { data, error: null };
  } catch (error) {
    console.error("Error in get all :", error);
    return { data: null, error: error?.response?.data };
  }
};

//Update User Function
export const SingleUserUpdate = async (formData) => {
  try {
    const data = await put("/api/v1/user/profile", formData);
    return { data, error: null };
  } catch (error) {
    console.error("Error in user update :", error);
    return { data: null, error: error?.response?.data };
  }
};

//Update User Function
export const AdminUserUpdate = async (id, formData) => {
  try {
    const data = await put(`/api/v1/user/admin-update-user/${id}`, formData);
    return { data, error: null };
  } catch (error) {
    console.error("Error in user update :", error);
    return { data: null, error: error?.response?.data };
  }
};

//Delete User Function
export const DeleteUser = async (id) => {
  try {
    const data = await Delete(`/api/v1/user/delete/${id}`);
    return { data, error: null };
  } catch (error) {
    console.error("Error in user update :", error);
    return { data: null, error: error?.response?.data };
  }
};

//Forgot Password
export const ForgotPassword = async ({ email, newPassword, answer }) => {
  try {
    const data = await post("/api/v1/user/forgot-password", {
      email,
      newPassword,
      answer,
    });
    return { data, error: null };
  } catch (error) {
    console.error("Error in useLogin :", error);
    return { data: null, error: error?.response?.data };
  }
};

//Create Category Function
export const CreateCategory = async (formData) => {
  try {
    const data = await post("/api/v1/category/create-category", formData);
    return { data, error: null };
  } catch (error) {
    console.error("Error in create Category :", error);
    return { data: null, error: error?.response?.data };
  }
};

//All Categories Function
export const AllCategory = async () => {
  try {
    const data = await get("/api/v1/category/categories");
    return { data, error: null };
  } catch (error) {
    console.error("Error in create Category :", error);
    return { data: null, error: error?.response?.data };
  }
};

//Single Category Function
export const GetSingleCategory = async (slug) => {
  try {
    const data = await get(`/api/v1/category/single-category/${slug}`);
    return { data, error: null };
  } catch (error) {
    console.error("Error in create Category :", error);
    return { data: null, error: error?.response?.data };
  }
};

//Save Configurator Function
export const SaveConfigurator = async (id, configuratorData) => {
  try {
    const status = await post("/api/v1/product/save-configurator-product", {
      id: id,
      configuratorData: configuratorData,
    });
    return { status, error: null };
  } catch (error) {
    return { status: null, error: error?.response?.data };
  }
};

export const ConfigSetting = async (id, value) => {
  try {
    const status = await post("/api/v1/product/set-configurator-product", {
      id: id,
      settingData: value,
    });
    return { status, error: null };
  } catch (error) {
    return { status: null, error: error?.response?.data };
  }
};

export const setActive = async (id, value, type) => {
  try {
    const status = await post(`/api/v1/product/${type}`, {
      id: id,
      settingData: value,
    });
    return { status, error: null };
  } catch (error) {
    return { status: null, error: error?.response?.data}
  }
}

//Get Configurator Function
export const GetConfiguratorData = async (id) => {
  try {
    const configuratorData = await post(
      "/api/v1/product/get-configurator-product",
      {
        id: id,
      }
    );
    // console.log('Sv3n', configuratorData);
    return { configuratorData, error: null };
  } catch (error) {
    return { configuratorData: null, error: error?.response?.data };
  }
};

//Update Category Function
export const UpdateSingleCategory = async (id, formData) => {
  try {
    const data = await put(`/api/v1/category/update-category/${id}`, formData);
    return { data, error: null };
  } catch (error) {
    console.error("Error in create Category :", error);
    return { data: null, error: error?.response?.data };
  }
};

//Delete Category Function
export const DeleteSingleCategory = async (id, formData) => {
  try {
    const data = await post(
      `/api/v1/category/delete-category/${id}`,
      formData
    );
    return { data, error: null };
  } catch (error) {
    console.error("Error in create Category :", error);
    return { data: null, error: error?.response?.data };
  }
};

//Create Category Function
export const CreateSingleProduct = async (formData) => {
  try {
    const data = await post("/api/v1/product/create-product", formData);
    return { data, error: null };
  } catch (error) {
    console.error("Error in create Category :", error);
    return { data: null, error: error?.response?.data };
  }
};

//Get Product Function
export const GetSingleProduct = async (id) => {
  try {
    const data = await get(`/api/v1/product/get-single-product/${id}`);
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error?.response?.data };
  }
};

//Confirm Product
export const ConfirmProduct = async (productId) => {
  try {
    const data = await get(`/api/v1/product/confirm-product/${productId}`);
    return { data, error: null}
  } catch (error) {
    return{ date: null, error: error?.response.data}
  }
}

//Clone Product Function
export const cloneProduct = async (id) => {
  try {
    const data = await get(`/api/v1/product/clone-product/${id}`);
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error?.response?.data };
  }
}

//Update Product Function
export const UpdateSingleProduct = async (id, formData) => {
  try {
    const data = await put(
      `/api/v1/product/update-single-product/${id}`,
      formData
    );
    return { data, error: null };
  } catch (error) {
    console.error("Error in update Product :", error);
    return { date: null, error: error?.response?.data };
  }
};

//Delete Product Function
export const DeleteSingleProduct = async (id, formData) => {
  try {
    const data = await Delete(
      `/api/v1/product/delete-product/${id}`,
      formData
    );
    return { data, error: null };
  } catch (error) {
    console.error("Error in update Product :", error);
    return { date: null, error: error?.response?.data };
  }
}

//Create Category Function
export const CreateProductsCheckoutSession = async (formData) => {
  try {
    const data = await post(
      "/api/v1/product/create-checkout-session",
      formData
    );
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error?.response?.data };
  }
};

//GettAll Products
export const GetAllProduct = async () => {
  try {
    const data = await get("/api/v1/product/get-products");
    return { data, error: null };
  } catch (error) {
    console.error("Error in create Category :", error);
    return { data: null, error: error?.response?.data };
  }
};

//GettAll Orders
export const GetAllOrders = async () => {
  try {
    const data = await get("/api/v1/order/get-orders");
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error?.response?.data };
  }
};

//Gett Single Order
export const GetSingleOrder = async (id) => {
  try {
    const data = await get(`/api/v1/order/get-order/${id}`);
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error?.response?.data };
  }
};

//Gett Single Order
export const GetSingleUserOrders = async () => {
  try {
    const data = await get(`/api/v1/order/get-user-order`);
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error?.response?.data };
  }
};

//Gett Single Order
export const GetSingleUserOrder = async (id) => {
  try {
    const data = await get(`/api/v1/order/get-user-order/${id}`);
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error?.response?.data };
  }
};

//User Protected Route Function
export const UserProtectedRoute = async () => {
  try {
    const data = await get("/api/v1/user/user-auth");
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error?.response?.data };
  }
};

//Admin Protected Route Function
export const AdminProtectedRoute = async () => {
  try {
    const data = await get("/api/v1/user/admin-auth");
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error?.response?.data };
  }
};

export const CalcInfo = async () => {
  try {
    const data = await post("/api/v1/calcInfo/infos");
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error?.response?.data };
  }
};
