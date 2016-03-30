import React from 'react';
import $ from 'jquery';
require("./style.scss");
require("font-awesome-webpack");

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
      this.setState({
        campers: result
      })
    }.bind(this));
  }
  _fetchTop30 = () => {
    $('.top-30 i').addClass('fa-caret-down');
    $('.top-all i').removeClass('fa-caret-down');
    this.serverRequest = $.get("http://fcctop100.herokuapp.com/api/fccusers/top/recent", function (result) {
      this.setState({
        campers: result
      })
    }.bind(this));
  }
  _fetchAllTime = () => {
    $('.top-all i').addClass('fa-caret-down');
    $('.top-30 i').removeClass('fa-caret-down');
    this.serverRequest = $.get("http://fcctop100.herokuapp.com/api/fccusers/top/alltime", function (result) {
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
          <div className="cell top-30 currently-selected" onClick={this._fetchTop30}>Points in past 30 days <i className="fa fa-caret-down"></i></div>
          <div className="cell top-all" onClick={this._fetchAllTime}>All time points<i className="fa"></i></div>
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
