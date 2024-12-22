import { useRef, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { fetchUpdateProfile, fetchUserProfile } from '../../api/user'

import ProfilePosts from "./ProfilePosts";
import EditProfileModal from "./EditProfileModal";
import { FaArrowLeft } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatMemberSinceDate } from "../../utils/date";
import useFollow from '../../hooks/useFollow'
import toast from "react-hot-toast";

const ProfilePage = () => {
  const queryClient = useQueryClient()
  const { username } = useParams()
  const location = useLocation();
  const profileFromNavigation = location.state;

  const [coverImg, setCoverImg] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const coverImgRef = useRef(null);
  const profileImgRef = useRef(null);

  const { follow, isPending } = useFollow()
  const authUser = queryClient.getQueryData(['authUser']);

  const { data: user } = useQuery({
    queryKey: ['userProfile', username],
    queryFn: () => fetchUserProfile(username),
    initialData: username === authUser?.username ? authUser : profileFromNavigation,
    enabled: () => {
      const isCached = queryClient.getQueryData(['userProfile', username]);
      const isAuthUser = username === authUser?.username;
      const hasNavigationData = !!profileFromNavigation;

      return !isCached && !isAuthUser && !hasNavigationData;
    },
  })

  const { mutate: updateProfile, isPending: isUpdatingProfile } = useMutation({
    mutationFn: () => fetchUpdateProfile({ coverImg, profileImg }),
    onSuccess: () => {
      toast.success("Profile updated successfully");
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['authUser'] }),
        queryClient.invalidateQueries({ queryKey: ['userProfile'] }),
      ])
    },
    onError: (error) => {
      toast.error(error.message);
    }
  })

  const isMyProfile = username === authUser?.username;
  const memberSinceDate = formatMemberSinceDate(user?.createdAt || authUser?.createdAt);
  const amIFollowing = authUser?.following.includes(user?._id)

  const handleImgChange = (e, state) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        state === "coverImg" && setCoverImg(reader.result);
        state === "profileImg" && setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  console.log('profile page');

  return (
    <>

      <div className='w-[600px] flex-[4_4_0]  border border-gray-700 min-h-screen '>

        <div className='flex flex-col'>
          {user && (
            <>
              <div className='h-[60px] flex gap-10 px-4 py-2 items-center'>
                <Link to='/'>
                  <FaArrowLeft className='w-4 h-4' />
                </Link>
                <div className='flex flex-col'>
                  <p className='h-[26px] font-bold text-lg'>{user?.fullName}</p>
                  {/* <span className='text-sm text-slate-500'>{POSTS?.length} posts</span> */}
                </div>
              </div>
              <div className='relative group/cover'>
                {coverImg || user?.coverImg ? (
                  <img
                    alt='cover img'
                    src={coverImg || user?.coverImg}
                    className='h-52 w-full object-cover'
                  />
                ) : (
                  <div className='h-52 w-full object-cover bg-[#333639]'></div>
                )
                }
                {isMyProfile && (
                  <div
                    className='absolute top-2 right-2 rounded-full p-2 bg-gray-800 bg-opacity-75 cursor-pointer opacity-0 group-hover/cover:opacity-100 transition duration-200'
                    onClick={() => coverImgRef?.current.click()}
                  >
                    <MdEdit className='w-5 h-5 text-white' />
                  </div>
                )}

                <input
                  type='file'
                  hidden
                  accept="/image/*"
                  ref={coverImgRef}
                  onChange={(e) => handleImgChange(e, "coverImg")}
                />
                <input
                  type='file'
                  hidden
                  accept="/image/*"
                  ref={profileImgRef}
                  onChange={(e) => handleImgChange(e, "profileImg")}
                />
                <div className='avatar absolute -bottom-16 left-4'>
                  <div className='w-32 rounded-full relative group/avatar'>
                    {
                      profileImg ? (
                        <img src={profileImg || user?.profileImg} alt="profile img" />
                      ) : (
                        <div className="avatar placeholder">
                          <div className="bg-slate-50 w-[40px] h-[40px] mr-[8px] text-neutral-content rounded-full">
                            <span className="text-2xl">{username?.charAt(0)}</span>
                          </div>
                        </div>
                      )
                    }
                    <div className='absolute top-5 right-3 p-1 bg-primary rounded-full group-hover/avatar:opacity-100 opacity-0 cursor-pointer'>
                      {isMyProfile && (
                        <MdEdit
                          className='w-4 h-4 text-white'
                          onClick={() => profileImgRef?.current.click()}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex justify-end px-4 mt-5'>
                {isMyProfile && <EditProfileModal authUser={authUser} />}
                {!isMyProfile && (
                  <button
                    className='btn btn-outline rounded-full btn-sm'
                    onClick={() => follow(user?._id)}
                  >
                    {isPending && 'Loading'}
                    {!isPending && amIFollowing && 'Unfollow'}
                    {!isPending && !amIFollowing && 'Follow'}
                  </button>
                )}
                {(coverImg || profileImg) && (
                  <button
                    className='btn btn-primary rounded-full btn-sm text-white px-4 ml-2'
                    onClick={() => updateProfile()}
                  >
                    {isUpdatingProfile ? 'Updating...' : 'Update'}
                  </button>
                )}
              </div>

              <div className='flex flex-col gap-4 mt-14 px-4'>
                <div className='flex flex-col'>
                  <span className='font-bold text-lg'>{user?.fullName}</span>
                  <span className='text-sm text-slate-500'>@{user?.username}</span>
                  <span className='text-sm my-1'>{user?.bio || authUser?.bio}</span>
                </div>

                <div className='flex gap-2 flex-wrap'>
                  <div className='flex gap-2 items-center'>
                    <IoCalendarOutline className='w-4 h-4 text-slate-500' />
                    <span className='text-sm text-slate-500'>{memberSinceDate}</span>
                  </div>
                </div>
                <div className='flex gap-2'>

                  <span className='font-bold text-xs'>{user?.following?.length}</span>
                  <span className='text-slate-500 text-xs'>Following</span>

                  <Link to={`/profile/${user?.username}/followers`} className='flex gap-1 items-center'>
                    <div className='flex gap-1 items-center'>
                      <span className='font-bold text-xs'>{user?.followers?.length}</span>
                      <span className='text-slate-500 text-xs'>Followers</span>
                    </div>
                  </Link>
                </div>
              </div>
            </>
          )}
          {user && <ProfilePosts userId={user?._id} />}
        </div>
      </div>
    </>
  );
};
export default ProfilePage;