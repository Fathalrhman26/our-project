// backend/middleware/auth.js

const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Middleware to authenticate JWT tokens.
 * Adds the user ID to the request object if authentication is successful.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if authorization header is present
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  // Extract token from header
  const token = authHeader.split(' ')[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // Add user ID to request object
    next();
  } catch (error) {
    console.error('Authentication Middleware Error:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
