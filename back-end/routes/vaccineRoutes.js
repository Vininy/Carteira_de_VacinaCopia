import express from 'express';
import { getUserVaccines, registerVaccines } from '../controllers/vaccineController.js';
import { verificarToken } from '../middlewares/verificarToken.js';

const router = express.Router();

router.get('/vaccines', verificarToken, getUserVaccines);
router.post('/vaccines', verificarToken, registerVaccines);

export default router;
