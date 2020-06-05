const db = require('../knex');
const API_URL = process.env.GOOGLE_API_URL;
const API_KEY = process.env.GOOGLE_API_KEY;
const fetch = require('node-fetch');
const moment = require('moment');

const restaurantFields = {
  name: 'name',
  rating: 'rating',
  hoursOfOperationTextText: 'opening_hours/weekday_text',
  hoursOfOperationPeriods: 'opening_hours/periods',
  openNow: 'opening_hours/open_now',
  address: 'formatted_address',
  phoneNumber: 'formatted_phone_number',
  website: 'website'
}

const fields = Object.values(restaurantFields);

exports.list = async (req, res, next) => {
  try {
    let restaurants = await db('restaurants').select('id', 'place_id');

    const { name, rating, hoursOfOperationPeriods, openNow, ...rest } = restaurantFields;
    const listFields = [name, rating, hoursOfOperationPeriods, openNow];

    let serializedRestaurants = []
    let newRestaurant;
    for (let restaurant of restaurants) {
      const json = await exports.fetchApi(listFields.join(","), restaurant.place_id)
      //json.result..opening_hours.periods
      // json["result"]["opening_hours"]["periods"] = exports.dayOfOperationFormatter(json["result"]["opening_hours"]["periods"]);
      restaurant = {
        ...restaurant,
        ...json.result
      }
      if (json.result.opening_hours) {
       newRestaurant = {
          ...restaurant,
          ["opening_hours"]: {
            ...restaurant["opening_hours"],
            ["periods"]: exports.dayOfOperationFormatter([ ...restaurant["opening_hours"]["periods"]])
          }
        }
        // console.log(newRestaurant, "NEW");
      }
      serializedRestaurants = [...serializedRestaurants, exports.serializeRestaurantForList(newRestaurant)];
    }
    
    serializedRestaurants.sort((a, b) => b.rating - a.rating)
    // console.log(serializedRestaurants, "in list")
    res.json({ restaurants: serializedRestaurants })
  } catch (e) {
    next(e)
  }
}

exports.getRestaurantById = async (req, res, next) => {
  try {
    let [restaurant] = await db('restaurants').select('id','place_id').where('id', req.params.restaurantId);
    const json = await exports.fetchApi(fields.join(","), restaurant.place_id)
    restaurant = {
      ...restaurant,
      ...json.result
    }
    res.json(exports.serializeRestaurant(restaurant))
  } catch (e) {
    next(e)
  }
}

exports.fetchApi = async (fields, place_id) => {
  const url = exports.urlBuilder(fields, place_id);
  const response = await fetch(url);
  // await console.log(response.json())
  return await response.json();
}

exports.urlBuilder = (fields, place_id) => {
  return `${API_URL}/maps/api/place/details/json?place_id=${place_id}&fields=${fields}&key=${API_KEY}`
}

exports.dayOfOperationFormatter = (periods) => {
  let week = ["Su", "M", "T", "W", "Th", "F", "Sat"]
  let closedDays = [];

  if (periods.length !== week.length) {
    const dayNumbers = periods.map(day => day.close.day)
    closedDays = week.filter((day, i) => !dayNumbers.includes(i))
  }

  const hoursOfOP = periods.reduce((times, day) => {
    const time = `${day.open.time}-${day.close.time}`;
    times[time] = times[time] || []
    times[time].push(week[day.close.day])
    return times
  }, {})

  if (closedDays.length) {
    hoursOfOP["Closed"] = closedDays
  }
  let dayOfWeeks = [];
  for (let [hours, days] of Object.entries(hoursOfOP)) {
    const splitHours = hours.split("-");
    const truncHours = splitHours.map(hour => {
      if (!isNaN(parseInt(hour, 10))) {
        return moment(hour, 'H').format('h a')
      } else return hour
    })

    const d = days.join(", ");
    dayOfWeeks.push(`${truncHours.join(" - ")} ${d}`);
  }
  return dayOfWeeks;
}
  
exports.serializeRestaurantForList = (
  {
    id,
    name,
    opening_hours,
    rating,
    formatted_address,
    formatted_phone_number,
    website
  }) => {
  console.log("-----------------\n", opening_hours)
  return {
    id: id ? id : null,
    name: name ? name : null,
    openNow: opening_hours ? opening_hours["open_now"] : null,
    hoursOfOperation: opening_hours ? opening_hours["periods"] : null,
    rating: rating ? rating : null,
    address: formatted_address ? formatted_address : null,
    phoneNumber: formatted_phone_number ? formatted_phone_number : null,
    website: website ? website : null
  }
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
    hoursOfOperationText: opening_hours ? opening_hours["weekday_text"] : null,
    rating: rating ? rating : null,
    address: formatted_address ? formatted_address : null,
    phoneNumber: formatted_phone_number ? formatted_phone_number : null,
    website: website ? website : null
  }
}