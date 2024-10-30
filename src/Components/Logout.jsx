import React from "react";
import { useNavigate } from "react-router-dom";
import './App.css'; // .logout and .logout:hover in app.css control this button

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return <button className="logout" onClick={handleLogout}>Logout</button>;
};

export default Logout;