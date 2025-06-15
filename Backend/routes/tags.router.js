// Importazione moduli
import express from 'express';
import {
    getTags,
    postTags,
    patchTag,
    deleteTag,
} from '../controllers/tags.controller.js';

// Creazione router
const router = express.Router();

// Creazione rotte per ricevere, aggiungere, modificare ed eliminare le categorie
router
    .get('/', getTags)
    .post('/', postTags)
    .patch('/', patchTag)
    .delete('/:id', deleteTag);

// Esportazione del router
export default router;
