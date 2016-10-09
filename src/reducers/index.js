import { handleActions } from 'redux-actions';
import * as constants from '../constants/actionConstants';
import moment from 'moment';

const initialState = {
  isLoggingIn: false,
  username: '',
  postsPerPage: 5,
  currentPage: 1,
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

const changePage = (state, { payload }) => ({
  ...state,
  ...{ currentPage: payload.currentPage},
});

export default handleActions({
  [constants.LOGIN_REQUEST]: handleLoginRequest,
  [constants.LOGIN_SUCCESS]: handleLoginSuccess,
  [constants.PROCESS_LOGOUT]: processLogout,
  [constants.CHANGE_PAGE]: changePage,
}, initialState);

/** Selectors */

export const getPostsSelector = state =>
  state.posts
    .map(post => ({...post, ...{ createdAt: moment(post.createdAt).format('YYYY-MM-DD')}}))
    .slice(state.postsPerPage * (state.currentPage - 1), state.postsPerPage * state.currentPage);

/**
 * Selector that provides an array of positive integers, whose length corresponds with the number of pages to display
 * i.e. [1, 2, 3] for 3 pages
 * @param state
 * @returns {Array.<*>}
 */
export const getPagesArraySelector = state => {
  let numberOfPages = state.posts.length / state.postsPerPage;
  if (state.posts.length % state.postsPerPage !== 0) {
    numberOfPages += 1;
  }
  // Slicing, since arrays are 0-based
  return [...Array(numberOfPages + 1).keys()].slice(1);
};
