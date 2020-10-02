import React, { Component } from "react";
import "./App.css";
import Edit from "./assets/edit.svg";
import Delete from "./assets/delete.svg";
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
        isEditable: false,
      },
      errorMsg: "",
      isEditable: false,
      editInput: {
        description: "",
        id: "",
      },
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleAddButton = this.handleAddButton.bind(this);
    this.handleEditInput = this.handleEditInput.bind(this);
    this.handleEnterPress = this.handleEnterPress.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleUpdateItem = this.handleUpdateItem.bind(this);
    this.handleValueOnTheUpdateInput = this.handleValueOnTheUpdateInput.bind(
      this
    );
  }

  handleInput(input) {
    this.setState({
      ...this.state,
      currentItems: {
        description: input,
        id: Date.now(),
        isEditable: false,
      },
    });
  }
  //add something to our list
  handleAddButton(e) {
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
  handleApplyOnEnterPress = (e) => {
    if (e.key === "Enter") {
      this.handleValueOnTheUpdateInput();
      e.preventDefault();
    }
  };

  handleDeleteItem(itemId) {
    this.setState({
      ...this.state,
      ...this.state.items.removeItem(itemId),
    });
  }

  handleEditInput(input, id) {
    this.setState({
      ...this.state,
      editInput: {
        description: input,
        id: id,
      },
    });
  }
  //update item
  handleUpdateItem(id, property) {
    this.setState({
      ...this.state,
      ...this.state.items.updatedItem(id, property),
    });
  }
  handleValueOnTheUpdateInput() {
    this.setState({
      ...this.state,
      ...this.state.items.updatedItem(this.state.editInput.id, {
        description: this.state.editInput.description,
        isEditable: false,
      }),
    });
  }

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
              this.state.items.fetchItems().map((item) => (
                <li className="listItem" key={item.id}>
                  {!item.isEditable ? (
                    <p>{item.description}</p>
                  ) : (
                    <input
                      type="text"
                      onKeyPress={(e) => {
                        this.handleApplyOnEnterPress(e);
                      }}
                      value={
                        this.state.editInput.description.length > 0
                          ? this.state.editInput.description
                          : item.description
                      }
                      onChange={(e) => {
                        this.handleEditInput(e.currentTarget.value, item.id);
                      }}
                    />
                  )}
                  <span>
                    <button
                      type="button"
                      onClick={() => {
                        this.handleUpdateItem(item.id, {
                          isEditable: !item.isEditable,
                        });
                      }}
                    >
                      <img src={Edit} alt="X" className="buttonIcon" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        this.handleDeleteItem(item.id);
                      }}
                    >
                      <img src={Delete} alt="X" className="buttonIcon" />
                    </button>
                    {item.isEditable && (
                      <button
                        type="button"
                        onClick={() => {
                          this.handleValueOnTheUpdateInput();
                        }}
                      >
                        Apply
                      </button>
                    )}
                  </span>
                </li>
              ))}
          </ul>
        </header>

        {this.state.errorMsg.length > 0 && <p>{this.state.errorMsg}</p>}
      </div>
    );
  }
}
