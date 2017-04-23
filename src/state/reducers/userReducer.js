import mockRoot from '../mockRoot';
import {REACT_TO_MOVIE} from '../../actions/movies/movieActions';

function userReducer(state = mockRoot.entities.user, { type, payload }) {
  switch (type) {
    case REACT_TO_MOVIE:
      let { movie, reaction } = payload;
      let movieReactions = { ...state.movieReactions, [movie.id]: reaction };
      return { ...state, movieReactions: movieReactions };
    default:
      break;
  }

  return state;
}

export default userReducer;
