import {MOCK_RESPONSE} from './mockResponse';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function fetchMovies(location) {
  return Promise.resolve(MOCK_RESPONSE);
    // .then(checkStatus)
    // .then(response => response.json());
}

export default {
  fetchMovies,
};
