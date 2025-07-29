const express = require("express");
const {
    getAllSoftware,
    getSoftwareById,
    createSoftware,
    updateSoftware,
    deleteSoftware
} = require("../controllers/softwareController");
const { authenticateToken, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// GET /api/software - Get all software
router.get("/", authenticateToken, getAllSoftware);

// GET /api/software/:id - Get a specific software by ID
router.get("/:id", authenticateToken, getSoftwareById);

// POST /api/software - Create new software (Admin only)
router.post("/", authenticateToken, authorizeRoles("Admin"), createSoftware);

// PUT /api/software/:id - Update a software (Admin only)
router.put("/:id", authenticateToken, authorizeRoles("Admin"), updateSoftware);

// DELETE /api/software/:id - Delete a software (Admin only)
router.delete("/:id", authenticateToken, authorizeRoles("Admin"), deleteSoftware);

module.exports = router; 