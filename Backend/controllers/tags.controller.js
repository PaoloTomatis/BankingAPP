// Importazione moduli
import pool from '../database/database.js';
import responseHandler from '../utils/responseHandler.utils.js';

// Funzione per ricevere i tag
const getTags = async (req, res) => {
    // Blocco try-catch per gestione errori
    try {
        // Ricevo dati dalla richiesta
        const { field, identificative } = req.query ? req.query : {};
        const { id: userId } = req.user ? req.user : {};

        // Lista di categorie
        let tags = [];

        // Lista di possibili campi
        const possibleFields = ['id', 'name'];

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
            // Richiesta categorie tramite id dell'utente senza identificativo
            [tags] = await pool.query('SELECT * FROM tags WHERE user_id = ?', [
                userId,
            ]);
        } else {
            // Controllo dati ricevuti
            if (!possibleFields.includes(field))
                return responseHandler(
                    res,
                    400,
                    false,
                    'Dati mancanti o invalidi!'
                );
            // Richiesta categorie tramite id dell'utente e identificativo
            [tags] = await pool.query(
                'SELECT * FROM tags WHERE user_id = ? AND ?? = ?',
                [userId, field, identificative]
            );
        }

        // Invio risposta finale
        return responseHandler(res, 200, true, null, tags);
    } catch (error) {
        // Invio errore alla console
        console.error(error);
        // Invio un errore se presente
        return responseHandler(res, 500, false, 'Errore interno del server!');
    }
};

// Funzione per aggiungere il tag
const postTags = async (req, res) => {
    // Blocco try-catch per gestione errori
    try {
        // Ricevo dati dalla richiesta
        const { name, color } = req.body && req.body.data ? req.body.data : {};
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
        if (
            !name ||
            name?.length > 30 ||
            name?.length < 3 ||
            typeof name !== 'string' ||
            !color.includes('#') ||
            color?.lenght > 7
        )
            return responseHandler(
                res,
                400,
                false,
                'Dati mancanti o invalidi!'
            );

        // Esecuzione aggiunta categoria
        await pool.query(
            'INSERT INTO tags (name, color, user_id) VALUES (?, ?, ?)',
            [name, color || '#000', userId]
        );

        // Esecuzione richiesta categoria
        const [[tag]] = await pool.query(
            'SELECT id FROM tags WHERE name = ? AND color = ? AND user_id = ?',
            [name, color || '#000', userId]
        );

        // Invio risposta finale
        return responseHandler(
            res,
            201,
            true,
            'Categoria creata correttamente!',
            tag
        );
    } catch (error) {
        // Invio errore alla console
        console.error(error);
        // Invio un errore se presente
        return responseHandler(res, 500, false, 'Errore interno del server!');
    }
};

// Funzione per modificare il tag
const patchTag = async (req, res) => {
    // Blocco try-catch per gestione errori
    try {
        // Ricevo dati dalla richiesta
        const { id: tagId } = req.body && req.body.where ? req.body.where : {};
        const { name } = req.body && req.body.data ? req.body.data : {};
        const { id: userId } = req.user ? req.user : {};

        // Liste per creazione query
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
        if (!tagId || isNaN(tagId))
            return responseHandler(
                res,
                400,
                false,
                'Dati mancanti o invalidi!'
            );

        // Aggiunta valori alle liste per creazione della query
        if (
            name &&
            name?.length < 30 &&
            name?.length > 3 &&
            typeof name == 'string'
        ) {
            fields.push('name = ?');
            values.push(name);
        }

        if (tagId && !isNaN(tagId)) {
            fields.push('tag_id = ?');
            values.push(tagId);
        }

        // Controllo dati ricevuti
        if (values.length <= 0)
            return responseHandler(
                res,
                400,
                false,
                'Dati mancanti o invalidi!'
            );

        // Inserimento id del tag e dell'utente
        values.push(tagId);
        values.push(userId);

        // Esecuzione aggiornamento categoria
        await pool.query(
            `UPDATE tags SET ${fields.join(', ')} WHERE id = ? AND userId = ?`,
            values
        );

        // Invio risposta finale
        return responseHandler(
            res,
            200,
            true,
            'Categoria aggiornata correttamente!'
        );
    } catch (error) {
        // Invio errore alla console
        console.error(error);
        // Invio un errore se presente
        return responseHandler(res, 500, false, 'Errore interno del server!');
    }
};

// Funzione per eliminare il tag
const deleteTag = async (req, res) => {
    // Blocco try-catch per gestione errori
    try {
        // Ricevo dati dalla richiesta
        const { id: tagId } = req.params ? req.params : {};
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
        if (!tagId || typeof tagId !== 'string')
            return responseHandler(
                res,
                400,
                false,
                'Dati mancanti o invalidi!'
            );

        // Esecuzione eliminazione categoria
        await pool.query('DELETE FROM tags WHERE id = ? AND user_id = ?', [
            tagId,
            userId,
        ]);

        // Invio risposta finale
        return responseHandler(
            res,
            200,
            true,
            'Categoria eliminata correttamente'
        );
    } catch (error) {
        // Invio errore alla console
        console.error(error);
        // Invio un errore se presente
        return responseHandler(res, 500, false, 'Errore interno del server!');
    }
};

// Esportazione funzioni
export { getTags, postTags, patchTag, deleteTag };
