import {combineReducers} from 'redux';
import moviesReducer from './reducers/moviesReducer';
import userReducer from './reducers/userReducer';
import genresReducer from './reducers/genresReducer';
import pageReducer from './reducers/pageReducer';

const entitiesReducer = combineReducers({
  user: userReducer,
  movies: moviesReducer,
  genres: genresReducer
});

const rootReducer = combineReducers({
  entities: entitiesReducer,
  page: pageReducer
});

export default rootReducer;
