const pool = require('../config/db');

// ✅ Create table if not exists
const createExerciseTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS exercises (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      duration INT,
      date DATE,
      user_id INT REFERENCES users(id)
    );
  `;

  try {
    await pool.query(query);
    console.log('✅ Exercise table created successfully.');
  } catch (err) {
    console.error('❌ Failed to create exercise table:', err);
  }
};

// ✅ Call it immediately on import
createExerciseTable();

// ✅ CRUD methods
const getAll = async (userId) => {
  const result = await pool.query('SELECT * FROM exercises WHERE user_id = $1 ORDER BY date DESC', [userId]);
  return result.rows;
};

const create = async (data) => {
  const { title, description, duration, date, user_id } = data;
  const query = `
    INSERT INTO exercises (title, description, duration, date, user_id)
    VALUES ($1, $2, $3, $4, $5)
  `;
  await pool.query(query, [title, description, duration, date, user_id]);
};

const update = async (id, data) => {
  const { title, description, duration, date } = data;
  const query = `
    UPDATE exercises
    SET title = $1, description = $2, duration = $3, date = $4
    WHERE id = $5
  `;
  await pool.query(query, [title, description, duration, date, id]);
};

const remove = async (id) => {
  await pool.query('DELETE FROM exercises WHERE id = $1', [id]);
};

const getById = async (id) => {
  const result = await pool.query('SELECT * FROM exercises WHERE id = $1', [id]);
  return result.rows[0];
};

module.exports = {
  getAll,
  create,
  update,
  remove,
  getById
};
