import { Link } from "react-router-dom";
import FollowButton from "../ui/FollowButton";
import React from "react";

const FollowerCard = React.memo(({ userId, fullName, username, profileImg, followers, following }) => {
  return (

    <Link
      to={{
        pathname: `/profile/${username}`,
      }}
      state={{ _id: userId, fullName, username, profileImg, followers, following }}
      className="px-[16px] py-[12px] flex items-center w-full"
    >
      <img
        src={profileImg || '/avatar-placeholder.png'}
        alt="user"
        className="rounded-full w-[40px] h-[40px] mr-[8px]"
      />
      <div className="w-full">
        <p className="text-[15px] leading-[22px] text-white font-bold truncate">{fullName}</p>
        <p className="text-[15px] leading-[20px] text-slate-500 truncate">{username}</p>
      </div>
      <FollowButton userId={userId} />
    </Link>
  );
});

export default FollowerCard;
