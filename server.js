// Import required modules
require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const cors = require("cors");
const connectToMongoDB = require("./db.js"); // Import MongoDB connection
const setupSocket = require("./socket.js"); // Import MongoDB connection
const router = require("./auth.js"); // Import MongoDB connection

// Initialize Express app
const app = express();

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET","POST"],
  })
); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
// Routes
app.get("/", (req, res) => {
  res.send("SALAM");
});
app.use("/api", router);
// Start server

const PORT = process.env.PORT || 3000; // Use the defined port in .env or default to 3000
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToMongoDB();
});
setupSocket(server);
