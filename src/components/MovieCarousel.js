import React from 'react';

function MovieCarousel({ movies, onClickMovie }) {
  return (<div className="movie-carousel">
    {movies.map((movie) => <div className="movie" key={movie.id} onClick={() => onClickMovie(movie)}>{movie.title}</div>)}
  </div>);
}

export default MovieCarousel;
