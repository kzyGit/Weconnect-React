import React, { Component } from 'react';
import '../Styles/App.css';
import { browserHistory } from 'react-router';

/**
 * Component that enables moving back to the previous path
 */
class BackNav extends Component {
  render() {
    return (
        <span className="glyphicon glyphicon-circle-arrow-left" style={{color:'white', fontSize:'22px',cursor: 'pointer', paddingLeft:'7%'}} onClick={browserHistory.goBack}>
        
        </span>
    );
  }
}
export default BackNav;