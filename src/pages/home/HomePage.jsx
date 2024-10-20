import { useState } from "react";

import Posts from "../../components/common/Posts";
import CreatePost from "./CreatePost";

const HomePage = () => {
  const [feedType, setFeedType] = useState("forYou");

  return (
    <div className="w-[600px] border border-[#2F3336]">
      <div className="flex ">
        <div onClick={() => setFeedType('forYou')} className="w-[50%] flex justify-center border-b border-[#2F3336]  transition-all duration-300 hover:bg-stone-900 cursor-pointer">
          <div className={`${feedType === `forYou` ? `font-bold text-white after:absolute after:left-0 after:bottom-0 after:w-full after:h-[4px] after:bg-[#1D9BE0] after:content-[''] after:rounded-full` : `font-medium text-[#71767b]`} py-[16px] relative select-none`}>
            For you
          </div>
        </div>
        <div onClick={() => setFeedType('following')} className="w-[50%] px-[16px] flex justify-center border-b border-[#2F3336]  transition-all duration-300 hover:bg-stone-900 cursor-pointer">
          <div className={`${feedType === `Following` ? `font-bold text-white after:absolute after:left-0 after:bottom-0 after:w-full after:h-[4px] after:bg-[#1D9BE0] after:content-[''] after:rounded-full` : `font-medium text-[#71767b]`} py-[16px] relative select-none`}>
            Following
          </div>
        </div>
      </div>
      <CreatePost />

      <Posts feedType={feedType} />
    </div>
  );
};
export default HomePage;