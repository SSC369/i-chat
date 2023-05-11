import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";

const toastOptions = {
  position: "bottom-right",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  if (localStorage.getItem("user")) navigate("/");

  const handleValidation = () => {
    const { username, password } = credentials;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const onChangeInput = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    const { username, password } = credentials;
    e.preventDefault();
    if (handleValidation()) {
      const host = "https://i-chat-backend.onrender.com/api/auth/login";
      const response = await axios.post(host, {
        username,
        password,
      });
      const { data } = response;
      if (data.status) {
        console.log(data.userDetails);
        localStorage.setItem("user", JSON.stringify(data.userDetails));
        navigate("/");
      } else {
        toast.error(data.msg, toastOptions);
      }
    }
  };

  const onShowPass = () => {
    setShowPass((prev) => !prev);
  };

  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <h1 className="mb-3 text-primary font-monospace">
        iChat <span className="text-dark">Login</span>
      </h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
        style={{ maxWidth: "400px" }}
        className="w-50 p-4 d-flex flex-column"
      >
        <>
          <FloatingLabel
            controlId="floatingInput"
            label="Username"
            className="mb-3 rounded shadow "
          >
            <Form.Control
              onChange={(e) => onChangeInput(e)}
              name="username"
              type="text"
              placeholder="Username"
            />
          </FloatingLabel>

          <FloatingLabel
            className="mb-3 rounded shadow "
            controlId="floatingPassword"
            label="Password"
          >
            <Form.Control
              onChange={(e) => onChangeInput(e)}
              name="password"
              type={showPass ? "text" : "password"}
              placeholder="Password"
            />
          </FloatingLabel>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              onChange={onShowPass}
              type="checkbox"
              label="Show Password"
            />
          </Form.Group>

          <Button type="submit" className="" variant="primary">
            Login
          </Button>
        </>
      </form>
      <p>
        Don't have an account?
        <Link style={{ textDecoration: "none" }} to="/register">
          <span className="text-primary fw-bold font-monospace"> Register</span>
        </Link>
      </p>
      <ToastContainer />
    </div>
  );
};

export default Login;
