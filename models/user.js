const pool = require('../config/db');

// Create users table if it doesn't exist
const createUserTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(query);
    console.log("✅ 'users' table created or already exists.");
  } catch (err) {
    console.error("❌ Error creating users table:", err.message);
  }
};

// Register a new user
const createUser = async (name, email, password) => {
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password]
    );
    return result.rows[0];
  } catch (err) {
    console.error("❌ Error creating user:", err.message);
    throw err;
  }
};

// Get user by email for login
const getUserByEmail = async (email) => {
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 LIMIT 1',
      [email]
    );
    return result.rows[0];
  } catch (err) {
    console.error("❌ Error fetching user by email:", err.message);
    throw err;
  }
};

module.exports = {
  createUserTable,
  createUser,
  getUserByEmail
};
