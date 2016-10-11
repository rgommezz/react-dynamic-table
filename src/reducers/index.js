import { handleActions } from 'redux-actions';
import moment from 'moment';
import * as constants from '../constants/actionConstants';
import { getSortableModel } from '../utils/sorting';

/* We should avoid modeling state after server API. Consequently, this is not the best structure for our posts data,
   specially if it's going to feed different views or we have editing capabilities.
   A better architecture would be to use a map and index by IDs (as an in-memory database) but for app simplicity we'll stick to an array */

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

const changePostsPerPage = (state, { payload }) => ({
  ...state,
  ...{ postsPerPage: payload},
});

export default handleActions({
  [constants.LOGIN_REQUEST]: handleLoginRequest,
  [constants.LOGIN_SUCCESS]: handleLoginSuccess,
  [constants.PROCESS_LOGOUT]: processLogout,
  [constants.CHANGE_POSTS_PER_PAGE]: changePostsPerPage,
}, initialState);

/************ Selectors *****************/

/**
 * Determines the current page selected, based on the URL and postsPerPage specified
 * @param state
 * @param start, optional URL query param
 */
export const getCurrentPageSelector = (state, start) => (Number(start) / state.postsPerPage) + 1;

/**
 *  Gets the array of posts that the Table component will render, based on the URL query params specified
 * @param state
 * @param start pagination
 * @param q the query for filtering
 * @param sort the sort criteria applied
 * @returns {Array.<*>}
 */
export const getPostsSelector = (state, start, q, sort) => {
  const sortableModel = getSortableModel();
  let result = state.posts
    .map(post => ({...post, ...{ createdAt: moment(post.createdAt).format('YYYY-MM-DD')}})) // formatting dates
    .filter(post => post.username.indexOf(q) > -1); // filtering by username
  if (sort.by) {
    result = result.sort(sortableModel[sort.by](sort.by));
  }
  if (sort.order === 'desc') {
    result = result.reverse();
  }
  result = result.slice(start, state.postsPerPage * getCurrentPageSelector(state, start)); // pagination
  return result;
};

/**
 * Selector that provides an array of positive integers, whose length corresponds with the number of pages to display
 * i.e. [1, 2, 3] for 3 pages
 * @param state
 * @param q
 * @returns {Array.<*>}
 */
export const getPagesArraySelector = (state, q) => {
  let numberOfPages = Math.floor(state.posts.filter(post => post.username.indexOf(q) > -1).length / state.postsPerPage);
  if (state.posts.length % state.postsPerPage !== 0) {
    numberOfPages += 1;
  }
  // Slicing, since arrays are 0-based
  return [...Array(numberOfPages + 1).keys()].slice(1);
};

/**
 * Selector that extracts UI data from URL sort query param
 * @param sortQuery: string, format => '<column> <order>'
 * @returns {{by: string, order: string}}
 */
export const getSortInfoSelector = (sortQuery) => {
  const info = sortQuery.split(' ');
  return {
    by: info[0],
    order: info[1] || '',
  };
};
