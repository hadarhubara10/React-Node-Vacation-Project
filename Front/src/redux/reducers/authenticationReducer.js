import { ActionTypes } from '../actions/actionTypes';
import { combineReducers } from 'redux';
import { vacationReducer } from './vacatuinReducer';
import { usersReducer } from './usersReducer';

export const authenticationReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_TOKEN:
      return { ...state, token: payload };
    default:
      return state;
  }
};
export const userDataReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_USER:
      return payload;
    default:
      return state;
  }
};
const reducers = combineReducers({
  authentication: authenticationReducer,
  userData: userDataReducer,
  vacations: vacationReducer,
  users: usersReducer,
});

export default reducers;
