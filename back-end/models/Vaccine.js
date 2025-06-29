import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { User } from './User.js';
import { UserVaccine } from './UserVaccine.js';

export const Vaccine = sequelize.define('Vaccine', {
  nome: { type: DataTypes.STRING, allowNull: false },
  descricao: { type: DataTypes.TEXT, allowNull: true },
  codigo: { type: DataTypes.STRING, allowNull: false, unique: true }
}, {
  tableName: 'vacinas',
  freezeTableName: true,
  timestamps: false
});
Vaccine.belongsToMany(User, {
  through: UserVaccine,
  foreignKey: 'vacina_id',  // coluna real no banco
  otherKey: 'user_id'
});