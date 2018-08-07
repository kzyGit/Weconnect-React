import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute} from 'react-router';

import Home from './Components/Home';
import Root from './Components/Root';
import Signup from './Components/Signup';
import Login from './Components/Login';
import CreateBusiness from './Components/CreateBusiness';
import Business from './Components/Business';
import Businesses from './Components/Businesses';
import Editpassword from './Components/Editpassword';
import EditBusiness from './Components/EditBusiness';
import My404Component from './Components/My404Component';
import Resetpassword from './Components/Resetpassword';
import Resetpwd from './Components/Resetpwd';
import Dashboard from './Components/Dashboard';
import ActivateAccount from './Components/ActivateAccount';
import registerServiceWorker from './registerServiceWorker';

/**
 * Component that describes url paths and their related components
 */
class App extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path={"/"} component={Root} >
                    <IndexRoute component={Home} />
                    <Route path={"home"} component={Home} />
                    <Route path={"signup"} component={Signup} />
                    <Route path={"login"} component={Login} />
                    <Route path={"validateaccount/:token"} component={ActivateAccount} />
                    <Route path={"editPassword"} component={Editpassword} />
                    <Route path={"addbusiness"} component={CreateBusiness} />
                    <Route path={"business/:bid"} component={Business} />
                    <Route path={"editBusiness/:bid"} component={EditBusiness} />
                    <Route path={"businesses"} component={Businesses} />
                    <Route path={"dashboard"} component={Dashboard} />
                    <Route path={"resetPassword"} component={Resetpassword} />
                    <Route path={"resetPwd/:token"} component={Resetpwd} />
                    <Route path={"resetPwd"} component={Resetpwd} />
                    <Route path='*' component={My404Component} />
                </Route>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
