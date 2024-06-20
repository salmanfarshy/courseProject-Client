import React, { useContext } from "react";
import Dashboard from "./Dashboard";
import { Outlet, useNavigate } from "react-router-dom";
import isTokenExpired from "../assets/isTokenExpired";
import { JiraToggle } from "../context/JiraContext";
import JiraPopup from "./JiraPopup";

function UserPage() {
  const navigate = useNavigate();
  const { isJiraOpen } = useContext(JiraToggle);

  const user = JSON.parse(localStorage.getItem("User"));
  // console.log(user);
  if (!user) navigate("/login");
  const token = localStorage.getItem("token");

  if (isTokenExpired(token)) {
    localStorage.removeItem("User");
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="flex relative">
      {/* JiraUI */}
      {isJiraOpen && <JiraPopup />}
      <Dashboard />
      <Outlet />
    </div>
  );
}

export default UserPage;
