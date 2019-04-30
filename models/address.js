const sequelize = require('./../database/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('addresses', {
  id: {
    field: 'id',
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  address1: {
    field: 'address1',
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Address1 is required'
      }
    }
  },
  address2: {
    field: 'address2',
    type: Sequelize.STRING
  },
  city: {
    field: 'city',
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        args: true,
        msg: 'City is required'
      }
    }
  },
  state: {
    field: 'state',
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        args: true,
        msg: 'State is required'
      }
    }
  },
  zipCode: {
    field: 'zip_code',
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Zip Code is required'
      },
      isNumeric: {
        args: true,
        msg: 'Zip code must be a number'
      }
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
});
