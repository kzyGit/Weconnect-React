import React, { Component } from 'react';
import '../Styles/App.css';
import { Base_url, loader } from './Header';
import axios from 'axios';
import swal from 'sweetalert';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

/**
 * Login component
 */
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  /**
   * Makes a server responce to validate user and allow login
   */
  login = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    let username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    localStorage.setItem('loggedIn', false);

    axios.post(`${Base_url}/auth/login`, {
      username: username,
      password: password
    }).then(response => {

      if (response.data.status_code === 204) {
        swal('User not found, kindly use a registered username');
        localStorage.removeItem('loggedIn');
        this.setState({ loading: false });
      }

      else {
        const access_token = response.data.access_token;
        username = response.data.username;
        const email = response.data.email;

        localStorage.setItem('loggedIn', true);
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        browserHistory.push('/dashboard');
      }
    }).catch(error => {
      if (error.response.status === 401) {
        const message = error.response.data.Error;
        localStorage.removeItem('loggedIn');
        swal("Error!!", message, "error");
        this.setState({ loading: false });
      }
    });
  }
  render() {
    return (
      <div className="signupcontent">
        <div className="row">
          <h3 style={{ paddingLeft: '20px', color: 'break' }}>Login</h3><br />
          <div className="col-md-1" ></div>
          <div className="col-md-10" >

            <form onSubmit={this.login}>
              <div className="form-group">
                <label>Username:</label><input type="text" name='username' className="field" required />

              </div><br />
              <div className="form-group">
                <label >Password:</label>
                <input type="password" className="field" name='password' required />
              </div><br />
              {!this.state.loading ?
                <button style={{ float: 'right' }} type="submit" className="btn btn-default">Login</button>
                :
                loader
              }
            </form>
          </div><br /><br />

          <Link to={'/resetpassword'}><span style={{ textAlign: 'center' }}>Forgot password?</span></Link>
          <Link to={'/signup'}><span style={{ paddingLeft: '15%' }}>No account? Signup</span></Link>

          <div className="col-md-1"></div>
        </div>
      </div>
    );
  }
}

export default Login;
