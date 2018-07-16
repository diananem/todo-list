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

  toggleStatus = taskIndex => () => {
    const updatedTasks = [...this.state.tasks];
    updatedTasks[taskIndex] = {
      done: !updatedTasks[taskIndex].done,
      text: updatedTasks[taskIndex].text
    };
    this.setState({
      tasks: updatedTasks
    });
  };
  //1. Find task in array
  //2. Change this task (change done to !this.state.tasks[taskIndex].done)
  //3. Update state
  renderTaskItems() {
    return (
      <ul className="todo-list">
        {this.state.tasks.map((task, index) => (
          <li key={index}>
            <div className="list-item">
              <input
                className="checkbox-item"
                type="checkbox"
                id={index}
                value={task.done}
                onClick={this.toggleStatus(index)}
              />
              <label htmlFor={index}>{task.text}</label>
            </div>
          </li>
        ))}
      </ul>
    );
  }
  render() {
    const isListNotEmpty = true;
    console.log(this.state);
    return (
      <div className="App">
        <h1 className="header-text">TODO List:</h1>
        <input
          className="main-input"
          type="text"
          placeholder="What needs to be done?"
          onChange={this.handleInputChange}
          onKeyDown={this.toCreateTask}
          value={this.state.input}
        />

        {this.renderTaskItems()}
      </div>
    );
  }
}

export default App;
