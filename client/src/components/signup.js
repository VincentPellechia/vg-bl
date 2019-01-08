import React, { Component } from 'react';

class Signup extends Component{
  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {

    if(event.target.email.value === '' || event.target.password.value === ''){
      console.log("nothing inside");
    }
    else{
      var email = event.target.email.value;
      var password = event.target.password.value;
      this.setState({
        email: email,
        password: password
      });
      this.render();
    }

    event.preventDefault();

  }

  /*addList = (n,d) => {
    fetch('/profile/add/' + n + '/' + d)
      .then(res => res.json())
      .catch(res => {
        console.log("No connection established !!!!");
      });
  }

  getList = (n) => {
    fetch('/home/api/' + n)
      .then(res => res.json())
      .then(games => this.setState({ games: games, isLoaded:true }))
      .catch(res => {
        console.log("No connection established fool");
      });
  }*/

    render(){
      var {email,password} = this.state;

        return (
          <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Email:
              <br/>
              <input type="text" name="email" value={email} onChange={this.handleChange} />
              <br/>
              Password:
              <br/>
              <input type="text" name="password" value={password} onChange={this.handleChange} />
            </label>
            <br/>
            <input type="submit" value="Submit" />
          </form>
          </div>
      );
      //}
    }
}
export default Signup;
