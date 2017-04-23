import mockRoot from '../mockRoot';
import {SELECT_MOVIE} from '../../actions/movies/movieActions';

function pageReducer(state = mockRoot.page, { type, payload }) {
  switch (type) {
    case SELECT_MOVIE:
      return {...state, selected: payload.id };
    default:
      break;
  }
  return state;
}

export default pageReducer;
