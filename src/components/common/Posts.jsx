import Post from "./Post";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/posts";
import LoadingSpinner from "./LoadingSpinner";

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

  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts', feedType, username],
    queryFn: () => getPosts(POST_ENDPOINT),
  })

  return (
    <>
      {isLoading && (
        <div className="py-[20px] flex justify-center items-center">
          < LoadingSpinner />
        </div>
      )}
      {!isLoading && posts?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
      {!isLoading && posts && (
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