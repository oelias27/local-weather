import React from 'react';

export default class WeatherData extends React.Component {

  render () {

    return (
      <div id="weatherbox">
        <i className={this.props.iconText}></i>
        <p id="city">{this.props.weatherData.location}</p>
        <div>
          <p id="conditions">{this.props.weatherData.current + ", " + Math.floor(this.props.weatherData.temp)} degrees</p>
        </div>
      </div>
    )
  }
}
