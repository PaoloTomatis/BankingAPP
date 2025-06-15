// Importazione moduli
import express from 'express';
import {
    getTransactions,
    postTransactions,
    patchTransaction,
    deleteTransaction,
} from '../controllers/transactions.controller.js';

// Creazione router
const router = express.Router();

// Creazione rotte per ricevere, aggiungere, modificare ed eliminare le transazioni
router
    .get('/', getTransactions)
    .post('/', postTransactions)
    .patch('/', patchTransaction)
    .delete('/:id', deleteTransaction);

// Esportazione del router
export default router;
