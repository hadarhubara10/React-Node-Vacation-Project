import axios from 'axios';
const serverURL = 'https://vacation-node-react.herokuapp.com/';
// const serverURL = 'http://localhost:3002/';

export const getVacations = () => {
  return axios.get(`${serverURL}vacations`);
};
export const followVacations = (vacationId, userID) => {
  return axios.patch(`${serverURL}vacations/onFollow/${vacationId}`, {
    userID,
  });
};
export const removeFollowVacation = (vacationId, userID) => {
  return axios.patch(`${serverURL}vacations/removeFollow/${vacationId}`, {
    userID,
  });
};
