const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const listener = console.log(`listening in on ${PORT}`);
const db = require('./knex');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../client/build')));

//Routes
app.get('/api', (req, res) => res.send("yo!"));
app.get('/restaurants', async (req, res, next) => {
  const restaurants = await db('restaurants').select('*');
  
  res.json({
    restaurants: restaurants.map(restaurant => {
      const {id, place_id} = restaurant
      return {
        id: id,
        placeId: place_id
      }
    })})
});
app.get('/restaurants/:restaurantId', async (req, res, next) => {
  const [restaurant] = await db('restaurants').select('name').where('id', req.params.restaurantId);
  await console.log(restaurant)
  res.json({...restaurant})
});

app.use((req, res, next) => {
  res.status(404).json({ error: { message: '404 not found' } })
});

app.use((err, req, res, next) => {
  res.status(err.status).json({ error: err })
});

app.listen(PORT, listener);