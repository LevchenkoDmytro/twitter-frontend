import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchDeletePost, fetchLikePost, fetchCommentPost } from '../../api/posts';
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import { formatPostDate } from "../../utils/date";
import { MdMoreHoriz } from "react-icons/md";


const Post = ({ post }) => {
  const [comment, setComment] = useState("");

  const queryClient = useQueryClient();
  const authUser = queryClient.getQueryData(['authUser']);

  const postOwner = post.user;
  const isLiked = post.likes.includes(authUser._id);

  const isMyPost = authUser._id === post.user._id;


  const formattedDate = formatPostDate(post.createdAt)

  const { mutate: deletePost, isPending: isDeleting } = useMutation({
    mutationFn: () => fetchDeletePost(post._id),
    onSuccess: (deletePostId) => {
      toast.success('Post deleted successfully');
      queryClient.setQueryData(['posts'], (oldPosts) => {
        return oldPosts.filter(post => post._id !== deletePostId)
      })
    }
  })

  const { mutate: likePost, isPending: isLiking } = useMutation({
    mutationFn: () => fetchLikePost(post._id),
    onSuccess: (updatedLikes) => {
      console.log(updatedLikes);

      queryClient.setQueryData(['posts'], (oldData) => {
        return oldData.map((p) => {
          if (p._id === post._id) {
            return { ...p, likes: updatedLikes }
          }
          return p;
        })
      })
    }
  })

  const { mutate: commentPost, isPending: isCommenting } = useMutation({
    mutationFn: () => fetchCommentPost(post._id, comment),
    onSuccess: () => {
      setComment('');
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: (error) => {
      console.log(error);
    }
  })

  const handleDeletePost = () => {
    deletePost()
  };

  const handlePostComment = (e) => {
    e.preventDefault();

    if (isCommenting) return;
    commentPost()
  };

  const handleLikePost = () => {
    if (isLiking) return;
    likePost()
  };

  return (

    <div className='flex gap-2 items-start p-4 border-b border-gray-700'>
      <div className='avatar'>
        <Link to={`/profile/${postOwner.username}`} state={postOwner} className='w-[40px] h-[40px] rounded-full overflow-hidden'>
          <img src={postOwner.profileImg || "/avatar-placeholder.png"} alt="avatar" />
        </Link>
      </div>
      <div className='flex flex-col flex-1'>
        <div className='flex items-center'>
          <Link to={`/profile/${postOwner.username}`} state={postOwner}>
            <div className="flex gap-2 items-center">
              <span className='font-bold'>{postOwner.fullName}</span>
              <span className='text-gray-700 text-sm'>@{postOwner.username}</span>
            </div>
          </Link>
          <span className='flex text-gray-700 text-sm'>
            <span className="mx-1">·</span>
            <span>{formattedDate}</span>
          </span>
          {isMyPost && (
            <span className='flex justify-end flex-1'>
              {!isDeleting && <FaTrash className='cursor-pointer hover:text-red-500' onClick={handleDeletePost} />}
              <MdMoreHoriz size={'19px'} fill="rgb(100, 116, 139)" onClick={() => document.getElementById('my_modal').showModal()} />
              <dialog id="my_modal" className="modal ">
                <div className="modal-box border rounded-md border-gray-700 shadow-md">
                  <h3 className="font-bold text-lg">Hello!</h3>
                  <p className="py-4">Press ESC key or click outside to close</p>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button className='outline-none'>close</button>
                </form>
              </dialog>
              {isDeleting && <LoadingSpinner size='sm' />}
            </span>
          )}
        </div>
        <div className='flex flex-col gap-3'>
          <p className="w-[518px] break-words">{post.text}</p>

          {post.img && (
            <img
              src={post.img}
              className='h-80 object-contain rounded-lg border border-gray-700'
              alt=''
            />
          )}
        </div>
        <div className='flex justify-between mt-3'>
          <div className='flex gap-4 items-center w-2/3 justify-between'>
            <div
              className='flex gap-1 items-center cursor-pointer group'
              onClick={() => document.getElementById("comments_modal" + post._id).showModal()}
            >
              <FaRegComment className='w-4 h-4  text-slate-500 group-hover:text-sky-400' />
              <span className='text-sm text-slate-500 group-hover:text-sky-400'>
                {post.comments.length}
              </span>
            </div>
            <dialog id={`comments_modal${post._id}`} className='modal border-none outline-none'>
              <div className='modal-box rounded border border-gray-600'>
                <h3 className='font-bold text-lg mb-4'>COMMENTS</h3>
                <div className='flex flex-col gap-3 max-h-60 overflow-auto'>
                  {post.comments.length === 0 && (
                    <p className='text-sm text-slate-500'>
                      No comments yet 🤔 Be the first one 😉
                    </p>
                  )}
                  {post.comments.map((comment) => (
                    <div key={comment._id} className='flex gap-2 items-start'>
                      <div className='avatar'>
                        <div className='w-8 rounded-full'>
                          <img
                            src={comment.user.profileImg || "/avatar-placeholder.png"}
                          />
                        </div>
                      </div>
                      <div className='flex flex-col'>
                        <div className='flex items-center gap-1'>
                          <span className='font-bold'>{comment.user.fullName}</span>
                          <span className='text-gray-700 text-sm'>
                            @{comment.user.username}
                          </span>
                        </div>
                        <div className='text-sm'>{comment.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <form
                  className='flex gap-2 items-center mt-4 border-t border-gray-600 pt-2'
                  onSubmit={handlePostComment}
                >
                  <textarea
                    className='textarea w-full p-1 rounded text-md resize-none border focus:outline-none  border-gray-800'
                    placeholder='Add a comment...'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button className='btn btn-primary rounded-full btn-sm text-white px-4'>
                    {isCommenting ? (
                      <LoadingSpinner size="md" />
                    ) : (
                      "Post"
                    )}
                  </button>
                </form>
              </div>
              <form method='dialog' className='modal-backdrop'>
                <button className='outline-none'>close</button>
              </form>
            </dialog>
            <div className='flex gap-1 items-center group cursor-pointer'>
              <BiRepost className='w-6 h-6  text-slate-500 group-hover:text-green-500' />
              <span className='text-sm text-slate-500 group-hover:text-green-500'>0</span>
            </div>
            <div className='flex gap-1 items-center group cursor-pointer' onClick={handleLikePost}>
              {isLiking && <LoadingSpinner size="sm" />}
              {!isLiked && !isLiking && (
                <FaRegHeart className='w-4 h-4 cursor-pointer text-slate-500 group-hover:text-pink-500' />
              )}
              {isLiked && !isLiking && <FaRegHeart className='w-4 h-4 cursor-pointer text-pink-500 ' />}

              <span
                className={`text-sm group-hover:text-pink-500 ${isLiked ? "text-pink-500" : "text-slate-500"
                  }`}
              >
                {post.likes.length}
              </span>
            </div>
          </div>
          <div className='flex w-1/3 justify-end gap-2 items-center'>
            <FaRegBookmark className='w-4 h-4 text-slate-500 cursor-pointer' />
          </div>
        </div>
      </div>
    </div>

  );
};
export default Post;