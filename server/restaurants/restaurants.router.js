const express = require("express");
const router = express.Router();
const endpoints = require('./restaurants.controller');

router.get('/', endpoints.list);
router.get('/:restaurantId', endpoints.getRestaurantById);

module.exports = router;
