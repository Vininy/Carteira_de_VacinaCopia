import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import { sequelize } from './config/db.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://127.0.0.1:5500'  // front-end local autorizado
}));

app.use(express.json());

// Test DB
sequelize.authenticate()
  .then(() => console.log('🎉 Conectado ao PostgreSQL!'))
  .catch(err => console.error('Erro ao conectar:', err));

// Rotas da API
app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
