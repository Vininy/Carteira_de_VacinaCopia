import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import { sequelize } from './config/db.js';
import cors from 'cors';
import vaccineRoutes from './routes/vaccineRoutes.js';

app.use('/api', vaccineRoutes);

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://127.0.0.1:5500', // ou 'http://localhost:5500'
  credentials: true
}));

app.use(express.json());

// Função async para conectar, sincronizar e iniciar servidor
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('🎉 Conectado ao PostgreSQL!');

    // Sincroniza os modelos e cria as tabelas se não existirem
    await sequelize.sync();

    // Rotas
    app.use('/api', authRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });

  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
  }
}

startServer();
