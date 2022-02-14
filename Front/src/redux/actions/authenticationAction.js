import { ActionTypes } from './actionTypes';
export const setUser = (data) => {
  return {
    type: ActionTypes.SET_USER,
    payload: data,
  };
};
// export const setToken = (token) => {
//   return {
//     type: ActionTypes.SET_TOKEN,
//     payload: token,
//   };
// };
