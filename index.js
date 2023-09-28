require("./db")
require("./model/Restaurant")
const express = require('express');
const helmet = require('helmet')
const cors = require('cors');
const restaurantRouter = require("./route/restaurantRoutes")


const app = express();

app.get('/', (req, res) => {
  res.send('Hello This is a Restaurant API by Aman.')
});

//
app.use(cors());
app.use(helmet())

app.use(express.json())
// Router
app.use("/restaurant", restaurantRouter)
//Middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong' })
})
//
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

app.listen(3000, () => {
  console.log('server started');
});
