const express = require("express");
const {
    createRequest,
    getPendingRequests,
    getUserRequests,
    updateRequestStatus
} = require("../controllers/requestController");
const { authenticateToken, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// POST /api/requests - Create a new access request (Employee)
router.post("/", authenticateToken, authorizeRoles("Employee"), createRequest);

// GET /api/requests/pending - Get all pending requests (Manager only)
router.get("/pending", authenticateToken, authorizeRoles("Manager"), getPendingRequests);

// GET /api/requests/user - Get current user's requests
router.get("/user", authenticateToken, getUserRequests);

// PATCH /api/requests/:id - Update request status (Manager only)
router.patch("/:id", authenticateToken, authorizeRoles("Manager"), updateRequestStatus);

module.exports = router; 