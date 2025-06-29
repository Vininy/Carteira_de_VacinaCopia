import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const User = sequelize.define('User', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dataNascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'data_nascimento'  
  },
  tipoSanguineo: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'tipo_sanguineo'   
  }
}, {
    tableName: 'users',
  freezeTableName: true,
  timestamps: false
});
