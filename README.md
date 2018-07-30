[![Build Status](https://travis-ci.org/kzyGit/Weconnect-React.svg?branch=ch-create-travis-badge.png)](https://travis-ci.org/kzyGit/Weconnect-React)

<h3>WeConnect</h3>

WeConnect is an application that links individuals to businesses. A user is able to view avaiable businesses, view their profiles and reviews and also create an account. An authorised user is able to create a business and manage the businesses by either updating or deleting as well as adding reviews to businesses.<br><br>

Link to Heroku application: https://reactapp-weconnect.herokuapp.com/<br><br>
Link to WeConnect API documentation: https://app.swaggerhub.com/apis/Andela19/Weconnect-v2/1.0.0<br> 

<h4>Technology used</h4>
<ul>
  <li>React</li>
  <li>Bootstrap</li>
  <li>Python 3.6.0, flask and Restapi for the backend api</li>
 </ul>

<h4>Installation and Setup</h4>

Create and activate virtual environment:<br>

 ```sh
python3 -m venv env
source ./env/bin/activate 
 ```
Clone or download the api from github. To clone:<br>

```sh
git clone https://github.com/kzyGit/WeConnect_React.git
```
Move into our WeConnect directory <br>
 
 ```sh
 cd WeConnect_React
 ```

<h4>Running the api</h4>

- To run the application use the comand:<br>
```sh
npm start
```
<br>

- Once running, a browser automatically opens the application. <br>

- Select body section on the postman navigation tabs, select raw, then Json, add parameters as indicated in the route methods then Send request



<h4>UI Templates</h4>
The UI is hosted on github pages. Link: https://kzygit.github.io/designs/UI/index.html

<h4>Features</h4>

  <ul>
  <li>A user can create an account</li>
  <li>Registered user can login, reset password,logout, add a business, manage the businesses and add business reviews</li>
  <li>All sers can view businesses and their reviews</li>
  </ul>


<b> Author </b>: Kezzy Ang'iro




