// Importazione moduli
import { createPool } from 'mysql2';
import { configDotenv } from 'dotenv';

const isProduction = process.env.NODE_ENV === 'production';

// Configurazione .env
configDotenv();

// Creazione connessione al database
const pool = createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: isProduction ? { ca: process.env.DB_CA_CERT } : undefined,
}).promise();

// Esportazione della connessione
export default pool;
