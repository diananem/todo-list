import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    input: "",
    tasks: []
  };

  toCreateTask = e => {
    if (e.keyCode === 13) {
      const tasks = this.state.tasks;
      tasks.push({
        done: false,
        text: this.state.input
      });
      const newTask = this.setState({
        tasks: tasks,
        input: ""
      });
    }
  };

  handleInputChange = e => {
    this.setState({
      input: e.target.value
    });
  };
  render() {
    const isListNotEmpty = true;
    console.log(this.state);
    return (
      <div className="App">
        <h1 className="header-text">TODO List:</h1>
        <input
          type="text"
          placeholder="What needs to be done?"
          onChange={this.handleInputChange}
          onKeyDown={this.toCreateTask}
          value={this.state.input}
        />
        <ul>
          {this.state.tasks.map((task, index) => (
            <li key={index}>{task.text}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
