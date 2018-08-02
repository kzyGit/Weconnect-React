import React, { Component } from 'react';
import '../Styles/App.css';
import Header, { Base_url } from './Header';
import axios from 'axios';
import swal from 'sweetalert';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types'

/**
 * Component that validates user on signup, when accessed from validation email
 */
class ActivateAccount extends Component {

  componentDidMount() {
    const token = this.props.params.token
    const config = { headers: { 'Authorization': "bearer " + token } }
    axios.put(`${Base_url}/auth/login`, config).then(response => {
      const message = response.data.Success
      browserHistory.push('/login')
      swal({
        title: "Success!",
        text: message,
        icon: "success",
        button: "Ok",
      });
    })
    .catch(error => {
      if (error.response.status === 401) {
        const message = error.response.data.Error
        browserHistory.push('/login')
        swal("Error!!", message, "error");
        
      }
    });
  }

  render() {
    return (
      <div className="row">
        <Header />
      </div>
    );
  }
}
ActivateAccount.propTypes = {
  params: PropTypes.object
}
export default ActivateAccount;
