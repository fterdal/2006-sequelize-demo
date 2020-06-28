const { db, Sandwich, Customer } = require("./server/db")

console.log('Customer', Customer)

async function seedDb() {
  await db.sync({ force: true });

  const [roastBeef, blt] = await Sandwich.bulkCreate([
    { name: 'Roast Beef', size: 'small' },
    { name: 'BLT' },
    { name: 'Reuben', size: 'party' },
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
