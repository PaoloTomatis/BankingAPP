// Importazione moduli
import pool from '../database/database.js';
import responseHandler from '../utils/responseHandler.utils.js';
import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';

// Configurazione .env
configDotenv();

// Funzione per verificare l'access token
const verifyJWT = async (req, res, next) => {
    // Ricevo headers di autorizzazione dalla richista
    const authHeaders = req.headers.authorization;

    // Controllo gli headers di autorizzazione ricevuto
    if (!authHeaders || typeof authHeaders !== 'string')
        return responseHandler(
            res,
            403,
            false,
            'Access token mancante o invalido!'
        );

    // Ricavo access token dagli headers di autorizzazione
    const accessToken = authHeaders.split(' ')[1];

    // Controllo l'access token ricevuto
    if (!accessToken || typeof accessToken !== 'string')
        return responseHandler(
            res,
            403,
            false,
            'Access token mancante o invalido!'
        );

    // Verifico l'access token
    jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_TOKEN,
        async (err, decoded) => {
            if (err)
                return responseHandler(
                    res,
                    403,
                    false,
                    'Access token mancante o invalido!'
                );

            // Richiesta utente tramite id
            const [[user]] = await pool.query(
                'SELECT id, username, email FROM users WHERE id = ?',
                [decoded.id]
            );

            // Controllo esistenza dell'utente
            if (!user)
                return responseHandler(
                    res,
                    403,
                    false,
                    'Access token mancante o invalido!'
                );

            // Invio utente al controllore
            req.user = {
                id: user.id,
                username: user.username,
                email: user.email,
            };

            // Passaggio al controllore
            next();
        }
    );
};

// Esportazione funzione
export default verifyJWT;
