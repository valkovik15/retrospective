import React from "react"

import { transition } from "../requests.js"

class TransitionButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  render () {
    const { id, action } = this.props;

    return (
      <button onClick={() => {transition(id, action, window.location.reload())}}>
        {action}
      </button>
    );
  }
}

export default TransitionButton
