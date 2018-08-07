import React, { Component } from 'react';
import '../Styles/App.css';
import { browserHistory } from 'react-router';
import swal from 'sweetalert';

/**
 * Component that enables '/' main route to have children routes
 */
class My404Component extends Component {
    componentDidMount() {
        swal({
            title: "Invalid Url!!",
            text: "Sorry, page does not exist, Redirect Back to valid page",
            icon: "error",
            button: "OK",
        });
        browserHistory.goBack();
    }
    render() {
        return (
            <div className="row">
            </div>
        );
    }
}

export default My404Component;