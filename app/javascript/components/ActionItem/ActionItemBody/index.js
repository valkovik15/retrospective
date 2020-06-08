import React from 'react';
import Textarea from 'react-textarea-autosize';
import './ActionItemBody.css';
import {editActionItem, removeActionItem} from '../../../utils/api';

class ActionItemBody extends React.Component {
  state = {
    inputValue: this.props.body,
    editMode: false,
    showDropdown: false
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.editMode === false) {
      return {
        inputValue: nextProps.body,
        editMode: prevState.editMode
      };
    }

    return prevState;
  }

  handleDeleteClick = () => {
    this.hideDropdown();
    removeActionItem(this.props.id);
  };

  handleEditClick = () => {
    this.editModeToggle();
    this.hideDropdown();
  };

  editModeToggle = () => {
    this.setState(state => ({editMode: !state.editMode}));
  };

  handleChange = e => {
    this.setState({inputValue: e.target.value});
  };

  resetTextChanges = () => {
    this.setState(state => ({...state, inputValue: this.props.body}));
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.editModeToggle();
      editActionItem(
        this.props.id,
        this.state.inputValue,
        this.resetTextChanges
      );
    }
  };

  toggleDropdown = () => {
    this.setState(prevState => ({showDropdown: !prevState.showDropdown}));
  };

  hideDropdown = () => {
    this.setState({showDropdown: false});
  };

  render() {
    const {inputValue, editMode} = this.state;
    const {editable, deletable, body} = this.props;

    return (
      <div>
        {editable && deletable && (
          <div className="dropdown">
            <div
              className="dropdown-btn"
              tabIndex="1"
              onClick={this.toggleDropdown}
              onBlur={this.hideDropdown}
            >
              …
            </div>
            <div hidden={!this.state.showDropdown} className="dropdown-content">
              {!editMode && (
                <div>
                  <a
                    onClick={this.handleEditClick}
                    onMouseDown={event => {
                      event.preventDefault();
                    }}
                  >
                    Edit
                  </a>
                  <hr style={{margin: '5px 0'}} />
                </div>
              )}
              <a
                onClick={() => {
                  window.confirm(
                    'Are you sure you want to delete this ActionItem?'
                  ) && this.handleDeleteClick();
                }}
                onMouseDown={event => {
                  event.preventDefault();
                }}
              >
                Delete
              </a>
            </div>
          </div>
        )}
        <div
          className="text"
          hidden={editMode}
          onDoubleClick={editable ? this.editModeToggle : undefined}
        >
          {body}
        </div>
        <Textarea
          value={inputValue}
          hidden={!editMode}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
      </div>
    );
  }
}

export default ActionItemBody;
