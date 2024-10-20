import { Link } from "react-router-dom";
import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";
import { USERS_FOR_RIGHT_PANEL } from "../../utils/db/dummy";
import { useQuery } from '@tanstack/react-query'
import { fetchSuggestedUsers } from '../../api/user'
import useFollow from "../../hooks/useFollow";
import LoadingSpinner from './LoadingSpinner'

const RightPanel = () => {
  const { data: suggestedUsers, isLoading } = useQuery({
    queryKey: ['suggestedUsers'],
    queryFn: fetchSuggestedUsers,
  })

  const { follow, isPending } = useFollow();

  if (suggestedUsers?.length === 0) return <div className="w-64"></div>

  return (
    <div>
      <div className="ml-[30px] mt-[12px] flex flex-col flex-grow-0 border border-[#2F3336] rounded-[16px]">
        <h3 className="px-[16px] py-[12px] text-[20px] text-white leading-[24px] font-bold">Who to follow</h3>
        {isLoading && (
          <>
            <RightPanelSkeleton />
            <RightPanelSkeleton />
            <RightPanelSkeleton />
            <RightPanelSkeleton />
          </>
        )}
        {
          suggestedUsers?.map(({ _id, fullName, username, profileImg }) => {
            return (
              <Link to={`profile/${username}`} key={_id} className="px-[16px] py-[12px] flex items-center">
                <img src={profileImg || '/avatar-placeholder.png'} alt="user" className="w-[40px] h-[40px] mr-[8px]" />
                <div className="w-[178px]">
                  <p className="text-[15px] leading-[22px] text-white font-bold truncate">{fullName}</p>
                  <p className="text-[15px] leading-[20px] text-slate-500 truncate">{username}</p>
                </div>

                <button onClick={(e) => {
                  e.preventDefault();
                  follow(_id)
                }} className="h-[32px] px-[16px] text-black text-[14px] font-bold leading-[16px] ml-[12px] rounded-full bg-white border border-white">
                  {isPending ? <LoadingSpinner size="sm" /> : 'Follow'}
                </button>
              </Link>
            );
          })
        }
      </div>
    </div>
  );
};
export default RightPanel;