import express from 'express';
import { register, login, getAccounts, createAccount, getUserStatus } from '../controllers/accountsController';

const router = express.Router();

// Ruta za registraciju korisnika
router.post('/register', register);

// Ruta za prijavu korisnika
router.post('/login', login);

// Ruta za dobijanje svih transakcija
router.get('/transactions', getAccounts);

// Ruta za kreiranje nove transakcije
router.post('/transactions', createAccount);

// Ruta za dobijanje stanja korisnika
router.get('/user-status', getUserStatus);

export default router;
