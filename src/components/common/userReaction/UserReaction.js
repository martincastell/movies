import React from 'react';
import './UserReaction.css';

function UserReaction({ reaction, onReaction }) {

  const onReactionClick = (clickedReaction) => {
    let toggleReactionOff = reaction === clickedReaction;
    onReaction(toggleReactionOff ? undefined : clickedReaction);
  };

  return (<div className="user-reaction">
    <div className={`user-reaction__option -like ${reaction === 'like' ? 'is-selected' : ''}`}
         onClick={() => onReactionClick('like')}>
      <i className="fa fa-thumbs-up user-reaction__option__icon" aria-hidden="true" />
      <span>Like</span>
    </div>
    <div className={`user-reaction__option -dislike ${reaction === 'dislike' ? 'is-selected' : ''}`}
         onClick={() => onReactionClick('dislike')}>
      <i className="fa fa-thumbs-down user-reaction__option__icon" aria-hidden="true" />
      <span>Dislike</span>
    </div>
  </div>);
}

export default UserReaction;
