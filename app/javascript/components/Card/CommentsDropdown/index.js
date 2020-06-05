import React, {useRef} from 'react';

const CommentsDropdown = props => {
  const inputEl = useRef(null);
  const controlEl = useRef(null);

  const {visible, id, comments} = props;

  const handleSubmit = () => {
    controlEl.current.disabled = true;
    fetch(`/api/${window.location.pathname}/cards/${id}/comments`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': document
          .querySelector("meta[name='csrf-token']")
          .getAttribute('content')
      },
      body: JSON.stringify({
        content: inputEl.current.value
      })
    })
      .then(result => {
        controlEl.current.disabled = false;
        if (result.status === 200) {
          inputEl.current.value = '';
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
    visible && (
      <div className="column comments-column">
        <div className="dropdown-comments-menu" role="menu">
          <div className="dropdown-comments-content">
            <div className="textarea-container dropdown-item">
              <textarea ref={inputEl} className="textarea" />
              <button
                ref={controlEl}
                className="button is-small"
                type="button"
                onClick={handleSubmit}
              >
                Add comment
              </button>
            </div>

            {comments.map(comment => {
              return (
                <div key={comment.id} className="dropdown-item">
                  <div className="columns">
                    <div className="column">{comment.content}</div>
                    <div className="column is-two-fifths bottom-content">
                      <img
                        src={comment.author.avatar.thumb.url}
                        className="avatar"
                      />
                      <span> by {comment.author.email.split('@')[0]}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
};

export default CommentsDropdown;
