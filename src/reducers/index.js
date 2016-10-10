import { handleActions } from 'redux-actions';
import * as constants from '../constants/actionConstants';
import moment from 'moment';

const initialState = {
  isLoggingIn: false,
  username: '',
  postsPerPage: 5,
  posts: [],
};

const handleLoginRequest = (state, { payload }) => ({
  ...state,
  ...{ isLoggingIn: true, username: payload.username },
});

const handleLoginSuccess = (state, { payload }) => ({
  ...state,
  ...{ isLoggingIn: false, posts: payload.posts },
});

const processLogout = state => initialState;

export default handleActions({
  [constants.LOGIN_REQUEST]: handleLoginRequest,
  [constants.LOGIN_SUCCESS]: handleLoginSuccess,
  [constants.PROCESS_LOGOUT]: processLogout,
}, initialState);

/** Selectors */

/**
 * Determines the current page selected, based on the URL and postsPerPage specified
 * @param state
 * @param start, optional URL query param
 */
export const getCurrentPage = (state, start) => (Number(start) / state.postsPerPage) + 1;

/**
 * Gets the array of posts that the Table component will render, based on the criteria specified
 * @param state
 * @param start
 * @returns {Array.<*>}
 */

export const getPostsSelector = (state, start) => {
  return state.posts
    .map(post => ({...post, ...{ createdAt: moment(post.createdAt).format('YYYY-MM-DD')}}))
    .slice(start, state.postsPerPage * getCurrentPage(state, start));
};

/**
 * Selector that provides an array of positive integers, whose length corresponds with the number of pages to display
 * i.e. [1, 2, 3] for 3 pages
 * @param state
 * @returns {Array.<*>}
 */
export const getPagesArraySelector = state => {
  let numberOfPages = Math.floor(state.posts.length / state.postsPerPage);
  if (state.posts.length % state.postsPerPage !== 0) {
    numberOfPages += 1;
  }
  // Slicing, since arrays are 0-based
  return [...Array(numberOfPages + 1).keys()].slice(1);
};
