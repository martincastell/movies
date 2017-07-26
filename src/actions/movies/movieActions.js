export const REACT_TO_MOVIE = 'REACT_TO_MOVIE';

export function reactToMovie(movie, reaction) {
  return { type: REACT_TO_MOVIE, payload: { movie, reaction }};
}
