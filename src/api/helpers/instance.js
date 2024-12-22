import axios from 'axios';

// http://localhost:5000/api
// https://twitter-backend-32hl.onrender.com/api

export const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
  withCredentials: true,
});