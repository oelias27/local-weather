import dispatcher from './../dispatcher.js';

export function getWeather(zip) {
   dispatcher.dispatch({
     type: "GET_WEATHER",
     zip: zip
  });
}

export function getGeolocation(lat, long) {
   dispatcher.dispatch({
     type: "GET_GEOLOCATION",
     latitude: lat,
     longitude: long
  });
}
