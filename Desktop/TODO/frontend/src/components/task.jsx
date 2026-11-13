import React, { useState, useEffect } from "react";
import TaskCards from "./taskCards";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Task = () => {
  const location = useLocation();
  const userId = localStorage.getItem("userId");
  const [showBody, setShowBody] = useState(false);
  const [input, setInput] = useState({
    title: "",
    body: "",
  });
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    if (!userId) {
      setTasks([]);
      return;
    }
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v2/getTask/${userId}`,
        );
        setTasks(res.data.tasks || []);
      } catch (err) {
        toast.error("Something is wrong!");
      }
    };
    fetchTasks();
  }, [userId]);

  const setChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = async () => {
    if (input.title === "" || input.body === "") {
      toast.error("Fields should not be empty!");
      return;
    }

    if (!userId) {
      const newTask = {
        title: input.title,
        body: input.body,
      };
      setTasks((prev) => [newTask, ...prev]);
      setInput({
        title: "",
        body: "",
      });
      setShowBody(false);
      toast.success("Task created!");
      toast.error("Please login to save tasks.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/api/v2/addTask", {
        title: input.title,
        body: input.body,
        id: userId,
      });

      setTasks((prev) => [res.data.list, ...prev]);
      setInput({
        title: "",
        body: "",
      });
      setShowBody(false);
      toast.success("Task successfully added!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something is wrong!");
    }
  };

  const del = async (taskId) => {
    if (!userId) {
      toast.error("Please login first.");
      return;
    }

    try {
      await axios.delete(`http://localhost:8000/api/v2/deleteTask/${taskId}`, {
        data: { userId },
      });
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
      toast.success("Task deleted!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to delete task.");
    }
  };

  const updateTask = async (taskId, newData) => {
    if (!userId) {
      toast.error("Please login first.");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:8000/api/v2/updateTask/${taskId}`,
        {
          ...newData,
          userId,
        },
      );
      setTasks((prev) =>
        prev.map((task) => (task._id === taskId ? res.data.task : task)),
      );
      toast.success("Task updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to update task.");
    }
  };

  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center p-3 pt-10 bg-gray-100">
        <ToastContainer />
        <div className="w-full max-w-2xl flex flex-col gap-3">
          <div className="flex flex-col gap-2 border rounded-xl shadow-lg bg-white p-2">
            <input
              type="text"
              placeholder="Title"
              className="p-2 outline-none"
              name="title"
              value={input.title}
              onChange={setChange}
              onClick={() => setShowBody(true)}
            />
            {showBody && (
              <textarea
                placeholder="Body"
                className="p-2 outline-none min-h-10"
                name="body"
                value={input.body}
                onChange={setChange}
                rows={4}
              />
            )}
          </div>
          {showBody && (
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
                onClick={submit}
              >
                Add
              </button>
            </div>
          )}
        </div>
        <div className="w-full max-w-5xl mt-8 grid grid-cols-3 gap-4 items-start">
          {tasks.map((item) => (
            <TaskCards
              key={item._id}
              task={item}
              delid={del}
              updateTask={updateTask}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Task;
