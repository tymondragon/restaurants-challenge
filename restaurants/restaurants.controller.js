const db = require('../server/knex');
const API_URL = process.env.GOOGLE_API_URL;
const API_KEY = process.env.GOOGLE_API_KEY;
const fetch = require('node-fetch');

const restaurantFields = {
  name: 'name',
  rating: 'rating',
  hoursOfOperation: 'opening_hours/weekday_text',
  openNow: 'opening_hours/open_now',
  address: 'formatted_address',
  phoneNumber: 'formatted_phone_number',
  website: 'website'
}

const fields = Object.values(restaurantFields);

exports.list = async (req, res, next) => {
  const restaurants = await db('restaurants').select('*');

  const { name, rating, hoursOfOperation, openNow, ...rest } = restaurantFields;
  const listFields = [name, rating, hoursOfOperation, openNow].join(",");

  for (const restaurant of restaurants) {
    const json = await fetchApi(listFields, restaurant.place_id)
    await console.log(json.result)
  }

  // const jsonResult = await fetchApi(listFields, restaurants[0].place_id)
  // await console.log(jsonResult, "result api")

  res.json({
    restaurants: restaurants.map(restaurant => {
      const { id, place_id } = restaurant
      return {
        id: id,
        placeId: place_id
      }
    })
  })
}

exports.getRestaurantById = async (req, res, next) => {
  const [restaurant] = await db('restaurants').select('name').where('id', req.params.restaurantId);
  // await console.log(restaurant)
  res.json({ ...restaurant })
}

async function fetchApi (fields, place_id) {
  const url = urlBuilder(fields, place_id);
  const response = await fetch(url);
  return await response.json();
}

function urlBuilder (fields, place_id) {
  return `${API_URL}?place_id=${place_id}&fields=${fields}&key=${API_KEY}`
}