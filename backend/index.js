const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors({ origin: "http://127.0.0.1:5500" }));
app.use(express.json());

const SECRET = "day33_secret";

// Users with roles
const users = [
  { email: "admin@test.com", password: "1234", role: "admin" },
  { email: "user@test.com", password: "1234", role: "user" }
];

// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const foundUser = users.find(
    u => u.email === email && u.password === password
  );

  if (!foundUser) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { email: foundUser.email, role: foundUser.role },
    SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

// Middleware – verify token
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

// Middleware – admin only
function adminOnly(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }
  next();
}

// Routes
app.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "Profile data", user: req.user });
});

app.get("/admin", verifyToken, adminOnly, (req, res) => {
  res.json({ message: "Admin dashboard" });
});

// Public route
app.get("/public", (req, res) => {
  res.json({ message: "Public content – no login required" });
});


// User dashboard (any logged-in user)
app.get("/dashboard", verifyToken, (req, res) => {
  res.json({
    message: "User dashboard",
    user: req.user
  });
});

app.listen(3000, () => {
  console.log("Day 33 server running at http://localhost:3000");
});

