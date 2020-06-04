import React, {useRef} from 'react';

const CommentsDropdown = props => {
  const inputEl = useRef(null);

  const {visible, id} = props;

  const handleSubmit = () => {
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
        if (result.status === 200) {
          window.location.reload();
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
      <div className="column">
        <div className="dropdown-comments-menu" role="menu">
          <div className="dropdown-comments-content">
            <div className="textarea-container">
              <textarea ref={inputEl} className="textarea" />
              <button
                className="button is-small"
                type="button"
                onClick={handleSubmit}
              >
                Add comment
              </button>
            </div>

            <a className="dropdown-item">Other dropdown item</a>
            <a href="#" className="dropdown-item is-active">
              Active dropdown item
            </a>
            <a href="#" className="dropdown-item">
              Other dropdown item
            </a>
          </div>
        </div>
      </div>
    )
  );
};

export default CommentsDropdown;
