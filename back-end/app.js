import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import vaccineRoutes from './routes/vaccineRoutes.js';
import { sequelize } from './config/db.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://127.0.0.1:5500', // ou 'http://localhost:5500'
  credentials: true
}));

app.use(express.json());

// ✅ Aqui agora está no lugar certo
app.use('/api', authRoutes);
app.use('/api', vaccineRoutes);  // Certo agora

// Conecta ao banco e inicia o servidor
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('🎉 Conectado ao PostgreSQL!');

    await sequelize.sync(); // Cria tabelas se necessário

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });

  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
  }
}

startServer();
