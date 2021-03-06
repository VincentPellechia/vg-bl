import React, { Component } from 'react';

class Login extends Component{
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
      this.props.onLogin(email, password);
    }
    event.preventDefault();
  }

  componentDidMount() {

  }

    render(){
      var {email,password} = this.state;

        return (
          <div>
          <h1>Login</h1>
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
    }
}
export default Login;
