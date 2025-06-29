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
});
