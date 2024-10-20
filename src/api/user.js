import { instance } from "./helpers/instance";

export const fetchSuggestedUsers = async () => {
  const { data } = await instance('users/suggested');
  return data;
};

export const fetchFollow = async (id) => {
  const { data } = await instance.post(`users/follow/${id}`);
  return data;
};

export const fetchUserProfile = async (username) => {
  const { data } = await instance(`users/profile/${username}`);
  return data;
};

export const fetchUpdateProfile = async (date) => {
  const { data } = await instance.post('users/update', {...date});
  return data;
};