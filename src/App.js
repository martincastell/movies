import React from 'react';
import {connect} from 'react-redux';
import './App.css';
import './components/typography.css';
import MovieCarousel from './components/movies/movieCarousel/MovieCarousel';
import MovieDetails from './components/movies/movieDetails/MovieDetails';
import {reactToMovie} from './actions/movies/movieActions';
import MovieShowtimes from './components/movies/movieShowtimes/MovieShowtimes';
import {fetchMovies, selectDate, selectMovie} from './actions/page/pageActions';

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
  let normalizedSelectedMovie = state.entities.movies[state.page.selected];
  let selectedDate = state.page.selectedDate || new Date().toLocaleDateString('en-US');
  let selectedMovie;
  if (normalizedSelectedMovie) {
    const selectedMovieShowtimes = normalizedSelectedMovie.showtimes.map((s) => ({
      ...s,
      theatre: state.entities.theatres[s.theatre],
    }));
    selectedMovie = { ...normalizedSelectedMovie, showtimes: selectedMovieShowtimes }
  }

  return {
    location: state.page.location,
    movies: state.page.results.map((movieId) => {
      const movie = state.entities.movies[movieId];
      return {
        ...movie,
        id: movie.tmsId,
        poster: `http://ondemo.tmsimg.com/${movie.preferredImage.uri}`,
      }
    }),
    selectedMovie,
    selectedDate,
    selectedMovieReaction: state.entities.user.movieReactions[state.page.selected]
  };
}

const mapDispatchToProps = {
  selectMovie,
  selectDate,
  reactToMovie,
  fetchMovies,
};
//
// function App ({location, movies, selectedMovie, selectedDate, selectedMovieReaction,
//                 selectDate, selectMovie, reactToMovie}) {
//   return (
//     <div className="app">
//       <div className="app__header">
//         Movies playing near {location}
//       </div>
//       <div className="app__movies">
//         <MovieCarousel movies={movies} onSelectMovie={selectMovie} />
//       </div>
//       <div className="app__selected-movie">
//         <div className="app__selected-movie__showtimes">
//           <MovieShowtimes movie={selectedMovie} selectedDate={selectedDate} selectDate={selectDate}/>
//         </div>
//         <div className="app__selected-movie__details">
//           <MovieDetails movie={selectedMovie} reaction={selectedMovieReaction} onMovieReaction={reactToMovie} />
//         </div>
//       </div>
//     </div>
//   );
// }

class App extends React.Component {
  componentDidMount() {
    this.props.fetchMovies();
  }

  render() {
    const {location, movies, selectedMovie, selectedDate, selectedMovieReaction,
      selectDate, selectMovie, reactToMovie} = this.props;
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
            {selectedMovie ? <MovieShowtimes movie={selectedMovie} selectedDate={selectedDate} selectDate={selectDate}/> : null}
          </div>
          <div className="app__selected-movie__details">
            {selectedMovie ? <MovieDetails movie={selectedMovie} reaction={selectedMovieReaction} onMovieReaction={reactToMovie} /> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
