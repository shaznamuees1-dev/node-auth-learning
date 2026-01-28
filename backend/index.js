require("dotenv").config();

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/auth");
const User = require("./models/User");
const { isTokenBlacklisted } = require("./utils/tokenBlacklist");

const app = express();

app.use(cors({ origin: "http://127.0.0.1:5500" }));
app.use(express.json());

/* ---------- BRUTE FORCE PROTECTION ---------- */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many login attempts. Try again later."
  }
});

app.use("/auth/login", loginLimiter);

/* ---------- AUTH MIDDLEWARE ---------- */
async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(403);

  const token = authHeader.split(" ")[1];

  if (isTokenBlacklisted(token)) {
    return res.status(401).json({
      success: false,
      message: "Token revoked. Please login again."
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.sendStatus(403);

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists"
      });
    }

    // ✅ DAY 46 CORE CHECK
    if (decoded.tokenVersion !== user.tokenVersion) {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please login again."
      });
    }

    req.user = user;
    req.token = token;
    next();
  });
}

function adminOnly(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admins only"
    });
  }
  next();
}

/* ---------- ROUTES ---------- */
app.use("/auth", authRoutes);

app.get("/public", (req, res) => {
  res.json({ message: "Public content – no login required" });
});

app.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: "User dashboard", user: req.user });
});

app.get("/admin", verifyToken, adminOnly, (req, res) => {
  res.json({ message: "Admin dashboard" });
});

/* ---------- DATABASE + SERVER ---------- */
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    app.listen(process.env.PORT || 3000, () => {
      console.log("🚀 Server running at http://localhost:3000");
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
  }
}

startServer();
