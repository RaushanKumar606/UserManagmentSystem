const Software = require("../models/Software");

const getAllSoftware = async (req, res) => {
    try {
        const software = await Software.find();
        res.status(200).json(software);
    } catch (error) {
        res.status(500).json({ message: "Error fetching software", error: error.message });
    }
};

const getSoftwareById = async (req, res) => {
    try {
        const { id } = req.params;
        const software = await Software.findById(id);

        if (!software) {
            return res.status(404).json({ message: "Software not found" });
        }

        res.status(200).json(software);
    } catch (error) {
        res.status(500).json({ message: "Error fetching software", error: error.message });
    }
};

const createSoftware = async (req, res) => {
    try {
        const { name, description, accessLevels } = req.body;

        if (!name || !description || !accessLevels) {
            return res.status(400).json({ message: "Name, description and accessLevels are required" });
        }

        const newSoftware = new Software({
            name,
            description,
            accessLevels
        });

        await newSoftware.save();

        res.status(201).json({
            message: "Software created successfully",
            software: newSoftware
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating software", error: error.message });
    }
};

const updateSoftware = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, accessLevels } = req.body;

        const software = await Software.findById(id);

        if (!software) {
            return res.status(404).json({ message: "Software not found" });
        }

        software.name = name || software.name;
        software.description = description || software.description;
        software.accessLevels = accessLevels || software.accessLevels;

        await software.save();

        res.status(200).json({
            message: "Software updated successfully",
            software: software
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating software", error: error.message });
    }
};

const deleteSoftware = async (req, res) => {
    try {
        const { id } = req.params;

        const software = await Software.findByIdAndDelete(id);

        if (!software) {
            return res.status(404).json({ message: "Software not found" });
        }

        res.status(200).json({ message: "Software deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting software", error: error.message });
    }
};

module.exports = {
    getAllSoftware,
    getSoftwareById,
    createSoftware,
    updateSoftware,
    deleteSoftware
}; 