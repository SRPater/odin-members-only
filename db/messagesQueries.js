import pool from './pool.js';

export const getAllMessages = async () => {
  const sql = `
    SELECT
      messages.id,
      messages.title,
      messages.text,
      messages.timestamp,
      users.first_name,
      users.last_name
    FROM messages
    JOIN users ON messages.author_id = users.id
    ORDER BY messages.timestamp DESC
  `;

  const { rows } = await pool.query(sql);
  return rows;
};

export const createMessage = async (title, text, authorId) => {
  const sql = `
    INSERT INTO messages (title, text, author_id)
    VALUES ($1, $2, $3)
  `;

  await pool.query(sql, [title, text, authorId]);
};

export const deleteMessage = async (messageId) => {
  const sql = 'DELETE FROM messages WHERE id = $1';
  await pool.query(sql, [messageId]);
};
