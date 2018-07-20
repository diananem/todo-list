import React, { Component } from "react";
import ClickOutside from "react-click-outside";
import "./App.css";

const TASK_KEY = "tasks";

class App extends Component {
  state = {
    input: "",
    tasks: []
  };

  componentDidMount() {
    const savedTasks = JSON.parse(localStorage.getItem(TASK_KEY));
    if (savedTasks !== null) {
      this.setState({
        tasks: savedTasks
      });
    }
  }

  updateStateTasks(tasks) {
    this.setState({ tasks: tasks }, () => {
      localStorage.setItem(TASK_KEY, JSON.stringify(tasks));
    });
  }

  toEditTask = taskIndex => () => {
    const editTask = [...this.state.tasks];
    editTask[taskIndex] = {
      ...editTask[taskIndex],
      edit: true
    };
    this.updateStateTasks(editTask);
  };

  saveEditTask = taskIndex => ({ target: { value }, keyCode }) => {
    if (keyCode === 13) {
      const saveTask = [...this.state.tasks];
      saveTask[taskIndex] = {
        ...saveTask[taskIndex],
        text: value,
        edit: false
      };
      this.updateStateTasks(saveTask);
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

      this.updateStateTasks(tasks);
      this.setState({
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
    this.updateStateTasks(updatedTasks);
  };

  toDeleteTask = taskIndex => () => {
    const deleteTask = [...this.state.tasks];
    deleteTask.splice(taskIndex, 1);
    this.updateStateTasks(deleteTask);
  };

  toStopEditing = taskIndex => () => {
    const stopEdit = [...this.state.tasks];
    stopEdit[taskIndex] = {
      ...stopEdit[taskIndex],
      edit: false
    };
    this.updateStateTasks(stopEdit);
  };
  toFilterAllTasks = () => {
    const savedTasks = JSON.parse(localStorage.getItem(TASK_KEY));
    this.setState({
      tasks: savedTasks
    });
  };
  toFilterActiveTasks = () => {
    const savedTasks = JSON.parse(localStorage.getItem(TASK_KEY));
    const activeTasks = savedTasks.filter(task => !task.done);
    this.setState({
      tasks: activeTasks
    });
  };
  toFilterCompletedTasks = () => {
    const savedTasks = JSON.parse(localStorage.getItem(TASK_KEY));
    const completedTasks = savedTasks.filter(task => task.done);
    this.setState({
      tasks: completedTasks
    });
  };
  toClearCompleted = () => {
    const savedTasks = JSON.parse(localStorage.getItem(TASK_KEY));
    const completedTasks = savedTasks.filter(task => !task.done);
    this.setState({ tasks: completedTasks }, () => {
      localStorage.setItem(TASK_KEY, JSON.stringify(completedTasks));
    });
  };

  renderTaskItems() {
    console.log(this.state.tasks);
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
                  checked={task.done}
                  onChange={this.toggleStatus(index)}
                />
                {task.edit ? (
                  <ClickOutside
                    onClickOutside={this.toStopEditing(index)}
                    className="task-editing"
                  >
                    <input
                      defaultValue={task.text}
                      onKeyDown={this.saveEditTask(index)}
                    />
                  </ClickOutside>
                ) : (
                  <div
                    className="task-text"
                    onDoubleClick={this.toEditTask(index)}
                  >
                    {task.text}
                  </div>
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

        <button onClick={this.toFilterAllTasks}> All </button>
        <button onClick={this.toFilterActiveTasks}> Active </button>
        <button onClick={this.toFilterCompletedTasks}> Completed </button>

        <button onClick={this.toClearCompleted}> Clear completed </button>
      </div>
    );
  }
}

export default App;
