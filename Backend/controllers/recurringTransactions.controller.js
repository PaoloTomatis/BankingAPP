// Importazione moduli
import pool from '../database/database.js';
import responseHandler from '../utils/responseHandler.utils.js';

// Funzione per ricevere le transazioni ricorrenti
const getRecurringTransactions = async (req, res) => {
    // Blocco try-catch per gestione errori
    try {
        // Ricevo dati dalla richiesta
        const { field, identificative } = req.query ? req.query : {};
        const { id: userId } = req.user ? req.user : {};

        // Lista transazioni ricorrenti
        let recurringTransactions = [];

        // Lista di possibili campi
        const possibleFields = [
            'id',
            'walletId',
            'type',
            'tagId',
            'recurrence',
            'name',
        ];

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
            // Richiesta transazioni ricorrenti tramite id dell'utente senza identificativo
            [recurringTransactions] = await pool.query(
                'SELECT * FROM recurring_transactions WHERE user_id = ?',
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

            // Richiesta transazioni ricorrenti tramite id dell'utente e identificativo
            [recurringTransactions] = await pool.query(
                'SELECT * FROM recurring_transactions WHERE ?? = ? AND user_id = ?',
                [field, identificative, userId]
            );
        }

        // Invio risposta finale
        return responseHandler(res, 200, true, null, recurringTransactions);
    } catch (error) {
        // Invio errore alla console
        console.error(error);
        // Invio un errore se presente
        return responseHandler(res, 500, false, 'Errore interno del server!');
    }
};

// Funzione per aggiungere la transazione ricorrente
const postRecurringTransactions = async (req, res) => {
    // Blocco try-catch per gestione errori
    try {
        // Ricevo dati dalla richiesta
        const { amount, type, tagId, recurrence, lastDate } =
            req.body && req.body.data ? req.body.data : {};
        let { walletId } = req.body && req.body.data ? req.body.data : {};
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
            !lastDate ||
            typeof lastDate !== 'string' ||
            !amount ||
            isNaN(amount) ||
            !type ||
            typeof type !== 'string' ||
            !possibleTypes.includes(type) ||
            !recurrence ||
            typeof recurrence !== 'string'
        )
            return responseHandler(
                res,
                401,
                false,
                'Dati mancanti o invalidi!'
            );

        const [walletsId] = await pool.query(
            'SELECT id FROM wallets WHERE user_id = ?',
            [userId]
        );

        if (!walletId && walletsId.length >= 1) {
            walletId = walletsId[0].id;
        } else if (!walletId && walletsId.length <= 0)
            responseHandler(
                res,
                400,
                false,
                'Non è presente alcun portafoglio'
            );

        // Esecuzione inserimento transazione ricorrente
        await pool.query(
            'INSERT INTO recurring_transactions (wallet_id, amount, type, tag_id, user_id, last_date, recurrence) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
                walletId,
                parseFloat(amount.toFixed(2)),
                type,
                tagId || null,
                userId,
                lastDate,
                recurrence,
            ]
        );

        // Esecuzione richiesta transazione ricorrente
        const [[recurring_transaction]] = await pool.query(
            'SELECT id, wallet_id FROM recurring_transactions WHERE wallet_id = ? AND type = ? AND user_id = ? AND recurrence = ? AND last_date = ?',
            [walletId, type, userId, recurrence, lastDate]
        );

        // Invio risposta finale
        return responseHandler(
            res,
            201,
            true,
            'Transazione ricorrente aggiunta correttamente!',
            {
                id: recurring_transaction?.id,
                walletId: recurring_transaction.wallet_id,
            }
        );
    } catch (error) {
        // Invio errore alla console
        console.error(error);
        // Invio un errore se presente
        return responseHandler(res, 500, false, 'Errore interno del server!');
    }
};

// Funzione per modificare la transazione ricorrente
const patchRecurringTransaction = async (req, res) => {
    // Blocco try-catch per gestione errori
    try {
        // Ricevo dati dalla richiesta
        const { id: recurringTransactionsId } =
            req.body && req.body.where ? req.body.where : {};
        const { amount, type, tagId, recurrence } =
            req.body && req.body.data ? req.body.data : {};
        const { id: userId } = req.user ? req.user : {};

        // Lista possibili tipi
        const possibleTypes = ['income', 'expense'];

        // Liste creazione query
        const fields = [];
        const values = [];

        // Controllo dati ricevuti
        if (!userId || isNaN(userId))
            return responseHandler(
                res,
                401,
                false,
                'Login non effettuato correttamente!'
            );

        // Controllo dati ricevuti
        if (!recurringTransactionsId || isNaN(recurringTransactionsId))
            return responseHandler(res, 400, false, 'Dati mancanti o invalidi');

        // Controllo dati ricevuti
        if (amount && !isNaN(amount)) {
            fields.push('amount = ?');
            values.push(parseFloat(amount.toFixed(2)));
        }

        if (type && typeof type == 'string' && possibleTypes.includes(type)) {
            fields.push('type = ?');
            values.push(type);
        }

        if (tagId && !isNaN(tagId)) {
            fields.push('tag_id = ?');
            values.push(tagId);
        }

        if (recurrence && typeof recurrence == 'string') {
            fields.push('recurrence = ?');
            values.push(recurrence);
        }

        // Controllo dati ricevuti
        if (values.length <= 0 || fields.length <= 0)
            return responseHandler(
                res,
                400,
                false,
                'Dati mancanti o invalidi!'
            );

        // Aggiunta id della transazione ricorrente e dell'utente
        values.push(recurringTransactionsId);
        values.push(userId);

        // Esecuzione aggiornamento transazione ricorrente
        await pool.query(
            `UPDATE recurring_transactions SET ${fields.join(
                ', '
            )} WHERE id = ? AND user_id = ?`,
            values
        );

        // Invio risposta finale
        return responseHandler(
            res,
            200,
            true,
            'Transazione ricorrente aggiornata correttamente!'
        );
    } catch (error) {
        // Invio errore alla console
        console.error(error);
        // Invio un errore se presente
        return responseHandler(res, 500, false, 'Errore interno del server!');
    }
};

// Funzione per eliminare la transazione ricorrente
const deleteRecurringTransaction = async (req, res) => {
    // Blocco try-catch per gestione errori
    try {
        // Ricevo dati dalla richiesta
        const { id: recurringTransactionsId } = req.params ? req.params : {};
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
        if (!recurringTransactionsId || isNaN(recurringTransactionsId))
            return responseHandler(
                res,
                400,
                false,
                'Dati mancanti o invalidi!'
            );

        // Esecuzione eliminazione transazione ricorrente
        await pool.query(
            'DELETE FROM recurring_transactions WHERE id = ? AND user_id = ? ',
            [recurringTransactionsId, userId]
        );

        // Invio risposta finale
        return responseHandler(
            res,
            200,
            true,
            'Transazione ricorrente eliminata correttamente!'
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
    getRecurringTransactions,
    postRecurringTransactions,
    patchRecurringTransaction,
    deleteRecurringTransaction,
};
