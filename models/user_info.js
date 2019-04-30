const sequelize = require('./../database/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('users_info', {
  id: {
    field: 'id',
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  firstName: {
    field: 'first_name',
    type: Sequelize.STRING
  },
  lastName: {
    field: 'last_name',
    type: Sequelize.STRING
  },
  birthday: {
    field: 'birthday',
    type: Sequelize.DATE
  },
  addressID: {
    field: 'address_id',
    type: Sequelize.INTEGER
  },
  userID: {
    field: 'user_id',
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false,
  freezeTableName: true
});
