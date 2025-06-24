// Importazione moduli
import pool from '../database/database.js';
import responseHandler from '../utils/responseHandler.utils.js';

// Funzione per ricevere i portafogli
const getWallets = async (req, res) => {
    // Blocco try-catch per gestione errori
    try {
        // Ricevo dati dalla richiesta
        const { field, identificative } = req.query;
        const { id: userId } = req.user;

        // Lista di possibili campi
        const possibleFields = ['id', 'userId', 'name'];

        // Controllo dati ricevuti
        if (!userId)
            return responseHandler(
                res,
                401,
                false,
                'Login non effettuato correttamente!'
            );

        // Controllo dati ricevuti
        if (!field || !identificative || !possibleFields.includes(field))
            return responseHandler(
                res,
                400,
                false,
                'Dati mancanti o invalidi!'
            );

        // Richiesta portafogli tramite id dell'utente e identificativo
        const [wallets] = await pool.query(
            'SELECT * FROM wallets WHERE ?? = ?, user_id = ?',
            [field, identificative, userId]
        );

        // Invio risposta finale
        return responseHandler(res, 200, true, null, wallets);
    } catch (error) {
        // Invio errore alla console
        console.error(error);
        // Invio un errore se presente
        return responseHandler(res, 500, false, 'Errore interno del server!');
    }
};

// Funzione per aggiungere il portafoglio
const postWallets = async (req, res) => {
    // Blocco try-catch per gestione errori
    try {
        // Ricevo dati dalla richiesta
        const { name } = req.body.data;
        const { id: userId } = req.user;

        // Controllo dei dati ricevuti
        if (!userId)
            return responseHandler(
                res,
                401,
                false,
                'Login non effettuato correttamente!'
            );

        // Controllo dei dati ricevuti
        if (
            !name ||
            typeof name !== 'string' ||
            name?.length < 3 ||
            name?.length > 30
        )
            return responseHandler(
                res,
                400,
                false,
                'Dati mancanti o invalidi!'
            );

        // Esecuzione aggiunta portafoglio
        await pool.query('INSERT INTO wallets (name, user_id) VALUES (?, ?)', [
            name,
            userId,
        ]);

        // Invio risposta finale
        return responseHandler(
            res,
            201,
            true,
            'Portafoglio creato correttamente!'
        );
    } catch (error) {
        // Invio errore alla console
        console.error(error);
        // Invio un errore se presente
        return responseHandler(res, 500, false, 'Errore interno del server!');
    }
};

// Funzione per modificare il portafoglio
const patchWallet = async (req, res) => {
    // Blocco try-catch per gestione errori
    try {
        // Ricevo dati dalla richiesta
        const { id: walletId } = req.body.where;
        const { name } = req.body.data;
        const { id: userId } = req.user;

        // Controllo dati ricevuti
        if (!userId)
            return responseHandler(
                res,
                401,
                false,
                'Login non effettuato correttamente!'
            );

        // Controllo dati ricevuti
        if (
            !walletId ||
            !name ||
            typeof walletId !== 'number' ||
            typeof name !== 'string' ||
            name?.length < 3 ||
            name?.length > 30
        )
            return responseHandler(
                res,
                400,
                false,
                'Dati mancanti o invalidi!'
            );

        // Esecuzione aggiornamento portafoglio
        await pool.query(
            'UPDATE wallets SET name = ? WHERE id = ?, user_id = ?',
            [name, walletId, userId]
        );

        // Invio risposta finale
        return responseHandler(
            res,
            200,
            true,
            'Portafoglio aggiornato correttamente!'
        );
    } catch (error) {
        // Invio errore alla console
        console.error(error);
        // Invio un errore se presente
        return responseHandler(res, 500, false, 'Errore interno del server!');
    }
};

// Funzione per eliminare il portafoglio
const deleteWallet = async (req, res) => {
    // Blocco try-catch per gestione errori
    try {
        // Ricevo dati dalla richiesta
        const { id: walletId } = req.params;
        const { id: userId } = req.user;

        // Controllo dati ricevuti
        if (!userId)
            return responseHandler(
                res,
                401,
                false,
                'Login non effettuato correttamente!'
            );

        // Controllo dati ricevuti
        if (!walletId || typeof walletId !== 'number')
            return responseHandler(
                res,
                400,
                false,
                'Dati mancanti o invalidi!'
            );

        // Esecuzione query di eliminazione
        await pool.query('DELETE wallets WHERE userId = ?, id = ?', [
            userId,
            walletId,
        ]);

        // Invio risposta finale
        return responseHandler(
            res,
            200,
            true,
            'Portafoglio eliminato correttamente!'
        );
    } catch (error) {
        // Invio errore alla console
        console.error(error);
        // Invio un errore se presente
        return responseHandler(res, 500, false, 'Errore interno del server!');
    }
};

// Esportazione funzioni
export { getWallets, postWallets, patchWallet, deleteWallet };
