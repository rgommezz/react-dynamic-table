import { createAction } from 'redux-actions';
import * as constants from '../constants/actionConstants';
import { browserHistory } from 'react-router';
import mockParsedResponse from '../mocks/posts';

/** Normal action creators */
export const loginRequest = createAction(constants.LOGIN_REQUEST);
export const loginSuccess = createAction(constants.LOGIN_SUCCESS);
export const processLogout = createAction(constants.PROCESS_LOGOUT);
export const changePostsPerPage = createAction(constants.CHANGE_POSTS_PER_PAGE);
export const createNewPost = createAction(constants.CREATE_NEW_POST);

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
    // Simulating that after 1s, we are authenticated and the server has provided the initial data to pre-populate the table
    setTimeout(() => {
      let preloadedPosts;
      const persistedPosts = localStorage['ReactTabularApp:posts'];
      if (typeof persistedPosts !== 'undefined' && JSON.parse(persistedPosts).data.length > 0) {
        preloadedPosts = JSON.parse(persistedPosts).data;
      } else { // It's the first time we use the app
        preloadedPosts = mockParsedResponse.data.posts;
      }
      dispatch(loginSuccess({
        posts: preloadedPosts,
      }));
      // After initial posts has been saved to our redux store, we safely carry out redirection to '/posts'
      browserHistory.push('/posts');
    }, 1000);

  }
}
/**
 * Thunk action creator that restores some of the initial state and redirects to Login page
 * @returns {Function}
 */
export function handleLogout() {
  return function (dispatch) {
    // Cleaning up
    dispatch(processLogout());
    browserHistory.push('/login');
  }
}
