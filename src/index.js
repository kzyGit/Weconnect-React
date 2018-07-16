import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import Home from './Components/Home';
import Root from './Components/Root';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Logout from './Components/Logout';
import CreateBusiness from './Components/CreateBusiness';
import Business from './Components/Business';
import Editpassword from './Components/Editpassword';
import EditBusiness from './Components/EditBusiness';
import Resetpassword from './Components/Resetpassword';
import Resetpwd from './Components/Resetpwd';
import Dashboard from './Components/Dashboard';
import registerServiceWorker from './registerServiceWorker';

class App extends React.Component {
    render() {
      return (
            <Router history={browserHistory}>
                <Route path={"/"} component={Root} >
                    <IndexRoute component={Home} />
                    <Route path={"home"} component={Home} />
                    <Route path={"signup"} component={Signup} />
                    <Route path={"login"} component={Login} />
                    <Route path={"logout"} component={Logout} />
                    <Route path={"editPassword"} component={Editpassword} />
                    <Route path={"addbusiness"} component={CreateBusiness} />
                    <Route path={"business/:bid"} component={Business} />
                    <Route path={"editBusiness/:bid"} component={EditBusiness} />
                    <Route path={"businesses"} component={Businesses} />
                    <Route path={"dashboard"} component={Dashboard} />
                    
                </Route>
            </Router>
      );
    }
  }

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
