import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://twitter-backend-32hl.onrender.com/api',
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
  withCredentials: true,
});