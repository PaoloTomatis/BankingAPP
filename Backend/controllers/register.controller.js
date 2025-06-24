// Importazione moduli
import pool from '../database/database.js';
import bcrypt from 'bcrypt';
import responseHandler from '../utils/responseHandler.utils.js';

// Funzione per registrare l'account
const register = async (req, res) => {
    // Blocco try-catch per gestione errori
    try {
        // Ricevo dati dalla richiesta
        const { username, email, psw } = req.body;

        // Controllo dell'username
        if (
            !username ||
            typeof username !== 'string' ||
            username?.length < 3 ||
            username?.length > 30
        )
            return responseHandler(
                res,
                400,
                false,
                'Username mancante o invalido!'
            );

        // Controllo dell'email
        if (
            !email ||
            typeof email !== 'string' ||
            !email?.includes('@') ||
            email?.length > 255
        )
            return responseHandler(
                res,
                400,
                false,
                'Email mancante o invalida!'
            );

        // Controllo della password
        if (
            !psw ||
            typeof psw !== 'string' ||
            psw?.length < 8 ||
            psw?.length > 255
        )
            return responseHandler(
                res,
                400,
                false,
                'Password mancante o invalida!'
            );

        // Richiesta utente con username identico
        const [[dUsernameUser]] = await pool.query(
            'SELECT id FROM users WHERE username = ?',
            [username]
        );

        // Richiesta utente con email identica
        const [[dEmailUser]] = await pool.query(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        // Controllo presenza duplicati username e email
        if (dUsernameUser || dEmailUser)
            return responseHandler(
                res,
                409,
                false,
                'Username o Email già registrati!'
            );

        // Criptazione della password
        const pswHash = await bcrypt.hash(psw, 10);

        // Inserimento utente nel database
        await pool.query(
            'INSERT INTO users (username, email, psw, refreshToken) VALUES (?, ?, ?, ?)',
            [username, email, pswHash, '']
        );

        // Invio risposta finale
        return responseHandler(
            res,
            201,
            true,
            'Utente registrato correttamente!'
        );
    } catch (error) {
        // Invio errore alla console
        console.error(error);
        // Invio un errore se presente
        return responseHandler(res, 500, false, 'Errore interno del server!');
    }
};

// Esportazione funzione
export default register;
