import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://twitter-clone-server-3x70yfe98-levchenkodmytros-projects.vercel.app/api',
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
  withCredentials: true,
});