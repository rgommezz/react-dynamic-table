import { handleActions } from 'redux-actions';
import * as constants from '../constants/actionConstants';

const initialState = {
  isLoggingIn: false,
  username: '',
};

const handleLoginRequest = (state, { payload }) => ({
  isLoggingIn: true,
  username: payload.username,
});

const handleLoginSuccess = (state, { payload }) => ({
  ...state,
  ...{ isLoggingIn: false },
});

const processLogout = state => initialState;

export default handleActions({
  [constants.LOGIN_REQUEST]: handleLoginRequest,
  [constants.LOGIN_SUCCESS]: handleLoginSuccess,
  [constants.PROCESS_LOGOUT]: processLogout,
}, initialState);
