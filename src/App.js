import React from 'react';
import {connect} from 'react-redux';
import './App.css';
import MovieCarousel from './components/movies/movieCarousel/MovieCarousel';
import MovieDetails from './components/movies/movieDetails/MovieDetails';

function mapStateToProps(state) {
  return {
    location: state.page.location,
    movies: state.page.results.map((movieId) => state.entities.movies[movieId]),
    selectedMovie: state.entities.movies[state.page.selected],
    selectedMovieReaction: state.entities.user.movieReactions[state.page.selected]
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

function App ({location, movies, selectedMovie, selectedMovieReaction}) {
  const onClickMovie = (movie) => console.log('The user clicked on a movie, we need to do something here', movie);
  return (
    <div className="App">
      Movies playing near {location}
      <MovieCarousel movies={movies} onClickMovie={onClickMovie} />
      <MovieDetails movie={selectedMovie} reaction={selectedMovieReaction} />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
