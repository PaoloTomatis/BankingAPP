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
            return responseHandler(res, 400, false, 'Errore nella richiesta!');

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
    } catch (error) {
        // Invio errore alla console
        console.error(error);
        // Invio un errore se presente
        return responseHandler(res, 500, false, 'Errore interno del server!');
    }
};

// Esportazione funzioni
export { getUsers, patchUser, deleteUser };
