import React, {useState, useEffect} from 'react';
import Textarea from 'react-textarea-autosize';
import Picker from 'emoji-picker-react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSmile} from '@fortawesome/free-regular-svg-icons';
import {editComment, removeComment} from '../../../../utils/api';

const Comment = props => {
  const {comment, deletable, editable} = props;
  const [editMode, setEditMode] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [inputValue, setInputValue] = useState(comment.content);

  useEffect(() => {
    if (inputValue !== comment.content) {
      setInputValue(comment.content);
    }
  }, [props.comment.content]);

  const editModeToggle = () => {
    setEditMode(prevMode => !prevMode);
  };

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const handleSmileClick = () => {
    setShowEmojiPicker(isShown => !isShown);
  };

  const handleEmojiPickerClick = (_, emoji) => {
    setInputValue(comment => `${comment}${emoji.emoji}`);
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      editModeToggle();
      editComment(comment.card_id, comment.id, e.target.value, () =>
        setInputValue(comment.content)
      );
      setShowEmojiPicker(false);
    }
  };

  return (
    <>
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
        {editMode && (
          <>
            <Textarea
              value={inputValue}
              hidden={!editMode}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
            <a className="has-text-info" onClick={handleSmileClick}>
              <FontAwesomeIcon icon={faSmile} />
            </a>
          </>
        )}
        {deletable && (
          <div>
            <a onClick={() => removeComment(comment.card_id, comment.id)}>
              delete
            </a>
          </div>
        )}
      </div>
      {showEmojiPicker && (
        <Picker style={{width: 'auto'}} onEmojiClick={handleEmojiPickerClick} />
      )}
    </>
  );
};

export default Comment;
