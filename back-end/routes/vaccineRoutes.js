import express from 'express';
import { registerVaccines } from '../controllers/vaccineController.js';
import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/vacinas', verificarToken, registerVaccines);

export default router;
