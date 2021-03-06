import React from 'react';
import Likes from '../Likes';

class CardFooter extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    fetch(`/api/${window.location.pathname}/cards/${this.props.id}`, {
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
        if (result.status == 204) {
          this.props.hideCard();
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

  render() {
    const {author, deletable, avatar, id, likes, type} = this.props;
    const confirmMessage = 'Are you sure you want to delete this card?';

    return (
      <div>
        <hr style={{margin: '0.5rem'}} />
        <div className="columns">
          <div className="column">
            <Likes id={id} likes={likes} type={type} />
          </div>
          <div className="column">
            <img src={avatar} className="avatar" />
            <span> by {author}</span>
          </div>
        </div>
        <div>
          <a
            hidden={!deletable}
            onClick={() => {
              window.confirm(confirmMessage) && this.handleClick();
            }}
          >
            delete
          </a>
        </div>
      </div>
    );
  }
}

export default CardFooter;
