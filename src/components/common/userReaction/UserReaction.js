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
      <i className="fa fa-thumbs-up" aria-hidden="true" />
      Like
    </div>
    <div className={`user-reaction__option -dislike ${reaction === 'dislike' ? 'is-selected' : ''}`}
         onClick={() => onReactionClick('dislike')}>
      <i className="fa fa-thumbs-down" aria-hidden="true" />
      Dislike
    </div>
  </div>);
}

export default UserReaction;
