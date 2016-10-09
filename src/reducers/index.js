import { handleActions } from 'redux-actions';
import * as constants from '../constants/actionConstants';

const initialState = {
  isUserLoggedIn: false,
  postsPerPage: 5,
  currentPage: 1,
  posts: [],
};

const handleLoginRequest = (state, action) => state;
const handleLoginSuccess = (state, action) => state;

export default handleActions({
  [constants.LOGIN_REQUEST]: handleLoginRequest,
  [constants.LOGIN_SUCCESS]: handleLoginSuccess,
}, initialState);
