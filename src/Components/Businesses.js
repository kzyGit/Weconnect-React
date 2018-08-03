import React, { Component } from 'react';
import '../Styles/App.css';
import { Base_url } from './Header';
import { Link } from 'react-router';
import axios from 'axios'
import swal from 'sweetalert';
import JwPagination from 'jw-react-pagination';

/**
 * This component renders all available businesses
 */
class Businesses extends Component {
  constructor() {
    super();
    this.onChangePage = this.onChangePage.bind(this);
    this.state = {
      pageOfItems: [],
      businesses: []
    };
  }

  /**
   * update local state with new page of items
   */
  onChangePage(pageOfItems) {
    this.setState({ pageOfItems });
  }
  componentDidMount() {
    axios.get(`${Base_url}/businesses`).then(response => {
      this.setState({ businesses: response.data });
    }).catch(error => {});
  }

  /**
   * Makes a server request to retrieve a business searched by name
   * @param {string} name
   * @return {object} businesses of the search name
   */
  searchByName = (e) => {
    e.preventDefault();

    const name = e.target.elements.searchname.value;

    axios.get(`${Base_url}/businesses?q=${name}`).then(res => {
      if (res.data.status_code === 204) {
        swal('Sorry, no business found');
        this.search.value = ''
      }
      else {
        this.setState({ businesses: res.data });
      }
    })
  }

  /**
   * Makes a server request to filter businesses of a specified location and category
   * @return {object} businesses of a specified location and category
   */
  filter = (e) => {
    e.preventDefault();
    this.search.value = ''

    const category = e.target.elements.searchcategory.value;
    const location = e.target.elements.searchlocation.value;

    axios.get(`${Base_url}/businesses?category=${category}&location=${location}`).then(resp => {

      if (resp.data.status_code === 204) {
        swal('Sorry, no business found');
      }
      else {
        this.setState({ businesses: resp.data });
      }
    })
  }

  changename = (e) => {
    e.preventDefault()
    this.cat.value = ''
    this.loc.value = ''
  }

  changefilter = (e) => {
    e.preventDefault()
    this.search.value = ''
  }

  render() {
    return (
      
        <div className="content">
          <div className="row">
            <h3 style={{ paddingLeft: '20px', color: 'maroon' }}>Featured Businesses</h3>
            <div className="search">
              <form onSubmit={this.searchByName}>
                <span><input type="text" onChange={this.changename} ref={(ref) => this.search = ref} id="search" name="searchname" placeholder="Search by name..." /></span>
                <span><button type="submit" id="search" style={{ paddingRight: '20px' }}><span className="glyphicon glyphicon-search" ></span></button></span>
              </form>
            </div> <br /><br />
            <div className="col-md-4">
              <div style={{ textAlign: 'left', width: '90%', float: 'right' }}>
                <h4 >Filter Businesses By:</h4><br />

                <form onSubmit={this.filter}>
                  <span>Category: </span><span>
                    <select name="searchcategory" ref={(ref) => this.cat = ref} onChange={this.changefilter} id="filter">
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
                    <input type="text" id="filter" ref={(ref) => this.loc = ref} onChange={this.changefilter} name="searchlocation" /></span> <br /><br /><br />

                  <button type="submit" className="btn btn-primary" style={{ float: 'right' }}><span className="glyphicon glyphicon-search"></span> </button>
                </form>
              </div>
            </div>

            <div className="col-md-8" style={{ paddingLeft: '40px' }} >
              {this.state.businesses.length > 0 &&
                <div>
                  <table className="table" style={{ textAlign: 'left', width: '95%', float: 'center', marginTop: '15px' }}>
                    <thead>
                      <tr>
                        <th id="name-row">Business</th>
                        <th id="row">Category</th>
                        <th id="row">Location</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.pageOfItems.map(business =>
                        <tr key={business.id}>
                          <td><Link to={`/business/${business.id}`}>{business.name}</Link></td>
                          <td>{business.category}</td>
                          <td>{business.location}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <br /><br />

                  <div style={{ float: 'right', textDecoration: 'none' }}>
                    <JwPagination items={this.state.businesses} onChangePage={this.onChangePage} />
                  </div>
                </div>
              }
              {this.state.businesses.length === 0 &&
                <img alt='' src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" id="loadpage" />
              }
            </div>
          </div>
        </div>
    );
  }
}

export default Businesses;
