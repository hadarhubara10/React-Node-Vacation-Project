import axios from 'axios';
import { getVacations } from './vacations.service';
// const serverURL = 'http://localhost:3002/vacations';
const serverURL = 'https://vacation-node-react.herokuapp.com/vacations';

export const getAllVacations = getVacations;
export const createVacation = (data) => {
  // console.log(data);
  return axios.post(serverURL, data);
};
export const editVacations = ({ id, field, value }) => {
  // console.log({ id, field, value });
  return axios.patch(`${serverURL}/${id}`, { [field]: value });
};
export const deleteVacations = (vacationID) => {
  return axios.delete(`${serverURL}/${vacationID}`);
};
// export const
// export const
