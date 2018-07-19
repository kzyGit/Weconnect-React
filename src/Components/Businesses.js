import React, { Component } from 'react';
import '../Styles/App.css';
import Header, { Base_url } from './Header';
import Footer from './Footer';
import {Link} from 'react-router';
import axios from 'axios'
import swal from 'sweetalert';
import JwPagination from 'jw-react-pagination';

class Businesses extends Component {
  render() {
    return (
      <div className="row">
      <Header />
      <HomeContent />
      <Footer />
      </div>     
    );
  }
}

class HomeContent extends Component {

  constructor() {
    super();

    this.onChangePage = this.onChangePage.bind(this);

    this.state = {
        pageOfItems: [],
        businesses: []
    };
}

onChangePage(pageOfItems) {
    // update local state with new page of items
    this.setState({ pageOfItems });
}


  componentDidMount() {
    axios.get(`${Base_url}/businesses`).then(response => {
      this.setState({ businesses: response.data});
    }).catch(error => {
      if (error.response.data.status_code === 204){
          const message = error.response.data.Error
          swal("message!!", message, "error");
      }

  });
 
  
  }

  searchByName = (e) => {
    e.preventDefault();
    
    const name = e.target.elements.searchname.value;
  
    axios.get(`${Base_url}/businesses?q=${name}`).then(res => {
      if(res.data.status_code === 204){
        swal('Sorry, no business found');
        }
      else{
        this.setState({ businesses: res.data});
     }

  })}

  filter = (e) => {
    e.preventDefault();
    
    const category = e.target.elements.searchcategory.value;
    const location = e.target.elements.searchlocation.value;
  
    axios.get(`${Base_url}/businesses?category=${category}&location=${location}`).then(resp => {
      
      if(resp.data.status_code === 204){
        swal('Sorry, no business found');
        }
      else{
        this.setState({ businesses: resp.data});
     }
      

  })}

  render() {

    return (
      <div className="content">
        <div className = "row">
        <h3 style={{paddingLeft:'20px', color:'maroon'}}>Featured Businesses</h3>
        <div className="search">
        <form onSubmit={this.searchByName}>
            <span><input type="text" id="search"  name="searchname" placeholder="Search by name..."/></span>
            <span><button type="submit" id="search" style={{ paddingRight:'20px'}}><span className="glyphicon glyphicon-search" ></span></button></span>
        </form>
        </div> <br /><br />
            
            
          <div className = "col-md-4">
            <div style={{textAlign:'left', width:'90%', float:'right'}}>
                

                <h4 >Filter Businesses By:</h4><br />

                <form onSubmit={this.filter}>

                <span>Category: </span><span>  
                <select name="searchcategory" id="filter">
                <option value="">All</option>
                <option>Technology</option>
                <option>Tourism & Hotels</option>
                <option>Health</option>
                <option>Education</option>
                <option>Finance & Accounting</option>
                <option>Farming</option>
                <option>Ecommerse</option>
                <option>Real Estate</option>
                <option>Manufacturing</option>
                </select></span>
                 <br /><br /><br />

                <span>Location: </span><span>          
                <input type="text" id="filter"  name="searchlocation" /></span> <br /><br /><br />

                <button type="submit" className="btn btn-primary" style={{float:'right'}}><span className="glyphicon glyphicon-search"></span> </button>
                </form>
            </div>
        </div>

        <div className = "col-md-8" style={{paddingLeft:'40px'}} >
        {this.state.businesses.length >0 &&
        <div>
        
        <table className="table" style={{textAlign:'left', width:'95%', float:'center', marginTop:'15px'}}>
            <thead>
                  
            <tr>
              <th id="name-row">Business</th>
              <th id="row">Category</th>
              <th id="row">Location</th>
            </tr> 
            </thead>
            <tbody>
            {this.state.pageOfItems.map(business =>
            <tr key = {business.id}>
              <td><Link to={`/business/${business.id}`}>{business.name}</Link></td>
              <td>{business.category}</td>
              <td>{business.location}</td>
            </tr> 
            
            )}

            </tbody>
          </table>
          <br /><br />

          <div style={{ float:'right', textDecoration:'none' }}>
            
                  <JwPagination items={this.state.businesses} onChangePage={this.onChangePage} />
          </div>
          
         
          </div>
        
        }

          {this.state.businesses.length === 0 &&
          <img alt='' src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" id="loadpage"/>
          }
          </div>

        </div> 
      </div>
          );
        }

        

      }


export default Businesses;
export { HomeContent }
