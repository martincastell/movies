import React from 'react';
import './App.css';
import MovieCarousel from './components/MovieCarousel';

function App ({state}) {
  const movies = state.page.results.map((movieId) => state.entities.movies[movieId]);
  const onClickMovie = (movie) => console.log('The user clicked on a movie, we need to do something here', movie);

  return (
    <div className="App">
      Movies playing near {state.page.location}
      <MovieCarousel movies={movies} onClickMovie={onClickMovie} />
    </div>
  );
}

export default App;
