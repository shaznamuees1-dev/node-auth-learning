const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const {
  generateAccessToken,
  generateRefreshToken
} = require("../utils/token");

console.log("🔥 AUTH ROUTES FILE LOADED 🔥");

const router = express.Router();

/* ================= REGISTER (Day 43) ================= */
router.post("/register", async (req, res) => {
  try {
    // ✅ ALWAYS destructure first
    const { email, password } = req.body;

    console.log("REGISTER HIT:", password, typeof password);

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // Type guard (important for security)
    if (typeof password !== "string") {
      return res.status(400).json({
        success: false,
        message: "Password must be a string"
      });
    }

    // 🔐 Password policy (Day 43 goal)
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long"
      });
    }

    // Check duplicate user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    await User.create({
      email,
      password: hashedPassword,
      role: "user"
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully"
    });

  } catch (err) {
    console.error("REGISTER ERROR 👉", err);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required"
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password"
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password"
    });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  res.json({ accessToken, refreshToken });
});

module.exports = router;
