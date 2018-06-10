const Json = require('./json');

module.exports = class PlacesJson extends Json {
  getPreferencesFromPlace(placeId) {
    return this.getElementsByPropertyValue('preferences', placeId);
  }

  getPlaceById(placeId) {
    return this.getElementByPropertyValue('id', placeId);
  }

  // findItemByTitle(title) {
  //   return this.filterElementsByPropertyValue('title', title);
  // }
};
