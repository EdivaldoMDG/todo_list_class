import React, { Component } from "react";
import "./App.css";
const lists = require("./datastore.js");

export default class TodoListChuva extends Component {
  constructor(props) {
    super(props);
    const todos = new lists([]);
    this.state = {
      items: todos,
      // todoList: todos.fetchItems(),
      currentItems: {
        description: "",
        id: "",
      },
      errorMsg: "",
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleAddButton = this.handleAddButton.bind(this);
    this.handleEnterPress = this.handleEnterPress.bind(this);
  }

  handleInput(input) {
    console.log("handle input");
    this.setState({
      ...this.state,
      currentItems: {
        description: input,
        id: Date.now(),
      },
    });
  }
  //add something to our list
  handleAddButton(e) {
    console.log("handleAddButton");
    if (this.state.currentItems.description.length > 0) {
      this.setState({
        ...this.state,
        ...this.state.items.addItem(this.state.currentItems),
        currentItems: {
          description: "",
          id: "",
        },
        errorMsg: "",
      });
    } else {
      this.setState({
        ...this.state,
        errorMsg: "Empty description not allowed",
      });
    }
  }
  handleEnterPress = (e) => {
    if (e.key === "Enter") {
      this.handleAddButton();
      e.preventDefault();
    }
  };

  render() {
    return (
      <div className="Todo-List-App">
        <h1 className="title">TODO LIST CHUVA</h1>
        <header className="Todo-List">
          <form id="todo_form">
            <input
              onKeyPress={(e) => {
                this.handleEnterPress(e);
              }}
              type="text"
              id="todoText"
              placeholder="..."
              onChange={(e) => {
                this.handleInput(e.currentTarget.value);
              }}
              value={this.state.currentItems.description}
            />
            <button
              type="button"
              onClick={(e) => {
                this.handleAddButton(e);
                this.setState({
                  currentItems: {
                    description: "",
                  },
                });
              }}
            >
              Add
            </button>
          </form>
          <ul className="list">
            {this.state.items.fetchItems() !== undefined &&
              this.state.items
                .fetchItems()
                .map((item) => <li key={item.id}>{item.description}</li>)}
          </ul>
        </header>
        {this.state.errorMsg.length > 0 && <p>{this.state.errorMsg}</p>}
      </div>
    );
  }
}
