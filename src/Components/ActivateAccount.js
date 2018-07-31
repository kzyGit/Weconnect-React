import React, { Component } from 'react';
import '../Styles/App.css';
import Header, { Base_url } from './Header';
import Footer from './Footer';
import axios from 'axios';
import swal from 'sweetalert';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types'

/**
 * Login component
 */
class ActivateAccount extends Component {

    componentDidMount() {
        axios.put(`${Base_url}/auth/login`, {
            username: this.props.params.username
          }).then(response => {
            const message = response.data.Success
            browserHistory.push('/login')
              swal({
                title: "Success!",
                text: message,
                icon: "success",
                button: "Ok",
              });
    });
}

  render() {
    return (
      <div className="row">
        <Header />
        <div className="signupcontent">
        </div>
        <Footer />
      </div>
    );
  }
}
ActivateAccount.propTypes = {
    params: PropTypes.object
  }
export default ActivateAccount;
