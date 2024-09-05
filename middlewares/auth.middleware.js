// authMiddleware.js
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const jwtBlacklist = new Set();
const isTokenBlacklisted = (token) => jwtBlacklist.has(token);

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);

    try {
      // Fetch user from database using the decoded email
      const fetchedUser = await User.getUserByEmail(user.email);
      if (!fetchedUser) return res.sendStatus(404);

      req.user = fetchedUser; // Set user in req object
      next();
    } catch (error) {
      console.error("Error fetching user:", error);
      return res.sendStatus(500); // Internal Server Error
    }
  });
};

const verifyToken = (authHeader) => {
  if (!authHeader) {
    throw new Error("No authorization header provided");
  }

  const token = authHeader.split(" ")[1];

  if (isTokenBlacklisted(token)) {
    throw new Error("This Authentication Session is terminated; Login!");
  }

  // Access JWT_SECRET from environment variables
  const JWT_SECRET = process.env.JWT_SECRET; // Ensure this is defined correctly
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined"); // This error will occur if JWT_SECRET is not found
  }

  // Verify the token using jwt.verify
  return jwt.verify(token, JWT_SECRET);
};

const isAuthenticated = (request, response, next) => {
  try {
    const user = verifyToken(request.headers.authorization);
    request.user = user;
    next();
  } catch (error) {
    return response.status(401).json({
      success: false,
      message: "Unauthorized! " + error.message,
      error: 1,
    });
  }
};

module.exports = { authenticateToken, isAuthenticated };
