import React, { Component } from 'react';
import '../Styles/App.css';
import PropTypes from 'prop-types'

class Root extends Component {
  render() {
    return (
      <div className="row">
        {this.props.children}
      </div>
    );
  }
}
Root.propTypes = {
  children: PropTypes.object.isRequired
}
export default Root;