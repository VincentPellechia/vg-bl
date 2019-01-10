import React, { Component } from 'react';

class Tree extends Component{
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){
    var e = JSON.parse(event.target.value);
    this.addList(e.name,e.id);
    event.preventDefault();
  }

  addList = (n,d) => {
    fetch('/profile/add',{
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        "name": n
      })
    })
      .then(res => res.json())
      .then(games => this.setState({ games: games, isLoaded:true }))
      .catch(res => {
        console.log("No connection established !!!!");
      });
  }

  convertDate = (date) => {
    if(date == null){return null;}
    var a = new Date(date * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var day = a.getDate();
    var time = month + ' '+ day + ' ' + year;
    return time;
  }

  mapPlatforms = (platforms) => {
    if(platforms == null){return null;}
    return platforms.map(pf => pf === null ? null : pf.name+" ");
  }

  render(){
    var headers = this.props.headers;
    var games = JSON.parse(this.props.games);

    const listgames = games.map(game =>
      <tr key = {game.name}>
        <td>
          {game.name}
        </td>
        <td>
          {this.mapPlatforms(game.game.platforms)}
        </td>
        <td>
          {this.convertDate(game.game.first_release_date)}
        </td>
        <td>
          <button value={JSON.stringify(game)} onClick={this.handleClick}>Add to Log</button>
        </td>
      </tr>
    );
    const listheaders = headers.map(header =>
      <td key={header}>
        {header}
      </td>
    );
    return (
      <div>
        <table id ="gameData">
          <tbody>
            <tr key="headers">
              {listheaders}
            </tr>
            {listgames}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Tree;
