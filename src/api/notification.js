import { instance } from "./helpers/instance";

export const fetchGetNotifications = async () => {
  const { data } = await instance('notifications');
  return data;
};

export const fetchDeleteNotifications = async () => {
  const { data } = await instance.delete('notifications');
  return data;
};