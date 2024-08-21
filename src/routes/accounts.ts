import express from 'express';
import { getAccounts, createAccount, register, login } from '../controllers/accountsController';

const router = express.Router();

// Ruta za registraciju korisnika
router.post('/register', register);

// Ruta za prijavu korisnika
router.post('/login', login);

// Ruta za dobijanje svih transakcija
router.get('/transactions', getAccounts);

// Ruta za kreiranje nove transakcije
router.post('/transactions', createAccount);

export default router;
