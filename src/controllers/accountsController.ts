// src/controllers/accountsController.ts

import { Request, Response } from 'express';

export const getAccounts = async (req: Request, res: Response) => {
  try {
    // Ovdje dodajte kod za dobijanje naloga iz baze
    res.json({ accounts: [] }); // Primer odgovora
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const createAccount = async (req: Request, res: Response) => {
  try {
    // Ovdje dodajte kod za kreiranje novog naloga
    res.status(201).json({ message: 'Account created' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
