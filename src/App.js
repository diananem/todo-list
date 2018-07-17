import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    input: "",
    tasks: []
  };

  toEditTask = taskIndex => () => {
    const editTask = [...this.state.tasks];
    editTask[taskIndex] = {
      ...editTask[taskIndex],
      edit: true
    };

    this.setState({
      tasks: editTask
    });
  };

  saveEditTask = taskIndex => ({ target: { value }, keyCode }) => {
    if (keyCode === 13) {
      const saveTask = [...this.state.tasks];
      saveTask[taskIndex] = {
        ...saveTask[taskIndex],
        text: value,
        edit: false
      };

      this.setState({
        tasks: saveTask
      });
    }
  };

  toCreateTask = e => {
    if (e.keyCode === 13 && this.state.input !== "") {
      const tasks = this.state.tasks;
      tasks.push({
        done: false,
        edit: false,
        text: this.state.input
      });
      this.setState({
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
              {task.edit ? (
                <input
                  defaultValue={task.text}
                  onKeyDown={this.saveEditTask(index)}
                />
              ) : (
                <label htmlFor={index} onDoubleClick={this.toEditTask(index)}>
                  {task.text}
                </label>
              )}
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
