import React, { Component } from 'react';
import '../Styles/App.css';
import Header from './Header';
import Footer from './Footer';
import swal from 'sweetalert';
import axios from 'axios'
// import { browserHistory } from 'react-router';

class EditPassword extends Component {
    render() {
        return (
            <div className="row">
                <Header />
                <EditPasswordBody />
                <Footer />
            </div>
        );
    }
}

class EditPasswordBody extends Component {

    state = {
        businesses: []
    };

    render() {
        return (
            <div className="signupcontent">
                <div className="row">

                    <h3 style={{ paddingLeft: '20px', color: 'break' }}>Request Password Reset:</h3><br />

                    <div className="col-md-1" ></div>
                    <div className="col-md-10" >

                        <Request requestResetPass={this.requestResetPass} />


                    </div>
                    <div className="col-md-1"></div>

                </div>
            </div>
        );
    }
}

class Request extends Component {

    render() {
        return (



            <form className="reset-pwd-form" onSubmit={this.requestResetPass}>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" className="field" name='email' />

                </div>
                <br />
                <a style={{ float: 'right' }}><button type="submit" className="btn btn-primary">Send Request</button></a>
            <br />
            </form>

        );
    }

    requestResetPass = (e) => {
        e.preventDefault()


        const email = e.target.elements.email.value;

        axios.post('https://weconnectapi-v2.herokuapp.com/api/v1/auth/reset_password', {
            email: email
        }).then(response => {

            if (response.data.status_code === 204) {
                swal("Error!!", "Unrecognised email, kindly ensure to use the email you registered with", "error");
            }
            else {
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
                }
            });

    }
}

export default EditPassword;
export {
    Request
}