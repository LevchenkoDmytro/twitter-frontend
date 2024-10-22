import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../api/auth";
import XSvg from "../svgs/X";

import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import toast from "react-hot-toast";

const Sidebar = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authUser'] })
    },
    onError: (error) => {
      console.log(error);
      toast.error('Logout failed')
    },

  })

  const { data: authUser } = useQuery({ queryKey: ['authUser'] })

  return (
    <header className="w-[275px] px-[8px]">
      <div className="w-[259px] h-screen flex flex-col fixed">
        <Link to='/' className="flex w-[52px] h-[52px] justify-center items-center rounded-full transition-all duration-300 hover:bg-stone-900">
          <XSvg className='w-[30px] h-[30px] fill-white' />
        </Link>
        <nav>
          <Link to='/' className="flex py-[4px]" >
            <div className="flex shrink-0 items-center gap-5 p-[12px] rounded-full transition-all duration-300 hover:bg-stone-900">
              <MdHomeFilled size='30px' />
              <span className="text-[20px] leading-[24px] mr-[16px]">Home</span>
            </div>
          </Link>
          <Link to='/notifications' className="flex py-[4px]" >
            <div className="flex shrink-0 items-center gap-5 p-[12px] rounded-full transition-all duration-300 hover:bg-stone-900">
              <IoNotifications size='30px' />
              <span className="text-[20px] leading-[24px] mr-[16px]">Notifications</span>
            </div>
          </Link>
          <Link to={`/profile/${authUser.username}`} className="flex py-[4px]" >
            <div className="flex shrink-0 items-center gap-5 p-[12px] rounded-full transition-all duration-300 hover:bg-stone-900">
              <FaUser size='30px' />
              <span className="text-[20px] leading-[24px] mr-[16px]">Profile</span>
            </div>
          </Link>
        </nav>
        {
          authUser &&
          <div className='mt-auto mb-[12px] p-[12px] flex rounded-full transition-all duration-300 hover:bg-stone-900'>
            <div className='avatar hidden md:flex'>
              <div className='w-[40px] rounded-full'>
                <img src={authUser?.profileImg || "/avatar-placeholder.png"} />
              </div>
            </div>
            <div className='max-w-[152px] flex flex-col justify-between flex-1 mx-[12px]'>
              <p className='text-white font-bold text-[15px] leading-[21px] truncate'>{authUser?.fullName}</p>
              <p className='text-slate-500 text-[15px] leading-[21px] truncate'>{authUser?.username}</p>
            </div>
            <BiLogOut onClick={() => mutate()} size='25px' className='self-center cursor-pointer' />
          </div>
        }
      </div>
    </header>
  );
};
export default Sidebar;