import axios from 'axios';

const api = axios.create({
  baseURL: 'https://main-server-nest.herokuapp.com/',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
});

export default api;
