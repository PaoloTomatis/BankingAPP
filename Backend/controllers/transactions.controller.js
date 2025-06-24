// Importazione moduli
import pool from '../database/database.js';
import responseHandler from '../utils/responseHandler.utils.js';

// Funzione per ricevere le transazioni
const getTransactions = async (req, res) => {
    // Blocco try-catch per gestione errori
    try {
        // Ricevo dati dalla richiesta
        const { field, identificative } = req.query;
        const { id: userId } = req.user;

        // Lista di possibili campi
        const possibleFields = ['id', 'username', 'email', 'created_at'];

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

        // Richiesta transazioni tramite id dell'utente e identificativo
        const [transactions] = await pool.query(
            'SELECT * FROM transactions WHERE userId = ? AND ?? = ?',
            [userId, field, identificative]
        );

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
        const { walletId, type, tagId, amount, date } = req.body.data;
        const { id: userId } = req.user;

        // Lista di possibili tipi
        const possibleTypes = ['income', 'expense'];

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
            !type ||
            !amount ||
            !userId ||
            !date ||
            typeof date !== 'string' ||
            typeof walletId !== 'number' ||
            typeof amount !== 'number' ||
            !possibleTypes.includes(type) ||
            typeof userId !== 'number'
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
            [userId, walletId, amount, type, tagId || null, date]
        );

        // Invio risposta finale
        return responseHandler(
            res,
            201,
            true,
            'Transazione creata correttamente!'
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
        const { id: transactionId } = req.body.where;
        const { type, tagId, amount } = req.body.data;
        const { id: userId } = req.user;

        // Lista di possibili tipi
        const possibleTypes = ['income', 'expense'];

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
            !transactionId ||
            typeof transactionId !== 'number' ||
            !userId ||
            typeof userId !== 'number'
        )
            return responseHandler(
                res,
                400,
                false,
                'Dati mancanti o invalidi!'
            );

        // Creazione liste per creazione della query
        const fields = [];
        const values = [];

        // Aggiunta valori alle liste per creazione della query
        if (type && possibleTypes.includes(type)) {
            fields.push('type = ?');
            values.push(type);
        }

        if (tagId) {
            fields.push('tag_id = ?');
            values.push(tagId);
        }

        if (amount) {
            fields.push('amount = ?');
            values.push(amount);
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
        values.push(id);

        // Esecuzione aggiornamento transazione
        await pool.query(
            `UPDATE transactions SET ${fields.join(', ')} WHERE id = ?`,
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
        const { id: transactionId } = req.params;
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
        if (!transactionId || typeof transactionId !== 'number')
            return responseHandler(
                res,
                400,
                false,
                'Dati mancanti o invalidi!'
            );

        // Esecuzione query di eliminazione
        await pool.query('DELETE transactions WHERE userId = ?, id = ?', [
            userId,
            transactionId,
        ]);

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
