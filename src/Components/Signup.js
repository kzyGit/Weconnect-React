import React, { Component } from 'react';
import '../Styles/App.css';
import { Base_url, loader } from './Header';
import axios from 'axios';
import swal from 'sweetalert';
import { browserHistory } from 'react-router';

/**
 * Component that enables registering of a new user
 */
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  /**
   * Makes server request to create a new user
   */
  signUp = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const username = e.target.elements.username.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const confirm_password = e.target.elements.confirm_password.value;

    axios.post(`${Base_url}/auth/register`, {
      username: username,
      email: email,
      password: password,
      confirm_password: confirm_password

    }).then(response => {
      browserHistory.push('/login');
      swal({
        title: "Success!",
        text: response.data.Success,
        icon: "success",
        button: "Ok",
      });
    }).catch(error => {
      if (error.response.status === 409) {
        const message = error.response.data.Error;
        swal("Error!!", message, "error");
        this.setState({ loading: false });
      }
      else if (error.response.status === 400) {
        const message = error.response.data.Error;
        swal("Error!!", message, "error");
        this.setState({ loading: false });
      }
    });
  }
  render() {
    return (
      <div className="signupcontent">
        <div className="row">
          <h3 style={{ paddingLeft: '20px', color: 'break' }}>Signup</h3><br />
          <div className="col-md-1" ></div>
          <div className="col-md-10" >

            <form onSubmit={this.signUp}>
              <div className="form-group">
                <label>Username:</label><input type="text" className="field" name="username" required />
              </div><br />

              <div className="form-group">
                <label>Email:</label>
                <input type="email" className="field" name='email' required />
              </div><br />

              <div className="form-group">
                <label>Password:</label>
                <input type="password" className="field" name='password' required />
              </div><br />

              <div className="form-group">
                <label>Confirm Password:</label>
                <input type="password" className="field" name='confirm_password' />
              </div><br />

              {!this.state.loading ?
                <a href="index.html" style={{ float: 'right' }}><button type="submit" className="btn btn-default">Submit</button></a>
                :
                loader
              }

            </form>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    );
  }
}

export default Signup;
