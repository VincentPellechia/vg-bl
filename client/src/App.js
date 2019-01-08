import React, { Component } from 'react';
import {Switch,BrowserRouter, Route} from 'react-router-dom';
//import axios from 'axios';

import Home from "./components/home"
import Profile from "./components/profile"
import Navbar from "./components/navbar"


class App extends Component {

  render() {
      return (
        <BrowserRouter>
        <div className="App">
        <Navbar />
          <Switch>
            <Route
              exact path="/"
              component={Home}
              />
              <Route
                path="/profile"
                render={props => <Profile {...props}/>}
                />
          </Switch>
          </div>
        </BrowserRouter>
        );
      }
  //}


}

export default App;
