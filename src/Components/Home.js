import React, { Component } from 'react';
import '../Styles/App.css';

import { Link } from 'react-router';

/**
 * Home component
 * Displays welcome message and links to view or create businesses
 */
class Home extends Component {

  render() {
    return (
      <div className="content">
        <div style={{ textAlign: 'center', marginBottom: '12%', marginTop: '12%' }}>

          <h3>Resourceful, Reliable, Individuals - Business connect platform. </h3>
          <h3>You need it, Here you go, <Link to="/businesses" style={{ textDecoration: 'none' }}><font style={{ color: 'rgb(173, 32, 32)', marginLeft: '15px' }}><span className="glyphicon glyphicon-hand-right"></span> Connect *</font></Link></h3><br /><br /><br />

          <Link to="/businesses" id='Homebutton'><button type="submit" className="btn btn-default">View Businesses</button></Link>
          <Link to="/addbusiness" id='Homebutton'><button type="submit" className="btn btn-default">Create Business</button></Link>
        </div>
      </div>
    );
  }
}

export default Home;
