const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const {
  generateAccessToken,
  generateRefreshToken
} = require("../utils/token");

const { blacklistToken } = require("../utils/tokenBlacklist");

console.log("🔥 AUTH ROUTES FILE LOADED 🔥");

const router = express.Router();

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    if (typeof password !== "string") {
      return res.status(400).json({
        success: false,
        message: "Password must be a string"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long"
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedPassword,
      role: "user"
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully"
    });

  } catch (err) {
    console.error("REGISTER ERROR 👉", err);
    res.status(500).json({
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

/* ================= LOGOUT (Day 44) ================= */
router.post("/logout", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(400).json({ message: "Token required" });
  }

  const token = authHeader.split(" ")[1];
  blacklistToken(token);

  res.json({
    success: true,
    message: "Logged out successfully"
  });
});

module.exports = router;
