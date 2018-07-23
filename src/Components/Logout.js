import React, { Component } from 'react';
import '../Styles/App.css';
import Header from './Header';
import Footer from './Footer';
import swal from 'sweetalert';
import { browserHistory } from 'react-router';

class Logout extends Component {
  render() {
    return (
      <div className="row">
        <Header />
        <LogoutContent />
        <Footer />
      </div>
    );
  }}

class LogoutContent extends Component {

  componentDidMount() {

    if (!localStorage.loggedIn) {
      swal("Error!!", 'You are not logged in', "error");
      browserHistory.push('/home')
    }
    else {
      localStorage.removeItem('loggedIn');
      localStorage.removeItem("access_token")
      browserHistory.push('/home')
      swal({
        title: "Success!",
        text: "You have successfully logged out",
        icon: "success",
        button: "Ok",
      });
    }}

  render() {
    return (
      <div className="signupcontent">
      </div>
    );
  }}

export default Logout;
