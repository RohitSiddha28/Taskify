import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { authActions } from "../store/index.js";

const LogIn = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const change = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/v1/login", input);
      if (res.status === 200) {
        const userId = res.data.user?._id;
        if (userId) {
          localStorage.setItem("userId", userId);
        }
        dispatch(authActions.login(userId));
        redirect("/tasks", {
          state: { message: res.data.message },
        });
      }
      setInput({
        email: "",
        password: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Error occurred");
    }
  };
  const redirect = useNavigate();
  const location = useLocation();
  useEffect(() => {
  if (location.state?.message) {
    toast.success(location.state.message);
    window.history.replaceState({}, document.title);
  }
}, [location.state]);
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="w-[90%] max-w-5xl bg-white shadow-lg rounded-2xl flex flex-col lg:flex-row overflow-hidden">
        <div className="w-full lg:w-1/3 text-red-500 border-4 rounded-2xl flex items-center justify-center">
          <h1 className="text-4xl font-bold">Log In</h1>
        </div>
        <div className="w-full lg:w-2/3 p-8 flex flex-col justify-center gap-6">
          <h2 className="text-3xl font-bold">Login</h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            value={input.email}
            onChange={change}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            value={input.password}
            onChange={change}
          />

          <button className="bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition"
          onClick={submit}>
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
