import React from 'react';
import {connect} from 'react-redux';
import './App.css';
import './components/typography.css';
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
    <div className="app">
      <div className="app__header">
        Movies playing near {location}
      </div>
      <div className="app__movies">
        <MovieCarousel movies={movies} onSelectMovie={selectMovie} />
      </div>
      <div className="app__selected-movie">
        <div className="app__selected-movie__showtimes">
          <MovieShowtimes movie={selectedMovie} />
        </div>
        <div className="app__selected-movie__details">
          <MovieDetails movie={selectedMovie} reaction={selectedMovieReaction} onMovieReaction={reactToMovie} />
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
