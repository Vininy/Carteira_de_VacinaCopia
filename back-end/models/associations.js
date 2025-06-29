// models/associations.js
import { User } from './User.js';
import { Vaccine } from './Vaccine.js';
import { UserVaccine } from './UserVaccine.js';

User.belongsToMany(Vaccine, {
  through: UserVaccine,
  foreignKey: 'user_id',
  otherKey: 'vacina_id'
});

Vaccine.belongsToMany(User, {
  through: UserVaccine,
  foreignKey: 'vacina_id',
  otherKey: 'user_id'
});
