// backend/src/config/env.js
require('dotenv').config();

module.exports = {
  // Server Configuration
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Database Configuration
  DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/edf_panel_entreprises',
  
  // JWT Secret
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-jwt-key',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  
  // File Upload Limits
  MAX_FILE_SIZE: process.env.MAX_FILE_SIZE || 10 * 1024 * 1024, // 10MB
  
  // Document Templates Directory
  TEMPLATES_DIR: process.env.TEMPLATES_DIR || 'src/data/templates',
  
  // Upload Directories
  UPLOADS_DIR: process.env.UPLOADS_DIR || 'uploads',
  GENERATED_DOCS_DIR: process.env.GENERATED_DOCS_DIR || 'generated',
  
  // CORS Settings
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
};