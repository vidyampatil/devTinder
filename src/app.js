const express = require('express');
const connectDB = require('./config/database');
const app = express();
const cookieParser = require("cookie-parser");

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');

//to read req parse data into json format so for that this is middleware used
app.use(express.json())
//to read the cookie use middleware of cookie parser it will parse cookie
app.use(cookieParser());
//Add all router
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);


connectDB()
    .then(() => {
        console.log("Database connection established!")
        app.listen(3000, () => {
            console.log('Server is successfully listining on port 3000')
        });
    })
    .catch((error) => {
        console.error('database cannot be connected!')
    })


