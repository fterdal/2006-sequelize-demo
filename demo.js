const Sequelize = require('sequelize');
const Op = Sequelize.Op
const db = new Sequelize('postgres://localhost/sandwich-mart');

const Sandwich = db.define('sandwich', {
  name: Sequelize.STRING,
});

async function seedDb() {
  await db.sync({ force: true });

  await Sandwich.create({ name: 'Roast Beef' });
  await Sandwich.create({ name: 'BLT' });
  await Sandwich.create({ name: 'Reuben' });
  await Sandwich.create({ name: 'Grilled Cheese' });

  // Use a Symbol Operator
  const [ roastBeef, reuben ] = await Sandwich.findAll({
    where: {
      name: {
        [Op.startsWith]: 'R'
      }
    }
  });

  console.log(roastBeef.name)
  console.log(reuben.name)

  // console.log(rSandwiches.map(sand => sand.name))

  await db.close();
}
seedDb();
