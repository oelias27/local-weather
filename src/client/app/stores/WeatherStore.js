import { EventEmitter } from 'events';
import dispatcher from './../dispatcher.js';

class WeatherStore extends EventEmitter {
  constructor() {
    super();
    this.dataLoaded = false;
    this.iconText = '';
    this.weatherData = {};
  }

  getStatus() {
    return this.dataLoaded;
  }

  getIconText() {
    return this.iconText;
  }

  getWeather(location) {
    $.ajax({
      type: "POST",
      url: '/weather',
      data: {
        location: location
      },
      success: function(data) {
        this.weatherData = data;
        this.dataLoaded = true;
        this.iconText = this.getIconCode(data.icon);
        this.emit('change');
      }.bind(this)
    })
  }

  getGeolocation(lat, lon) {
    $.ajax({
      type: 'POST',
      url: '/weather',
      data: {
        lat: lat,
        lon: lon
      },
      success: function(data) {
        this.weatherData = data;
        this.dataLoaded = true;
        this.iconText = this.getIconCode(data.icon);
        this.emit('change');
      }.bind(this)
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

  getWeatherData() {
    return this.weatherData;
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
