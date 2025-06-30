import express from 'express';
import { registerVaccines, getUserVaccines } from '../controllers/vaccineController.js';
import { verificarToken } from '../middleware/verificarToken.js';

const router = express.Router();

router.post('/vacinas', verificarToken, registerVaccines);
router.get('/vacinas', verificarToken, getUserVaccines);

export default router;
