const express = require('express');
const cors = require('cors');
const connectDB = require("./connection/db.js");
const authUser = require("./routes/auth.js");
const totalList = require("./routes/list.js");
require("dotenv").config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;
connectDB();

app.use(express.json());  
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.send(`API is running!`);
});

app.use("/api/v1", authUser);
app.use("/api/v2", totalList);


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
