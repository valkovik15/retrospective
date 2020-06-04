import React, {useRef, useState, useContext} from 'react';
import Picker from 'emoji-picker-react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSmile} from '@fortawesome/free-regular-svg-icons';
import UserContext from '../../../utils/user_context';
import Comment from './Comment';
import {createComment} from '../../../utils/api';

const CommentsDropdown = props => {
  const controlEl = useRef(null);
  const {visible, id, comments} = props;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const user = useContext(UserContext);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = commentContent => {
    controlEl.current.disabled = true;
    createComment(id, commentContent, () => setNewComment(''));
    controlEl.current.disabled = false;
    setShowEmojiPicker(false);
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
          {comments.map(item => (
            <Comment
              key={item.id}
              comment={item}
              deletable={user === item.author.email}
              editable={user === item.author.email}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentsDropdown;
