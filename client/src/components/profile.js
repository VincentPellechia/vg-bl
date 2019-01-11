import React, { Component } from 'react';
import Tree from "./tree";
//import axios from 'axios';

class Profile extends Component{
  constructor(props){
    super(props);

    this.state = {
      games:[],
      isLoaded: false,
      id: '',
      name: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /*
  Handles user submits: Checks for blank fields, adds new additions to JSON list,
  sets the state, and then renders the result
  */
  handleSubmit(event) {

    if(event.target.name.value === '' || event.target.id.value === ''){
      console.log("nothing inside");
    }
    else{
      var games = this.state.games;
      games.push({
        id: event.target.id.value,
        name: event.target.name.value
      });
      //console.log(this.state.games);
      this.setState({games: games});
      this.addList();
      this.render();
    }

    event.preventDefault();

  }

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    fetch('/profile')
      .then(res => res.json())
      .then(games => this.setState({ games: games, isLoaded:true }))
      .catch(res => {
        console.log("No connection established !!!!");
      });
  }

  addList = () => {
    var name = this.state.name;
    fetch('/profile/add',{
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        "name": name
      })
    })
      .then(res => res.json())
      .then(games => this.setState({ games: games, isLoaded:true }))
      .catch(res => {
        console.log("No connection established !!!!");
      });
  }

  /*addList = () => {
    var name = this.state.name;
    var id = this.state.id;
    fetch('/profile/add/'+name+'/'+id)
      .then(res => res.json())
      .catch(res => {
        console.log("No connection established !!!!");
      });
      this.sayHi();
  }*/

  render() {
    var {games, isLoaded, id, name} = this.state;
    if(!isLoaded){
      return <div>Loading...</div>;
    }
    else{
      return (
        <div className="App">
          <h1>GAMES</h1>
          {games.map(game =>
            <div key={game.id}>{game.name}</div>
          )}
          <br/>

          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <br/>
              <input type="text" name="name" value={name} onChange={this.handleChange} />
              <br/>
              ID:
              <br/>
              <input type="text" name="id"value={id} onChange={this.handleChange} />
            </label>
            <br/>
            <input type="submit" value="Submit" />
          </form>

        </div>
      );
    }
  }
}
export default Profile;
