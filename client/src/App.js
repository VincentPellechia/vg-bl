import React, { Component } from 'react';
import {Switch,BrowserRouter, Route, Redirect, Link} from 'react-router-dom';
//import axios from 'axios';

import Home from "./components/home"
import Profile from "./components/profile"
import Navbar from "./components/navbar"
import Signup from "./components/signup"
import Login from "./components/login"


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:null,
      authed: false
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(email, pass){
    var obj = {
      email:email,
      password:pass
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
      this.setState({user:result,authed:true});

      console.log(this.state);
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
    const user = this.state.user;
      return (
        <BrowserRouter>
          <div className="App">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/signup">Sign up</Link></li>
              <li>
              {this.state.user ?
                <button onClick={this.logout}>Log Out</button>
                :
                <Link to="/login">Log In</Link>
              }
              </li>
              <li><Link to="/protected">Protected</Link></li>
            </ul>
            <Switch>
              <Route
                exact path="/"
                component={props => <Home {...props} user={user}/>}
              />
              <Route
                exact path="/signup"
                component={props => <Signup {...props} user={user} onSignup={this.login}/>}
              />
              <Route
                exact path="/login"
                component={props => <Login {...props} user={user} onLogin={this.login}/>}
              />

              <PrivateRoute
                exact path="/profile"
                authed={this.state.authed}
                user={user}
                component={Profile}
              />
            </Switch>
          </div>
        </BrowserRouter>
        );
      }
}

/*
<Route
  path="/profile"
  render={props => <Profile {...props} user={user}/>}
/>
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
}*/

const Protected = () => <h3>Protected</h3>

const PrivateRoute = ({ component: Component,authed,user, ...rest }) => (
  <Route {...rest} user={user} render={(props) => (
      authed === true
      ? <Component {...props} user ={user}/>
      : <Redirect to={{pathname:'/login', state:{from: props.location}}}/>
  )} />
)

export default App;
