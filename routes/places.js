const path = require('path');

const express = require('express');
const router = express.Router();

const PlacesJson = require('../js/places-json.js');
const places = new PlacesJson(path.join(__dirname, '..', 'db', 'places.json'));

router.get('/places', (req, res) => {
  res.send(places.obj);
});

router.get('/places/all', (req, res) => {
  let placeNames = [];

  places.obj.forEach(city => {
    placeNames.push({
      id: city.id,
      name: city.name
    });
  });

  res.send(placeNames);
});

module.exports = router;
