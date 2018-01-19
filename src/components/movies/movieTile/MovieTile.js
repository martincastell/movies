import React from 'react';
import './MovieTile.css';

function MovieTile({ movie }) {
  const genres = movie.genres ? movie.genres.join(' / ') : '';

  return (<div className="movie-tile">
    <div className="movie-tile__poster">
      <img src={movie.poster} alt={movie.title} />
    </div>
    <div className="movie-tile__title" title={movie.title}>{movie.title}</div>
    <div className="movie-tile__genres caption" title={genres}>{genres}</div>
  </div>);
}

export default MovieTile;
