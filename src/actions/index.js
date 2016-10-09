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
    // First dispatch to change the state to the Login button
    dispatch(loginRequest({
      username,
    }));
    // After 1s, Login goes through
    setTimeout(() => {
      dispatch(loginSuccess({
        posts: mockParsedResponse.data.posts,
      }));
      // After successful initial data preload, we redirect to '/posts'
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
