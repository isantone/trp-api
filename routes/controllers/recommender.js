module.exports = findFavCities;

function findFavCities(user, cities) {
  const userFavCities = {};
  userFavCities.userLogin = user.login;

  userFavCities.prefs = [...user.preferences].sort(prefSorter);
  userFavCities.prefConsts = formPrefConsts(user);
  userFavCities.mainPrefs = formPrefs(user, userFavCities.prefConsts);
  userFavCities.cityPrefs = formCityPrefs(cities, userFavCities.mainPrefs);

  return userFavCities;
}

function formPrefs(user, prefConsts) {
  const userPrefs = user.preferences.filter(
    (pref) => pref.value > prefConsts.average);

  userPrefs.sort(prefSorter);

  return userPrefs;
}

function formPrefConsts(user) {
  const prefConsts = {};

  prefConsts.sum = user.preferences.reduce(sumReducer, 0);
  prefConsts.average = prefConsts.sum / user.preferences.length;

  return prefConsts;
}

function formCityPrefs(cities, prefs) {
  const cityPrefs = [];

  cities.forEach((city) => {
    const cityPrefEl = {
      city: city,
      mainPrefs: []
    };

    prefs.forEach((userMainPref) => {
      const cityPrefValue = city.preferences.find(
        (cityPref) => cityPref.id === userMainPref.id);

      cityPrefEl.mainPrefs.push(cityPrefValue);
    });

    cityPrefEl.mainPrefs.sort(prefSorter);
    cityPrefEl.prefsSum = cityPrefEl.mainPrefs.reduce(sumReducer, 0);

    cityPrefs.push(cityPrefEl);
  });

  cityPrefs.sort(prefSumSorter);

  return cityPrefs;
}

// console.log('Cities:', cities);

// console.warn(new Date().toLocaleTimeString());

//   const petrFavCities = findFavCities(petr);

//   console.log('User:', petr);
//   console.log('User fav cities:', petrFavCities);

// console.warn(new Date().toLocaleTimeString());

//   const ivanFavCities = findFavCities(ivan);

//   console.log('User:', ivan);
//   console.log('User fav cities:', ivanFavCities);

// console.warn(new Date().toLocaleTimeString());

function sumReducer(accumulator, currentElement) {
  return accumulator + currentElement.value;
}

function prefSorter(firstEl, secondEl) {
  return secondEl.value - firstEl.value;
}

function prefSumSorter(firstEl, secondEl) {
  return secondEl.prefsSum - firstEl.prefsSum;
}