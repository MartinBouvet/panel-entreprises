// backend/src/config/iaConfig.js
require('dotenv').config();

module.exports = {
  // Mistral AI API Configuration
  MISTRAL_API_KEY: process.env.MISTRAL_API_KEY || 'cec930ebb79846da94d2cf5028177995',
  MISTRAL_MODEL_ID: process.env.MISTRAL_MODEL_ID || 'C2-Interne-Mixtral-8x7b',
  MISTRAL_EMBEDDING_MODEL: process.env.MISTRAL_EMBEDDING_MODEL || 'bge-m3-custom-fr',
  MISTRAL_AGENT_ID: process.env.MISTRAL_AGENT_ID || '67f785d59e82260f684a217a',
};