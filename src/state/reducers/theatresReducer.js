import {FETCH_MOVIES_SUCCESS} from '../../actions/page/pageActions';

function theatresReducer(state = {}, {type, payload}) {
  switch (type) {
    case FETCH_MOVIES_SUCCESS:
      return {...state, ...payload.entities.theatres};
    default:
      break;
  }
  return state;
}

export default theatresReducer;
