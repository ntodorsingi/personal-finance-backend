import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../database';
import { RowDataPacket } from 'mysql2';

const JWT_SECRET = 'your_jwt_secret_key';

export const register = async (req: Request, res: Response) => {
  const { username, email, password, currency } = req.body;

  if (!username || !email || !password || !currency) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const [existingUserRows] = await pool.query('SELECT * FROM Users WHERE username = ?', [username]);
    const existingUser = existingUserRows as RowDataPacket[];

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

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const [userRows] = await pool.query('SELECT * FROM Users WHERE username = ?', [username]);
    const users = userRows as RowDataPacket[];

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

export const getAccounts = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Transactions');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

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
