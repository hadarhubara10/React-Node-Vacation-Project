import { ActionTypes } from '../actions/actionTypes';

export const usersReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_USERS:
      return payload;
    default:
      return state;
  }
};
