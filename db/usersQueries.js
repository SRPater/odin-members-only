import pool from './pool.js';

export const createUser = async (
  firstName,
  lastName,
  email,
  hashedPassword,
) => {
  const sql = `
    INSERT INTO users (first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  const { rows } = await pool.query(sql, [
    firstName,
    lastName,
    email,
    hashedPassword,
  ]);

  return rows[0];
};

export const updateUserMembership = async (userId) => {
  const sql = 'UPDATE users SET is_member = true WHERE id = $1';
  await pool.query(sql, [userId]);
};

export const updateUserAdminStatus = async (userId) => {
  const sql = 'UPDATE users SET is_admin = true WHERE id = $1';
  await pool.query(sql, [userId]);
};
