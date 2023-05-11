import React, { useState, useEffect } from "react";
import Robot from "../assets/robot.gif";
import "../styles/AllStyles.css";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const user = localStorage.getItem("user");
      if (user)
        setUserName(await JSON.parse(localStorage.getItem("user")).username);
      else navigate("/login");
    };
    getUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="welcome-container">
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  );
}

export default Welcome;
