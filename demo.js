const Sequelize = require('sequelize');
const { Op } = Sequelize;
const db = new Sequelize('postgres://localhost/sandwich-mart', {
  logging: false,
});

const Sandwich = db.define('sandwich', {
  name: Sequelize.STRING,
  size: {
    type: Sequelize.ENUM('small', 'large', 'party'),
    defaultValue: 'large',
  },
});

const Customer = db.define('customer', {
  firstName: Sequelize.STRING,
});

Sandwich.belongsToMany(Customer, { through: 'orders' });
Customer.belongsToMany(Sandwich, { through: 'orders' });

async function seedDb() {
  await db.sync({ force: true });

  const [ roastBeef, blt ] = await Sandwich.bulkCreate([
    { name: 'Roast Beef' },
    { name: 'BLT' },
    { name: 'Reuben' },
    { name: 'Grilled Cheese' },
  ]);
  // await Sandwich.create({ name: 'Roast Beef' });
  // await Sandwich.create({ name: 'BLT' });
  // await Sandwich.create({ name: 'Reuben' });
  // await Sandwich.create({ name: 'Grilled Cheese' });

  const [ priti, travis ] = await Customer.bulkCreate([
    { firstName: 'Priti' },
    { firstName: 'Travis' },
    { firstName: 'Finn' },
  ]);

  console.log(Object.keys(priti.__proto__));

  await priti.addSandwich(blt);

  // // Use a Symbol Operator
  // const [roastBeef, reuben] = await Sandwich.findAll({
  //   where: {
  //     name: {
  //       [Op.startsWith]: 'R',
  //     },
  //   },
  // });

  // // const roastBeef = rSandwiches[0]
  // // const reuben = rSandwiches[1]
  // console.log(roastBeef.name);
  // console.log(reuben.name);

  // console.log(rSandwiches.map(sand => sand.name))

  await db.close();
}
seedDb();
