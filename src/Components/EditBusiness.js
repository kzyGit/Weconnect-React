import React, { Component } from 'react';
import '../Styles/App.css';
import { Base_url } from './Header';
import axios from 'axios';
import swal from 'sweetalert';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';

/**
 * Component that updates a business
 */
class EditBusiness extends Component {

  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      name: '',
      location: '',
      category: '',
      id: '',
      about: ''
    };
    this.changelog = this.changelog.bind(this);
    this.editBusiness = this.editBusiness.bind(this);
  }

  /**
   * Make server request to get the business of the given id
   * @returns {object} a business
   */
  componentDidMount() {
    if (!localStorage.loggedIn) {
      swal("Error!!", 'Login first to update a business', "error");
      browserHistory.push('/home');
    }
    else {
      const auth_token = localStorage.getItem("access_token");
      const config = { headers: { 'Authorization': "bearer " + auth_token } };
      const bid = this.props.params.bid;

      axios.get(`${Base_url}/mybusinesses/${bid}`, config).then(response => {
        this.setState({
          businesses: response.data,
          id: response.data.Id,
          name: response.data.Name,
          location: response.data.Location,
          about: response.data.description,
          category: response.data.category
        });
      }).catch(error => {
        if (error.response.status === 404) {
          const message = error.response.data.Error;
          swal("message!!", message, "error");
        }
        else if (error.response.status === 401) {
          swal("Error!!", error.response.data.Error, "error");
          localStorage.removeItem('loggedIn');
          browserHistory.push('/login');
        }
      });
    }
  }

  /**
   * Make server request to update the business of the given id
   * @param {string} e
   * @returns {string} success message
   */
  editBusiness = (e) => {
    e.preventDefault();
    const { name, location, about, category } = this.state;
    const access_token = localStorage.getItem("access_token");
    const config = {
      headers: { 'Authorization': "bearer " + access_token }
    };
    const bid = this.props.params.bid;
    axios.put(`${Base_url}/businesses/${bid}`, {
      business_name: name,
      location: location,
      category: category,
      about: about

    }, config).then(response => {
      browserHistory.push('/dashboard');
      swal({
        title: "Success!",
        text: response.data.Success,
        icon: "success",
        button: "OK",
      });
    })
      .catch(error => {
        if (error.response.status === 409) {
          swal("Error!!", error.response.data.Error, "error");
        }
        else if (error.response.status === 401) {
          swal("Error!!", error.response.data.Error, "error");
          localStorage.removeItem('loggedIn');
          browserHistory.push('/login');
        }
        else if (error.response.status === 400) {
          swal("Error!!", error.response.data.Error, "error");
        }
      });
  }

  /**
   * update local state with new page of items
   * @param {string} e
   * @returns {state} changestate
   */
  changelog(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6" id="businesscontent">
          <h3 style={{ paddingLeft: '20px', color: 'break' }}>Edit my business</h3><br />

          <form className="create-business-form" onSubmit={this.editBusiness}>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" className="field" onChange={this.changelog} name='name' value={this.state.name} required />

            </div><br />
            <div className="form-group">
              <label>Location:</label>
              <input type="text" className="field" onChange={this.changelog} name='location' value={this.state.location} required />
            </div><br />
            <div className="form-group">
              <label>Category:</label>

              <select className="field" name='category' onChange={this.changelog} required>
                <option>{this.state.category}</option>
                <option>Technology</option>
                <option>Health</option>
                <option>Fashion</option>
                <option>Tourism & Hotels</option>
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
              <textarea id='textarea' onChange={this.changelog} rows='8' name='about' value={this.state.about} required></textarea>
            </div><br />
            <a style={{ float: 'right', marginTop: '180px' }}><button type="submit" className="btn btn-primary">Update</button></a>
          </form>

        </div>
        <div className="col-md-3"></div>
      </div>
    );
  }
}

EditBusiness.propTypes = {
  params: PropTypes.object.isRequired

};
export default EditBusiness;