import { schema } from 'normalizr';

export const theatre = new schema.Entity('theatres');
export const movieShowTimes = new schema.Entity('showtimes', {
  theatre: theatre,
}, {
  idAttribute: value => {
    const queryStringStart = value.ticketURI.indexOf('?') + 1;
    const queryString = value.ticketURI.substr(queryStringStart);
    const timeStart = value.dateTime.indexOf('T');
    const time = value.dateTime.substr(timeStart);
    return queryString + time;
  }
});
export const movie = new schema.Entity('movies', {
  showtimes: new schema.Array(movieShowTimes),
}, { idAttribute: 'tmsId'});

export const movieList = new schema.Array(movie);
