import React, { Component } from "react";
import ClickOutside from "react-click-outside";
import nanoid from "nanoid";
import { getSavedTasks, TASK_KEY, FILTER_STATUSES } from "./utils";
import "./App.css";

class App extends Component {
  state = {
    input: "",
    tasks: [],
    activeFilter: FILTER_STATUSES["all"]
  };

  componentDidMount() {
    const savedTasks = getSavedTasks();
    if (savedTasks !== null) {
      this.setState({
        tasks: savedTasks
      });
    }
  }

  updateStateTasks(tasks) {
    localStorage.setItem(TASK_KEY, JSON.stringify(tasks));
    this.setState({ tasks: tasks });
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
        id: nanoid(),
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

  toggleStatus = taskId => () => {
    const updatedTasks = getSavedTasks().map(task => {
      if (task.id === taskId) {
        return { ...task, done: !task.done };
      }
      return task;
    });

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
    const savedTasks = getSavedTasks();
    this.setState({
      tasks: savedTasks,
      activeFilter: FILTER_STATUSES["all"]
    });
  };
  toFilterActiveTasks = () => {
    const savedTasks = getSavedTasks();
    const activeTasks = savedTasks.filter(task => !task.done);
    this.setState({
      tasks: activeTasks,
      activeFilter: FILTER_STATUSES["active"]
    });
  };
  toFilterCompletedTasks = () => {
    const savedTasks = getSavedTasks();
    const completedTasks = savedTasks.filter(task => task.done);
    this.setState({
      tasks: completedTasks,
      activeFilter: FILTER_STATUSES["completed"]
    });
  };
  toClearCompleted = () => {
    const savedTasks = getSavedTasks();
    const completedTasks = savedTasks.filter(task => !task.done);
    this.setState({ tasks: completedTasks }, () => {
      localStorage.setItem(TASK_KEY, JSON.stringify(completedTasks));
    });
    this.updateStateTasks(completedTasks);
  };
  toCountActiveTasks() {
    const tasks = getSavedTasks();
    const countTasks = tasks.filter(task => !task.done);
    return `${countTasks.length} items left`;
  }

  getDisplayedTasks() {
    switch (this.state.activeFilter) {
      case FILTER_STATUSES["all"]:
        return this.state.tasks;
      case FILTER_STATUSES["active"]:
        return this.state.tasks.filter(task => !task.done);
      case FILTER_STATUSES["completed"]:
        return this.state.tasks.filter(task => task.done);

      default:
        return this.state.tasks;
    }
  }

  renderTaskItems() {
    return (
      <div className="todo-list">
        <ul>
          {this.getDisplayedTasks().map((task, index) => (
            <li key={index} className="list">
              <div className="list-item">
                <input
                  className="checkbox-item"
                  type="checkbox"
                  id={index}
                  checked={task.done}
                />
                <span
                  className="check-box"
                  onClick={this.toggleStatus(task.id)}
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
                    className={task.done ? "task-text-comleted" : "task-text"}
                    onDoubleClick={this.toEditTask(index)}
                  >
                    {task.text}
                  </div>
                )}
                <button
                  className={
                    task.edit ? "delete-button-hidden" : "delete-button"
                  }
                  onClick={this.toDeleteTask(index)}
                >
                  ✕
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
          placeholder=" What needs to be done?"
          onChange={this.handleInputChange}
          onKeyDown={this.toCreateTask}
          value={this.state.input}
        />
        <div className="list-box">
          {this.renderTaskItems()}
          {getSavedTasks().length !== 0 && (
            <div className="footer">
              <div className="counter"> {this.toCountActiveTasks()}</div>

              <div className="buttons">
                <button onClick={this.toFilterAllTasks}>All</button>
                <button onClick={this.toFilterActiveTasks}>Active</button>
                <button onClick={this.toFilterCompletedTasks}>Completed</button>
              </div>
              <button
                className={
                  this.state.tasks.filter(task => task.done).length !== 0
                    ? "button-destroy-tasks"
                    : "button-destroy-hidden"
                }
                onClick={this.toClearCompleted}
              >
                Clear completed
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
