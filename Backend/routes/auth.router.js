// Importazione moduli
import express from 'express';

// Creazione router
const router = express.Router();

// Creazione rotte per refresh, login, registere logout
router.get('/refresh').post('/login').post('/register').get('/logout');

// Esportazione del router
export default router;
