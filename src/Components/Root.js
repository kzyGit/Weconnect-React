import React, { Component } from 'react';
import '../Styles/App.css';

class Root extends Component {
  render() {
    return (
        <div className="row">
        {this.props.children}
        </div>

);
  }
}

export default Root;