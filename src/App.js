import React from 'react';
import './App.css';
import MovieCarousel from './components/MovieCarousel';
import MovieDetails from './components/MovieDetails';

function App ({state}) {
  const movies = state.page.results.map((movieId) => state.entities.movies[movieId]);
  const onClickMovie = (movie) => console.log('The user clicked on a movie, we need to do something here', movie);
  let selectedMovie = state.entities.movies[state.page.selected];

  return (
    <div className="App">
      Movies playing near {state.page.location}
      <MovieCarousel movies={movies} onClickMovie={onClickMovie} />
      <MovieDetails movie={selectedMovie} />
    </div>
  );
}

export default App;
