import React, { Profiler } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./core/Home"
import Signup from "./user/Signup"
import Signin from "./user/Signin"
import "../src/styles.css"
import AdminRoute from './auth/helper/AdminRoutes'
import PrivateRoute from './auth/helper/PrivateRoutes'
import AdminDashBoard from "./user/AdminDashBoard"
import Profile from "./user/Profile"
import UserDashboard from "./user/UserDashBoard"
import AddCategory from "./admin/AddCategory"
import AddProduct from "./admin/AddProduct"
import Cart from "./core/Cart"
import ManageProducts from './admin/ManageProducts'

const Routee = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = { < Home / > } />
          <Route path = "/cart" element = { < Cart / > } />
          <Route path = "/signup" element = { < Signup / > } />
          <Route path = "/signin" element = { < Signin / > } />
          <Route path = "/user/dashboard" element = { < UserDashboard / > } />
          <Route path = "/admin/dashboard" element = { < AdminDashBoard / > } />
          <Route path = "/admin/create/category" element = { < AddCategory / > } />
          <Route path = "/admin/create/product" element = { < AddProduct / > } />
          <Route path = "/admin/products" element = { < ManageProducts / > } />
        </Routes >
     </BrowserRouter>
   );
}

export default Routee;
