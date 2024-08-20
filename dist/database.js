"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
// Kreiranje konekcije sa bazom podataka
const pool = promise_1.default.createPool({
    host: '127.0.0.1', // ili IP adresa servera baze podataka
    user: 'root', // korisničko ime za pristup bazi podataka
    password: '', // lozinka za pristup bazi podataka
    database: 'unnamed', // naziv vaše baze podataka
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
exports.default = pool;
