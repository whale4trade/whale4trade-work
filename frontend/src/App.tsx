//import react component
import React from "react";
import { Routes, Route } from "react-router-dom";

// import files
// import Chat from "./component/chat/chat";
import NotFound from "./component/notFound/NotFound";
import Navbar from "./component/navbar/Navbar";
import Profile from "./component/profile/profile";
import Home from "./component/home/Home";
import Products from "./component/products/Products";
// import CopyRight from "./component/copy right/copyRight";

// import files for styles
import "animate.css";
import Register from "./component/register/Register";
import Login from "./component/login/Login";
import RegisterAff from "./component/registerAfflite/Register";
import Order from "./component/order/order";
import AddBalance from "./component/addBalance/addBalance";
import Dashboard from "./component/dashboard/dashboard";
import Users from "./component/dashboard/component/user/users";
import Bundle from "./component/dashboard/component/bundle/bundle";
import Reset from "./component/reset/reset";
import UpdatePass from "./component/updatePassword/pass";
import ImageList from "./get";
import Do from "./component/dashboard/component/dollar/do";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ddd" element={<ImageList />} />
        <Route path="/products" element={<Products />} />
        <Route path="/register/aff/:id" element={<RegisterAff />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products/order" element={<Order />} />
        <Route path="/addBalance" element={<AddBalance />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="//reset/auth/:email" element={<UpdatePass />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Dashboard />} />
          <Route path="" element={<Users />} />
          <Route path="bundle" element={<Bundle />} />
          <Route path="dollar" element={<Do />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
