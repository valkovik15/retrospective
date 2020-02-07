import React from 'react';

import ActionItemBody from './ActionItemBody';
import ActionItemFooter from './ActionItemFooter';
import './ActionItem.css';

class ActionItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  hideActionItem = () => {
    this.setState({ActionItemStyle: {display: 'none'}});
  };

  pickColor = () => {
    switch (this.props.status) {
      case 'done':
        return 'green';
      case 'closed':
        return 'red';
      default:
        return null;
    }
  };

  render() {
    const {
      id,
      body,
      times_moved,
      deletable,
      editable,
      movable,
      transitionable
    } = this.props;
    const footerNotEmpty =
      deletable || movable || transitionable || times_moved != 0;

    return (
      <div
        className={`box ${this.pickColor()}_bg`}
        style={this.state.ActionItemStyle}
      >
        <ActionItemBody id={id} editable={editable} body={body} />
        {footerNotEmpty && (
          <ActionItemFooter
            id={id}
            deletable={deletable}
            times_moved={times_moved}
            movable={movable}
            transitionable={transitionable}
            hideActionItem={this.hideActionItem}
            paintActionItem={this.paintActionItem}
          />
        )}
      </div>
    );
  }
}

export default ActionItem;
