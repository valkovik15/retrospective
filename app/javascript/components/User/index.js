import React, {useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import {destroyMembershipMutation} from './operations.gql';

const User = props => {
  const {membership, shouldDisplayReady, shouldHandleDelete} = props;
  const {ready, id, user} = membership;
  const {email} = user;
  const [style, setStyle] = useState({});
  const [destroyMember] = useMutation(destroyMembershipMutation);
  const deleteUser = () => {
    destroyMember({
      variables: {
        id
      }
    }).then(({data}) => {
      if (data.destroyMembership.id) {
        if (shouldHandleDelete) {
          setStyle({display: 'none'});
        }
      } else {
        console.log(data.destroyMembership.errors.fullMessages.join(' '));
      }
    });
  };

  return (
    <div
      key={email}
      style={style}
      className={shouldDisplayReady && ready ? 'tag is-success' : 'tag is-info'}
    >
      <p>{email}</p>
      {shouldHandleDelete && (
        <a className="delete is-small" onClick={deleteUser} />
      )}
    </div>
  );
};

export default User;
