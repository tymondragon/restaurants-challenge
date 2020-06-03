const db = require('../server/knex');

exports.list = async (req, res, next) => {
  const restaurants = await db('restaurants').select('*');

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
  console.log("made it here")
    const [restaurant] = await db('restaurants').select('name').where('id', req.params.restaurantId);
    await console.log(restaurant)
    res.json({ ...restaurant })
}