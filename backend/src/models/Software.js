const mongoose = require("mongoose");

const softwareSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    accessLevels: [{
        type: String,
        enum: ["Employee", "Manager", "Admin"]
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model("Software", softwareSchema); 