export const SELECT_MOVIE = 'SELECT_MOVIE';
export const REACT_TO_MOVIE = 'REACT_TO_MOVIE';

export function selectMovie(movie) {
  return { type: SELECT_MOVIE, payload: movie };
}

export function reactToMovie(movie, reaction) {
  return { type: REACT_TO_MOVIE, payload: { movie, reaction }};
}
