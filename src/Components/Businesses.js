import React, { Component } from 'react';
import '../Styles/App.css';
import { Base_url } from './Header';
import { Link } from 'react-router';
import axios from 'axios';
import swal from 'sweetalert';
import JwPagination from 'jw-react-pagination';
import icon from '../Images/businessicon.png';

/**
 * This component renders all available businesses
 * @returns {obj} businesses
 * @param {string} e
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
   * @param {obj} pageOfItems
   * @returns {obj} businesses
   */
  onChangePage(pageOfItems) {
    this.setState({ pageOfItems });
  }
  componentDidMount() {
    axios.get(`${Base_url}/businesses`).then(response => {
      this.setState({ businesses: response.data });
    }).catch();
  }

  /**
   * Makes a server request to retrieve a business searched by name
   * @param {string} e
   * @return {object} businesses of the search name
   */
  searchByName = (e) => {
    e.preventDefault();

    const name = e.target.elements.searchname.value;

    axios.get(`${Base_url}/businesses?q=${name}`).then(res => {
      if (res.data.status_code === 204) {
        swal('Sorry, no business found');
        this.search.value = '';
      }
      else {
        this.setState({ businesses: res.data });
      }
    });
  }

  /**
   * Makes a server request to filter businesses of a specified location and category
   * @param {string} e
   * @return {object} businesses of a specified location and category
   */
  filter = (e) => {
    e.preventDefault();
    this.search.value = '';

    const category = e.target.elements.searchcategory.value;
    const location = e.target.elements.searchlocation.value;

    axios.get(`${Base_url}/businesses?category=${category}&location=${location}`).then(resp => {

      if (resp.data.status_code === 204) {
        swal('Sorry, no business found');
      }
      else {
        this.setState({ businesses: resp.data });
      }
    });
  }

  changename = (e) => {
    e.preventDefault();
    this.cat.value = '';
    this.loc.value = '';
  }

  changefilter = (e) => {
    e.preventDefault();
    this.search.value = '';
  }
  
  reloadpage = (e) => {
    e.preventDefault();
    window.location.reload();
  }

  render() {
    return (

      <div className="businessescontent">
        <div className="row">
        <h3 onClick={this.reloadpage} style={{ paddingLeft: '20px', cursor: 'pointer', color: 'maroon' }}>Businesses</h3><br />
          <div className="row">
          <div className="col-sm-8" id='filterspan'>
          
          <form onSubmit={this.filter} id="filterform">
              <span>Category: </span><span>
                <select name="searchcategory" ref={(ref) => this.cat = ref} onChange={this.changefilter} id="search" >
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

              <span style={{ paddingLeft:'20px' }}>Location: </span><span>
                <input type="text" ref={(ref) => this.loc = ref} onChange={this.changefilter} name="searchlocation" id="searchfilter"  /></span>
                <span><button type="submit" id="search" style={{ paddingRight: '20px' }}><span className="glyphicon glyphicon-search" ></span></button></span>

              </form>
            </div>
          <div className="col-sm-1"></div>
          <div className="col-sm-3">
          
          <form onSubmit={this.searchByName} id="searchform">
              <span><input type="text" onChange={this.changename} ref={(ref) => this.search = ref} id="searchname" name="searchname" placeholder="Search by name..." /></span>
              <span><button type="submit" id="search" style={{ paddingRight: '20px' }}><span className="glyphicon glyphicon-search" ></span></button></span>
            </form>
            
            </div>

          </div> <br /><br />
          <div className="col-md-12">
            {this.state.businesses.length > 0 &&
              <div>
                <div id='bcards'>
                    {this.state.businesses.length > 0 &&

                      this.state.pageOfItems.map(business =>

                        <div key={business.id} id='card' className="card col-md-3">
                        <div id="carditem">
                        
                          <h4 className="card-title">{business.name}</h4>
                          <div className="card-image">
                            <img src={icon} alt="Business Logo" style={{ height: '100px', width: '120px', marginTop:'5px' }} className="img-thumbnail" /><br />
                          </div><br />
                          <span id='label'>Category:</span> {business.category}<br /><br />
                          <span id='label'>Location:</span> {business.location}<br />
                          <br /><Link to={`/business/${business.id}`} id='businesslink'><button type="submit" className="btn btn-default">Read More</button></Link>
                          <br /><br /></div><br />
                        </div>
                      )}
                </div>

                <br /><br />

                <div style={{ float: 'right', textDecoration: 'none' }}>
                  <JwPagination items={this.state.businesses} pageSize={12} id="pagination" onChangePage={this.onChangePage} />
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
