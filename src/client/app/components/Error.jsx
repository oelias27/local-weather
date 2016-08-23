import React from 'react'

export default class Error extends React.Component {
  render () {
    return (
      <div className="weatherbox">
        <p>We can't provide data based on your location right now. Please use <a href="https://weatherhere.herokuapp.com" target="_blank">this link</a> to view our app, or use the search bar above to look for a location.</p>
      </div>
    )
  }
}
