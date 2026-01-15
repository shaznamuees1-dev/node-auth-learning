const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");


const app = express();

//  CORS FIX (IMPORTANT)
app.use(cors({
  origin: "http://127.0.0.1:5500"
}));

app.use(express.json());

const SECRET_KEY = "day32_secret_key"; // learning purpose only

// TEMP user (Day 31 learning)
const user = {
  email: "admin@test.com",
  password: "1234"
};

// Login route → returns TOKEN
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === user.email && password === user.password) {
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
    return res.json({ message: "Login successful", token });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

// 🔐 Middleware to protect routes
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// PROTECTED route
app.get("/dashboard", authenticateToken, (req, res) => {
  res.json({ message: "Welcome to dashboard", user: req.user });
});

app.listen(3000, () => {
  console.log("Auth server running at http://localhost:3000");
});
