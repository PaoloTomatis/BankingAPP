// Importazione moduli
import pool from '../database/database.js';
import responseHandler from '../utils/responseHandler.utils.js';

// Funzione per ricevere le transazioni
const getTransactions = async (req, res) => {
    // Blocco try-catch per gestione errori
    try {
        // Ricevo dati dalla richiesta
        const { field, identificative } = req.query ? req.query : {};
        const { id: userId } = req.user ? req.user : {};

        // Lista di possibili campi
        const possibleFields = ['id', 'username', 'email', 'created_at'];

        // Lista di transazioni
        let transactions = [];

        // Controllo dati ricevuti
        if (!userId || isNaN(userId))
            return responseHandler(
                res,
                401,
                false,
                'Login non effettuato correttamente!'
            );

        // Controllo dati ricevuti
        if (!field || !identificative || typeof field !== 'string') {
            // Richiesta transazioni tramite id dell'utente senza identificativo
            [transactions] = await pool.query(
                'SELECT * FROM transactions WHERE user_id = ?',
                [userId]
            );
        } else {
            // Controllo dati ricevuti
            if (!possibleFields.includes(field))
                return responseHandler(
                    res,
                    400,
                    false,
                    'Dati mancanti o invalidi!'
                );

            // Richiesta transazioni tramite id dell'utente e identificativo
            [transactions] = await pool.query(
                'SELECT * FROM transactions WHERE userId = ? AND ?? = ?',
                [userId, field, identificative]
            );
        }

        // Invio risposta finale
        return responseHandler(res, 200, true, null, transactions);
    } catch (error) {
        // Invio errore alla console
        console.error(error);
        // Invio un errore se presente
        return responseHandler(res, 500, false, 'Errore interno del server!');
    }
};

// Funzione per aggiungere la transazione
const postTransactions = async (req, res) => {
    // Blocco try-catch per gestione errori
    try {
        // Ricevo dati dalla richiesta
        const { walletId, type, tagId, amount, date } =
            req.body && req.body.data ? req.body.data : {};
        const { id: userId } = req.user ? req.user : {};

        // Lista di possibili tipi
        const possibleTypes = ['income', 'expense'];

        // Controllo dati ricevuti
        if (!userId || isNaN(userId))
            return responseHandler(
                res,
                401,
                false,
                'Login non effettuato correttamente!'
            );

        // Controllo dati ricevuti
        if (
            !walletId ||
            !type ||
            !amount ||
            !date ||
            typeof date !== 'string' ||
            isNaN(walletId) ||
            isNaN(amount) ||
            !possibleTypes.includes(type)
        )
            return responseHandler(
                res,
                400,
                false,
                'Dati mancanti o invalidi!'
            );

        // Esecuzione aggiunta transazione
        await pool.query(
            'INSERT INTO transactions (user_id, wallet_id, amount, type, tag_id, date) VALUES (?, ?, ?, ?, ?, ?)',
            [
                userId,
                walletId,
                parseFloat(amount.toFixed(2)),
                type,
                tagId || null,
                date,
            ]
        );

        // Esecuzione richiesta transazione
        const [[transaction]] = await pool.query(
            'SELECT id FROM transactions WHERE user_id = ? AND wallet_id = ? AND amount = ? AND type = ? AND tag_id = ? AND date = ?',
            [
                userId,
                walletId,
                parseFloat(amount.toFixed(2)),
                type,
                tagId || null,
                date,
            ]
        );

        // Invio risposta finale
        return responseHandler(
            res,
            201,
            true,
            'Transazione creata correttamente!',
            transaction
        );
    } catch (error) {
        // Invio errore alla console
        console.error(error);
        // Invio un errore se presente
        return responseHandler(res, 500, false, 'Errore interno del server!');
    }
};

// Funzione per modificare la transazione
const patchTransaction = async (req, res) => {
    // Blocco try-catch per gestione errori
    try {
        // Ricevo dati dalla richiesta
        const { id: transactionId } =
            req.body && req.body.where ? req.body.where : {};
        const { type, tagId, amount } =
            req.body && req.body.data ? req.body.data : {};
        const { id: userId } = req.user ? req.user : {};

        // Lista di possibili tipi
        const possibleTypes = ['income', 'expense'];

        // Controllo dati ricevuti
        if (!userId || isNaN(userId))
            return responseHandler(
                res,
                401,
                false,
                'Login non effettuato correttamente!'
            );

        // Controllo dati ricevuti
        if (!transactionId || isNaN(transactionId))
            return responseHandler(
                res,
                400,
                false,
                'Dati mancanti o invalidi!'
            );

        // Liste per creazione della query
        const fields = [];
        const values = [];

        // Aggiunta valori alle liste per creazione della query
        if (type && possibleTypes.includes(type)) {
            fields.push('type = ?');
            values.push(type);
        }

        if (tagId && !isNaN(tagId)) {
            fields.push('tag_id = ?');
            values.push(tagId);
        }

        if (amount && !isNaN(amount)) {
            fields.push('amount = ?');
            values.push(parseFloat(amount.toFixed(2)));
        }

        // Controllo dati ricevuti
        if (values.length <= 0 || fields.length <= 0)
            return responseHandler(
                res,
                400,
                false,
                'Dati mancanti o invalidi!'
            );

        // Aggiunta id ai valori
        values.push(transactionId);
        values.push(userId);

        // Esecuzione aggiornamento transazione
        await pool.query(
            `UPDATE transactions SET ${fields.join(
                ', '
            )} WHERE id = ? AND user_id = ?`,
            values
        );

        // Invio risposta finale
        return responseHandler(
            res,
            200,
            true,
            'Transazione aggiornata correttamente!'
        );
    } catch (error) {
        // Invio errore alla console
        console.error(error);
        // Invio un errore se presente
        return responseHandler(res, 500, false, 'Errore interno del server!');
    }
};

// Funzione per eliminare la transazione
const deleteTransaction = async (req, res) => {
    // Blocco try-catch per gestione errori
    try {
        // Ricevo dati dalla richiesta
        const { id: transactionId } = req.params ? req.params : {};
        const { id: userId } = req.user ? req.user : {};

        // Controllo dati ricevuti
        if (!userId || isNaN(userId))
            return responseHandler(
                res,
                401,
                false,
                'Login non effettuato correttamente!'
            );

        // Controllo dati ricevuti
        if (!transactionId || isNaN(transactionId))
            return responseHandler(
                res,
                400,
                false,
                'Dati mancanti o invalidi!'
            );

        // Esecuzione query di eliminazione
        await pool.query(
            'DELETE FROM transactions WHERE userId = ? AND id = ?',
            [userId, transactionId]
        );

        // Invio risposta finale
        return responseHandler(
            res,
            200,
            true,
            'Transazione eliminata correttamente!'
        );
    } catch (error) {
        // Invio errore alla console
        console.error(error);
        // Invio un errore se presente
        return responseHandler(res, 500, false, 'Errore interno del server!');
    }
};

// Esportazione funzioni
export {
    getTransactions,
    postTransactions,
    patchTransaction,
    deleteTransaction,
};
