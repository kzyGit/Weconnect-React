import React, { Component } from 'react';
import '../Styles/App.css';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router';
import axios from 'axios'
import swal from 'sweetalert';
import {browserHistory} from 'react-router';


class Dashboard extends Component {
  render() {
    return (
      <div className="row">
        <Header />
        <DashboardContent />
        <Footer />
      </div>
    );
  }
}

class DashboardContent extends Component {

  state = {
    businesses: [],
    availablebusinesses: 'available'
  };
  

  componentDidMount() {

    if (!localStorage.loggedIn) {
      swal("Error!!", 'Login first to view your dashboard', "error");
      browserHistory.push('/login')
    }
    else {
    const auth_token = localStorage.getItem("access_token")
    const config = {headers: {'Authorization': "bearer " + auth_token}}

    axios.get('https://weconnectapi-v2.herokuapp.com/api/v1/mybusinesses',config).then(response => {
      

        this.setState({ businesses: response.data});
    }).catch(error =>{
      if (error.response.status === 401){
        swal("Error!!", "Login session expired, Login again to view your dashboard", "error");
        
        localStorage.removeItem('loggedIn')
        browserHistory.push('/login')
        }});
  }}

  render() {
    if (this.state.businesses.length > 0){
    return (
      <div className="content">
        <div className="row">
          <h3 style={{ paddingLeft: '20px', color: 'maroon' }}>My Businesses
          <span style={{ float: 'right',  marginRight:'20px', fontWeight:'normal', fontSize:'16px', color: 'maroon' }}>
          <Link to={'/editPassword'}><span  style={{ paddingRight:'15px' }} className="glyphicon glyphicon-cog"></span>Edit password</Link>
            </span></h3>
          <br /><br />

          <div className="col-md-1"></div>
          <div className="col-md-10" >

          

            <table className="table">
              <thead>

                <tr>
                  <th id="name-row">Business</th>
                  <th id="row">Category</th>
                  <th id="row">Location</th>
                  <th id="row">Edit</th>
                  <th id="row">Delete</th>
                </tr>
              </thead>
              <tbody>

                {this.state.businesses.map(business =>
                  <tr key={business.id}>
                    <td><Link to={`/business/${business.id}`} >{business.name}</Link></td>
                    <td>{business.category}</td>
                    <td>{business.location}</td>
                    <td>
                    <Link to={`/editBusiness/${business.id}`} ><button className="btn btn-primary">
                    <span className="glyphicon glyphicon-edit"></span> </button>
                    </Link>
                    </td>
                    <td><button className="btn btn-danger" onClick={this.deleteBusiness.bind(this, business.id)}><span className="glyphicon glyphicon-trash"></span> </button></td>

                  </tr>

                )}
              </tbody>
            </table> <br /><br />
          </div>

          <div className="col-md-1"></div>
        </div>
      </div>
    );}

    else{
      return (
        <div className="content">
          <div className="row">
            <h3 style={{ paddingLeft: '20px', color: 'maroon' }}>My Businesses
            <span style={{ float: 'right',  marginRight:'20px', fontWeight:'normal', fontSize:'16px', color: 'maroon' }}>
            <Link to={'/editPassword'}><span  style={{ paddingRight:'15px' }} className="glyphicon glyphicon-cog"></span>Edit password</Link>
              </span></h3>
            <br /><br />
            <span id='rev'></span>
            Let your businesses join the WeConnect network
            <Link to="/addbusiness" style={{ paddingLeft:'30px', textDecoration:'none' }}><span className="glyphicon glyphicon-hand-right"></span> Add Business</Link>
            
  
            <div className="col-md-1"></div>
            <div className="col-md-10" >
            <br /><br />
            </div>
  
            <div className="col-md-1"></div>
          </div>
        </div>
      );
    }
  }

  deleteBusiness = (business_id)=>{
    const auth_token = localStorage.getItem("access_token")
    const config = {
      // config with the token
      headers: {'Authorization': "bearer " + auth_token}
    }
    swal({
      text: "Are you sure you want to delete this business?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {

        axios.delete(`https://weconnectapi-v2.herokuapp.com/api/v1/businesses/${business_id}`,config)
        .then(response =>{
          this.componentDidMount()
          swal("Business successfully deleted", {
            icon: "success",
          });
          browserHistory.push('/dashboard')
        })
        .catch(error =>{
          if (error.response.status === 401){
            const message = error.response.data.Error
            swal("Error!!", message, "error");
            localStorage.removeItem('loggedIn')
            browserHistory.push('/login')
            }

          else if (error.response.status === 404){
              const message = error.response.data.Error
              swal("Error!!", message, "error");
              }

        })
      }
    });
  }
}

export default Dashboard;
