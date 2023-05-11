import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SetAvatar from "./pages/SetAvatar";
import Chat from "./pages/Chat";
import About from "./pages/About";
import Projects from "./pages/Projects";

import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/setAvatar" element={<SetAvatar />} />
      <Route exact path="/" element={<Chat />} />

      <Route exact path="/about" element={<About />} />
      <Route exact path="/projects" element={<Projects />} />
    </Routes>
  );
};

export default App;
