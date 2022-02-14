import { ActionTypes } from './actionTypes';
export const setUsers = (data) => {
  return {
    type: ActionTypes.SET_USERS,
    payload: data,
  };
};
