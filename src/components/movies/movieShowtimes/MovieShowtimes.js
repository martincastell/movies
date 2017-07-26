import React from 'react';
import classNames from 'classnames';
import './MovieShowtimes.css';

function ShowtimeDates({movie, selectedDate, selectDate}) {
  return <div className="movie-showtimes__dates">
    {movie.showtimes.map((showtime) =>
      <div className={classNames('showtime-date', { 'is-selected': new Date(showtime.date).toLocaleDateString('en-US') === selectedDate })}
           key={showtime.date} onClick={() => selectDate(new Date(showtime.date).toLocaleDateString('en-US'))}>
        {showtime.date}
      </div>)}
  </div>;
}

function TheatreShowtimes({showtimes}) {
  return <div className="movie-showtimes__theatres">
    { showtimes.map(showtime => <div key={showtime.theatre.id + showtime.date}>
      {showtime.theatre.name}: {showtime.times.join(', ')}
    </div>) }
  </div>;
}

function MovieShowtimes({ movie, selectedDate, selectDate }) {
  const showtimes = movie.showtimes
    .filter((s) => new Date(s.date).toLocaleDateString('en-US') === selectedDate);

  console.log('movieShowtimes', movie.showtimes, selectedDate);

  return (<div className="movie-showtimes">
    <div className="movie-showtimes__header movie-showtimes-header">
      <div className="movie-showtimes-header__title display-1">Showtimes for {movie.title}</div>
      <div className="movie-showtimes-header__sub-title caption">All times are in PT</div>
    </div>
    <ShowtimeDates movie={movie} selectedDate={selectedDate} selectDate={selectDate} />
    <TheatreShowtimes showtimes={showtimes} />
  </div>);
}

export default MovieShowtimes;
