import React, { Component } from "react";
import Edit from "../../assets/edit.svg";
import Delete from "../../assets/delete.svg";
import "./styles.css";

class ListItem extends Component {
  render() {
    return (
      <li className="listItem" key={this.props.item.id}>
        {!this.props.item.isEditable ? (
          <p>{this.props.item.description}</p>
        ) : (
          <input
            type="text"
            onKeyPress={(e) => {
              this.props.DidTapEnterOnApplyButton(e);
            }}
            value={
              this.props.editInputDescription.length > 0
                ? this.props.editInputDescription
                : this.props.item.description
            }
            onChange={(e) => {
              this.props.DidTapEditInputTextField(
                e.currentTarget.value,
                this.props.item.id
              );
            }}
          />
        )}

        <span>
          <button
            type="button"
            onClick={() => {
              this.props.DidTapUpdateButton(this.props.item.id, {
                isEditable: !this.props.item.isEditable,
              });
            }}
          >
            <img src={Edit} alt="X" className="buttonIcon" />
          </button>
          <button
            type="button"
            onClick={() => {
              this.props.DidTapDeleteButton(this.props.item.id);
            }}
          >
            <img src={Delete} alt="X" className="buttonIcon" />
          </button>
          {this.props.item.isEditable && (
            <button
              type="button"
              onClick={() => {
                this.props.handleValueOnTheUpdateInput();
                this.props.handleClearState();
              }}
            >
              Apply
            </button>
          )}
        </span>
      </li>
    );
  }
}

export default ListItem;
