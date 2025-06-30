import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import vaccineRoutes from './routes/vaccineRoutes.js';
import { sequelize } from './config/db.js';
import './models/User.js';
import './models/Vaccine.js';
import './models/UserVaccine.js';
import './models/associations.js';
dotenv.config();

const app = express();

// ✅ Configurar CORS e JSON
app.use(cors({
  origin: 'http://127.0.0.1:5500',
  credentials: true
}));
app.use(express.json());

// ✅ Registrar rotas DEPOIS do app ser criado
app.use('/api', authRoutes);
app.use('/api', vaccineRoutes);

// Iniciar servidor
async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('🎉 Banco conectado');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
  }
}
app.use(vaccineRoutes);

app.listen(process.env.PORT || 10000, () => {
  console.log('Servidor rodando...');
});
startServer();





