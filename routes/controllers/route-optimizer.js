module.exports = optimizeRoute;

function optimizeRoute(cityPrefs) {
  const arrPreLastIndex = cityPrefs.length;

  for (let i = 0; i < arrPreLastIndex; i++) {
    let nearestIndex = -1;
    let nearestDist = Infinity;

    for (let j = i + 1; j < arrPreLastIndex; j++) {
      const dist = Math.hypot(
        // nextPointX - currentPointX
        cityPrefs[j].city.location[0] - cityPrefs[i].city.location[0],
        // nextPointY - currentPointX
        cityPrefs[j].city.location[1] - cityPrefs[i].city.location[1],
      );

      if (dist < nearestDist) {
        nearestDist = dist;
        nearestIndex = j;
      }
    }

    if (nearestIndex > 0 && nearestIndex !== i + 1) {
      const nearestCity = cityPrefs.splice(nearestIndex, 1)[0];

      cityPrefs.splice(i + 1, 0, nearestCity);
    }
  }

  return cityPrefs;
}
