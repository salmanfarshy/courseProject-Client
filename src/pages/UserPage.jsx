import React, { useState } from "react";
import Dashboard from "./Dashboard";
import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import isTokenExpired from "../assets/isTokenExpired";

function UserPage() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("User"));
  // console.log(user);
  if (!user) navigate("/login");
  const token = localStorage.getItem("token");

  if (isTokenExpired(token)) {
    const user = localStorage.removeItem("User");
    const token = localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="flex relative">
      {/* <Header /> */}

      <Dashboard />
      <Outlet />
    </div>
  );
}

export default UserPage;
