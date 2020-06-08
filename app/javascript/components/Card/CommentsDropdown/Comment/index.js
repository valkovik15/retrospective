import React, {useState, useEffect} from 'react';
import Textarea from 'react-textarea-autosize';

const Comment = props => {
  const {comment, deletable, editable} = props;
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(comment.content);

  useEffect(() => {
    if (inputValue !== comment.content) {
      setInputValue(comment.content);
    }
  }, [comment.content, inputValue, props.comment.content]);
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

  const handleUpdate = newValue => {
    fetch(
      `/api/${window.location.pathname}/cards/${comment.card_id}/comments/${comment.id}`,
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-Token': document
            .querySelector("meta[name='csrf-token']")
            .getAttribute('content')
        },
        body: JSON.stringify({
          content: newValue
        })
      }
    )
      .then(result => {
        if (result.status !== 200) {
          setInputValue(comment.content);
          throw result;
        }
      })
      .catch(error => {
        error.json().then(errorHash => {
          console.log(errorHash.error);
        });
      });
  };

  const editModeToggle = () => {
    setEditMode(prevMode => !prevMode);
  };

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      editModeToggle();
      handleUpdate(e.target.value);
      e.preventDefault();
    }
  };

  return (
    <div key={comment.id} className="dropdown-item">
      {!editMode && (
        <div
          className="columns"
          onDoubleClick={editable ? editModeToggle : undefined}
        >
          <div className="column">{comment.content}</div>
          <div className="column is-two-fifths bottom-content">
            <img src={comment.author.avatar.thumb.url} className="avatar" />
            <span> by {comment.author.email.split('@')[0]}</span>
          </div>
        </div>
      )}
      <Textarea
        value={inputValue}
        hidden={!editMode}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      {deletable && (
        <div>
          <a onClick={handleDeleteClick}>delete</a>
        </div>
      )}
    </div>
  );
};

export default Comment;
