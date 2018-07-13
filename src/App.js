import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  this.state = {
    input: "",
    tasks: []
  }
  render() {
    return (
      <div className="App">
        <p>TODO List:</p>
        <input type="text" />
      </div>
    );
  }
}

export default App;
