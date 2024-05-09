const express = require("express");
const bodyParser = require("body-parser");
const passport = require("./passport-config.js"); // Import passport configuration
const User = require("./modal.js"); // Assuming you have a User model
const { generateToken } = require("./jwt.js"); // Import JWT functions

const app = express();
app.use(bodyParser.json()); // Use body-parser middleware for JSON parsing

const route = express.Router();

route.post("/signup", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = new User({ email, password });
    await newUser.save();

    // Respond with success message
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

route.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Generate JWT token
    const token = generateToken({ userId: user._id });
    // Return token
    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Protected route (example)
route.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: "You accessed a protected route" });
  }
);

module.exports = route;
