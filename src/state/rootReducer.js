import {combineReducers} from 'redux';
import moviesReducer from './reducers/moviesReducer';
import userReducer from './reducers/userReducer';
import genresReducer from './reducers/genresReducer';
import pageReducer from './reducers/pageReducer';
import theatresReducer from './reducers/theatresReducer';
import showtimesReducer from './reducers/showtimesReducer';

const entitiesReducer = combineReducers({
  user: userReducer,
  movies: moviesReducer,
  showtimes: showtimesReducer,
  genres: genresReducer,
  theatres: theatresReducer
});

const rootReducer = combineReducers({
  entities: entitiesReducer,
  page: pageReducer
});

export default rootReducer;
