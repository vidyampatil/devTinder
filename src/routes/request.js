const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../middlewares/auth')
const { ConnectionRequestModel } = require("../models/connectionRequest");
const User = require('../models/user');

//Send connection request API
requestRouter.post('/request/send/:status/:toUserId',userAuth,async (req,res)=>{
  try{
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowdedStatus = ["ignored","interested"];

    if(!allowdedStatus.includes(status)){
      return res.status(400).json({message:"Invalid status type"+" "+status})
    }

    const toUser = await User.findById(toUserId);

    if(!toUser){
      return res.status(404).json({message:"User not found!"})
    }

    //If there is an existing connection request
    const existingConnectionRequest = await ConnectionRequestModel.findOne({
      $or:[
        {fromUserId,toUserId},
        {fromUserId:toUserId,toUserId:fromUserId}
      ]
    })

    if(existingConnectionRequest){
      return res.status(400).send({message:"Connection request already exist!"})
    }

    const connectionRequest = new ConnectionRequestModel({
      fromUserId,
      toUserId,
      status
    });

    const data = await connectionRequest.save();

    res.json({
      message:req.user.firstName+" "+"is" +" "+status+" "+"in" +" "+ toUser.firstName,
      data
    })

  }catch(err){
    // Log the error for debugging
    console.error("Error while saving connection request:", err);
    res.status(400).json({
      message: "Error occurred while processing the request.",
      error: err.message
    });
  }
})


requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { status, requestId } = req.params;

    const allowdedStatus = ["accepted", "rejected"];

    if (!allowdedStatus.includes(status)) {
      return res.status(400).json({ message: "Status not allowed!" });
    }

    const connectionRequest = await ConnectionRequestModel.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested"
    });

    if (!connectionRequest) {
      return res.status(404).json({ message: "Connection request not found!" });
    }

    connectionRequest.status = status;

    const data = await connectionRequest.save();

    res.json({
      message: "Connection request " + status,
      data
    });

  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "Error occurred",
      error: err.message
    });
  }
});


module.exports = requestRouter
