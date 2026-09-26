import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./styles/login.css";
import SocialLogin from "../components/SocialLogin";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const schema = z.object({
  email: z.string().email("invalid email").endsWith("@gmail.com"),
  password: z
    .string()
    .min(8, "Minimum password must 8 Digit")
    .regex(
      /^[a-zA-Z0-9_.]+$/,
      "password contain letter,number, dot and underscore",
    ),
});

const Login = React.memo(() => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const {
    getValues,
    setError,
    register,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const ValidateUser = useMutation({
    mutationFn: (userData) =>
      axios.post("http://localhost:8000/user/loginUser", userData, {
        withCredentials: true,
      }),
    onSuccess: (response) => {
      console.log(response.data);
      navigate("/profile");
    },

    onError: (error) => {
      console.log(error.response?.data);
      setError("root.serverError", {
        type: "manual",
        message: error.response?.data,
      });
    },
  });

  const submiteData = (data) => {
    console.log("data submite", data);
    ValidateUser.mutate(data);
  };

  const showPassword = () => {
    show ? setShow(false) : setShow(true);
  };

  return (
    <div id="loginMain">
      <form onSubmit={handleSubmit(submiteData)} className="login-form">
        <div className="form-header">
          <h2>Welcome Back</h2>
          <p className="subtitle">Please enter your details to sign in</p>
        </div>

        {/* Email Input */}
        <div className={`userinput ${errors?.email ? "input-error" : ""}`}>
          <i className="fa-solid fa-envelope input-icon"></i>
          <input
            {...register("email", {
              required: "Email is required",
            })}
            onClick={() => clearErrors("email")}
            onChange={() => clearErrors("email")}
            type="email"
            placeholder="Enter your email"
          />
        </div>
        {errors?.email && (
          <span className="error-message">{errors.email.message}</span>
        )}

        {/* Password Input */}
        <div className={`userinput ${errors?.password ? "input-error" : ""}`}>
          <i className="fa-solid fa-lock input-icon"></i>
          <input
            {...register("password", {
              required: "Password is required",
            })}
            onClick={() => clearErrors("password")}
            onChange={() => clearErrors("password")}
            type={show ? "text" : "password"}
            placeholder="Enter your password"
          />
          <button
            type="button"
            className="toggle-password-btn"
            onClick={showPassword}
            aria-label="Toggle password visibility"
          >
            <i className={`fa-regular ${show ? "fa-eye-slash" : "fa-eye"}`}></i>
          </button>
        </div>
        {errors?.password && (
          <span className="error-message">{errors.password.message}</span>
        )}

        {/* Server Error */}
        {errors.root?.serverError?.message && (
          <div className="server-error-banner">
            {errors.root.serverError.message.message}
          </div>
        )}

        {/* Submit Button */}
        <button id="loginBtn" type="submit">
          Sign In
        </button>

        {/* Footer Links */}
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>

        <div className="divider">
          <span>or</span>
        </div>

        <SocialLogin />
        <Link to="/" className="back-profile-btn">
          <i className="fa-solid fa-arrow-left"></i> Back to Home
        </Link>
      </form>
    </div>
  );
});

Login.displayName = "login";
export default Login;
