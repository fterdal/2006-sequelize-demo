const express = require('express');
const morgan = require('morgan');
const db = require('./db/db');
const { Sandwich, Customer } = require('./db');

const app = express();
app.use(morgan("dev"))

app.get("/", (req, res, next) => {
  res.send(`<h1>Homepage of Finn's Server!! 😇</h1>`)
})

// /api/sandwiches?size=large => all large sandwiches
app.get("/api/sandwiches", async (req, res, next) => {
  // const query = req.query
  // console.log('query', query)
  const size = req.query.size;

  const sandwiches = await Sandwich.findAll({
    // Eager Loading
    include: [
      {model: Customer}
    ],

    // Filtering
    where: {
      size: size
    },
  })
  res.json(sandwiches);
})

async function startServer() {
  const PORT = 8080;
  await db.sync();

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}
startServer();
