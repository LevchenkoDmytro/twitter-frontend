import { useQuery } from "@tanstack/react-query";
import { getUserFollowers } from '../../api/user'
import { useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import FollowerCard from './FollowerCard'

const Followers = () => {
  const { username } = useParams();

  const { data: followers } = useQuery({
    queryKey: ['followers', username],
    queryFn: () => getUserFollowers(username),
    staleTime: 5 * 60 * 1000,
  })


  if (!followers) {
    return <div>
      <LoadingSpinner />
    </div>
  }

  return (

    <>

      {followers.map(({ _id, fullName, username, profileImg, followers, following }) => (
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

export default Followers;