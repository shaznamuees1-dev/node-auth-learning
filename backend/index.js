require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");

const app = express();

app.use(cors({ origin: "http://127.0.0.1:5500" }));
app.use(express.json());

const SECRET = process.env.JWT_SECRET;

/* -------- MIDDLEWARE -------- */
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(403);

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded;
    next();
  });
}

function adminOnly(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }
  next();
}

/* -------- ROUTES -------- */
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

// ---------- DATABASE + SERVER ----------
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
