import React from 'react';

import ActionItemBody from './ActionItemBody';
import ActionItemFooter from './ActionItemFooter';
import './ActionItem.css';

class ActionItem extends React.Component {
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
      transitionable,
      appointed,
      avatar
    } = this.props;
    const footerNotEmpty =
      movable || transitionable || times_moved !== 0 || appointed !== undefined;

    return (
      <div className={`box ${this.pickColor()}_bg`}>
        <ActionItemBody
          id={id}
          editable={editable}
          deletable={deletable}
          body={body}
        />
        {footerNotEmpty && (
          <ActionItemFooter
            id={id}
            times_moved={times_moved}
            movable={movable}
            transitionable={transitionable}
            appointed={appointed}
            avatar={avatar}
          />
        )}
      </div>
    );
  }
}

export default ActionItem;
