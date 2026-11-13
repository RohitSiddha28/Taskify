import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { authActions } from "../store/index.js";

const SignUp = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    username: "",
    password: "",
  });
  const change = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/register",
        input,
      );
      const userId = res.data.user?._id;
      if (userId) {
        localStorage.setItem("userId", userId);
      }
      dispatch(authActions.login(userId));
      if (res.status === 201) {
        redirect("/login", {
          state: { message: res.data.message },
        });
      }
      setInput({
        email: "",
        username: "",
        password: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Error occurred");
    }
  };
  const redirect = useNavigate();
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="w-[90%] max-w-5xl bg-white shadow-lg rounded-2xl flex flex-col lg:flex-row overflow-hidden">
        <div className="w-full lg:w-2/3 p-8 flex flex-col justify-center gap-6">
          <h2 className="text-3xl font-bold">Create Account</h2>

          <input
            type="email"
            placeholder="Email"
            name="email"
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            onChange={change}
            value={input.email}
          />

          <input
            type="text"
            placeholder="Username"
            name="username"
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            onChange={change}
            value={input.username}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            onChange={change}
            value={input.password}
          />

          <button
            className="bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition"
            onClick={submit}
          >
            Sign Up
          </button>
        </div>

        <div className="w-full lg:w-1/3 text-red-500 border-4 rounded-2xl flex items-center justify-center">
          <h1 className="text-4xl font-bold">Sign Up</h1>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
