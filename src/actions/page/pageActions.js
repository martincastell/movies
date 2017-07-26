export const SELECT_MOVIE = 'SELECT_MOVIE';
export const SELECT_DATE = 'SELECT_DATE';

export function selectMovie(movie) {
  return { type: SELECT_MOVIE, payload: movie };
}

export function selectDate(date) {
  return { type: SELECT_DATE, payload: date };
}
