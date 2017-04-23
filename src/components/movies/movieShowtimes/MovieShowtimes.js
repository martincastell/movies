import React from 'react';
import './MovieShowtimes.css';

function MovieShowtimes({ movie }) {
  const showtimes = movie.showtimes;
  return (<div className="movie-showtimes">
    <div className="movie-showtimes-header">
      <div className="movie-showtimes-header__title display-1">Showtimes for {movie.title}</div>
      <div className="movie-showtimes-header__sub-title caption">All times are in PT</div>
    </div>
  </div>);
}

export default MovieShowtimes;
