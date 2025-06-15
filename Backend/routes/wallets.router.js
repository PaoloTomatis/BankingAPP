// Importazione moduli
import express from 'express';
import {
    getWallets,
    postWallets,
    patchWallet,
    deleteWallet,
} from '../controllers/wallets.controller.js';

// Creazione router
const router = express.Router();

// Creazione rotte per ricevere, aggiungere, modificare ed eliminare i portafogli
router
    .get('/', getWallets)
    .post('/', postWallets)
    .patch('/', patchWallet)
    .delete('/:id', deleteWallet);

// Esportazione del router
export default router;
