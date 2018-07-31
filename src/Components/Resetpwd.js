import React, { Component } from 'react';
import '../Styles/App.css';
import Header, { Base_url } from './Header';
import Footer from './Footer';
import swal from 'sweetalert';
import axios from 'axios'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router';

/**
 * Component to enable a user edit password
 * Accessed from a url received on user email
 */
class EditPassword extends Component {

    /**
     * Redirect to '/resetPwd' to clear long token url
     */
    componentDidMount() {
        browserHistory.push('/resetPwd')
    }

    /**
     * Make a server request to send a reset password link to email
     */
    requestResetPass = (e) => {
        e.preventDefault()

        const auth_token = this.props.params.token;
        const config = { headers: { 'Authorization': "bearer " + auth_token } }

        const new_password = e.target.elements.new_pwd.value;
        const confirm_password = e.target.elements.confirm_pwd.value;

        axios.put(`${Base_url}/auth/reset_password`, {
            new_password: new_password,
            confirm_password: confirm_password
        }, config).then(response => {
            browserHistory.push('/login')

            swal({
                title: "Success!",
                text: response.data.Success + ", you can now login with your new password",
                icon: "success",
                button: "OK",
            });

        }).catch(error => {

            if (error.response.status === 400) {
                swal("Error!!", error.response.data.Error, "error");
            }
            else if (error.response.status === 401) {
                swal("Error!!", error.response.data.Error, "error");
            }
        });
    }

    render() {
        return (
            <div className="row">
                <Header />
                <div className="signupcontent">
                    <div className="row">
                        <h3 style={{ paddingLeft: '20px', color: 'break' }}>Reset Password:</h3><br />

                        <div className="col-md-1" ></div>
                        <div className="col-md-10" >
                            <form className="reset-pwd-form" onSubmit={this.requestResetPass}>
                                <div className="form-group">
                                    <label>New Password:</label>
                                    <input type="password" className="field" name='new_pwd' />
                                </div>
                                <br />
                                <div className="form-group">
                                    <label>Confirm Password:</label>
                                    <input type="password" className="field" name='confirm_pwd' />
                                </div><br />

                                <a style={{ float: 'right' }}><button type="submit" className="btn btn-primary">Reset</button></a>
                                <br />
                            </form>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

EditPassword.propTypes = {
    params: PropTypes.object.isRequired
}
export default EditPassword;