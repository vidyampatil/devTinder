const { request } = require('express');
const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema(
    {
        fromUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User", //Reference to the user connection
            required: true
        },
        toUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User", //Reference to the user connection
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: {
                values: ["ignored", "interested", "accepted", "rejected"],
                message: `{VALUE} is incorrect status type`
            }
        }
    },
    {
        timestamps: true
    }
);

// Remove 'next' from the function parameters
connectionRequestSchema.pre("save", function () {
    const connectionRequest = this;

    // Check if fromUserId and toUserId are the same
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Cannot send connection request to yourself!");
    }
    
    // In Mongoose 5+, if you don't include 'next' in the arguments, 
    // it assumes the hook is finished once the function ends.
});

const ConnectionRequestModel = mongoose.model(
    "connectionRequest",
    connectionRequestSchema
)

module.exports = { ConnectionRequestModel };