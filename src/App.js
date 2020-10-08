import React, { Component } from "react";
import "./App.css";
import Edit from "./assets/edit.svg";
import Delete from "./assets/delete.svg";
import ListItem from "./components/ListItem";
const lists = require("./datastore.js");

export default class TodoListChuva extends Component {
  constructor(props) {
    super(props);
    const todos = new lists([]);
    this.state = {
      items: todos,
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

    this.didTapTextField = this.didTapTextField.bind(this);
    this.didTapAddButton = this.didTapAddButton.bind(this);
    this.DidTapEditInputTextField = this.DidTapEditInputTextField.bind(this);
    this.DidTapEnterButton = this.DidTapEnterButton.bind(this);
    this.DidTapDeleteButton = this.DidTapDeleteButton.bind(this);
    this.DidTapUpdateButton = this.DidTapUpdateButton.bind(this);
    this.handleValueOnTheUpdateInput = this.handleValueOnTheUpdateInput.bind(
      this
    );
    this.handleClearState = this.handleClearState.bind(this);
  }

  didTapTextField(input) {
    console.log("did Tap Text Field");
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
  didTapAddButton(e) {
    console.log("did Tap Add Button");
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
  DidTapEnterButton = (e) => {
    console.log("Enter Press");
    if (e.key === "Enter") {
      this.didTapAddButton();
      e.preventDefault();
    }
  };
  DidTapEnterOnApplyButton = (e) => {
    if (e.key === "Enter") {
      this.handleValueOnTheUpdateInput();
      this.handleClearState();
      e.preventDefault();
    }
  };

  DidTapDeleteButton(itemId) {
    this.setState({
      ...this.state,
      ...this.state.items.removeItem(itemId),
    });
  }

  DidTapEditInputTextField(input, id) {
    console.log("Did tap edit input text field");
    this.setState({
      ...this.state,
      editInput: {
        description: input,
        id: id,
      },
    });
  }
  //update item
  DidTapUpdateButton(id, property) {
    console.log("handle update item");
    this.setState({
      ...this.state,
      ...this.state.items.updatedItem(id, property),
    });
  }
  handleValueOnTheUpdateInput() {
    console.log("handle Value On The Update Input");
    this.setState({
      ...this.state,
      ...this.state.items.updatedItem(this.state.editInput.id, {
        description: this.state.editInput.description,
        isEditable: false,
      }),
    });
  }

  handleClearState() {
    this.setState({
      currentItems: {
        description: "",
        id: "",
      },
      editInput: {
        description: "",
        id: "",
      },
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
                //console.log("onKeyPress");
                this.DidTapEnterButton(e);
              }}
              type="text"
              id="todoText"
              placeholder="..."
              onChange={(e) => {
                // console.log("onChange");
                this.didTapTextField(e.currentTarget.value);
              }}
              value={this.state.currentItems.description}
            />
            <button
              type="button"
              onClick={(e) => {
                this.didTapAddButton(e);
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
                .map((item) => (
                  <ListItem
                    item={item}
                    editInputDescription={this.state.editInput.description}
                    DidTapEnterOnApplyButton={this.DidTapEnterOnApplyButton}
                    State={this.state}
                    DidTapEditInputTextField={this.DidTapEditInputTextField}
                    DidTapUpdateButton={this.DidTapUpdateButton}
                    DidTapDeleteButton={this.DidTapDeleteButton}
                    handleValueOnTheUpdateInput={
                      this.handleValueOnTheUpdateInput
                    }
                    handleClearState={this.handleClearState}
                  />
                ))}
          </ul>
        </header>

        {this.state.errorMsg.length > 0 && <p>{this.state.errorMsg}</p>}
      </div>
    );
  }
}
