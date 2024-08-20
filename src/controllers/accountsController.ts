import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import pool from '../database';
import { RowDataPacket, OkPacket } from 'mysql2';


export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Proveri da li korisnik već postoji
    const [existingUserRows] = await pool.query('SELECT * FROM Users WHERE username = ?', [username]);
    const existingUser = existingUserRows as RowDataPacket[];

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hashovanje lozinke
    const hashedPassword = await bcrypt.hash(password, 10);

    // Upisivanje novog korisnika u bazu
    await pool.query('INSERT INTO Users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
