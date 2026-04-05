const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');

app.use(express.json())

//API

//create User

app.post('/signup', async (req, res) => {

    console.log(req.body)

    //creating the new instance of the user Model
    const user = new User(req.body);

    try {
        await user.save();
        res.send("User Added Successfully!")
    } catch (error) {
        res.status(400).send("Error saving the User:", error.message)
    }

})

//Get user by email

// app.get("/user", async (req, res) => {
//     const userEmail = req.body.emailId;
//     try {
//         const users = await User.find({ emailId: userEmail });
//         if (users.length === 0) {
//             res.status(404).send("User Not Found!")
//         } else {
//             res.send(users);
//         }
//     } catch (err) {
//         res.status(400).send("Something went wrong!")
//     }
// })


//Get first user by email if two users are with same emailid

app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const users = await User.findOne({ emailId: userEmail });
        if (users.length === 0) {
            res.status(404).send("User Not Found!")
        } else {
            res.send(users);
        }
    } catch (err) {
        res.status(400).send("Something went wrong!")
    }
})


//Feed API get/feed - Get all the users from the database

app.get('/feed', async (req, res) => {

    try {

        const users = await User.find({})
        res.send(users);

    }
    catch (err) {
        res.status(400).send("Something went wrong!")
    }
})

//Find by id and delete

app.delete('/user', async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId)
        res.send("User Deleted Successfully!")
    } catch (err) {
        res.status(400).send("Something went wrong!")
    }
})

//Update data of the User

app.patch('/user/:userId', async (req, res) => {

    const userId = req.params?.userId;
    const data = req.body;

    try {

        const ALLOWED_UPDATES = ["userId", "photoUrl", "about", "gender", "age"];

        const isUpdateAllowed = Object.keys(data).every((k) => {
            return ALLOWED_UPDATES.includes(k); // Explicitly return the result
        });

        if (!isUpdateAllowed) {
            throw new Error("Update not allowed");
        }

        const user = await User.findByIdAndUpdate({ _id: userId }, data, {
            returnDocument: 'after',
            runValidators: true
        });

        if (!user) {
            return res.status(404).send("User not found!");
        }

        res.send("User Updated Successfully!");

    } catch (err) {
        res.status(400).send(`Something went wrong! ${err.message}`);
    }
})

connectDB()
    .then(() => {
        console.log("Database connection established!")
        app.listen(3000, () => {
            console.log('Server is successfully listining on port 3000')
        });
    })
    .catch((err) => {
        console.error('database cannot be connected!')
    })


