import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { User } from './User.js';
import { Vaccine } from './Vaccine.js';

export const UserVaccine = sequelize.define('UserVaccine', {
  aplicada: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  dataAplicacao: {
    type: DataTypes.DATEONLY,
    allowNull: true
  }
}, {
  tableName: 'vacinas_usuarios', 
  freezeTableName: true,
  timestamps: false             
});

// Associações (belongsToMany com through)
User.belongsToMany(Vaccine, { through: UserVaccine });
Vaccine.belongsToMany(User, { through: UserVaccine });

Vaccine.belongsToMany(User, {
  through: UserVaccine,
  foreignKey: 'vaccine_id',
  otherKey: 'user_id'
});