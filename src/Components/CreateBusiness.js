import React, { Component } from 'react';
import '../Styles/App.css';
import Header from './Header';
import Footer from './Footer';
import swal from 'sweetalert';
import axios from 'axios'
import {browserHistory} from 'react-router';

class CreateBusiness extends Component {
  render() {
    return (
      <div className="row">
      <Header />
      <CreateBusinessBody />
      <Footer />
      </div>     
    );
  }
}

class CreateBusinessBody extends Component {

  state = {
      businesses : []
    };
    componentDidMount() {

      if (!localStorage.loggedIn) {
        swal('Kindly login first to create a business !');
        browserHistory.push('/login')
      }
      else {}}   

  render(){
    return(
      <div className="businesscontent">
      <div className = "row">
        
        <h3 style={{paddingLeft:'20px',color:'break'}}>Create a business</h3><br />

        <div className="col-md-1" ></div>
        <div className="col-md-10" >
          <FormContent createBusiness={this.createBusiness}/>
        </div>
        <div className = "col-md-1"></div>
  
        </div>
      </div>
    );
  }
}

class FormContent extends Component {

  render() {
    return (
            <form className="create-business-form" onSubmit={this.createBusiness}>
              <div className="form-group">
                <label>Name:</label>
                <input type="text" className="field" name='business_name' required/>
                
              </div><br />
              <div className="form-group">
                <label>Location:</label>
                <input type="text" className="field" name='location' required/>
              </div><br />
              <div className="form-group"> 
                <label>Category:</label>
                <select className="field" name='category' required>
                <option>Technology</option>
                <option>Tourism & Hotels</option>
                <option>Health</option>
                <option>Education</option>
                <option>Finance & Accounting</option>
                <option>Farming</option>
                <option>Ecommerse</option>
                <option>Real Estate</option>
                <option>Manufacturing</option>
                
                </select>
              
              </div><br />

              <div className="form-group">
                <label >About:</label><br /><br />
                <textarea className="form-control" rows='8'name='about' required></textarea>
              </div><br /><br />
            <a style={{float:'right'}}><button type="submit" className="btn btn-primary">Create</button></a>
          </form>
    
          );
        }

  createBusiness = (e) => {
    e.preventDefault()

    
    const business_name = e.target.elements.business_name.value;
    const location = e.target.elements.location.value;
    const category = e.target.elements.category.value;
    const about = e.target.elements.about.value;

    const access_token = localStorage.getItem("access_token")
    const config = {
      headers: {'Authorization': "bearer " + access_token}
    }

    axios.post('https://weconnectapi-v2.herokuapp.com/api/v1/businesses', {
      business_name: business_name,
      location: location,
      category: category,
      about: about

    }, config).then(response =>{
      browserHistory.push('/dashboard')
      // sweet alert pop up
      swal({
          title: "Success!",
          text: "Business created successfully",
          icon: "success",
          button: "OK",
        });
  })
  .catch(error => {
      
      if (error.response.status === 409){
        const message = error.response.data.Error
        swal("Error!!", message, "error");
        }

      else if (error.response.status === 401){
        const message = error.response.data.Error
        swal("Error!!", message, "error");
        localStorage.removeItem('loggedIn')
        browserHistory.push('/login')
        }
      else if(error.response.status === 400){
          const message = error.response.data.Error
          swal("Error!!", message, "error");
        }
  });

  }
      }

export default CreateBusiness;
export {
  CreateBusinessBody,
  FormContent
}
