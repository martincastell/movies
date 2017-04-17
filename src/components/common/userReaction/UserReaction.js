import React from 'react';
import './UserReaction.css';

function UserReaction({ reaction }) {
  return (<div className="user-reaction">
    <div className={`user-reaction__option -like ${reaction === 'like' ? 'is-selected' : ''}`}>
      <i className="fa fa-thumbs-up" aria-hidden="true" />
      Like
    </div>
    <div className={`user-reaction__option -dislike ${reaction === 'dislike' ? 'is-selected' : ''}`}>
      <i className="fa fa-thumbs-down" aria-hidden="true" />
      Dislike
    </div>
  </div>);
}

export default UserReaction;
