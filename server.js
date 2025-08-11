// server.js
const express = require('express');
const sequelize = require('./config/db'); // DB connection file
const userRoutes = require('./routes/user.routes');
require('dotenv').config();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Test DB connection before syncing
(async () => {
  try {
    console.log(`Connecting to DB: ${process.env.DB_NAME} as ${process.env.DB_USER} @ ${process.env.DB_HOST}`);
    await sequelize.authenticate();
    console.log('✅ Database connection successful');

    // Sync tables (update if needed)
    await sequelize.sync({ alter: true });
    console.log('✅ Tables synced with database');

    // Start server
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });

  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
})();
