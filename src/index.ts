import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from './database'; // Uvezi konekciju sa bazom podataka
import { RowDataPacket } from 'mysql2'; // Dodaj uvoz RowDataPacket
import accountsRouter from './routes/accounts'; // Uvezi ruter za naloge

const app = express();
const port = process.env.PORT || 3000;
const JWT_SECRET = 'your_jwt_secret_key'; // Postavi tajni ključ za JWT

// Middleware
app.use(cors());
app.use(express.json());

// Ruta za testiranje
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Ruta za registraciju korisnika
app.post('/register', async (req, res) => {
  const { username, email, password, currency } = req.body;

  if (!username || !email || !password || !currency) {
    return res.status(400).send('All fields are required.');
  }

  try {
    // Proveri da li korisnik već postoji
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE username = ?', [username]);

    if (rows.length > 0) {
      return res.status(400).send('Username already taken.');
    }

    // Hash lozinku
    const hashedPassword = await bcrypt.hash(password, 10);

    // Kreiraj novog korisnika
    await pool.query('INSERT INTO users (username, email, password, currency) VALUES (?, ?, ?, ?)', [username, email, hashedPassword, currency]);

    res.status(201).send('User registered successfully.');
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send('Server error');
  }
});

// Ruta za prijavu korisnika
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required.');
  }

  try {
    // Proveri da li korisnik postoji
    const [users] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE username = ?', [username]);

    if (users.length === 0) {
      return res.status(401).send('Invalid credentials.');
    }

    const user = users[0];

    // Uporedi lozinku
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).send('Invalid credentials.');
    }

    // Kreiraj JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).send('Server error');
  }
});

// Ruta za dobijanje svih transakcija
app.get('/api/transactions', async (req, res) => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM transactions');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).send('Server error');
  }
});

// Ruta za dobijanje transakcija za određenog korisnika
app.get('/api/transactions/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM transactions WHERE user_id = ?', [userId]);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching user transactions:', err);
    res.status(500).send('Server error');
  }
});

// Koristi ruter za naloge (accountsRouter)
app.use('/api', accountsRouter);

// Pokretanje servera
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
