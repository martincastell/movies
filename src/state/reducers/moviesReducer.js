import {FETCH_MOVIES_SUCCESS} from '../../actions/page/pageActions';

function moviesReducer(state = {}, {type, payload}) {
  switch (type) {
    case FETCH_MOVIES_SUCCESS:
      return {...state, ...payload.entities.movies};
    default:
      break;
  }
  return state;
}

export default moviesReducer;
