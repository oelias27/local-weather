import React from 'react'

export default class LocationForm extends React.Component {
  render () {
    return(
      <div id="form">
        <input id="location" type="text" placeholder="Location" onKeyDown={this.props.handleKeyDown} onChange={this.props.handleChange} />
        <button id="submit" onClick={this.props.handleClick}><i className="fa fa-search"></i></button>
      </div>
    )
  }
}
