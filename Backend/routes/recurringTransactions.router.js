// Importazione moduli
import express from 'express';
import {
    getRecurringTransactions,
    postRecurringTransactions,
    patchRecurringTransaction,
    deleteRecurringTransaction,
} from '../controllers/recurringTransactions.controller.js';

// Creazione router
const router = express.Router();

// Creazione rotte per ricevere, aggiungere, modificare ed eliminare le transazioni ricorrenti
router
    .get('/', getRecurringTransactions)
    .post('/', postRecurringTransactions)
    .patch('/', patchRecurringTransaction)
    .delete('/:id', deleteRecurringTransaction);

// Esportazione del router
export default router;
