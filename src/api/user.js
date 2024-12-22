import { instance } from "./helpers/instance";

export const fetchSuggestedUsers = async () => {
  const { data } = await instance('users/suggested');  
  return data;
};

export const fetchFollow = async (id) => {
  console.log(id, 'fetch ');
  
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

export const getUserFollowers = async (username) => {  
  const { data } = await instance(`users/followers/${username}`);    
  return data;
}

export const getUserFollowing = async (username) => {  
  const { data } = await instance(`users/following/${username}`); 
  console.log('getUserFollowing');
   
  return data;
}