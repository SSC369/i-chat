import React, { useState } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [checkEmail, setCheckEmail] = useState("");
  const [checkPass, setCheckPass] = useState("");
  const [checkConfirmPass, setCheckConfirmPass] = useState("");
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, username } = credentials;

    if (handleValidation()) {
      const host = "https://i-chat-backend.onrender.com/api/auth/register";

      const response = await axios.post(host, {
        username,
        password,
        email,
      });
      const { data } = response;

      if (data.status) {
        localStorage.setItem("user", JSON.stringify(data.userDetails));
        Cookie.set("jwtToken", data.jwtToken);
        navigate("/setAvatar");
      } else {
        toast.error(data.msg, toastOptions);
      }

      console.log(response);
    }
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    closeOnClick: true,
  };

  const onCheck = () => {
    setShowPass((prev) => !prev);
  };

  const onBlurEmail = (e) => {
    if (!e.target.value) {
      setCheckEmail("is-invalid");
    } else {
      setCheckEmail("");
    }
  };

  const onBlurPass = (e) => {
    if (!e.target.value) {
      setCheckPass("is-invalid");
    } else {
      setCheckPass("");
    }
  };

  const onBlurConfirmPass = (e) => {
    if (!e.target.value) {
      setCheckConfirmPass("is-invalid");
    } else {
      setCheckConfirmPass("");
    }
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = credentials;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 4) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <form
        style={{
          minWidth: "200px",
          maxWidth: "400px",
        }}
        className="w-50 d-flex flex-column"
        onSubmit={handleSubmit}
      >
        <h1 className="align-self-center mb-4">
          <span className="text-primary fw-normal font-monospace">iChat </span>
          Register
        </h1>

        <div className="rounded shadow form-floating mb-3">
          <input
            value={credentials.username}
            onChange={onChange}
            name="username"
            type="text"
            className="form-control"
            id="floatingName"
            placeholder="Username"
          />
          <label htmlFor="floatingName">Username</label>
        </div>

        <div className="rounded shadow form-floating mb-3">
          <input
            onBlur={onBlurEmail}
            onChange={onChange}
            value={credentials.email}
            name="email"
            type="email"
            className={`shadow-sm form-control ${checkEmail}`}
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>

        <div className="rounded shadow form-floating mb-3">
          <input
            onBlur={onBlurPass}
            onChange={onChange}
            value={credentials.password}
            name="password"
            type={showPass ? "text" : "password"}
            className={`shadow-sm form-control ${checkPass}`}
            id="floatingPassword"
            placeholder="Password"
            minLength={4}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <div className="rounded shadow form-floating mb-3">
          <input
            onChange={onChange}
            onBlur={onBlurConfirmPass}
            value={credentials.confirmPassword}
            name="confirmPassword"
            type={showPass ? "text" : "password"}
            className={`shadow-sm form-control ${checkConfirmPass}`}
            id="floatingConfirmPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingConfirmPassword">Confirm Password</label>
        </div>

        <div className="mb-3 form-check">
          <input
            onChange={onCheck}
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Show Password
          </label>
        </div>
        <button type="submit" className="shadow btn btn-primary">
          Submit
        </button>
      </form>
      <p className="mt-3">
        Already have an account?
        <Link style={{ textDecoration: "none" }} to="/login">
          <span className="text-primary fw-bold font-monospace"> Login</span>
        </Link>
      </p>
      <ToastContainer />
    </div>
  );
};

export default Register;
