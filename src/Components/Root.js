import React, { Component } from 'react';
import '../Styles/App.css';
import PropTypes from 'prop-types'
import Header from './Header';
import Footer from './Footer';
import BackNav from './BackNav';

/**
 * Component that enables '/' main route to have children routes
 */
class Root extends Component {
  render() {
    return (
      <div className="row">
        <Header />
        <BackNav />
        {this.props.children}
        <Footer />
      </div>

    );
  }
}
Root.propTypes = {
  children: PropTypes.object.isRequired
}
export default Root;