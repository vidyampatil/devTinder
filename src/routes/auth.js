const express = require('express');
const authRouter = express.Router();
const { validateSignUpData } = require('../utils/validation')
const User = require('../models/user');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

//create User - Signup

authRouter.post('/signup', async (req, res) => {
    try {

        //Validation of the data
        validateSignUpData(req);

        //Encrypt the password
        const { firstName, lastName, emailId, password } = req.body;

        const passwordHash = await bcrypt.hash(password, 10)
        console.log(passwordHash)

        //creating the new instance of the user Model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        });


        await user.save();
        res.send("User Added Successfully!")
    } catch (error) {
        res.status(400).send(`Error: ${error.message}`);
    }

})

//login user

authRouter.post("/login", async (req, res) => {

    try {

        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId })

        if (!user) {
            throw new Error("Invalid credentials!")
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (isPasswordValid) {
            //Create a JWT token using jsonwebtoken
            const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790",{expiresIn:'1d'});
            console.log(token)

            //Add the token to cookie and send the response back
            res.cookie("token", token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) });
            res.send("Login Successfully!")

        } else {
            throw new Error("Invalid credentials!")
        }

    } catch (error) {
        res.status(400).send(`Error: ${error.message}`);
    }
})

//Logout user
authRouter.post("/logout",async(req,res)=>{
    res.
    cookie("token",null,{
        expires:new Date(Date.now())
    }).send("Logout successful!")
})


module.exports = authRouter

