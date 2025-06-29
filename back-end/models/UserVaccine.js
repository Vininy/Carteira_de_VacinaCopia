import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { User } from './User.js';
import { Vaccine } from './Vaccine.js';

// Definição da tabela associativa com chaves estrangeiras
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
  tableName: 'uservaccines',
  timestamps: false
});

// Definição das associações (relacionamentos)
// Muitos para muitos entre Users e Vaccines via UserVaccine

User.belongsToMany(Vaccine, {
  through: UserVaccine,
  foreignKey: 'userId',
  otherKey: 'vaccineId'
});

Vaccine.belongsToMany(User, {
  through: UserVaccine,
  foreignKey: 'vaccineId',
  otherKey: 'userId'
});
