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

  toDeleteTask = taskIndex => () => {
    const tasks = this.state.tasks;
    const deleteTask = [...this.state.tasks];
    deleteTask.splice(taskIndex, 1);
    this.setState({
      tasks: deleteTask
    });
  };

  toStopEditing = taskIndex => () => {
    console.log("wow");
    const stopEdit = [...this.state.tasks];
    stopEdit[taskIndex] = {
      ...stopEdit[taskIndex],
      edit: false
    };
    this.setState({
      tasks: stopEdit
    });
  };

  renderTaskItems() {
    return (
      <div className="todo-list">
        <ul>
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
                    className="task-editing"
                    defaultValue={task.text}
                    onKeyDown={this.saveEditTask(index)}
                    onBlur={this.toStopEditing(index)}
                  />
                ) : (
                  <span
                    className="task-text"
                    onDoubleClick={this.toEditTask(index)}
                  >
                    {task.text}
                  </span>
                )}
                <button
                  className="delete-button"
                  onClick={this.toDeleteTask(index)}
                >
                  {" "}
                  x{" "}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  render() {
    const isListNotEmpty = true;
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
