import React from "react"
import Textarea from "react-textarea-autosize"
import "./CardBody.css"

class CardBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      dbValue: this.props.body,
      inputValue: this.props.body,
      editMode : false
    };
  }

  editModeToggle = () => {
    this.setState({editMode: !this.state.editMode});
  }

  handleChange = (e) => {
    this.setState({inputValue: e.target.value});
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      this.editModeToggle()
      this.submitRequest()
      e.preventDefault()
    }
  }

  submitRequest() {
    fetch(`/api/${window.location.pathname}/cards/${this.props.id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector("meta[name='csrf-token']").getAttribute('content')
      },
      body: JSON.stringify({
        edited_body: this.state.inputValue
      })
    }).then((result) => {
      if (result.status == 200) {
        result.json()
        .then((resultHash) => {
          this.setState({dbValue: resultHash.updated_body});
        })
      }
      else { 
        this.setState({inputValue: this.state.dbValue});
        throw result
      }
    }).catch((error) => {
        error.json()
        .then((errorHash) => {
          console.log(errorHash.error)
        })
    });
  }

  render () {
    const { inputValue, editMode } = this.state;
    const { editable } = this.props;

    return (
      <div> 
        <div onDoubleClick={ editable ? this.editModeToggle : null } hidden={editMode}>
          {inputValue}
        </div>
        <Textarea value={inputValue} 
                  onChange={this.handleChange} 
                  onKeyPress={this.handleKeyPress} 
                  hidden={!editMode}/>
      </div>
    );
  }
}

export default CardBody
