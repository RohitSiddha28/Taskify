const router = require("express").Router();
const {addTask, updateTask, deleteTask, getTask} = require("../controllers/list.js");

router.post("/addTask", addTask);
router.put("/updateTask/:id", updateTask);
router.delete("/deleteTask/:id", deleteTask);
router.get("/getTask/:id", getTask);

module.exports = router;