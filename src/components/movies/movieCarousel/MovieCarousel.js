import React from 'react';
import './MovieCarousel.css';
import MovieTile from '../movieTile/MovieTile';

function MovieCarousel({ movies, onSelectMovie }) {
  return (<div className="movie-carousel">
    {movies.map((movie) => <div className="movie-carousel__item" key={movie.id} onClick={() => onSelectMovie(movie)}>
      <MovieTile movie={movie} />
    </div>)}
  </div>);
}

export default MovieCarousel;
