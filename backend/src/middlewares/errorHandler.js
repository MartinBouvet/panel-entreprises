// backend/src/middlewares/errorHandler.js
const logger = require('../utils/logger');

/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  // Log the error
  logger.error('Error occurred:', err);
  
  // Set default status code and message
  let statusCode = 500;
  let message = 'Internal Server Error';
  let errorDetails = {};
  
  // Handle specific error types
  if (err.name === 'ValidationError') {
    // Mongoose validation error
    statusCode = 400;
    message = 'Validation Error';
    errorDetails = err.errors;
  } else if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    // JWT errors
    statusCode = 401;
    message = 'Authentication Error';
  } else if (err.name === 'MulterError') {
    // Multer file upload errors
    statusCode = 400;
    message = 'File Upload Error';
    if (err.code === 'LIMIT_FILE_SIZE') {
      message = 'File too large';
    }
  } else if (err.statusCode) {
    // Use error's statusCode if available
    statusCode = err.statusCode;
    message = err.message;
  } else if (err.message) {
    // Use error's message if available
    message = err.message;
  }
  
  // Send error response
  res.status(statusCode).json({
    success: false,
    message: message,
    error: process.env.NODE_ENV === 'production' ? 'An error occurred' : err.toString(),
    details: Object.keys(errorDetails).length > 0 ? errorDetails : undefined
  });
};

module.exports = { errorHandler };