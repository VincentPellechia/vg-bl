import React, { Component } from 'react';
import Tree from "./tree"

class Home extends Component{
  constructor(props){
    super(props);

    this.state = {
      isLoaded: false,
      games: [],
      headers: []
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

  getList = (n) => {
    fetch('/home/api/' + n)
      .then(res => res.json())
      .then(games => this.setState({headers:["Name","Platforms","Release Date",""], games: games, isLoaded:true }))
      .catch(res => {
        console.log("No connection established fool");
      });
  }

    render(){
      var {isLoaded, games, headers} = this.state;
      var name;
      var g = JSON.stringify(games);

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
            <Tree games={g} headers={headers}/>

          </div>
      );
    }
}
function TreeNode(props) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.platforms.map(platform => platform.name)}</td>
      <td>{props.releasedate}</td>
      <td><button value={JSON.stringify(props)}>Add to Log</button></td>
    </tr>
  );
}

export default Home;

/*addList = (n,d) => {
  fetch('/profile/add/' + n + '/' + d)
    .then(res => res.json())
    .catch(res => {
      console.log("No connection established !!!!");
    });
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
    .then(games => this.setState({
      games: games,
      isLoaded:true,

     }))
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
}

<table id ="gameData">
  <tbody>
    <tr>
    <th>Name</th>
    <th>Platforms</th>
    <th>Release Date</th>
    <th></th>
    </tr>

    {listgames}
  </tbody>
</table>
</div>

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

*/
