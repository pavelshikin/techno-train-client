import axios from 'axios';

const api = axios.create({
  baseURL: process.env.apiUrl,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
});

export default api;
