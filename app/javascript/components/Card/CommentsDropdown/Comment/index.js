import React from 'react';

const Comment = props => {
  const {comment, deletable} = props;
  const handleDeleteClick = () => {
    fetch(
      `/api/${window.location.pathname}/cards/${comment.card_id}/comments/${comment.id}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-Token': document
            .querySelector("meta[name='csrf-token']")
            .getAttribute('content')
        }
      }
    )
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
    <div key={comment.id} className="dropdown-item">
      <div className="columns">
        <div className="column">{comment.content}</div>
        <div className="column is-two-fifths bottom-content">
          <img src={comment.author.avatar.thumb.url} className="avatar" />
          <span> by {comment.author.email.split('@')[0]}</span>
        </div>
      </div>
      {deletable && (
        <div>
          <a onClick={handleDeleteClick}>delete</a>
        </div>
      )}
    </div>
  );
};

export default Comment;
