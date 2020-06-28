const Sequelize = require("sequelize")
const db = require("./db")

const Customer = db.define('customer', {
  firstName: Sequelize.STRING,
});

module.exports = Customer
