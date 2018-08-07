import React, { Component } from 'react';
import '../Styles/App.css';
import { browserHistory } from 'react-router';

/**
 * Component that enables '/' main route to have children routes
 */
class My404Component extends Component {
    componentDidMount() {
        alert('Sorry, the page you are trying to access does not exist\n                             Redirect to Homepage')
        browserHistory.push('/home')
    }
    render() {
        return (
            <div className="row">
            </div>
        );
    }
}

export default My404Component