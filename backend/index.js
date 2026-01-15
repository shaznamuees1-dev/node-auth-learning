const express = require("express");
const cors = require("cors");

const app = express();

//  CORS FIX (IMPORTANT)
app.use(cors({
  origin: "http://127.0.0.1:5500"
}));

app.use(express.json());

// TEMP user (Day 31 learning)
const user = {
  email: "admin@test.com",
  password: "1234"
};

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === user.email && password === user.password) {
    return res.json({ message: "Login successful" });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});


app.listen(3000, () => {
  console.log("Auth server running at http://localhost:3000");
});
