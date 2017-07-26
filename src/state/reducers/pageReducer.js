import mockRoot from '../mockRoot';
import {SELECT_MOVIE, SELECT_DATE} from '../../actions/page/pageActions';

function pageReducer(state = mockRoot.page, { type, payload }) {
  switch (type) {
    case SELECT_MOVIE:
      return {...state, selected: payload.id };
    case SELECT_DATE:
      console.log('SELECT_DATE', payload);
      return {...state, selectedDate: payload };
    default:
      break;
  }
  return state;
}

export default pageReducer;
