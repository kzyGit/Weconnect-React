import React, { Component } from 'react';
import '../Styles/App.css';
import { Base_url } from './Header';
import swal from 'sweetalert';
import axios from 'axios'
import { browserHistory } from 'react-router';

/**
 * Component to enable editing password
 */
class EditPassword extends Component {
  
  /**
   * Display content only when user is authorised. If not, redirect to login
   */
  componentDidMount() {
    if (!localStorage.loggedIn) {
      swal("Error!!", 'Login first to edit password', "error");
      browserHistory.push('/login')
    }
  }
  
  render() {
    return (

      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6" id="businesscontent">
          <h3 style={{ paddingLeft: '20px', color: 'break' }}>Edit my password</h3><br />
          <FormContent editpass={this.editpass} />
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  }
}

/**
 * Edit password form
 */
class FormContent extends Component {
  render() {
    return (
      <form className="create-business-form" onSubmit={this.editpass}>
        <div className="form-group">
          <label>Email:</label>
          <input type="text" className="field" name='email' />

        </div><br />
        <div className="form-group">
          <label>Current Password:</label>
          <input type="password" className="field" name='current_password' />
        </div><br />
        <div className="form-group">
          <label>New Password:</label>
          <input type="password" className="field" name='new_password' />
        </div><br />

        <div className="form-group">
          <label >Confirm Password:</label>
          <input type="password" className="field" name='confirm_password' />
        </div><br /><br />
        <a style={{ float: 'right' }}><button type="submit" className="btn btn-primary">Submit</button></a>
      </form>
    );
  }

  /**
   * Make server request to edit user's password
   */
  editpass = (e) => {
    e.preventDefault()
    const email = e.target.elements.email.value;
    const current_password = e.target.elements.current_password.value;
    const new_password = e.target.elements.new_password.value;
    const confirm_password = e.target.elements.confirm_password.value;

    const access_token = localStorage.getItem("access_token")
    const config = {
      headers: { 'Authorization': "bearer " + access_token }
    }

    axios.put(`${Base_url}/auth/update_password`, {
      email: email,
      current_password: current_password,
      new_password: new_password,
      confirm_password: confirm_password

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
        if (error.response.status === 400) {
          swal("Error!!", error.response.data.Error, "error");
        }
        else if (error.response.status === 401) {
          swal("Error!!", error.response.data.Error, "error");
          localStorage.removeItem('loggedIn')
          browserHistory.push('/login')
        }
      });
  }
}

export default EditPassword;