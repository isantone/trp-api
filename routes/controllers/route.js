const path = require('path');

const express = require('express');
const router = express.Router();
module.exports = router;

const UsersJson = require('../../js/users-json.js');
const PlacesJson = require('../../js/places-json.js');

const users = new UsersJson(path.join(__dirname, '..', '..', 'db', 'users.json'));
const places = new PlacesJson(path.join(__dirname, '..', '..', 'db', 'places.json'));

const findFavCities = require('./recommender');
const optimizeRoute = require('./route-optimizer');

router.get('/recommendations/:userLogin', (req, res) => {
  const userLogin = req.params.userLogin;

  const user = users.getUserByLogin(userLogin);

  const recommendation = findFavCities(user, places.obj);

  recommendation.optimizedCityPrefs = optimizeRoute(recommendation.cityPrefs);

  res.send(recommendation);
});
