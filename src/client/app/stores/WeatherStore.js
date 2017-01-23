import { EventEmitter } from 'events';
import Request from 'superagent';
import dispatcher from './../dispatcher.js';

class WeatherStore extends EventEmitter {
  constructor() {
    super();
    this.dataLoaded = '';
    this.iconText = '';
    this.weatherData = {};
  }

  getStatus() {
    return this.dataLoaded;
  }

  getIconText() {
    return this.iconText;
  }

  getWeatherData() {
    return this.weatherData;
  }

  getWeather(location) {

    Request.post('/weather')
    .send({location: location})
    .end((err, data) => {
      if (err) {
        this.dataLoaded = false;
      }

      let weatherData = JSON.parse(data.text)

      this.weatherData = weatherData;
      this.dataLoaded = true;
      this.iconText = this.getIconCode(weatherData.icon);
      this.emit('change');
    })
  }

  getGeolocation(lat, lon) {

    Request.post('/weather')
    .send({lat, lon})
    .end((err, data) => {
      if (err) {
        this.dataLoaded = false;
      }

      let weatherData = JSON.parse(data.text)

      this.weatherData = weatherData;
      this.dataLoaded = true;
      this.iconText = this.getIconCode(weatherData.icon);
      this.emit('change');
    })
  }

  getIconCode(data) {

    switch (data) {
      case 'clear-day': {
        return 'wi wi-day-sunny'
        break;
      }
      case 'clear-night': {
        return 'wi wi-night-clear'
        break;
      }
      case 'rain': {
        return 'wi wi-rain'
        break;
      }
      case 'snow': {
        return 'wi wi-snow'
        break;
      }
      case 'sleet': {
        return 'wi wi-sleet'
        break;
      }
      case 'wind': {
        return 'wi wi-strong-wind'
        break;
      }
      case 'fog': {
        return 'wi wi-fog'
        break;
      }
      case 'cloudy': {
        return 'wi wi-cloudy'
        break;
      }
      case 'partly-cloudy-day': {
        return 'wi wi-day-cloudy'
        break;
      }
      case 'partly-cloudy-night': {
        return 'wi wi-night-cloudy'
        break;
      }
      default: {
        return 'wi wi-cloudy'
      }
    }
  }

  handleActions(action) {
     switch(action.type) {
       case "GET_WEATHER": {
         this.getWeather(action.zip);
         break;
       }
       case "GET_GEOLOCATION": {
         this.getGeolocation(action.latitude, action.longitude);
         break;
       }
     }
  }
}

const weatherStore = new WeatherStore;
dispatcher.register(weatherStore.handleActions.bind(weatherStore));

export default weatherStore;
