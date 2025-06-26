// Importazione moduli
import pool from '../database/database.js';
import responseHandler from '../utils/responseHandler.utils.js';

// Funzione per ricevere gli utenti
const getUser = async (req, res) => {
    // Blocco try-catch per gestione errori
    try {
        // Ricevo dati dalla richiesta
        const { user } = req;

        // Controllo i dati ricevuti
        if (!user || typeof user !== 'object')
            return responseHandler(
                res,
                401,
                false,
                'Login non effettuato correttamente!'
            );

        // Invio risposta finale
        responseHandler(res, 200, true, null, user);
    } catch (error) {
        // Invio errore alla console
        console.error(error);
        // Invio un errore se presente
        return responseHandler(res, 500, false, 'Errore interno del server!');
    }
};

// Funzione per modificare l'utente
const patchUser = async (req, res) => {
    // Blocco try-catch per gestione errori
    try {
        // Ricevo dati dalla richiesta
        const { username, email } =
            req.body && req.body.data ? req.body.data : {};
        const { id: userId } = req.user ? req.user : {};

        // Creazione liste per creazione della query
        let fields = [];
        let values = [];

        // Controllo dati ricevuti
        if (!userId || isNaN(userId))
            return responseHandler(
                res,
                401,
                false,
                'Login non effettuato correttamente!'
            );

        // Aggiunta valori alle liste per creazione della query
        if (
            username &&
            username?.length < 30 &&
            username?.length > 3 &&
            typeof username == 'string'
        ) {
            fields.push('username = ?');
            values.push(username);
        }

        if (
            email &&
            email?.length < 255 &&
            email.includes('@') &&
            typeof username == 'string'
        ) {
            fields.push('email = ?');
            values.push(email);
        }

        // Controllo dati ricevuti
        if (values.length <= 0 || fields.length <= 0)
            return responseHandler(
                res,
                400,
                false,
                'Dati mancanti o invalidi!'
            );

        // Aggiunta userId ai valori
        values.push(userId);

        // Esecuzione aggiornamento utente
        await pool.query(
            `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
            values
        );

        // Invio risposta finale
        return responseHandler(
            res,
            200,
            true,
            'Utente aggiornato correttamente!'
        );
    } catch (error) {
        // Invio errore alla console
        console.error(error);
        // Invio un errore se presente
        return responseHandler(res, 500, false, 'Errore interno del server!');
    }
};

// Funzione per eliminare l'utente
const deleteUser = async (req, res) => {
    // Blocco try-catch per gestione errori
    try {
        // Ricevo dati dalla richiesta
        const { id: userId } = req.user ? req.user : {};

        // Controllo dati ricevuti
        if (!userId || isNaN(userId))
            return responseHandler(
                res,
                401,
                false,
                'Login non effettuato correttamente!'
            );

        // Esecuzione query
        await pool.query('DELETE FROM users WHERE id = ?', [userId]);

        // Invio risposta finale
        return responseHandler(
            res,
            200,
            true,
            'Utente eliminato correttamente!'
        );
    } catch (error) {
        // Invio errore alla console
        console.error(error);
        // Invio un errore se presente
        return responseHandler(res, 500, false, 'Errore interno del server!');
    }
};

// Esportazione funzioni
export { getUser, patchUser, deleteUser };
