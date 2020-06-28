const Sequelize = require('sequelize');
const db = require('./db');

const Sandwich = db.define('sandwich', {
  name: Sequelize.STRING,
  size: {
    type: Sequelize.ENUM('small', 'large', 'party'),
    defaultValue: 'large',
  },
});

module.exports = Sandwich
