import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const UserVaccine = sequelize.define('UserVaccine', {
  aplicada: { type: DataTypes.BOOLEAN, defaultValue: false },
  dataAplicacao: { type: DataTypes.DATEONLY, allowNull: true }
}, {
  tableName: 'vacinas_usuarios',
  freezeTableName: true,
  timestamps: false
});
