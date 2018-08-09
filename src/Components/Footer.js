import React, { Component } from 'react';
import '../Styles/App.css';
import { Link } from 'react-router';

/**
 * Display footer, contact information on hover
 */
class Footer extends Component {
  render() {
    let sty = { color: '#eee', textDecoration: 'none' };
    return (
      <div className="footer" ><Link title="+254 701922120, kezzyangiro@gmail.com" style={sty}><span className="glyphicon glyphicon-question-sign"></span> Contact us</Link>
      </div>
    );
  }
}
export default Footer;