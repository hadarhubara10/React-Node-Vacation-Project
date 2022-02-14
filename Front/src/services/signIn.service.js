import axios from 'axios';

const serverURL = 'https://vacation-node-react.herokuapp.com/user/';
// const serverURL = 'http://localhost:3002/user/';
export const signInGetToken = (email, password) => {
  return axios.post(`${serverURL}signin`, { email, password });
};
export const checkToken = (token) => {
  return axios.post(`${serverURL}checkToken`, null, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};
export const signupService = (firstName, lastName, email, password) => {
  return axios.post(`${serverURL}signUp`, {
    firstName,
    lastName,
    email,
    password,
  });
};

export const checkGoogleToken = (token) => {
  return axios.get(`${serverURL}verifyTokenGoogle`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};
