import { instance } from "./helpers/instance";

export const fetchGetNotifications = async () => {
  const { data } = await instance('notifications');
  console.log(data);
  return data;
};

export const fetchDeleteNotifications = async () => {
  const { data } = await instance.delete('notifications');
  return data;
};