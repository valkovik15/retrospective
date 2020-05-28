import React from 'react';

const User = props => {
  const {membership} = props;
  const {ready, id, user} = membership;
  const {email} = user;

  const deleteUser = () => {
    fetch(`/api/${window.location.pathname}/memberships/${id}`, {
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
        if (result.status !== 204) {
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
    <div key={email} className={ready ? 'tag is-success' : 'tag is-info'}>
      <p>{email}</p>
      <a className="delete is-small" onClick={deleteUser} />
    </div>
  );
};

export default User;
