import { useState, memo } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import useFollow from '../../hooks/useFollow';
import { useQueryClient } from '@tanstack/react-query';

const FollowButton = memo(({ userId }) => {
  const queryClient = useQueryClient()
  const authUserFollowers = queryClient.getQueryData(['authUser']).following;
  const { follow } = useFollow();
  const [isFollowing, setIsFollowing] = useState(authUserFollowers.includes(userId));

  const handleClick = (e) => {
    e.preventDefault();
    follow(userId);
    setIsFollowing((prev) => !prev);
  };

  return (
    <button
      onClick={handleClick}
      className={`h-[32px] px-[16px] text-inherit flex-shrink-0 text-black text-[14px] font-bold leading-[16px] ml-[12px] rounded-full border ${isFollowing ? 'w-[99px]' : 'w-[78px]'}`}
      style={{
        borderColor: isFollowing ? 'rgb(103, 7, 15)' : 'rgb(83, 100, 113)',
        backgroundColor: isFollowing ? 'rgba(244, 33, 46, 0.1)' : '',
        color: !isFollowing ? 'rgb(244, 33, 46)' : '',
      }}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
});

export default FollowButton;
