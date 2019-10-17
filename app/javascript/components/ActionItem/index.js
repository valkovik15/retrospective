import React from "react"

import ActionItemBody from "./ActionItemBody"
import ActionItemFooter from "./ActionItemFooter"
import "./ActionItem.css"

class ActionItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  hideActionItem = () => {
    this.setState({ActionItemStyle: {display: 'none'}});
  }
  
  render () {
    const { id, body, times_moved, deletable, editable } = this.props;

    const footerNotEmpty = deletable || (times_moved != 0);

    return (
      <div className='box' style={this.state.ActionItemStyle}>
        <ActionItemBody id={id} 
                        editable={editable}
                        body={body}/>
        {footerNotEmpty && <ActionItemFooter id={id} 
                                             deletable={deletable}
                                             times_moved={times_moved} 
                                             hideActionItem={this.hideActionItem}/>}
      </div>
    );
  }
}

export default ActionItem
