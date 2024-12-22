import { useLocation, Link, Outlet, useParams } from "react-router-dom";

const FollowersFollowingPage = () => {
  const location = useLocation();
  const { username } = useParams()
  const currentTab = location.pathname.split('/').at(-1);

  return (
    <div className="w-[600px] border border-[#2F3336]">
      <div className="flex ">
        <Link to={`/profile/${username}/followers`} className="w-[50%] flex justify-center border-b border-[#2F3336]  transition-all duration-300 hover:bg-stone-900 cursor-pointer">
          <div className={`${currentTab === 'followers' ? `font-bold text-white after:absolute after:left-0 after:bottom-0 after:w-full after:h-[4px] after:bg-[#1D9BE0] after:content-[''] after:rounded-full` : `font-medium text-[#71767b]`} py-[16px] relative select-none`}>
            Followers
          </div>
        </Link>
        <Link to={`/profile/${username}/following`} className="w-[50%] px-[16px] flex justify-center border-b border-[#2F3336]  transition-all duration-300 hover:bg-stone-900 cursor-pointer">
          <div className={`${currentTab === 'following' ? `font-bold text-white after:absolute after:left-0 after:bottom-0 after:w-full after:h-[4px] after:bg-[#1D9BE0] after:content-[''] after:rounded-full` : `font-medium text-[#71767b]`} py-[16px] relative select-none`}>
            Following
          </div>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default FollowersFollowingPage;