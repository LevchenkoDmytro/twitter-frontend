import { useQuery } from "@tanstack/react-query";
import { getUserFollowing } from '../../api/user'
import { useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import FollowerCard from './FollowerCard'

const Following = () => {
  const { username } = useParams();

  const { data: following } = useQuery({
    queryKey: ['following', username],
    queryFn: () => getUserFollowing(username),
    staleTime: 5 * 60 * 1000,
  })

  if (!following) {
    return <div>
      <LoadingSpinner />
    </div>
  }

  return (
    <>
      {
        following.map(({ _id, fullName, username, profileImg, followers, following }) => (
          <FollowerCard
            key={_id}
            userId={_id}
            fullName={fullName}
            username={username}
            profileImg={profileImg}
            followers={followers}
            following={following}
          />
        ))
      }
    </>
  );
};

export default Following;