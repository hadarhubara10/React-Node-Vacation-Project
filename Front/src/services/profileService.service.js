import axios from 'axios';
const serverURL = 'https://vacation-node-react.herokuapp.com/user';
// const serverURL = 'http://localhost:3002/user';
export const changeProfileNames = ({ firstName, lastName }, _id) => {
  return axios.post(`${serverURL}/${_id}/changeName`, { firstName, lastName });
};
