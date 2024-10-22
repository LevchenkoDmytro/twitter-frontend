import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import { POSTS } from "../../utils/db/dummy";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/posts";
import { useEffect } from "react";

const Posts = ({ feedType, username, userId }) => {

  const getPostEndpoint = () => {
    switch (feedType) {
      case 'forYou':
        return 'posts/all';
      case 'following':
        return 'posts/following';
      case 'posts':
        return `posts/user/${username}`;
      case 'likes':
        return `posts/likes/${userId}`;
      default:
        return 'posts/all';
    }
  }

  const POST_ENDPOINT = getPostEndpoint();

  const { data: posts, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(POST_ENDPOINT),
  })

  useEffect(() => {
    refetch()

  }, [feedType, refetch])

  console.log(posts);

  return (
    <>
      {(isLoading || isRefetching) && (
        <div className='flex flex-col justify-center'>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}
      {!isLoading && !isRefetching && posts?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
      {!isLoading && !isRefetching && posts && (
        <div>
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  );
};
export default Posts;