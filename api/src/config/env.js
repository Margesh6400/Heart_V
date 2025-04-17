const env = {
  // Server configuration
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3001,
  
  // MongoDB configuration
  MONGO_URI: process.env.MONGO_URI || 'mongodb+srv://parth:parth@cluster0.qnt7mo6.mongodb.net/heart_demo_0?retryWrites=true&w=majority',
  
  // Rate limiting
  RATE_LIMIT: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.NODE_ENV === 'production' ? 100 : 1000 // Limit each IP to 100 requests per windowMs in production
  },
  
  // CORS configuration
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
  
  // Security
  JWT_SECRET: process.env.JWT_SECRET || 'your-development-secret-key',
  
  // API Versions
  API_VERSION: 'v1',
  
  // Cache configuration
  CACHE_TTL: 60 * 5, // 5 minutes
  
  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug'
};

module.exports = env;