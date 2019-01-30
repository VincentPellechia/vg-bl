import React, { Component } from 'react';

class Tree extends Component{
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleClickRemove = this.handleClickRemove.bind(this);
  }

  handleClick(event){
    var e = JSON.parse(event.target.value);
    this.addList(e.name,e.game.first_release_date,this.mapPlatforms(e.game.platforms));
    event.preventDefault();
  }

  handleClickRemove(event){
    console.log(event.target.value);
    var e = event.target.value;
    this.removeList(e);
    event.preventDefault();
  }

  removeList = (e) => {
    var userid = this.props.user.uid;
    fetch('/profile/'+userid+'/remove',{
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        "name": e
      })
    })
      //.then(res => alert(JSON.stringify(res)))
      .catch(res => {
        console.log("No connection established !!!!");
      });
  }

  addList = (n,d,p) => {
    var userid = this.props.user.uid;
    console.log(userid);
    fetch('/profile/add',{
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        "name": n,
        "first_release_date": d,
        "platforms": p,
        "userid": userid
      })
    })
      //.then(res => alert(JSON.stringify(res)))
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

    var listgames;

    if(this.props.profile){
      listgames = games.map(game =>
        <tr key = {game.name}>
          <td>
            {game.name}
          </td>
          <td>
            {game.status}
          </td>
          <td>
            <button value={game.name} onClick={this.handleClickRemove}>Remove from Log</button>
          </td>
        </tr>
      );
    }
    else {
      listgames = games.map(game =>
        <tr key = {game.name+ "" + game.game.first_release_date}>
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
    }

    // ADD COMPANIES TO DATABASE AS WELL

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
