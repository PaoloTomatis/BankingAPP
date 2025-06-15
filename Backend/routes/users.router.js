// Importazione moduli
import express from 'express';
import {
    getUsers,
    patchUser,
    deleteUser,
} from '../controllers/users.controller.js';

// Creazione router
const router = express.Router();

// Creazione rotte per ricevere, modificare ed eliminare gli utenti
router.get('/', getUsers).patch('/', patchUser).delete('/:id', deleteUser);

// Esportazione del router
export default router;
