const db = require("./db")
const Sandwich = require("./sandwich")
const Customer = require("./customer")

console.log(Sandwich)
console.log(Customer)

// Many to Many Relationship
Sandwich.belongsToMany(Customer, { through: 'orders' });
Customer.belongsToMany(Sandwich, { through: 'orders' });

module.exports = {
  Sandwich,
  Customer,
  db
}
