import React from 'react'
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="container flex justify-center items-center flex-col gap-4">
        <h1 className="text-5xl font-bold text-center">
            Oragnize your <br/> work and life finally!
        </h1>
        <p>
            Become focused, organized and calm with <br/>
            todo app. Use it now!
        </p>
        <Link to="/tasks" className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600">
          Create tasks
        </Link>
      </div>
    </div>
  )
}

export default Home
