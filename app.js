const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const app = express();
const homeRoutes = require('./routes/homeRoutes');
const authRoutes = require('./routes/authRoutes');
const { createUserTable } = require('./models/user');
const exerciseRoutes = require('./routes/exerciseRoutes');
require('./models/exercise'); // 


// Load environment variables
dotenv.config();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// ✅ Session middleware (must come before route handlers)
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key', // better to store secret in .env
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // set to true if using HTTPS
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// Routes
app.use('/', authRoutes);
app.use('/', homeRoutes);
app.use('/exercise', exerciseRoutes);

// ✅ Create DB table on startup
createUserTable();

// Start server
app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
