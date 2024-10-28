const express = require('express'),
  path = require('path');

const app = express();
app.use(express.json());
const port = process.env.PORT || 4000;

app.use(express.static(path.join(path.resolve(), 'dist')));

const dotenv = require('dotenv'),
  { Client } = require('pg');

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

app.get('/api', async (_req, res) => {
  const insertQuery = `
  SELECT * FROM posts
  `;
  const { rows } = await client.query(insertQuery);

  res.send(rows);
});

app.post('/api/post', async (req, res) => {
  const { title, content } = req.body;

  try {
    const insertQuery = `
      INSERT INTO posts (title, content)
      VALUES ($1, $2);
    `;

    const result = await client.query(insertQuery, [title, content]);
    res.status(201).json({ message: 'Post created', post: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Error when creating post' });
    console.error(error.message);
  }
});

app.delete('/api/post/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleteQuery = `
    DELETE FROM posts
    WHERE id = $1
    `;

    const result = await client.query(deleteQuery, [id]);
    res.status(200).json({ message: 'Post deleted', result });
  } catch (error) {
    res.status(500).json({ message: 'Error when deleting post' });
    console.log(error.message);
  }
});

app.put('/api/update/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const updateQuery = `
    UPDATE posts
    SET title = $1, content = $2, isupdated = true, updated_at = CURRENT_TIMESTAMP
    WHERE id = $3
    `;

    const result = await client.query(updateQuery, [title, content, id]);
    res.status(200).json({ message: 'Post updated', result });
  } catch (error) {
    res.status(500).json({ message: 'Error when updating post' });
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log(`Redo på http://localhost:${port}/`);
});
