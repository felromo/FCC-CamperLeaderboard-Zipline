import React from 'react';
import $ from 'jquery';
require("./style.scss");

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="leader-board">
        <h1 className="leader-board-title">LeaderBoard</h1>
        <Table />
      </div>
    );
  }
}

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campers: []
    };
    this.serverRequest = $.get("http://fcctop100.herokuapp.com/api/fccusers/top/recent", function (result) {
      // console.log(result)
      this.setState({
        campers: result
      })
    }.bind(this));
  }
  render() {
    return (
      <div className="Table">
        <div className="row header">
          <div className="cell position">#</div>
          <div className="cell">Camper Name</div>
          <div className="cell">Points in past 30 days</div>
          <div className="cell">All time points</div>
        </div>
        {/* here is where we need to loop rows for every camper */}
        {this.state.campers.map(function(camper, i) {
          return (
            <div key={i} className="row">
              <div className="cell position">{i+1}</div>
              <div className="cell">{camper.username}</div>
              <div className="cell">{camper.recent}</div>
              <div className="cell">{camper.alltime}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
