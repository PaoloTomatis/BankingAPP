// Importazione moduli
import pool from '../database/database.js';
import responseHandler from '../utils/responseHandler.utils.js';

// Funzione per uscire dall'account
const logout = async (req, res) => {
    // Blocco try-catch per gestione errori
    try {
        // Ricevo cookie dalla richiesta
        const { refreshToken } = req.cookies;

        // Controllo i dati ricevuti
        if (!refreshToken || typeof refreshToken !== 'string')
            return responseHandler(
                res,
                200,
                true,
                'Logout avvenuto con successo!'
            );

        // Richiesta utente tramite refresh token
        const [[user]] = await pool.query(
            'SELECT id FROM users WHERE refreshToken = ?',
            [refreshToken]
        );

        // Rimuovo il cookie del refresh token
        res.clearCookie('refreshToken', {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
        });

        // Controllo l'esistenza dell'utente
        if (!user)
            return responseHandler(
                res,
                200,
                true,
                'Logout avvenuto con successo!'
            );

        // Rimuovo il refresh token dal database
        await pool.query('UPDATE users SET refreshToken = ? WHERE id = ?', [
            '',
            user.id,
        ]);

        // Invio risposta finale
        return responseHandler(res, 200, true, 'Logout avvenuto con successo!');
    } catch (error) {
        // Invio errore alla console
        console.error(error);
        // Invio un errore se presente
        return responseHandler(res, 500, false, 'Errore interno del server!');
    }
};

// Esportazione funzione
export default logout;
