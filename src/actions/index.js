import { createAction } from 'redux-actions';
import * as constants from '../constants/actionConstants';

export const loginRequest = createAction(constants.LOGIN_REQUEST);
export const loginSuccess = createAction(constants.LOGIN_SUCCESS);
