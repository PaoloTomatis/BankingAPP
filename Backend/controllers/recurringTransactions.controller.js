// Importazione moduli
import pool from '../database/database';
import responseHandler from '../utils/responseHandler.utils';

// Funzione per ricevere le transazioni ricorrenti
const getRecurringTransactions = async (req, res) => {
    // Blocco try-catch per gestione errori
    try {
        // Ricevo dati dalla richiesta
        const { id: userId } = req.user;

        // Controllo dati ricevuti
        if (!userId)
            return responseHandler(
                res,
                401,
                false,
                'Login non effettuato correttamente!'
            );
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
        const { id: userId } = req.user;

        // Controllo dati ricevuti
        if (!userId)
            return responseHandler(
                res,
                401,
                false,
                'Login non effettuato correttamente!'
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
        const { id: userId } = req.user;

        // Controllo dati ricevuti
        if (!userId)
            return responseHandler(
                res,
                401,
                false,
                'Login non effettuato correttamente!'
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
        const { id: userId } = req.user;

        // Controllo dati ricevuti
        if (!userId)
            return responseHandler(
                res,
                401,
                false,
                'Login non effettuato correttamente!'
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
