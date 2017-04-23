import React from 'react';
import {connect} from 'react-redux';
import './App.css';
import MovieCarousel from './components/movies/movieCarousel/MovieCarousel';
import MovieDetails from './components/movies/movieDetails/MovieDetails';
import {reactToMovie, selectMovie} from './actions/movies/movieActions';
import MovieShowtimes from './components/movies/movieShowtimes/MovieShowtimes';

function mapStateToProps(state) {
  return {
    location: state.page.location,
    movies: state.page.results.map((movieId) => state.entities.movies[movieId]),
    selectedMovie: state.entities.movies[state.page.selected],
    selectedMovieReaction: state.entities.user.movieReactions[state.page.selected]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectMovie: (movie) => dispatch(selectMovie(movie)),
    reactToMovie: (movie, reaction) => dispatch(reactToMovie(movie, reaction))
  };
}

function App ({location, movies, selectedMovie, selectedMovieReaction, selectMovie, reactToMovie}) {
  return (
    <div className="App">
      Movies playing near {location}
      <MovieCarousel movies={movies} onSelectMovie={selectMovie} />
      <div className="selected-movie">
        <MovieShowtimes movie={selectedMovie} />
        <MovieDetails movie={selectedMovie} reaction={selectedMovieReaction} onMovieReaction={reactToMovie} />
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
