// Importazione moduli
import express from 'express';
import usersRouter from './users.router.js';
import walletsRouter from './wallets.router.js';
import tagsRouter from './tags.router.js';
import transactionsRouter from './transactions.router.js';
import recurrentTransactionsRouter from './recurrentTransactions.router.js';

// Creazione router
const router = express.Router();

// Creazione rotte per l'api di users, transactions, wallets, tags e recurrent transactions
router
    .use('/users', usersRouter)
    .use('/wallets', walletsRouter)
    .use('/tags', tagsRouter)
    .use('/transactions', transactionsRouter)
    .use('/recurrent-transactions', recurrentTransactionsRouter);

// Esportazione del router
export default router;
