import {SELECT_MOVIE, SELECT_DATE, FETCH_MOVIES_SUCCESS} from '../../actions/page/pageActions';

const initialState = {
  isFetching: false,
  results: [ ],
  location: 'Foster City, CA',
  genre: 'All',
  selected: undefined,
  selectedDate: undefined
};

function pageReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SELECT_MOVIE:
      return {...state, selected: payload.id };
    case SELECT_DATE:
      console.log('SELECT_DATE', payload);
      return {...state, selectedDate: payload };
    case FETCH_MOVIES_SUCCESS:
      return {...state, results: payload.result };
    default:
      break;
  }
  return state;
}

export default pageReducer;
