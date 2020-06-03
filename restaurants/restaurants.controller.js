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
  try {
    let restaurants = await db('restaurants').select('id', 'place_id');

    const { name, rating, hoursOfOperation, openNow, ...rest } = restaurantFields;
    const listFields = [name, rating, hoursOfOperation, openNow];

    let serializedRestaurants = []
    for (let restaurant of restaurants) {
      const json = await fetchApi(listFields.join(","), restaurant.place_id)
      restaurant = {
        ...restaurant,
        ...json.result
      }
      serializedRestaurants = [...serializedRestaurants, exports.serializeRestaurant(restaurant)]
    }

    res.json({ restaurants: serializedRestaurants })
  } catch (e) {
    console.log(e)
  }
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

exports.serializeRestaurant = (
  {
    id,
    name,
    opening_hours,
    rating,
    formatted_address,
    formatted_phone_number,
    website
  }) => {
  return {
    id: id ? id : null,
    name: name ? name : null,
    openNow: opening_hours ? opening_hours["open_now"] : null,
    hoursOfOperation: opening_hours ? opening_hours["weekday_text"] : null,
    rating: rating ? rating : null,
    address: formatted_address ? formatted_address : null,
    phoneNumber: formatted_phone_number ? formatted_phone_number : null,
    website: website ? website : null
  }
}