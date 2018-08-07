import React, { Component } from 'react';
import '../Styles/App.css';
import { Base_url } from './Header';
import { Link } from 'react-router';
import axios from 'axios'
import swal from 'sweetalert';
import { browserHistory } from 'react-router';

/**
 * Display a users businesses and allows user to access edit and delete business features
 */
class Dashboard extends Component {

  state = {
    businesses: [],
    availablebusinesses: 'available'
  };

  /**
   * Shows businesses of the logged in user
   * @returns {object} state, businesses
   */
  componentDidMount() {

    if (!localStorage.loggedIn) {
      swal("Error!!", 'Login first to view your dashboard', "error");
      browserHistory.push('/login')
    }
    else {
      const auth_token = localStorage.getItem("access_token")
      const config = { headers: { 'Authorization': "bearer " + auth_token } }

      axios.get(`${Base_url}/mybusinesses`, config).then(response => {
        this.setState({ businesses: response.data });
      }).catch(error => {
        if (error.response.status === 401) {
          swal("Error!!", "Login session expired, Login again to view your dashboard", "error");

          localStorage.removeItem('loggedIn')
          browserHistory.push('/login')
        }
      });
    }
  }

  /**
   * Make a server request to delete a business
   * @param {int} business_id
   */
  deleteBusiness = (business_id) => {
    const auth_token = localStorage.getItem("access_token")
    const config = {
      headers: { 'Authorization': "bearer " + auth_token }
    }
    swal({
      text: "Are you sure you want to delete this business?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {

          axios.delete(`${Base_url}/businesses/${business_id}`, config)
            .then(response => {
              this.componentDidMount()
              swal(response.data.Success, {
                icon: "success",
              });
              browserHistory.push('/dashboard')
            })
            .catch(error => {
              if (error.response.status === 404) {
                const message = error.response.data.Error
                swal("Error!!", message, "error");
              }
            })
        }
      });
  }

  render() {
    return (
      <div className="content">
        <div className="row">
          <h3 style={{ paddingLeft: '20px', color: 'maroon' }}>My Businesses</h3><br /><br />
          <div className="col-md-1"></div>
          <div className="col-md-10" >

            {this.state.businesses.length > 0 &&
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
                      <td id="deletebusiness"><button className="btn btn-danger" onClick={this.deleteBusiness.bind(this, business.id)}><span className="glyphicon glyphicon-trash"></span> </button></td>
                    </tr>
                  )}
                </tbody>
              </table>}

            <span id='rev'></span><br />
            Let your businesses join the WeConnect network
            <Link to="/addbusiness" style={{ paddingLeft: '30px', textDecoration: 'none' }}><span className="glyphicon glyphicon-hand-right"></span> Add Business</Link><br /><br /><br />
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
