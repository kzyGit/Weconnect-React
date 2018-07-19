import React, { Component } from 'react';
import '../Styles/App.css';
import Header from './Header';
import Footer from './Footer';
import {Link} from 'react-router';

class Home extends Component {

  render() {
    return (
      <div className="row">
      <Header />
      <HomeContent />
      <Footer />
      </div>     
    );
  }
}

export const Baseurl = 'https://weconnectapi-v2.herokuapp.com/api/v1'

class HomeContent extends Component {
  
  render() {
    return (
      <div className="content">
        <br />
    

        <div style={{textAlign:'center', marginBottom:'12%', marginTop:'12%'}}>
              
        <h3>Resourceful, Reliable, Individuals - Business connect platform. </h3>
        <h3>You need it, Here you go, <Link to="/businesses" style={{textDecoration:'none'}}><font style={{color:'rgb(173, 32, 32)', marginLeft:'15px'}}><span className="glyphicon glyphicon-hand-right"></span> Connect *</font></Link></h3><br /><br /><br />
        
        <Link to="/businesses" id='Homebutton'><button type="submit" className="btn btn-default">View Businesses</button></Link>
        <Link to="/addbusiness" id='Homebutton'><button type="submit" className="btn btn-default">Create Business</button></Link>
        </div>

        
     
      </div>
          );
        }
      }

export default Home;
