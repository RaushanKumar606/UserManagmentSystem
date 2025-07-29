const Request = require("../models/Request");
const User = require("../models/User");
const Software = require("../models/Software");

const createRequest = async (req, res) => {
    try {
        const { softwareId, accessType, reason } = req.body;
        const userId = req.user.id;

        if (!softwareId || !accessType || !reason) {
            return res.status(400).json({ message: "Software ID, access type and reason are required" });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const software = await Software.findById(softwareId);

        if (!software) {
            return res.status(404).json({ message: "Software not found" });
        }

        // Check if access type is valid for the software
        if (!software.accessLevels.includes(accessType)) {
            return res.status(400).json({ message: `Invalid access type. Available options: ${software.accessLevels.join(", ")}` });
        }

        // Check if there's already a pending request
        const existingRequest = await Request.findOne({
            user: userId,
            software: softwareId,
            status: "Pending"
        }).populate("user software");

        if (existingRequest) {
            return res.status(400).json({ message: "You already have a pending request for this software" });
        }

        const newRequest = new Request({
            user: userId,
            software: softwareId,
            accessType,
            reason,
            status: "Pending"
        });

        await newRequest.save();

        const savedRequest = await Request.findById(newRequest._id)
            .populate("user", "username role")
            .populate("software", "name description");

        res.status(201).json({
            message: "Access request created successfully",
            request: savedRequest
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating request", error: error.message });
    }
};

const getPendingRequests = async (req, res) => {
    try {
        const pendingRequests = await Request.find({ status: "Pending" })
            .populate("user", "username role")
            .populate("software", "name description");

        res.status(200).json(pendingRequests);
    } catch (error) {
        res.status(500).json({ message: "Error fetching requests", error: error.message });
    }
};

const getUserRequests = async (req, res) => {
    try {
        const userId = req.user.id;

        const userRequests = await Request.find({ user: userId })
            .populate("user", "username role")
            .populate("software", "name description");

        res.status(200).json(userRequests);
    } catch (error) {
        res.status(500).json({ message: "Error fetching requests", error: error.message });
    }
};

const updateRequestStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status || !["Approved", "Rejected"].includes(status)) {
            return res.status(400).json({ message: "Valid status (Approved/Rejected) is required" });
        }

        const request = await Request.findById(id)
            .populate("user", "username role")
            .populate("software", "name description");

        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }

        if (request.status !== "Pending") {
            return res.status(400).json({ message: `Request is already ${request.status.toLowerCase()}` });
        }

        request.status = status;
        await request.save();

        res.status(200).json({
            message: `Request ${status.toLowerCase()} successfully`,
            request: request
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating request", error: error.message });
    }
};

module.exports = {
    createRequest,
    getPendingRequests,
    getUserRequests,
    updateRequestStatus
}; 