const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost/sandwich-mart', {
  logging: false,
});


module.exports = db
