// Import required modules
require("dotenv").config(); // Load environment variables from .env file
const mongoose = require("mongoose");

// MongoDB connection URL
const uri = process.env.MONGODB_URI;

// MongoDB database name
const dbName = process.env.MONGODB_DB_NAME;

// Function to connect to MongoDB using Mongoose
async function connectToMongoDB() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Export the MongoDB connection function
module.exports = connectToMongoDB;
