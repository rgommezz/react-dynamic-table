import { handleActions } from 'redux-actions';
import moment from 'moment';
import * as constants from '../constants/actionConstants';
import { getSortableModel } from '../utils/sorting';

/* We should avoid modeling state after server API. Consequently, this is not the best structure for our posts data,
 specially if it's going to feed different views or we have editing capabilities.
 A better architecture would be to use a map and index by IDs (as an in-memory database) but for app simplicity we'll stick to an array */

const initialState = {
  itemsPerPage: 5,
  data: [],
};

const handleLoginSuccess = (state, { payload }) => ({
  ...state,
  ...{ data: payload.posts },
});

const processLogout = state => ({
  ...state,
  ...{ itemsPerPage: 5 },
});

const changePostsPerPage = (state, { payload }) => ({
  ...state,
  ...{ itemsPerPage: payload },
});

const createNewPost = (state, { payload }) => ({
  ...state,
  ...{ data: [ payload, ...state.data ]},
});

export default handleActions({
  [constants.LOGIN_SUCCESS]: handleLoginSuccess,
  [constants.PROCESS_LOGOUT]: processLogout,
  [constants.CHANGE_POSTS_PER_PAGE]: changePostsPerPage,
  [constants.CREATE_NEW_POST]: createNewPost,
}, initialState);

/** Selectors */

/**
 * Determines the current page selected, based on the URL and itemsPerPage specified
 * @param state
 * @param start, optional URL query param
 */
export const currentPageSelector = (state, start) => (Number(start) / state.itemsPerPage) + 1;

/**
 *  Gets the array of posts that the Table component will render, based on the URL query params specified
 * @param state
 * @param start pagination
 * @param q the query for filtering
 * @param sort the sort criteria applied
 * @returns {Array.<*>}
 */
export const postsSelector = (state, start, q, sort) => {
  const sortableModel = getSortableModel();
  let result = state.data
    .map(post => ({...post, ...{ createdAt: moment(post.createdAt).format('YYYY-MM-DD')}})) // formatting dates
    .filter(post => post.username.indexOf(q) > -1); // filtering by username
  if (sort.by) {
    result = result.sort(sortableModel[sort.by](sort.by));
  }
  if (sort.order === 'desc') {
    result = result.reverse();
  }
  result = result.slice(start, state.itemsPerPage * currentPageSelector(state, start)); // pagination
  return result;
};

/**
 * Selector that provides an array of positive integers, whose length corresponds with the number of pages to display
 * i.e. [1, 2, 3] for 3 pages
 * @param state
 * @param q
 * @returns {Array.<*>}
 */
export const pagesArraySelector = (state, q) => {
  const filteredData = state.data.filter(post => post.username.indexOf(q) > -1);
  let numberOfPages = Math.floor(filteredData.length / state.itemsPerPage);
  if (filteredData.length % state.itemsPerPage !== 0) {
    numberOfPages += 1;
  }
  // Slicing, since arrays are 0-based
  return [...Array(numberOfPages + 1).keys()].slice(1);
};
