// src/routes/accounts.ts

import express from 'express';
import { getAccounts, createAccount } from '../controllers/accountsController';

const router = express.Router();

// Ruta za dobijanje svih naloga
router.get('/accounts', getAccounts);

// Ruta za kreiranje novog naloga
router.post('/accounts', createAccount);

export default router;
