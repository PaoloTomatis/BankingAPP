// Importazione moduli
import express from 'express';
import {
    getRecurrentTransactions,
    postRecurrentTransactions,
    patchRecurrentTransaction,
    deleteRecurrentTransaction,
} from '../controllers/recurrentTransactions.controller.js';

// Creazione router
const router = express.Router();

// Creazione rotte per ricevere, aggiungere, modificare ed eliminare le transazioni ricorrenti
router
    .get('/', getRecurrentTransactions)
    .post('/', postRecurrentTransactions)
    .patch('/', patchRecurrentTransaction)
    .delete('/:id', deleteRecurrentTransaction);

// Esportazione del router
export default router;
