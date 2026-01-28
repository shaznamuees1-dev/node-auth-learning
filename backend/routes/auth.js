const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const {
  generateAccessToken,
  generateRefreshToken
} = require("../utils/token");

const { blacklistToken } = require("../utils/tokenBlacklist");

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

    if (typeof password !== "string" || password.length < 8) {
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
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
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

/* ================= REFRESH ================= */
router.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;

  const user = await User.findOne({ refreshToken });
  if (!user) {
    return res.status(403).json({
      success: false,
      message: "Invalid refresh token"
    });
  }

  jwt.verify(refreshToken, process.env.JWT_SECRET, async err => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Invalid refresh token"
      });
    }

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

/* ================= LOGOUT ================= */
router.post("/logout", async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "Token required" });
  }

  blacklistToken(token);

  await User.updateOne(
    { refreshToken: { $ne: null } },
    { $set: { refreshToken: null } }
  );

  res.json({
    success: true,
    message: "Logged out successfully"
  });
});

/* ================= LOGOUT ALL (DAY 46) ================= */
router.post("/logout-all", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.sendStatus(403);

    const user = await User.findOne({ email: decoded.email });
    if (!user) return res.sendStatus(404);

    user.tokenVersion += 1;
    user.refreshToken = null;
    await user.save();

    res.json({
      success: true,
      message: "All sessions logged out" 
    });  ////One request → kills ALL sessions everywhere.
  });
});

module.exports = router;

