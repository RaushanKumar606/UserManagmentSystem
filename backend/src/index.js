const express = require("express");
const cors = require("cors");

// Load environment variables
try {
    require("dotenv").config();
    console.log("Environment variables loaded successfully");
} catch (error) {
    console.log("Warning: Could not load .env file, using default values");
}

const connectDB = require("./config/database");

// Import routes
const authRoutes = require("./routes/auth");
const softwareRoutes = require("./routes/software");
const requestRoutes = require("./routes/request");

// Initialize express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/software", softwareRoutes);
app.use("/api/requests", requestRoutes);

// Root route
app.get("/", (req, res) => {
    res.send("User Access Management System API");
});

// Initialize database and start server
const PORT =  5000;

const startServer = async () => {
    try {
        console.log("Starting User Access Management System...");
        console.log("Port:", PORT);
        
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
           
        });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
};

startServer(); 