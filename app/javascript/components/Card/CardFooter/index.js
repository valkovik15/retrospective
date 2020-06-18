import React, {useState} from 'react';
import Likes from '../Likes';
import CommentsDropdown from '../CommentsDropdown';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCommentAlt} from '@fortawesome/free-regular-svg-icons';
import './CardFooter.css';

const CardFooter = props => {
  const [showComments, setShowComments] = useState(false);

  const {
    author,
    avatar,
    id,
    likes,
    type,
    comments
  } = props;

  return (
    <div>
      <hr style={{margin: '0.5rem'}} />
      <div className="columns is-multiline">
        <div className="column is-one-quarter">
          <Likes id={id} likes={likes} type={type} />
        </div>
        <div className="column is-one-quarter">
          <a
            className="has-text-info"
            onClick={() => setShowComments(prev => !prev)}
          >
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
    </div>
  );
};

export default CardFooter;
