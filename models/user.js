const sequelize = require('./../database/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('users', {
  id: {
    field: 'id',
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  email: {
    field: 'email',
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Email is required'
      },
      isEmail: {
        args: true,
        msg: 'Must be an email'
      }
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
});
