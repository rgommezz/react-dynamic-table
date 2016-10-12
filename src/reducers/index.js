import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import posts, * as fromPosts from './posts';
import user from './user';

export default combineReducers({
  posts,
  user,
  form: formReducer,
});

/** Selectors */

export const currentPageSelector = (state, start) => 
  fromPosts.currentPageSelector(state.posts, start);

export const postsSelector = (state, start, q, sort) =>
  fromPosts.postsSelector(state.posts, start, q, sort);

export const pagesArraySelector = (state, q) =>
  fromPosts.pagesArraySelector(state.posts, q);

/**
 * Selector that extracts UI data from URL sort query param
 * @param sortQuery: string, format => '<column> <order>'
 * @returns {{by: string, order: string}}
 */
export const sortInfoSelector = (sortQuery) => {
  const info = sortQuery.split(' ');
  return {
    by: info[0],
    order: info[1] || '',
  };
};
