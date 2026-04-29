
const jwt = require('jsonwebtoken');
const User = require('../models/user');


// Middleware for user verification
const userAuth = async (req, res, next) => {
    try{
   //fetch the cookie which is getting from the client through the profile API
   const cookies = req.cookies;
   //extract token from cookies
   const {token} = cookies;

   if(!token){
    throw new Error("Token is not valid!")
   }

   //Validate the token
   const decodedObj = await jwt.verify(token,"DEV@Tinder$790")
   const {_id} = decodedObj;
   //Find the User
   const user = await User.findById(_id)
   if(!User){
    throw new Error("User NOt Found!");
   }

   //attached the user with req 
   req.user = user;

   next();
    }catch(err){
       res.status(400).send("Error",err.message)
    }

};

module.exports = {
    userAuth
};