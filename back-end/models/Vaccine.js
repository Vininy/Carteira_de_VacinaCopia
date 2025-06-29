import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Vaccine = sequelize.define('Vaccine', {
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,  // define como chave primária
    unique: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'vacinas', // nome da tabela no banco
  timestamps: false
});
