// Importazione moduli
import { configDotenv } from 'dotenv';
import responseHandler from '../utils/responseHandler.utils.js';
import pool from '../database/database.js';
import jwt from 'jsonwebtoken';

// Configurazione .env
configDotenv();

// Funzione per aggiornare il refreshToken dell'account
const refresh = async (req, res) => {
    // Blocco try-catch per gestione errori
    try {
        // Ricevo cookie dalla richiesta
        const { refreshToken } = req.cookies;

        // Controllo i dati ricevuti
        if (!refreshToken || typeof refreshToken !== 'string')
            return responseHandler(
                res,
                401,
                false,
                'Refresh token mancante o invalido!'
            );

        // Verifico il refresh token
        jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_TOKEN,
            async (err, decoded) => {
                // Controllo errori
                if (err)
                    return responseHandler(
                        res,
                        401,
                        false,
                        'Refresh token mancante o invalido!'
                    );

                // Richiesta utente tramite id
                const [[user]] = await pool.query(
                    'SELECT id, email, username, refreshToken FROM users WHERE id = ?',
                    [decoded.id]
                );

                // Controllo l'esistenza dell'utente
                if (!user)
                    return responseHandler(
                        res,
                        401,
                        false,
                        'Refresh token mancante o invalido!'
                    );

                // Controllo che i refresh token siano uguali
                if (user.refreshToken !== refreshToken)
                    return responseHandler(
                        res,
                        401,
                        false,
                        'Refresh token mancante o invalido!'
                    );

                // Creazione nuovo access token
                const accessToken = jwt.sign(
                    { id: user.id, email: user.email, username: user.username },
                    process.env.JWT_ACCESS_TOKEN,
                    { expiresIn: '3h' }
                );

                // Invio risposta con access token
                return responseHandler(res, 200, true, null, { accessToken });
            }
        );
    } catch (error) {
        // Invio errore alla console
        console.error(error);
        // Invio un errore se presente
        return responseHandler(res, 500, false, 'Errore interno del server!');
    }
};

// Esportazione funzione
export default refresh;
