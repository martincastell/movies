import React from 'react';
import './MovieCarousel.css';
import MovieTile from './MovieTile';

function MovieCarousel({ movies, onClickMovie }) {
  return (<div className="movie-carousel">
    {movies.map((movie) => <div className="movie-carousel__item" key={movie.id} onClick={() => onClickMovie(movie)}>
      <MovieTile movie={movie} />
    </div>)}
  </div>);
}

export default MovieCarousel;
