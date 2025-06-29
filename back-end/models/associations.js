import { User } from './User.js';
import { Vaccine } from './Vaccine.js';
import { UserVaccine } from './UserVaccine.js';

User.belongsToMany(Vaccine, {
  through: UserVaccine,
  foreignKey: 'user_id',
  otherKey: 'vaccine_id'
});

Vaccine.belongsToMany(User, {
  through: UserVaccine,
  foreignKey: 'vaccine_id',
  otherKey: 'user_id'
});
