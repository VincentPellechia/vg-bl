import React, { Component } from 'react';
import {Link} from 'react-router-dom';


class Navbar extends Component{
  constructor(props){
    super(props);

    this.state = {
      isLoaded: false,
      items: null,
    };
  }

  render(){
    return(
      <nav className="Nav">
          <div className="Nav__container">

            <div className="Nav__right">
              <ul className="Nav__item-wrapper">
                <li className="Nav__item">
                  <Link className="Nav__link" to="/">Home</Link>
                </li>
                <li className="Nav__item">
                  <Link className="Nav__link" to="/profile">Profile</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    )
  }
}
export default Navbar;
