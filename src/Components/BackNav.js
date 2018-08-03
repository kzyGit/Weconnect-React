import React, { Component } from 'react';
import '../Styles/App.css';
import { browserHistory } from 'react-router';

/**
 * Component that enables moving back to the previous path
 */
class BackNav extends Component {
  render() {
    return (
        <span className="glyphicon glyphicon-circle-arrow-left" id='backnav' onClick={browserHistory.goBack}>
        
        </span>
    );
  }
}
export default BackNav;