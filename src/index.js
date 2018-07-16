import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import Home from './Components/Home';
import Root from './Components/Root';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Logout from './Components/Logout';

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
                    
                </Route>
            </Router>
      );
    }
  }

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
