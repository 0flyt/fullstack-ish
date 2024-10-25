const express = require('express'),
  path = require('path');

const app = express();

// app.get('/api', (_request, response) => {
//   response.send({ hello: 'World' });
// });
app.get('/api/one', (_request, response) => {
  response.send({ hello: 'One' });
});
app.get('/api/two', (_request, response) => {
  response.send({ hello: 'Two' });
});

app.use(express.static(path.join(path.resolve(), 'dist')));

app.listen(3000, () => {
  console.log('Redo på http://localhost:3000/');
});

const dotenv = require('dotenv'),
  { Client } = require('pg');

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

app.get('/api', async (_request, response) => {
  const { rows } = await client.query('SELECT * FROM cities WHERE name = $1', [
    'Stockholm',
  ]);

  response.send(rows);
});
