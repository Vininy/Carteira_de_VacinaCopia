import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { Vaccine } from './Vaccine.js';
import { UserVaccine } from './UserVaccine.js';

export const User = sequelize.define('User', {
  // seus campos aqui...
}, {
  tableName: 'users',
  freezeTableName: true,
  timestamps: false
});

User.belongsToMany(Vaccine, {
  through: UserVaccine,
  foreignKey: 'user_id',    // nome da coluna no banco
  otherKey: 'vacina_id'     // nome da coluna no banco (não vaccine_id)
});
