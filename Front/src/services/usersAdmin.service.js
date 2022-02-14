import axios from 'axios';

// const serverURL = 'http://localhost:3002/user';
const serverURL = 'https://vacation-node-react.herokuapp.com/user';

export const getAllUsers = () => {
  return axios.get(serverURL);
};
export const createUser = (data) => {
  return axios.post(serverURL, data);
};
export const editUser = ({ id, field, value }) => {
  return axios.patch(`${serverURL}/${id}`, { [field]: value });
};
export const deleteUser = (userID) => {
  // console.log(data);
  return axios.delete(`${serverURL}/${userID}`);
};

// export const
// export const
