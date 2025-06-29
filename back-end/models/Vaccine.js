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
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'vacinas',       
  freezeTableName: true,
   timestamps: false          
});

Vaccine.belongsToMany(User, {
  through: UserVaccine,
  foreignKey: 'vaccine_id',
  otherKey: 'user_id'
});