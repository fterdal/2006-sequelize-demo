const Sequelize = require("sequelize")
const db = new Sequelize("postgres://localhost/sandwich-mart")

const Sandwich = db.define("sandwich", {
  name: Sequelize.STRING,
  ingredients: Sequelize.ARRAY(Sequelize.STRING),
  hot: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

async function runDemo() {
  await db.sync()
  // await Sandwich.sync()
}
runDemo();
