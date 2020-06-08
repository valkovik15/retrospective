import React, {useState} from 'react';
import Likes from '../Likes';
import CommentsDropdown from '../CommentsDropdown';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCommentAlt} from '@fortawesome/free-regular-svg-icons';
import './CardFooter.css';

const CardFooter = props => {
  const [showComments, setShowComments] = useState(false);
  const handleClick = () => {
    fetch(`/api${window.location.pathname}/cards/${props.id}`, {
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
          props.hideCard();
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

  const toggleDropdown = () => {
    setShowComments(!showComments);
  };

  const {author, deletable, avatar, id, likes, type, comments} = props;
  const confirmMessage = 'Are you sure you want to delete this card?';

  return (
    <div>
      <hr style={{margin: '0.5rem'}} />
      <div className="columns is-multiline">
        <div className="column is-one-quarter">
          <Likes id={id} likes={likes} type={type} />
        </div>
        <div className="column is-one-quarter">
          <a className="has-text-info" onClick={toggleDropdown}>
            <FontAwesomeIcon fixedWidth icon={faCommentAlt} />
          </a>
          <span>{comments.length}</span>
        </div>
        <div className="column is-half">
          <img src={avatar} className="avatar" />
          <span> by {author}</span>
        </div>
        <CommentsDropdown visible={showComments} id={id} comments={comments} />
      </div>
      <div>
        <a
          hidden={!deletable && showComments}
          onClick={() => window.confirm(confirmMessage) && handleClick()}
        >
          delete
        </a>
      </div>
    </div>
  );
};

export default CardFooter;
