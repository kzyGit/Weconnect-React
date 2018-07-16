import React from 'react';
import ReactDOM from 'react-dom';
import Business from './Components/Business';
import registerServiceWorker from './registerServiceWorker';

class App extends React.Component {
    render() {
      return (
        <div className="row">
        <Business />
        </div>     
      );
    }
  }

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
