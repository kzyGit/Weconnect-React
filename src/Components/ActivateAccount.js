import React, { Component } from 'react';
import '../Styles/App.css';
import { Base_url } from './Header';
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
    axios.put(`${Base_url}/auth/login`, {}, config).then(response => {

      if (response.data.Status_code === 401) {
        const message = response.data.Error
        browserHistory.push('/login')
        swal("Error!!", message, "error");
      }
      else {
        const message = response.data.Success
        browserHistory.push('/login')
        swal({
          title: "Success!",
          text: message,
          icon: "success",
          button: "Ok",
        });
      }
    })

      .catch(error => {
      });
  }

  render() {
    return (
      <div></div >
    );
  }
}
ActivateAccount.propTypes = {
  params: PropTypes.object.isRequired
}
export default ActivateAccount;
