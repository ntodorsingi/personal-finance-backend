import mysql from 'mysql2/promise';

// Kreiranje konekcije sa bazom podataka
const pool = mysql.createPool({
    host: '127.0.0.1', // ili IP adresa servera baze podataka
    user: 'root', // korisničko ime za pristup bazi podataka
    password: '', // lozinka za pristup bazi podataka
    database: 'unnamed', // naziv vaše baze podataka
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;
