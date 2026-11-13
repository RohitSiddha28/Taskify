import React, { useState } from "react";
import Update from "./update";
import { MdDelete } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";

const TaskCards = ({ task, delid, updateTask }) => {
  const [update, setUpdate] = useState(false);
  return (
    <div>
      <div className="p-3 border">
        <div className="p-2 text-2xl bold">{task.title}</div>
        <p>{task.body.length > 15 ? task.body.slice(0, 15) + "..." : task.body}</p>
        <div className="flex justify-evenly flex-wrap items-center p-1">
          <div className="flex items-center gap-1 p-1 cursor-pointer text-green-500 hover:text-green-600 hover:shadow-md transition"
           onClick={()=>{setUpdate(true)}}>
            <GrDocumentUpdate className="text-xl" />
            <span>Update</span>
          </div>
          <div className="flex items-center gap-1 p-1 cursor-pointer text-red-500 hover:text-red-600 hover:shadow-md transition"
          onClick={() => {delid(task._id)}}>
            <MdDelete className="text-xl" />
            <span>Delete</span>
          </div>
        </div>
      </div>
      {update && <div className="w-full h-4/5 bg-gray-400 fixed top-20 left-0">
    <Update display={setUpdate} updateTask={updateTask} task={task} />
  </div>}
    </div>
  );
};

export default TaskCards;
