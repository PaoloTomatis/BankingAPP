// Importazione moduli
import express from 'express';
import login from '../controllers/login.controller.js';
import register from '../controllers/register.controller.js';
import refresh from '../controllers/refresh.controller.js';
import logout from '../controllers/logout.controller.js';

// Creazione router
const router = express.Router();

// Creazione rotte per refresh, login, registere logout
router
    .post('/login', login)
    .post('/register', register)
    .get('/refresh', refresh)
    .get('/logout', logout);

// Esportazione del router
export default router;
