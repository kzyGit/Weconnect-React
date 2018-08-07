import React, { Component } from 'react';
import '../Styles/App.css';
import { Base_url } from './Header';
import icon from '../Images/businessicon.png';
import axios from 'axios';
import swal from 'sweetalert';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';

/**
 * This component renders a single business
 */
class Business extends Component {

  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      reviews: [],
      isHidden: true
    };
  }

  /**
   * Function to toggle display of 'Add reviews' button on user logged in or not
   */

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  /**
   * Querries the server to get a single business and its reviews
   * @returns {object} a single business object and a review object for the business
   */
  componentDidMount() {
    const bid = this.props.params.bid;
    axios.get(`${Base_url}/businesses/${this.props.params.bid}`).then(response => {
      this.setState({ businesses: response.data });
    }).catch(error => {
      if (error.response.status === 404) {
        const message = error.response.data.Error;
        swal("message!!", message, "error");
      }

    });

    axios.get(`${Base_url}/businesses/${bid}/review`).then(response => {
      this.setState({ reviews: response.data });
    }).catch(error => {
      if (error.response.status === 404) {
        document.getElementById("rev").innerHTML = ' * No reviews added yet';
      }
    });
  }

  render() {
    return (
      
        <div className="onebusinesscontent" style={{ padding: '25px' }}>
          <div style={{ textAlign: 'center' }}>
            <img src={icon} alt="Business Logo" style={{ height: '100px', width: '120px' }} className="img-thumbnail" /><br />
            <h4 id="details">{this.state.businesses.Name}</h4>
          </div>

          <div>
            <h4 id="details">About us</h4>
            <div>
              {this.state.businesses.description}
            </div>
          </div><br />

          <div>
            <h4 id="details">Location</h4>
            {this.state.businesses.Location}
          </div><br />

          <div>
            <h4 id="details">Contacts</h4>
            +254 721 988 543,+254 799 999 555, companyinfo@gmail.com
        </div><br />

          <div>
            <h4 id="details">Reviews
            {sessionStorage.loggedIn && <button onClick={this.toggleHidden.bind(this)} className="btn btn-primary" style={{ marginLeft: '10%' }}><span className="glyphicon glyphicon-plus-sign"></span> Add Review</button>}
            </h4>
            <span id='rev'></span>
            <div>
              {!this.state.isHidden &&
                <form onSubmit={this.addreview.bind(this)} id='reviewform'><br />
                  <textarea cols="30" name='content' className="form-control" style={{ width: '98%' }} required></textarea><br />
                  <button type="submit" className="btn btn-default">Submit</button><br /><br />
                </form>}
            </div>

            <div className="row"> <br />
              <div className="col-md-12" id="reviews" >

                {this.state.reviews.map(review =>
                  <div id="review" key={review.Id}>
                    {review.Review}<br />
                    <span id="reviewer"><span className="glyphicon glyphicon-user" style={{ paddingRight: '10px', color: 'black' }}></span> {review.createdBy}</span><br />
                  </div>)}
              </div>
            </div>
          </div>
        </div>
    );
  }

  /**
   * Makes api request to add a review for the business
   * @returns {string} success or error message
   */
  addreview = (e) => {
    e.preventDefault();

    const auth_token = sessionStorage.getItem("access_token");
    const config = { headers: { 'Authorization': "bearer " + auth_token } };
    const bid = this.props.params.bid;
    const content = e.target.elements.content.value;

    axios.post(`${Base_url}/businesses/${bid}/review`, {
      content: content
    }, config).then(response => {
      window.location.reload();
      swal({
        title: "Success!",
        text: response.data.Success,
        icon: "success"
      });
    })
      .catch(error => {
        if (error.response.status === 401) {
          const message = error.response.data.Error;
          swal("Error!!", message, "error");
          sessionStorage.removeItem('loggedIn');
          browserHistory.push('/login');
        }

        else if (error.response.status === 400) {
          const message = error.response.data.Error;
          swal("Error!!", message, "error");
        }
      });
  }
}

Business.propTypes = {
  params: PropTypes.object
};
export default Business;