import React from 'react';
import Textarea from 'react-textarea-autosize';
import './CardBody.css';
import {editCard} from '../../../utils/api';

class CardBody extends React.Component {
  state = {
    inputValue: this.props.body,
    editMode: false
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
      editCard(this.props.id, this.state.inputValue, this.resetTextChanges);
    }
  };

  render() {
    const {inputValue, editMode} = this.state;
    const {editable, body} = this.props;

    return (
      <div>
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

export default CardBody;
