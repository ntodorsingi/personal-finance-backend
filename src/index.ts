import express from 'express';
import cors from 'cors';
import pool from './database'; // Uvezi konekciju

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta za testiranje
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Ruta za dobijanje naloga (primer)
app.get('/api/accounts', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Accounts');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching accounts:', err);
    res.status(500).send('Server error');
  }
});

// Pokretanje servera
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
