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
      authed: false,
      isLoaded: false
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount(){

    this.authListener();
  }


  authListener() {
    fetch('/signup/auth',{
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(result => result.json())
    .then(result => {
      if(result.uid){
        this.setState({user:result,authed:true,isLoaded:true});
      }
      else {
        this.setState({isLoaded:true});
      }
    })
    .catch(result => {this.setState({isLoaded:true});});
  }


  login(email, pass){
    var obj = {
      email:email,
      password:pass
    }
    fetch('/signup/login',{
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
    })

  }
  logout(){
    fetch('/signup/logout',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(result => {
      this.setState({user:null, authed:false});
    })
  }

  render() {
    const user = this.state.user;
    var isLoaded = this.state.isLoaded;
    if(!isLoaded){
      return <div>Loading...</div>;
    }
    else{
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
            </ul>
            <Switch>
              <PrivateRoute
                exact path="/"
                authed={this.state.authed}
                user={user}
                component={Home}
                redirect='/login'
              />

              <Route
                exact path="/signup"
                component={props => <Signup {...props} user={user} onSignup={this.login}/>}
              />

              //Work on this private Route
              <PrivateRoute
                exact path="/login"
                authed={!this.state.authed}
                user={user}
                component={props => <Login {...props} user={user} onLogin={this.login}/>}
                onLogin={this.Login}
                redirect='/profile'
              />

              <PrivateRoute
                exact path="/profile"
                authed={this.state.authed}
                user={user}
                component={Profile}
                redirect='/login'
              />
            </Switch>
          </div>
        </BrowserRouter>
        );
      }
    }
}


const PrivateRoute = ({ component: Component,authed,user,redirect, ...rest }) => (
  <Route {...rest} user={user} component={(props) => (
      authed === true
      ? <Component {...props} user ={user}/>
      : <Redirect to={{pathname:redirect, state:{from: props.location}}}/>
  )} />
)

export default App;
