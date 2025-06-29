import express from 'express';
import { registerVaccines, getUserVaccines } from '../controllers/vaccineController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rota para registrar vacinas (POST /api/vacinas)
router.post('/vacinas', verificarToken, registerVaccines);

// Rota para obter vacinas do usuário logado (GET /api/vacinas)
router.get('/vacinas', verificarToken, getUserVaccines);

export default router;