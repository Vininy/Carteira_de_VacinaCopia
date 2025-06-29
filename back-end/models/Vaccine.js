import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Vaccine = sequelize.define('Vaccine', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  faixa_etaria: {
    type: DataTypes.STRING,
    allowNull: true
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});
