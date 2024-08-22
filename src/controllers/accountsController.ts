import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../database';
import { RowDataPacket } from 'mysql2';

// Tajni ključ za JWT
const JWT_SECRET = 'your_jwt_secret_key'; // Postavite vaš tajni ključ ovde

// Funkcija za registraciju korisnika
export const register = async (req: Request, res: Response) => {
  const { username, email, password, currency } = req.body;

  if (!username || !email || !password || !currency) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM Users WHERE username = ?', [username]);
    const existingUser = rows;

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query('INSERT INTO Users (username, email, password, currency) VALUES (?, ?, ?, ?)', [username, email, hashedPassword, currency]);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Funkcija za prijavu korisnika
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM Users WHERE username = ?', [username]);
    const users = rows;

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = users[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Funkcija za dobijanje svih transakcija
export const getAccounts = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM Transactions');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Funkcija za kreiranje nove transakcije
export const createAccount = async (req: Request, res: Response) => {
  const { userId, category, amount, type, date, description } = req.body;

  if (!userId || !category || !amount || !type || !date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await pool.query(
      'INSERT INTO Transactions (user_id, category, amount, type, date, description) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, category, amount, type, date, description]
    );
    res.status(201).json({ message: 'Transaction created successfully' });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Funkcija za dobijanje stanja korisnika
export const getUserStatus = async (req: Request, res: Response) => {
  const userId = (req as any).userId; // Pretpostavljamo da se userId dobija iz JWT tokena

  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT balance FROM Users WHERE id = ?', [userId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching user status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
