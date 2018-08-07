import React, { Component } from 'react';
import '../Styles/App.css';
import { Base_url, loader } from './Header';
import swal from 'sweetalert';
import axios from 'axios';
import { browserHistory } from 'react-router';

/**
 * Component that enables a user to request for password reset
 */
class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }
    render() {
        return (
            <div className="signupcontent">
                <div className="row">
                    <h3 style={{ paddingLeft: '20px', color: 'break' }}>Request Password Reset:</h3><br />
                    <div className="col-md-1" ></div>
                    <div className="col-md-10" >
                        <form className="reset-pwd-form" onSubmit={this.requestResetPass}>
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="email" className="field" name='email' />
                            </div><br />
                            {!this.state.loading ?
                                <a style={{ float: 'right' }}><button type="submit" className="btn btn-primary">Send Request</button></a>
                                :
                                loader
                            } <br />
                            </form>
                    </div>
                    <div className="col-md-1"></div>
                </div>
            </div>
        );
    }

    /**
     * Makes server request to validate email and send a reset link to user's email
     */
    requestResetPass = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const email = e.target.elements.email.value;

        axios.post(`${Base_url}/auth/reset_password`, {
            email: email
        }).then(response => {

            if (response.data.status_code === 204) {
                swal("Error!!", "Unrecognised email, kindly ensure to use the email you registered with", "error");
                this.setState({ loading: false });
            }
            else {
                browserHistory.push('/login');
                sessionStorage.removeItem("resettoken");
                swal({
                    title: "Success!",
                    text: "Kindly check your email for a token to reset your password",
                    icon: "success",
                    button: "OK",
                });
            }
        }).catch(error => {
            if (error.response.status === 400) {
                swal("Error!!", error.response.data.Error, "error");
                this.setState({ loading: false });
            }
        });
    }
}
export default ResetPassword;