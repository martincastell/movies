import React from 'react';

function MovieScores({ scores }) {
  let result = false;
  if (scores && scores.length > 0) {
    result = <div className=" movie-scores">
      {scores.map(score => <div className="movie-scores__item movie-score" key={score.source}>
        <div className="movie-score__source">{score.source}</div>
        <div className="movie-score__score">{score.score}</div>
      </div>)}
    </div>;
  }

  return result;
}

export default MovieScores;
