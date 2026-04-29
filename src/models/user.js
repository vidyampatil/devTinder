const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
               throw new Error("Invalid Email Address");
            }
        } 
    },
    password:{
        type:String,
        required:true,
        validate(value){
          if(!validator.isStrongPassword(value)){
            throw new Error("Enter Strong Password");
          }
        }
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){
           if(!["male","female","others"].includes(value)){
              throw("Gender is not valid!")
           }
        }
    },
    photoUrl:{
        type:String,
        default:"https://img.freepik.com/premium-photo/software-engineer-digital-avatar-generative-ai_934475-8997.jpg?w=2000",
        validate(value){
            if(!validator.isURL(value)){
               throw new Error("Invalid Photo URL");
            }
        } 
    },
    about:{
        type:String,
        default:"This is the default about of the User"
    },
    skills:{
        type:[String]
    }  
},
{
    timestamps:true
}

)


const User = mongoose.model("User",userSchema);

module.exports = User;