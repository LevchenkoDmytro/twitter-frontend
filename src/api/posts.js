import { instance } from "./helpers/instance";

export const getPosts = async (POST_ENDPOINT) => {
  const { data } = await instance(POST_ENDPOINT);
  return data;
};

export const fetchCreatePost = async ({text, img}) => {
  const { data } = await instance.post('posts/create', {text, img});
  return data;
};

export const fetchDeletePost = async (id) => {
  const { data } = await instance.delete(`posts/${id}`);
  return data;
};

export const fetchLikePost = async (id) => {
  const { data } = await instance.post(`posts/like/${id}`);
  return data;
};

export const fetchCommentPost = async (id, text) => {
  console.log(id, text);
  
  const { data } = await instance.post(`posts/comment/${id}`, {text});
  return data;
};