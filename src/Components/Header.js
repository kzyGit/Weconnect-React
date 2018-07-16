import React from 'react';
import '../Styles/App.css';
import { Link } from 'react-router';

export const Header = (props) => {

  let sty = { color: '#eee' }
  let sty2 = { color: '#eee', backgroundColor: 'rgb(54, 54, 129' }
  let droplink = {color:'black'}
  let sty1 = { borderBottom: '1px solid #ddd', borderRadius: '5px'}
  return (
    <div className="Header" >
      <nav className="navbar navbar-inverse" style={{ backgroundColor: 'rgb(54, 54, 129)', border: '0' }}>
        <div className="container-fluid" >
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/home" className="navbar-brand" style={{ color: '#eee', fontSize: '25px', marginLeft: '1px' }} >WeConnect *</Link>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar" >

            
            
            

            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/home" style={sty} activeStyle={sty1}><span className="glyphicon glyphicon-home"></span> Home</Link></li>
              
              <li><Link to="/businesses" style={sty} activeStyle={sty1}>Businesses</Link></li>
              { localStorage.loggedIn && <li>
                
                <a style={sty2} data-toggle="dropdown"><span className="glyphicon glyphicon-user"></span><span id='logoutname'>{localStorage.getItem("username")} </span>
              <span className="caret" ></span></a>
              <ul className="dropdown-menu" style={{ backgroundColor:'#ddd'}}>
              <li><Link to="/addbusiness" style={droplink}><span  style={{paddingRight:'10px'}}  className="glyphicon glyphicon-plus-sign"></span> Add Business</Link></li>
              <li><Link to="/dashboard" style={droplink}><span  style={{paddingRight:'10px'}} className="glyphicon glyphicon-cog"></span> Dashboard</Link></li>
                <li><Link to="/logout"  style={droplink}><span  style={{paddingRight:'10px'}} className="glyphicon glyphicon-log-out"></span> Logout</Link></li>
              </ul>
              
              </li>}
              { !localStorage.loggedIn && <li><Link to="/login" style={sty} activeStyle={sty1}><span className="glyphicon glyphicon-log-in"></span> Login</Link></li> }
              { !localStorage.loggedIn && <li><Link to="/signup" style={sty} activeStyle={sty1}><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>}


            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;