import React, { Component } from 'react';
import '../Styles/App.css';
import { browserHistory } from 'react-router';

/**
 * Component that enables '/' main route to have children routes
 */
class My404Component extends Component {

    redirect = (e) => {
        browserHistory.goBack();
    }
    render() {
        return (
            <div id="redirectpage">
            <h1><i style={{color:'maroon'}} className="fa fa-exclamation-triangle" /></h1>
                <h1 style={{color:'maroon'}}>Page Not Found</h1><br />
                <p>The page you are trying to access does not exist. Go back to a valid page<br /><br /><br />
                    <button  onClick={this.redirect} className="btn btn-default">Back</button>
                </p><br />
            </div>
        );
    }
}

export default My404Component;