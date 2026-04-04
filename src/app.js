const express = require('express');
const connectDB = require('./config/database');
const app = express();
const USer = require('./models/user');
const User = require('./models/user');

//API

app.post('/signup',async (req,res)=>{

    //creating the new instance of the user Model
    const user = new User({
        firstName:"Sachin",
        lastName:"Tendulkar",
        emailId:"sachinTendulkar11096@gmail.com",
        pasword:"sachin@123"
    });

    try{
        await user.save();
        res.send("User Added Successfully!")
    }catch(err){
        res.status(400).send("Error saving the User:",err.message)
    }
    
})

connectDB()
.then(()=>{
    console.log("Database connection established!")
    app.listen(3000,()=>{
    console.log('Server is successfully listining on port 3000')
});
})
.catch((err)=>{
    console.error('database cannot be connected!')
})


