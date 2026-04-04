const mongoose = require('mongoose');

const connectDB = async () => {
     await mongoose.connect("mongodb+srv://vidya:vidya3632@namstenode.i4kg7hh.mongodb.net/devtinder?retryWrites=true&w=majority");  
};

module.exports = connectDB;

