import { createAction } from 'redux-actions';
import * as constants from '../constants/actionConstants';
import { browserHistory } from 'react-router';
import mockParsedResponse from '../mocks/posts';

/** Normal action creators */
export const loginRequest = createAction(constants.LOGIN_REQUEST);
export const loginSuccess = createAction(constants.LOGIN_SUCCESS);
export const processLogout = createAction(constants.PROCESS_LOGOUT);

/**
 * Thunk action creator that simulates an async login
 * @param username
 * @returns {Function}
 */
export function handleLogin(username) {
  return function (dispatch) {
    // First action dispatched to change the state of the Login button and stash the username
    dispatch(loginRequest({
      username,
    }));
    // After 1s, We are authenticated and the server has provided the initial data to pre-populate the table
    setTimeout(() => {
      dispatch(loginSuccess({
        posts: mockParsedResponse.data.posts,
      }));
      // After initial posts has been saved in our redux store, we safely carry out redirection to '/posts'
      browserHistory.push('/posts');
    }, 1000);

  }
}
/**
 * Thunk action creator that restores initialState and redirects to Login page
 * @returns {Function}
 */
export function handleLogout() {
  return function (dispatch) {
    // Cleaning up
    dispatch(processLogout());
    browserHistory.push('/login');
  }
}
