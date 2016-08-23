import React from 'react';
import WeatherStore from './../stores/WeatherStore.js';
import * as WeatherActions from './../actions/WeatherActions.js';

import LocationForm from './LocationForm.jsx';
import WeatherData from './WeatherData.jsx';

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      status: WeatherStore.getStatus(),
      zip: '',
      weather: {},
      iconText: 'wi wi-sunny'
    }
  }

  componentWillMount() {
    WeatherStore.on('change', () => {
      this.setState({
        status: WeatherStore.getStatus(),
        weather: WeatherStore.getWeatherData(),
        iconText: WeatherStore.getIconText()
      });
    });
  }

  componentDidMount() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        WeatherActions.getGeolocation(position.coords.longitude, position.coords.latitude);
      })
    }
  }

  handleKeyDown(e) {
    if (e.keyCode == 13) {
      WeatherActions.getWeather(this.state.zip)
    }
  }

  handleClick(e) {
    WeatherActions.getWeather(this.state.zip)
  }

  handleChange(e) {
    this.setState({
      zip: e.target.value
    })
  }

  render () {
    let weatherDisplay = this.state.status == true ? <WeatherData iconText={this.state.iconText} weatherData={this.state.weather} /> : null;

    return (
      <div id="main">
        <LocationForm handleKeyDown={this.handleKeyDown.bind(this)} handleClick={this.handleClick.bind(this)} handleChange={this.handleChange.bind(this)} />
        {weatherDisplay}
      </div>
    )
  }
}
