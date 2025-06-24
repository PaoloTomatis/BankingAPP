// Importazione moduli
import express from 'express';
import usersRouter from './users.router.js';
import walletsRouter from './wallets.router.js';
import tagsRouter from './tags.router.js';
import transactionsRouter from './transactions.router.js';
import recurringTransactionsRouter from './recurringTransactions.router.js';

// Creazione router
const router = express.Router();

// Creazione rotte per l'api di users, transactions, wallets, tags e recurring transactions
router
    .use('/users', usersRouter)
    .use('/wallets', walletsRouter)
    .use('/tags', tagsRouter)
    .use('/transactions', transactionsRouter)
    .use('/recurring-transactions', recurringTransactionsRouter);

// Esportazione del router
export default router;
