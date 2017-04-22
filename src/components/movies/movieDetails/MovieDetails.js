import React from 'react';
import classNames from 'classnames';
import './MovieDetails.css';
import UserReaction from '../../common/userReaction/UserReaction';
import MovieScores from '../movieScores/movieScores';

function MovieDetails({ movie, reaction, onMovieReaction }) {
  const hideScores = !movie.scores || movie.scores.length === 0;
  const hideTrailer = !movie.trailer;

  return (<div className="movie-details">
    <div className="movie-details__section movie-details-header">
      <div className="movie-details-header__title">{movie.title}</div>
      <div className="movie-details-header__sub-title">{movie.rating} {movie.genres.join(' / ')}</div>
    </div>

    <div className={classNames('movie-details__section', { 'is-hidden':  hideTrailer })}>
      <a href={movie.trailer} target="_blank">Play trailer</a>
    </div>

    <div className="movie-details__section">
      <UserReaction reaction={reaction} onReaction={(reaction) => onMovieReaction(movie, reaction)} />
    </div>

    <div className={classNames('movie-details__section', { 'is-hidden':  hideScores })}>
      <MovieScores scores={movie.scores} />
    </div>
  </div>);
}

export default MovieDetails;
