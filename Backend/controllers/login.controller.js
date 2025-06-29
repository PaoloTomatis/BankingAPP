// Importazione moduli
import pool from '../database/database.js';
import bcrypt from 'bcrypt';
import responseHandler from '../utils/responseHandler.utils.js';
import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';

// Configurazione .env
configDotenv();

// Funzione per accedere all'account
const login = async (req, res) => {
    // Blocco try-catch per gestione errori
    try {
        // Ricevo dati dalla richiesta
        const { email, psw } = req.body ? req.body : {};

        // Controllo dell'email
        if (
            !email ||
            typeof email !== 'string' ||
            !email?.includes('@') ||
            email?.length > 255
        )
            return responseHandler(res, 403, false, 'Email o Password errata!');

        // Controllo della password
        if (
            !psw ||
            typeof psw !== 'string' ||
            psw?.length < 8 ||
            psw?.length > 255
        )
            return responseHandler(res, 403, false, 'Email o Password errata!');

        // Richiesta utente tramite email
        const [[user]] = await pool.query(
            'SELECT id, username, email, psw FROM users WHERE email = ?',
            [email]
        );
        // Controllo esistenza dell'utente
        if (!user)
            return responseHandler(res, 403, false, 'Email o Password errata!');

        // Risultato del controllo delle password
        const verify = await bcrypt.compare(psw, user.psw);

        // Controllo corrispondenza delle password
        if (!verify)
            return responseHandler(res, 403, false, 'Email o Password errata!');

        // Creazione access token
        const accessToken = jwt.sign(
            { id: user.id, username: user.username, email: user.email },
            process.env.JWT_ACCESS_TOKEN,
            { expiresIn: '3h' }
        );

        // Creazione refresh token
        const refreshToken = jwt.sign(
            { id: user.id, username: user.username, email: user.email },
            process.env.JWT_REFRESH_TOKEN,
            { expiresIn: '4d' }
        );

        // Salvataggio refresh token nel database
        await pool.query('UPDATE users SET refresh_token = ? WHERE id = ?', [
            refreshToken,
            user.id,
        ]);

        // Salvataggio refresh token in cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 1000,
            sameSite: 'lax',
            secure: false,
        });

        // Invio risposta con access token
        return responseHandler(res, 200, true, null, accessToken);
    } catch (error) {
        // Invio errore alla console
        console.error(error);
        // Invio un errore se presente
        return responseHandler(res, 500, false, 'Errore interno del server!');
    }
};

// Esportazione funzione
export default login;
