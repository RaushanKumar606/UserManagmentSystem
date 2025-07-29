const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signup = async (req, res) => {
    try {
        const { username, password, role = "Employee" } = req.body;

        // Validate role
        const validRoles = ["Employee", "Manager", "Admin"];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role. Must be Employee, Manager, or Admin." });
        }

        // Check if user with same username already exists
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user (password will be hashed by the pre-save middleware)
        const newUser = new User({
            username,
            password,
            role
        });

        await newUser.save();

        // Remove password from response
        const userResponse = {
            _id: newUser._id,
            username: newUser.username,
            role: newUser.role,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt
        };

        res.status(201).json({
            message: "User created successfully",
            user: userResponse
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Compare passwords using the method we defined in the model
        const validPassword = await user.comparePassword(password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET || "your_jwt_secret_key",
            { expiresIn: process.env.JWT_EXPIRES_IN || "24h" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error logging in", error: error.message });
        console.error(error);
    }
};

module.exports = {
    signup,
    login
}; 