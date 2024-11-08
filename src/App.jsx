import { Toaster } from "react-hot-toast"
import { Route, Routes } from "react-router-dom"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import "./App.css"
import { useEffect } from "react"
import { useLocation } from "react-router-dom" // Change this line
import Faq from "./pages/Faq"
import Home from "./pages/Home"
import PageNotFound from "./pages/PageNotFound"
import SingleProductCollection from "./pages/collections/SingleProductCollection"
import Login from "./pages/login/Login"
import SingleProduct from "./pages/product/SingleProduct"
import SingleQuality from "./pages/quality/SingleQuality"
import Register from "./pages/register/Register"
import SingleService from "./pages/service/SingleService"
import UserPrivateRoute from "./protected_routes/UserProtectedRoute"
import UserDashboard from "./pages/dashboard/user/UserDashboard"
import AdminPrivateRoute from "./protected_routes/AdminPrivateRoute"
import AdminDashboard from "./pages/dashboard/admin/AdminDashboard"
import Profile from "./pages/dashboard/Profile"
import Users from "./pages/dashboard/admin/Users"
import Collections from "./pages/dashboard/admin/Collections"
import CreateUser from "./pages/dashboard/admin/CreateUser"
import UpdateUser from "./pages/dashboard/admin/UpdateUser"
import CreateCollection from "./pages/dashboard/admin/CreateCollection"
import UpdateCollection from "./pages/dashboard/admin/UpdateCollection"
import Products from "./pages/dashboard/admin/Products"
import UpdateProduct from "./pages/dashboard/admin/UpdateProduct"
import CreateProduct from "./pages/dashboard/admin/CreateProduct"
import SuccessOrder from "./pages/Orders/SuccessOrder"
import FailedOrder from "./pages/Orders/FailedOrder"
import Orders from "./pages/dashboard/admin/Orders"
import DetailOrder from "./pages/dashboard/admin/DetailOrder"
import UserOrders from "./pages/dashboard/user/UserOrders"
import UserDetailOrder from "./pages/dashboard/user/UserDetailOrder"
import Cart from "./pages/cart/Cart"
import Checkout from "./pages/checkout/checkout"
import Edge from "./pages/furniture_configurator/edge/Edge"
import Plates from "./pages/furniture_configurator/plates/Plates"
import PlateTypes from "./pages/furniture_configurator/plates/PlateTypes"
import Drawer from "./pages/furniture_configurator/assets/Drawer"
import General from "./pages/furniture_configurator/claculation/General"
// import Material from "./pages/furniture_configurator/claculation/Material"
import TestPartList from "./pages/furniture_configurator/part-list/test-part-list"
import PartListAdd from "./pages/furniture_configurator/part-list/part-list-add"
import Settings from "./pages/furniture_configurator/settings/Settings"
import Doors from "./pages/furniture_configurator/assets/Doors"
import Handles from "./pages/furniture_configurator/assets/Handles"
import Feet from "./pages/furniture_configurator/assets/Feets"
import Others from "./pages/furniture_configurator/assets/Others"
import Fitting from "./pages/furniture_configurator/assets/Fittings"
import MainMaterial from "./pages/furniture_configurator/claculation/MainMaterial"
import WorkingTime from "./pages/furniture_configurator/claculation/WorkingTime"
import Fees from "./pages/furniture_configurator/claculation/Fees"
import Wardrobe from "./configurator/wardrobe"
import Texture from "./pages/furniture_configurator/textures/Textures"
function ScrollToTopOnPathChange() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return null
}

function App() {
  return (
    <div className="App bg-white">
      <Toaster />
      <ScrollToTopOnPathChange /> {/* Add this line */}
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Single Collections, Quality, Servie and Product */}
        <Route
          path="/collections/:slug"
          element={<SingleProductCollection />}
        />
        <Route path="/quality/:slug" element={<SingleQuality />} />
        <Route path="/service/:slug" element={<SingleService />} />
        <Route path="/products/:slug/:configId" element={<SingleProduct />} />

        {/* Register and Login */}
        <Route path="/pages/register" element={<Register />} />
        <Route path="/pages/login" element={<Login />} />

        {/* FAQ */}
        <Route path="/pages/faq" element={<Faq />} />
        <Route path="/pages/cart" element={<Cart />} />
        <Route path="/pages/checkout" element={<Checkout />} />

        {/* Configurator */}
        <Route path="/product/:slug/:configId" element={<Wardrobe />} />
        {/* <Route path="/ext/config/:slug/:configId" element={<Wardrobe />} /> */}

        {/* Private User Route to check user authentication JWT */}
        <Route path="/dashboard" element={<UserPrivateRoute />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<UserOrders />} />
          <Route path="user/orders/detail/:id" element={<UserDetailOrder />} />
          <Route path="user/orders/success" element={<SuccessOrder />} />
          <Route path="user/orders/failed" element={<FailedOrder />} />
        </Route>

        {/* Private Admin Route to check admin authentication JWT */}
        <Route path="/dashboard" element={<AdminPrivateRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/profile" element={<Profile />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/users/create" element={<CreateUser />} />
          <Route path="admin/users/update/:id" element={<UpdateUser />} />
          <Route path="admin/collections" element={<Collections />} />
          <Route
            path="admin/collections/create"
            element={<CreateCollection />}
          />
          <Route
            path="admin/collection/update/:id"
            element={<UpdateCollection />}
          />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/products/create" element={<CreateProduct />} />
          <Route path="admin/products/update/:id/:configId" element={<UpdateProduct />} />
          <Route path="admin/orders" element={<Orders />} />
          <Route path="admin/orders/detail/:id" element={<DetailOrder />} />

          {/* admin dashboard furniture-configurator  updated reoutes   */}

          <Route
            path="furniture-configurator/plates/home"
            element={<Plates />}
          />
          <Route
            path="furniture-configurator/plates/plate-types"
            element={<PlateTypes />}
          />
          <Route path="furniture-configurator/edge/home" element={<Edge />} />
          <Route
            path="furniture-configurator/drawer/home"
            element={<Drawer />}
          />
          <Route
            path="furniture-configurator/drawer/doors"
            element={<Doors />}
          />
          <Route
            path="furniture-configurator/drawer/handles"
            element={<Handles />}
          />
          <Route
            path="furniture-configurator/drawer/feets"
            element={<Feet />}
          />
          <Route
            path="furniture-configurator/drawer/others"
            element={<Others />}
          />
          <Route
            path="furniture-configurator/drawer/fittings"
            element={<Fitting />}
          />
          <Route
            path="furniture-configurator/calculation/home"
            element={<General />}
          />
          <Route
            path="furniture-configurator/calculation/material"
            element={<MainMaterial />}
          />

          <Route
            path="furniture-configurator/calculation/working-time"
            element={<WorkingTime />}
          />
          <Route
            path="furniture-configurator/calculation/fees"
            element={<Fees />}
          />
          <Route
            path="furniture-configurator/part-list/home"
            element={<PartListAdd />}
          />
          <Route
            path="furniture-configurator/part-list/test-part-list"
            element={<TestPartList />}
          />
          <Route
            path="furniture-configurator/textures/textures"
            element={<Texture />}
          />
          <Route
            path="furniture-configurator/settings"
            element={<Settings />}
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default App
