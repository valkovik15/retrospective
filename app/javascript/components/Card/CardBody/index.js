import React from 'react';
import Textarea from 'react-textarea-autosize';
import './CardBody.css';

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

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.editModeToggle();
      this.submitRequest();
      e.preventDefault();
    }
  };

  submitRequest() {
    fetch(`/api/${window.location.pathname}/cards/${this.props.id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': document
          .querySelector("meta[name='csrf-token']")
          .getAttribute('content')
      },
      body: JSON.stringify({
        edited_body: this.state.inputValue
      })
    })
      .then(result => {
        const {body} = this.props;
        if (result.status !== 200) {
          this.setState(state => ({...state, inputValue: body}));
          throw result;
        }
      })
      .catch(error => {
        error.json().then(errorHash => {
          console.log(errorHash.error);
        });
      });
  }

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
