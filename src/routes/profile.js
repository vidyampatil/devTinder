const expires = require('express');
const profileRouter = expires.Router();
const { userAuth } = require('../middlewares/auth')
const { validateProfileEditData } = require("../utils/validation");


//Profile API
profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (error) {
        res.status(400).send("Something went wrong!")
    }
})

//Profile Edit API
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {

        if (!validateProfileEditData(req)) {
            throw new Error("Invalid Edit Request!")
        }

        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => {
            loggedInUser[key] = req.body[key];
        })

        await loggedInUser.save();

        res.json({
            message:`${loggedInUser.firstName} your profile updated successfully!`,
            data:loggedInUser,
        })

    } catch (err) {
        res.status(400).send("Error" + err);
    }
})


module.exports = profileRouter;