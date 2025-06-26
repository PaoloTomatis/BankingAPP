// Importazione moduli
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import authRouter from './routes/auth.router.js';
import apiRouter from './routes/api.router.js';
import verifyJWT from './middlewares/verifyJWT.middleware.js';

// Configurazione .env
configDotenv();
// Creazione app
const app = express();
// Definizione della porta
const PORT = process.env.PORT || 3000;

// Middleware per cors
app.use(
    cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        credentials: 'includes',
    })
);
// Middleware per json
app.use(express.json());
// Middleware per url
app.use(express.urlencoded());
// Middleware per cookie
app.use(cookieParser());

// Rotta per l'autenticazione
app.use('/auth', authRouter);
// Rotta per l'api
app.use('/api', verifyJWT, apiRouter);

// Rotta 404
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Pagina non esistente!' });
});

// Avvio del server
app.listen(PORT, () => console.log('Server avviato alla porta ' + PORT));
