import React from 'react';
import axios from 'axios';

class SignupForm extends React.Component {
    state = {
        Username:'',
        Email:'',
        Password:''

    }
    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleSubmit = (event) => {
        event.preventDefault();

        const newuser = {
            "username":this.state.name,
            "email":this.state.email,
            "password":this.state.password,
            "confirm_password":this.state.confirm_password
        };
        console.log(newuser)
        
        axios.post("http://127.0.0.1:5000/api/v1/auth/register", newuser)
        .then(res => {
            console.log(res.data)

        })
        .catch(error => {

            if (error.response.status === 409) {
              const message = error.response.data.Error
              console.log(message)
            }
            else if (error.response.status === 400) {
              const message = error.response.data.Error
              console.log(message)
            }
          });


        this.setState({
            name:'',
            Email:'',
            Password:''
        });
    };
    render(){
        return (
        <div id = "FormLoader">
            <form onSubmit={this.handleSubmit}>
            <input  name="name" type="text" placeholder="Enter Username" onChange={e => this.change(e)} />
            <br/>
            <input
            name="email" type="email" placeholder="Enter Email" 
            onChange={e => this.change(e)} />
            <br/>
            <input
            name="password" type="password" placeholder="Enter Password" 
            onChange={e => this.change(e)} required
            />
            <input
            name="confirm_password" type="password" placeholder="Enter Password" 
            onChange={e => this.change(e)} required
            />
            <br/>
            <p></p>
            <button type="submit">SignUp</button>
            <br/>
            <p></p>
            <h2 id="h2">Are you already registered...?</h2>
            <br/>
            <p></p>
            <button primary>LogIn</button>
            </form>
        </div>
        

        );
    }
}
export default SignupForm;