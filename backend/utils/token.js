const jwt = require("jsonwebtoken");

// Short-lived access token
function generateAccessToken(user) {
  return jwt.sign(
    {
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
}

// Long-lived refresh token
function generateRefreshToken(user) {
  return jwt.sign(
    {
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

module.exports = {
  generateAccessToken,
  generateRefreshToken
};
