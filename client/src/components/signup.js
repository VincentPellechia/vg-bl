import React, { Component } from 'react';

class Signup extends Component{
  constructor(props){
    super(props);

    this.state = {
      usern: '',
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
      var usern = event.target.usern.value;
      var email = event.target.email.value;
      var password = event.target.password.value;
      this.setState({
        usern: usern,
        email: email,
        password: password
      });
      this.addUser();
    }

    event.preventDefault();

  }

  addUser = () => {
    //var {email, password} = this.state;
    fetch('/signup',{
      method: 'POST',
      body: JSON.stringify(this.state),
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .catch(res => {
        console.log("No connection established for Signup");
      });
  }

  componentDidMount() {
    /*fetch('/signup/')
      .then(res => res.json())
      .catch(res => {
        console.log("No connection established for Signup");
      });*/
  }

    render(){
      var {usern,email,password} = this.state;

        return (
          <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Username:
              <br/>
              <input type="text" name="usern" value={usern} onChange={this.handleChange} />
              <br/>
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
