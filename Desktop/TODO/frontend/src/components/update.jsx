import React, { useState } from "react";

const Update = ({ display, updateTask, task }) => {
  const [input, setInput] = useState({
    title: task.title,
    body: task.body,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask(task._id, input); 
    display(false);
  };
  return (
    <div className="w-full h-screen bg-amber-100 flex justify-center items-start pt-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-lg flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold">Update your task</h1>
        <input
          type="text"
          name="title"
          placeholder="Update title"
          value={input.title}
          onChange={handleChange}
          className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-red-400"
        />
        <textarea
          name="body"
          placeholder="Update description"
          value={input.body}
          onChange={handleChange}
          rows={4}
          className="w-full p-3 border rounded-md outline-none resize-none focus:ring-2 focus:ring-red-400"
        />
        <div className="flex justify-start gap-2">
          <button
            type="submit"
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => display(false)}
            className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
