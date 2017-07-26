import React from 'react';
import {connect} from 'react-redux';
import './App.css';
import './components/typography.css';
import MovieCarousel from './components/movies/movieCarousel/MovieCarousel';
import MovieDetails from './components/movies/movieDetails/MovieDetails';
import {reactToMovie, selectMovie} from './actions/movies/movieActions';
import MovieShowtimes from './components/movies/movieShowtimes/MovieShowtimes';
import {selectDate} from './actions/page/pageActions';

// [
//  {
//    theatre: { id, name },
//    showtimes: [ 1231323123, 1312321323, 1321321313, 123123123 ]
//  }
// ]


// if (selectedMovie) {
//   let showtimes = [];
//   if (selectedMovie.showtimes && selectedMovie.showtimes.length > 0) {
//     const groupedShowtimes = selectedMovie.showtimes
//       .filter((showtime) => new Date(showtime.dateTime).toLocaleDateString('en-US') === state.page.selectedDate)
//       .reduce((showtimesByTheatre, showtime) => {
//         if (showtimesByTheatre.hasOwnProperty(showtime.theatre)) {
//           showtimesByTheatre[showtime.theatre] = [...showtimesByTheatre[showtime.theatre], showtime.dateTime];
//         } else {
//           showtimesByTheatre[showtime.theatre] = [showtime.dateTime];
//         }
//
//         return showtimesByTheatre;
//       }, {});
//
//     showtimes = Object.keys(groupedShowtimes)
//       .map((theatreId) => ({ theatre: state.entities.theatres[theatreId], dateTimes: groupedShowtimes[theatreId] }));
//   }
//   selectedMovie = { ...selectedMovie, showtimes };
// }

function mapStateToProps(state) {
  let selectedMovie = state.entities.movies[state.page.selected];
  let selectedDate = state.page.selectedDate;
  let selectedMovieShowtimes;
  if (selectedMovie) {
    selectedMovieShowtimes = selectedMovie.showtimes.map((s) => ({
      ...s,
      theatre: state.entities.theatres[s.theatre],
    }));
  }

  return {
    location: state.page.location,
    movies: state.page.results.map((movieId) => state.entities.movies[movieId]),
    selectedMovie: { ...selectedMovie, showtimes: selectedMovieShowtimes },
    selectedDate,
    selectedMovieReaction: state.entities.user.movieReactions[state.page.selected]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectMovie: (movie) => dispatch(selectMovie(movie)),
    selectDate: (date) => dispatch(selectDate(date)),
    reactToMovie: (movie, reaction) => dispatch(reactToMovie(movie, reaction))
  };
}

function App ({location, movies, selectedMovie, selectedDate, selectedMovieReaction,
                selectDate, selectMovie, reactToMovie}) {
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
          <MovieShowtimes movie={selectedMovie} selectedDate={selectedDate} selectDate={selectDate}/>
        </div>
        <div className="app__selected-movie__details">
          <MovieDetails movie={selectedMovie} reaction={selectedMovieReaction} onMovieReaction={reactToMovie} />
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
