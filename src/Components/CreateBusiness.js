import React, { Component } from 'react';
import '../Styles/App.css';
import Header, { Base_url } from './Header';
import Footer from './Footer';
import swal from 'sweetalert';
import axios from 'axios'
import { browserHistory } from 'react-router';

/**
 * This component handles creating a new business
 */
class CreateBusiness extends Component {

  state = {
    businesses: []
  };

  /**
   * Display content only when user is authorised. If not, redirect to login
   */
  componentDidMount() {

    if (!localStorage.loggedIn) {
      swal('Kindly login first to create a business !');
      browserHistory.push('/login')
    }
  }

  render() {
    return (
      <div className="row">
        <Header />
        <div className="col-md-3"></div>
        <div className="col-md-6" id="businesscontent">
          <h3>Create a business</h3><br />

          <form className="create-business-form" onSubmit={this.createBusiness}>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" className="field" name='business_name' required />

            </div><br />
            <div className="form-group">
              <label>Location:</label>
              <input type="text" className="field" name='location' required />
            </div><br />

            <div className="form-group">
              <label>Category:</label>
              <select className="field" name='category' required>
                <option>Technology</option>
                <option>Tourism & Hotels</option>
                <option>Health</option>
                <option>Education</option>
                <option>Finance & Accounting</option>
                <option>Farming</option>
                <option>Ecommerse</option>
                <option>Real Estate</option>
                <option>Manufacturing</option>
              </select>
            </div><br />

            <div className="form-group">
              <label >About:</label><br /><br />
              <textarea id='textarea' rows='8' name='about' required></textarea>
            </div>
            <a style={{ float: 'right', marginTop: '180px' }}><button type="submit" className="btn btn-primary">Create</button></a>
          </form>

        </div>
        <div className="col-md-3"></div>
        <Footer />
      </div>
    );
  }

  /**
   * Makes a server request to post a new business
   * @return {object} a new business
   */
  createBusiness = (e) => {
    e.preventDefault()

    const business_name = e.target.elements.business_name.value;
    const location = e.target.elements.location.value;
    const category = e.target.elements.category.value;
    const about = e.target.elements.about.value;

    const access_token = localStorage.getItem("access_token")
    const config = {
      headers: { 'Authorization': "bearer " + access_token }
    }

    axios.post(`${Base_url}/businesses`, {
      business_name: business_name,
      location: location,
      category: category,
      about: about

    }, config).then(response => {
      browserHistory.push('/dashboard')
      swal({
        title: "Success!",
        text: response.data.Success,
        icon: "success",
        button: "OK",
      });
    })
      .catch(error => {

        if (error.response.status === 409) {
          const message = error.response.data.Error
          swal("Error!!", message, "error");
        }
        else if (error.response.status === 401) {
          const message = error.response.data.Error
          swal("Error!!", message, "error");
          localStorage.removeItem('loggedIn')
          browserHistory.push('/login')
        }
        else if (error.response.status === 400) {
          const message = error.response.data.Error
          swal("Error!!", message, "error");
        }
      });
  }
}
export default CreateBusiness;