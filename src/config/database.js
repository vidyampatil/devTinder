const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://vidya:vidya3632@namstenode.i4kg7hh.mongodb.net/devtinder?retryWrites=true&w=majority");
        console.log("Database connected successfully!");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;

