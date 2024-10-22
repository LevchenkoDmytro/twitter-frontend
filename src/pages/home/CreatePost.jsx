import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCreatePost } from "../../api/posts";
import toast from "react-hot-toast";

const CreatePost = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { data: authUser } = useQuery({ queryKey: ['authUser'] });
  const queryClient = useQueryClient();

  const { mutate: createPost, isPending, isError, error } = useMutation({
    mutationFn: () => fetchCreatePost({ text, img }),
    onSuccess: () => {
      setText('');
      setImg(null)
      toast.success('Post created successfully')
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })

  const imgRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost({ text, img });
  };

  const handleImgChange = (e) => {

    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex px-[16px] pt-[4px] border-b border-[#2f3336]">
      <div className="avatar pt-[12px] mr-[8px]">
        <Link to='profile/johndoe' className="w-[40px] h-[40px]">
          <img src={authUser.profileImg || '/avatar-placeholder.png'} alt="" />
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col pt-[4px] w-[100%]">
        <textarea onInput={({ target }) => {
          target.style.height = "52px";
          target.style.height = `${target.scrollHeight}px`;
          setText(target.value);
        }}
          value={text}
          className="w-[100%] py-[12px] h-[52px] text-[20px] leading-[24px] appearance-none border-none outline-none bg-transparent resize-none placeholder-[#71767b]" placeholder="What is happening?!"
          maxLength="280"
        ></textarea>
        {img && (
          <div className='relative my-[6px]'>
            <div className="absolute top-[4px] right-[4px] w-[32px] h-[32px] flex justify-center items-center bg-gray-800 rounded-full cursor-pointer"
              onClick={() => {
                setImg(null);
                imgRef.current.value = null;
              }}
            >
              <IoCloseSharp
                className=' text-white  w-[18px] h-[18px] '
              />
            </div>
            <img src={img} className='w-full object-contain rounded-[16px]' />
          </div>
        )}
        <div className="flex justify-between pb-[8px]">
          <nav className="flex p-[2px] mt-[8px] items-center">
            <div className="w-[36px] h-[36px] flex justify-center items-center">
              <CiImageOn onClick={() => imgRef.current.click()} className='w-[20px] h-[20px] fill-primary cursor-pointer' />
            </div>
            <div className="w-[36px] h-[36px] flex justify-center items-center">
              <BsEmojiSmileFill className='w-[20px] h-[20px] fill-primary cursor-pointer' />
            </div>
          </nav>
          <input type='file' accept="image/*" hidden ref={imgRef} onChange={handleImgChange} />
          <div className="mt-[8px]">
            <button className="min-h-[36px] px-[16px] ml-[12px] font-bold bg-[#1d9bf0] rounded-full">{!isPending ? 'Post' : 'Pending...'}</button>
          </div>
        </div>
        {isError && <div className='text-red-500'>{error.response.data.error}</div>}
      </form>
    </div>
  );
};
export default CreatePost;