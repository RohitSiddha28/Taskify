const mongoose = require('mongoose');


const connectDB = async(req, res) => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.URI}/${process.env.DB_name}`);
        console.log(`DB connected!`);
    } catch(err) {
        res.status(400).json({
            message: "Unable to connect with DB!"
        });
        console.log(`Connection failed!`, err);
    }
};

module.exports = connectDB;