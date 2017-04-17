import React from 'react';
import './App.css';
import MovieCarousel from './components/movies/movieCarousel/MovieCarousel';
import MovieDetails from './components/movies/movieDetails/MovieDetails';

function App ({state}) {
  const movies = state.page.results.map((movieId) => state.entities.movies[movieId]);
  const onClickMovie = (movie) => console.log('The user clicked on a movie, we need to do something here', movie);
  let selectedMovie = state.entities.movies[state.page.selected];
  let selectedMovieReaction = state.entities.user.movieReactions[state.page.selected];

  return (
    <div className="App">
      Movies playing near {state.page.location}
      <MovieCarousel movies={movies} onClickMovie={onClickMovie} />
      <MovieDetails movie={selectedMovie} reaction={selectedMovieReaction} />
    </div>
  );
}

export default App;
