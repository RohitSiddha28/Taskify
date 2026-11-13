const User = require("../models/user.js");
const List = require("../models/list.js");

//create
const addTask = async (req, res) => {
  try {
    const { title, body, id } = req.body;
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found!" });
    }
    const list = new List({ title, body, user: [existingUser._id] });
    await list.save();
    existingUser.list.push(list._id);
    await existingUser.save();
    res.status(200).json({ list });
  } catch (err) {
    res.status(500).json({ message: "Oops! Something is wrong!" });
    console.log(err);
  }
};

//update
const updateTask = async (req, res) => {
  try {
    const { title, body, userId } = req.body;
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found!" });
    }
    const list = await List.findByIdAndUpdate(
      req.params.id,
      { title, body },
      { new: true, runValidators: true },
    );
    if (!list) {
      return res.status(404).json({ message: "Task not found!" });
    }
    res.status(200).json({ message: "Task Updated!", task: list });
  } catch (err) {
    res.status(500).json({ message: "Oops! Something is wrong!" });
    console.log(err);
  }
};

//delete
const deleteTask = async (req, res) => {
  try {
    const { userId } = req.body;
    const existingUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { list: req.params.id } },
      { new: true },
    );
    if (!existingUser) {
      return res.status(404).json({ message: "User not found!" });
    }
    const deletedTask = await List.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found!" });
    }
    res.status(200).json({ message: "Task Deleted!" });
  } catch (err) {
    res.status(500).json({ message: "Oops! Something is wrong!" });
    console.log(err);
  }
};

//get
const getTask = async (req, res) => {
  try {
    const tasks = await List.find({ user: req.params.id }).sort({createdAt: -1});
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ message: "Oops! Something is wrong!" });
    console.log(err);
  }
};

module.exports = { addTask, updateTask, deleteTask, getTask };
