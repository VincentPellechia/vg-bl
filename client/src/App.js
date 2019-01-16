import React, { Component } from 'react';
import {Switch,BrowserRouter, Route, Redirect, Link} from 'react-router-dom';
//import axios from 'axios';

import Home from "./components/home"
import Profile from "./components/profile"
import Navbar from "./components/navbar"
import Signup from "./components/signup"


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:null
      /*user:{
        usern: '',
        id:''
      }*/
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(){
    var obj = {
      email:"test7@gmail.com",
      password:"password"
    }
    fetch('/signup/signin',{
      method: 'POST',
      body: JSON.stringify(obj),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(result => result.json())
    .then(result => {
      //const user = result.user;
      this.setState({user:result});
      console.log(this.state.user);
    })

  }
  logout(){
    fetch('/signup/signout',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(result => this.setState({user:null}))
  }

  render() {
      return (
        <BrowserRouter>
          <div className="App">
            <ul>
              <li>
              <Link to="/">Home</Link>
              </li>
              <li>
              <Link to="/profile">Profile</Link>
              </li>
              <li>
              <Link to="/signup">Sign up</Link>
              </li>
              <li>
              {this.state.user ?
    <button onClick={this.logout}>Log Out</button>
    :
    <button onClick={this.login}>Log In</button>
  }
              </li>
            </ul>
            <Switch>
              <Route
                exact path="/"
                component={Home}
              />
              <Route
                path="/profile"
                render={props => <Profile {...props}/>}
              />
              <Route
                exact path="/signup"
                component={Signup}
              />

              <PrivateRoute
                exact path="/protected"
                component={Protected}
              />
            </Switch>
          </div>
        </BrowserRouter>
        );
      }
}

const fbAuth = {
  //isAuthenticated:false,
  authenticate(cb){
    fetch('/signup/login',{
      method: 'POST',
      body: JSON.stringify(this.state),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(result => {
      const user = result.user;
      this.setState({user});
    })
  },
  signout(cb) {
    fetch('/signup/logout',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(result => {
      this.setState({user: null});
    })
  }
  /*isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100) // fake async
  }*/
}

const Protected = () => <h3>Protected</h3>

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fbAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

export default App;
