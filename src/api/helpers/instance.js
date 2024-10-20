import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://twitter-backend-xp2w.onrender.com',
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
  withCredentials: true,
});