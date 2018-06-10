const path = require('path');

const express = require('express');
const router = express.Router();

const PlacesJson = require('../js/places-json.js');
const places = new PlacesJson(path.join(__dirname, '..', 'db', 'places.json'));

router.get('/places', (req, res) => {
  // const { userLogin, userPassword } = req.body;

  res.send(places.obj);
});

module.exports = router;
