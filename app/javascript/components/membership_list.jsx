import React, {Component} from 'react';
import consumer from '../channels/consumer';

import User from './user';

class MembershipList extends Component {
  state = {
    suggestions: [],
    memberships: [],
    selectedOption: null,
    options: []
  };

  componentDidMount() {
    this.sub = consumer.subscriptions.create(
      {
        channel: 'BoardChannel',
        board: window.location.pathname.slice(
          window.location.pathname.lastIndexOf('/') + 1
        )
      },
      {
        received: this.handleReceiveMemberships
      }
    );
    fetch(`/api/${window.location.pathname}/memberships`)
      .then(res => res.json())
      .then(result => {
        this.setState((state, _) => ({
          ...state,
          memberships: result
        }));
      });
  }

  componentWillUnmount() {
    this.sub.unsubscribe();
  }

  handleReceiveMemberships = data => {
    const {id, front_action, memberships} = data;
    switch (front_action) {
      case 'add_users': {
        this.setState((state, _) => ({
          ...state,
          memberships: [...memberships]
        }));
        break;
      }

      case 'remove_user': {
        this.setState((state, _) => ({
          ...state,
          memberships: state.memberships.filter(el => el.id !== id)
        }));
        break;
      }

      case 'update_status': {
        const objIndex = this.state.memberships.findIndex(obj => obj.id === id);
        const updatedObj = {
          ...this.state.memberships[objIndex],
          ready: !this.state.memberships[objIndex].ready
        };
        this.setState((state, _) => ({
          ...state,
          memberships: [
            ...state.memberships.slice(0, objIndex),
            updatedObj,
            ...state.memberships.slice(objIndex + 1)
          ]
        }));
        break;
      }
    }
  };

  render() {
    const {memberships} = this.state;
    const usersListComponent = memberships.map(membership => {
      return (
        <User
          key={membership.id}
          shouldDisplayReady
          membership={membership}
          shouldHandleDelete={false}
          boardSlug={window.location.pathname.split('/')[2]}
        />
      );
    });
    return (
      <>
        <p>users on this board:</p>
        <div className="tags">{usersListComponent}</div>
      </>
    );
  }
}

export default MembershipList;
