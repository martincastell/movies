import React from 'react';
import './MovieCarousel.css';
import MovieTile from './MovieTile';

function MovieCarousel({ movies, onClickMovie }) {
  return (<div className="movie-carousel">
    {movies.map((movie) => <div className="movie-carousel__item" key={movie.id}>
      <MovieTile movie={movie} onClick={() => onClickMovie(movie)} />
    </div>)}
  </div>);
}

export default MovieCarousel;
