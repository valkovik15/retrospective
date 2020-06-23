import React, {useState} from 'react';

const User = props => {
  const {membership, shouldDisplayReady, boardSlug, shouldHandleDelete} = props;
  const {ready, id, user} = membership;
  const {email} = user;
  const [style, setStyle] = useState({});

  const deleteUser = () => {
    fetch(`/api/boards/${boardSlug}/memberships/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': document
          .querySelector("meta[name='csrf-token']")
          .getAttribute('content')
      }
    })
      .then(result => {
        if (result.status === 204) {
          if (shouldHandleDelete) {
            setStyle({display: 'none'});
          }
        } else {
          throw result;
        }
      })
      .catch(error => {
        error.json().then(errorHash => {
          console.log(errorHash.error);
        });
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
