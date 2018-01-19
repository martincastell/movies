import {normalize} from 'normalizr';
import movieService from '../../services/movieService';
import {movieList} from '../../state/schema';

export const SELECT_MOVIE = 'SELECT_MOVIE';
export const SELECT_DATE = 'SELECT_DATE';

export const FETCH_MOVIES = 'FETCH_MOVIES';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_ERROR = 'FETCH_MOVIES_ERROR';

export function selectMovie(movie) {
  return { type: SELECT_MOVIE, payload: movie };
}

export function selectDate(date) {
  return { type: SELECT_DATE, payload: date };
}

export function fetchMovies(location) {
  return (dispatch) => {
    dispatch({ type: FETCH_MOVIES });
    movieService.fetchMovies(location)
      .then((response) => dispatch({ type: FETCH_MOVIES_SUCCESS, payload: normalize(response, movieList) }))
      // .catch((error) => dispatch({ type: FETCH_MOVIES_ERROR, payload: error }));
  };
}
