const mongoose = require("mongoose");

// Set default values in case .env is not loaded
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://roshankumarsingh964:9E6Qfa6EjldspiKX@cluster0.vyelumc.mongodb.net/";
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "24h";
const PORT = process.env.PORT||5000;

// Export these for use in other files
process.env.JWT_SECRET = JWT_SECRET;
process.env.JWT_EXPIRES_IN = JWT_EXPIRES_IN;
process.env.PORT = PORT;

const connectDB = async () => {
    try {
        console.log("Attempting to connect to MongoDB...");
        
        const conn = await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    
        process.exit(1);
    }
};

module.exports = connectDB; 