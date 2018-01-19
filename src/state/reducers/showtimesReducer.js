import {FETCH_MOVIES_SUCCESS} from '../../actions/page/pageActions';

function showtimesReducer(state = {}, {type, payload}) {
  switch (type) {
    case FETCH_MOVIES_SUCCESS:
      return {...state, ...payload.entities.showtimes};
    default:
      break;
  }
  return state;
}

export default showtimesReducer;
