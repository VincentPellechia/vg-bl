import React, { Component } from 'react';

class Home extends Component{
  constructor(props){
    super(props);

    this.state = {
      isLoaded: false,
      games: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {

    if(event.target.name.value === ''){
      console.log("nothing inside");
    }
    else{
      this.getList(event.target.name.value);
      this.render();
    }

    event.preventDefault();

  }

  handleClick(event){
    var e = JSON.parse(event.target.value);
    this.addList(e.name,e.id);
    event.preventDefault();
  }

  componentDidMount() {

    //this.getList();
  }



  addList = (n,d) => {
    fetch('/profile/add/' + n + '/' + d)
      .then(res => res.json())
      .catch(res => {
        console.log("No connection established !!!!");
      });
  }

  /*getList = () => {
    fetch('/home/api')
      .then(res => res.json())
      .then(games => this.setState({ games: games, isLoaded:true }))
      .catch(res => {
        console.log("No connection established fool");
      });
  }*/

  getList = (n) => {
    fetch('/home/api/' + n)
      .then(res => res.json())
      .then(games => this.setState({ games: games, isLoaded:true }))
      .catch(res => {
        console.log("No connection established fool");
      });
  }

    render(){
      var {isLoaded, games} = this.state;
      var name;
      const listgames = games.map(game =>

        <li key={game.id}>
          {game.name}
          <button value={JSON.stringify(game)} onClick={this.handleClick}>Add to Log</button>
        </li>
      );

        return (
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>
                Name:
                <br/>
                <input type="text" name="name" value={name} onChange={this.handleChange} />
              </label>
              <br/>
              <input type="submit" value="Submit" />
            </form>
              <br/>
            <ul>{listgames}</ul>
          </div>
      );
      //}
    }
}
export default Home;
