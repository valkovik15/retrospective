import React, {useRef, useState} from 'react';
import Picker from 'emoji-picker-react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSmile} from '@fortawesome/free-regular-svg-icons';

const CommentsDropdown = props => {
  const controlEl = useRef(null);
  const {visible, id, comments} = props;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = async commentContent => {
    try {
      controlEl.current.disabled = true;
      const response = await fetch(
        `/api/${window.location.pathname}/cards/${id}/comments`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-Token': document
              .querySelector("meta[name='csrf-token']")
              .getAttribute('content')
          },
          body: JSON.stringify({
            content: commentContent
          })
        }
      );
      controlEl.current.disabled = false;
      if (response.status === 200) {
        setNewComment('');
      } else {
        throw response;
      }
    } catch (error) {
      const errorHash = await error.json();
      console.log(errorHash.error);
    }
  };

  const handleSmileClick = () => {
    setShowEmojiPicker(isShown => !isShown);
  };

  const handleEmojiPickerClick = (_, emoji) => {
    setNewComment(comment => `${comment}${emoji.emoji}`);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="column comments-column">
      <div className="dropdown-comments-menu" role="menu">
        <div className="dropdown-comments-content">
          <div className="textarea-container dropdown-item">
            <textarea
              className="textarea"
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
            />
            <button
              ref={controlEl}
              className="button is-small"
              type="button"
              onClick={() => handleSubmit(newComment)}
            >
              Add comment
            </button>
            <a className="has-text-info" onClick={handleSmileClick}>
              <FontAwesomeIcon icon={faSmile} />
            </a>
          </div>
          {showEmojiPicker && (
            <Picker
              style={{width: 'auto'}}
              onEmojiClick={handleEmojiPickerClick}
            />
          )}
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
  );
};

export default CommentsDropdown;
