const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    software: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Software",
        required: true
    },
    accessType: {
        type: String,
        enum: ["Read", "Write", "Admin"],
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Request", requestSchema); 