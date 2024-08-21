import mysql from 'mysql2/promise';

// Kreiranje konekcije sa bazom podataka
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'personal_finances',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;