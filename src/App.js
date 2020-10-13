import React, { Component } from "react";
import "./App.css";
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
    this.didTapEditButton = this.didTapEditButton.bind(this);
    this.WriteOnEditInputTextField = this.WriteOnEditInputTextField.bind(this);
    this.didTapEnterButton = this.didTapEnterButton.bind(this);
    this.didTapDeleteButton = this.didTapDeleteButton.bind(this);
    this.didTapUpdateButton = this.didTapUpdateButton.bind(this);
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
  didTapEnterButton = (e) => {
    console.log("Enter Press");
    if (e.key === "Enter") {
      this.didTapAddButton();
      e.preventDefault();
    }
  };
  didTapEnterOnApplyButton = (e) => {
    if (e.key === "Enter") {
      this.handleValueOnTheUpdateInput();
      this.handleClearState();
      e.preventDefault();
    }
  };

  didTapDeleteButton(itemId) {
    this.setState({
      ...this.state,
      ...this.state.items.removeItem(itemId),
    });
  }

  WriteOnEditInputTextField(input, id) {
    console.log("Write on edit input text field");
    this.setState({
      ...this.state,
      editInput: {
        description: input,
        id: id,
      },
    });
  }
  //update item
  didTapUpdateButton(id, property) {
    console.log("Did tap update button");
      this.setState({
        ...this.state,
        editInput:{
          id:"",
          description:"",

        }
      })
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

  didTapEditButton(itemId){
   
      this.state.items.fetchItems().map((item) => 
        item.id !== itemId ?
           (this.setState({
            ...this.state,
            ...this.state.items.updatedItem(item.id, {
              isEditable: false,
            }),
          })): null
       
    );

   
  }
  render() {
    return (
      <div className="Todo-List-App">
        <h1 className="title">TODO LIST CHUVA</h1>
        <header className="Todo-List">
          <form id="todo_form">
            <input
              onKeyPress={(e) => {
                this.didTapEnterButton(e);
              }}
              type="text"
              id="todoText"
              placeholder="..."
              onChange={(e) => {
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
                    key={item.id}
                    item={item}
                    editInputDescription={this.state.editInput.description}
                    didTapEnterOnApplyButton={this.didTapEnterOnApplyButton}
                    State={this.state}
                    WriteOnEditInputTextField={this.WriteOnEditInputTextField}
                    didTapUpdateButton={this.didTapUpdateButton}
                    didTapDeleteButton={this.didTapDeleteButton}
                    handleValueOnTheUpdateInput={
                      this.handleValueOnTheUpdateInput
                    }
                    handleClearState={this.handleClearState}
                    didTapEditButton={this.didTapEditButton}
                  />
                ))}
          </ul>
        </header>

        {this.state.errorMsg.length > 0 && <p>{this.state.errorMsg}</p>}
      </div>
    );
  }
}
