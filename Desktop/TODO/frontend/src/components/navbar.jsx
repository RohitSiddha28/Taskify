import React, { useState } from "react";
import { PiBooksBold } from "react-icons/pi";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const handleLogout = () => {
    localStorage.removeItem("userId");
    dispatch(authActions.logout());
  };
  return (
    <nav className="bg-gray-900 text-white px-6 py-3 shadow-md">
      
      <div className="flex items-center justify-between">

        <div className="flex items-center space-x-2 group">
          <PiBooksBold className="text-2xl text-yellow-200 group-hover:text-yellow-300" />
          <h1 className="text-xl font-bold text-yellow-200 group-hover:text-yellow-300">TASKIFY</h1>
        </div>

        <div className="hidden md:flex space-x-6 text-lg">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/about" className="hover:text-gray-400">About Us</Link>
          <Link to="/tasks" className="hover:text-gray-400">Tasks</Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {!isLoggedIn ? <Link to="/signup" className="px-3 py-1 bg-red-500 rounded hover:bg-red-600">
            Sign Up
          </Link> : null}

          {!isLoggedIn ? <Link to="/login" className="px-3 py-1 bg-red-500 rounded hover:bg-red-600">
            Log In
          </Link> : null}

          {isLoggedIn ? <Link to="/" className="px-3 py-1 bg-red-500 rounded hover:bg-red-600" onClick={handleLogout}>
            Log Out
          </Link>  : null}

          {isLoggedIn ? <img
            src="https://imgs.search.brave.com/MEeNKbFOmgA9EgM7Oklk5GB2_rDsUGVOUjbcorrki8Y/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjIw/ODQ3NTE5Ni92ZWN0/b3IvdXNlci1pY29u/LXJlcHJlc2VudGlu/Zy1wcm9maWxlLWFj/Y291bnQuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPUpFOS1t/UEZiamRPMWR1aEZO/SE1TakZnZWtvQVdD/Q05WRnRCQW1LSDdS/TTg9"
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />  : null}
        </div>

        <div className="md:hidden">
          <Link onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </Link>
        </div>

      </div>

      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 text-lg">

          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/about" className="hover:text-gray-400">About Us</Link>
          <Link to="/tasks" className="hover:text-gray-400">Tasks</Link>

          <hr className="border-gray-700" />

          {!isLoggedIn ? <Link to="/signup" className="px-3 py-2 bg-red-500 rounded hover:bg-red-600">
            Sign Up
          </Link> : null}

          {!isLoggedIn ? <Link to="/login" className="px-3 py-2 bg-red-500 rounded hover:bg-red-600">
            Log In
          </Link> : null}

          {isLoggedIn ? <Link to="/" className="px-3 py-2 bg-red-500 rounded hover:bg-red-600" onClick={handleLogout}>
            Log Out
          </Link> : null}

          {isLoggedIn ? <img
            src="https://imgs.search.brave.com/MEeNKbFOmgA9EgM7Oklk5GB2_rDsUGVOUjbcorrki8Y/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjIw/ODQ3NTE5Ni92ZWN0/b3IvdXNlci1pY29u/LXJlcHJlc2VudGlu/Zy1wcm9maWxlLWFj/Y291bnQuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPUpFOS1t/UEZiamRPMWR1aEZO/SE1TakZnZWtvQVdD/Q05WRnRCQW1LSDdS/TTg9"
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          /> : null}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
