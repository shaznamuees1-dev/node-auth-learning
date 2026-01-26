const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

  // ✅ STORE refresh token (CRITICAL for Day 45)
  user.refreshToken = refreshToken;
  await user.save();

  res.json({ accessToken, refreshToken });
});

/* ================= REFRESH (ROTATION) ================= */
router.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "Refresh token required"
    });
  }

  const user = await User.findOne({ refreshToken });
  if (!user) {
    return res.status(403).json({
      success: false,
      message: "Invalid refresh token"
    });
  }

  jwt.verify(refreshToken, process.env.JWT_SECRET, async (err) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Invalid refresh token"
      });
    }

    // 🔄 ROTATION
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    user.refreshToken = newRefreshToken;
    await user.save();

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    });
  });
});

/* ================= LOGOUT (Day 45) ================= */
router.post("/logout", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(400).json({ message: "Token required" });
  }

  const token = authHeader.split(" ")[1];
  blacklistToken(token);

  // 🔥 Remove refresh token
  await User.updateOne(
    { refreshToken: { $exists: true } },
    { $set: { refreshToken: null } }
  );

  res.json({
    success: true,
    message: "Logged out successfully"
  });
});

module.exports = router;
