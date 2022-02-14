import { ActionTypes } from './actionTypes';
export const setVacations = (data) => {
  return {
    type: ActionTypes.SET_VACATIONS,
    payload: data,
  };
};
