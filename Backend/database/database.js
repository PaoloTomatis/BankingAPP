// Importazione moduli
import { createPool } from 'mysql2';
import { configDotenv } from 'dotenv';

// Configurazione .env
configDotenv();

// Creazione connessione al database
const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PSW,
    database: process.env.DB_DATABASE,
}).promise();

// Esportazione della connessione
export default pool;
