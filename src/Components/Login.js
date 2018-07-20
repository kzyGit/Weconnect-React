import React, { Component } from 'react';
import '../Styles/App.css';
import Header,{Base_url} from './Header';
import Footer from './Footer';
import axios from 'axios';
import swal from 'sweetalert';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';

class Login extends Component {
  render() {
    return (
      <div className="row">
      <Header />
      <LoginContent />
      <Footer />
      </div>     
    );
  }
}

class LoginContent extends Component {
  state = {
    login:[]
  }
 
  login = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    localStorage.setItem('loggedIn', false)

    axios.post(`${Base_url}/auth/login`, {
      username: username,
      password: password
    }).then(response => {

      if(response.data.status_code === 204){
        swal('User not found, kindly use a registered username');
        localStorage.removeItem('loggedIn')
        }
      else{
        
      const access_token = response.data.access_token
      const username = response.data.username
      const email = response.data.email
      

      localStorage.setItem('loggedIn', true)

      localStorage.setItem("access_token", access_token)
      localStorage.setItem("username", username)
      localStorage.setItem("email", email)
      browserHistory.push('/dashboard')
      swal({
          title: "Success!",
          text: "You have successfully logged in",
          icon: "success",
          button: "Ok",
        });
  }})
  .catch(error => {
    if(error.response.status === 401){
      const message = error.response.data.Error
      localStorage.removeItem('loggedIn')
      swal("Error!!", message, "error");
      
      }

  });
}
  render() {
    return (
      <div className="signupcontent">
        <div className = "row">
          <h3 style={{paddingLeft:'20px',color:'break'}}>Login</h3><br />
          <div className="col-md-1" ></div>
          <div className="col-md-10" >
            
            <form onSubmit={this.login}>
              <div className="form-group">
                <label>Username:</label><input type="text" name='username' className="field" />
                
              </div><br />
              <div className="form-group">
                <label >Password:</label>
                <input type="password" className="field" name='password'/>
              </div><br />
              <button style={{float:'right'}} type="submit" className="btn btn-default">Submit</button>
          </form>
              
  
          </div>

          <br /><br />
          <Link to={'/resetpassword'}><span style={{ textAlign:'center'}}>Forgot password?</span></Link>

          <Link to={'/signup'}><span style={{ paddingLeft:'15%'}}>No account? Signup</span></Link>


          <div className = "col-md-1"></div>
  
        </div>
      </div>
    
          );
        }
      }

export default Login;
