import React, { useEffect, useState } from 'react'
import { url } from '../utils/BackEndUrl';
import axios from 'axios';
import { FiPlusCircle } from "react-icons/fi";
import { CiUser } from "react-icons/ci";
import { TiArrowForward } from "react-icons/ti";
import { LuArrowUpRightFromCircle } from "react-icons/lu"
import { useNavigate } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";

const BlogProfile = () => {
    const userdata = JSON.parse(localStorage.getItem("user"));
    const userId = userdata._id

    const [blogs, setBlogData] = useState([])
    const [isDraft, setDraft] = useState(false)

    const navigate = useNavigate()
    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const responsedata = await axios.get(`${url}/api/blog/blogs/author/${userId}`);
                if (responsedata) {
                    setBlogData(responsedata.data);
                } else {
                    throw new Error('Failed to fetch blog data');
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (userId) {
            fetchBlogData();
        }
    }, [userId]);

    let updatedBlog = []
    if (isDraft) {
        updatedBlog = blogs.filter((blog) => !blog.isPublished);
    } else {
        updatedBlog = blogs.filter((blog) => blog.isPublished)
    }


    return (
        <div className='bg-gray-200  flex justify-center items-center h-screen p-3'>
            <div className='w-[99%] h-[90%] flex flex-col gap-10 bg-white overflow-y-auto overflow-hidden custom-scrollbar rounded-lg shadow-md'>
                <div className='flex flex-col w-full'>
                    <div className='flex flex-col justify-center items-center w-full m-5'>
                        <div className='w-32 relative '>
                            <img src={userdata.profilePic} className='h-32 w-32 rounded-full border-green-200 shadow-md border-[1px]' />
                        </div>

                        <span className='text-sm font-bold m-1 uppercase'>{userdata.personalDetails.FirstName}{' '}{userdata.personalDetails.MiddleName}{' '}{userdata.personalDetails.LastName}</span>
                        <span className='text-xs text-gray-600 '>No of posts :{blogs.length}</span>

                    </div>
                    <div className='flex justify-between items-center p-5'>
                        <button onClick={() => setDraft(false)} className=' hover:bg-orange-600 hover:text-white h-max rounded-md shadow-sm hover:border-none p-3 uppercase text-lg  font-bold text-gray-900 items-center w-1/3 border-[1px] border-gray-400' >Published</button>
                        <div className='w-1/4 hover:border-none  flex flex-col items-center border-b-2 p-6 rounded-full shadow-md border-sky-300'> <FiPlusCircle className='hover:cursor-pointer p-1 h-10 w-10  shadow-gray-700 text-green-400' onClick={() => navigate('/myblogs/addblog')} /><span className=' text-blue-300 text-xs font-bold m-1 uppercase'>Add Post</span></div>
                        <button onClick={() => setDraft(true)} className=' hover:bg-orange-600 hover:text-white hover:border-none h-max rounded-md  p-3 border-[1px]   border-gray-400 w-1/3 uppercase text-lg font-bold text-gray-900' >Draft</button>
                    </div>
                    <div className='flex flex-wrap min-h-screen '>
                        {updatedBlog?.map((blog, indx) => (
                            <div onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/myblogs/${blog?._id}`)
                            }} key={indx} className='hover:cursor-pointer w-[32%] gap-2 h-[450px] p-2 m-1 flex flex-col rounded-md items-center border-[1px] border-gray-50 shadow-md hover:shadow-sky-100 '>
                                <div className='w-[100%] h-[50%] group/item  relative justify-center items-center '>
                                    <span className='z-5  invisible group-hover/item:visible  absolute top-1/2 right-1/2 bg-sky-400 rounded-full p-1'><LuArrowUpRightFromCircle className=' h-8 w-8 text-sky-100' /></span>
                                    <img src={blog.CoverPhoto} className='  h-[100%] w-[100%] object-cover rounded-xl hover:opacity-25 ' />

                                </div>

                                <div className='flex flex-col max-w-full w-full'>
                                    <span className='text-sm font-bold text-blue-400 border-[1px] bg-blue-50 rounded-2xl w-max py-2 px-3'>{blog?.category}</span>
                                    <span className='hover:text-blue-800 text-xl text-teal-950 font-semibold max-w-[22.5rem] line-clamp-2 truncate'>{blog?.title}</span>
                                    <div className='my-2 text-sm text-gray-900 text-wrap max-w-xs line-clamp-3 truncate' dangerouslySetInnerHTML={{ __html: blog.content }} />



                                    <div className='flex justify-between items-center gap-8'>
                                        <div className='flex items-center'><CiUser size={22} className='text-[#042152] ' /><span className='uppercase font-semibold text-xs text-[#042152]  '>{blog?.author?.personalDetails?.FirstName}</span></div>

                                        <span className='text-sm text-gray-600 rounded-2xl p-2 text-right'>{(new Date(blog.date)).toDateString()}</span>
                                        <div className='flex gap-1 items-center'>
                                            <span className=' text-xs border-[1px] bg-[#e3a0a0] p-1 w-max text-white font-bold rounded-lg'>Edit</span>
                                            <span className='h-max w-max rounded-full bg-green-100 p-2 flex items-center justify-center'>
                                                <FaRegEdit className='hover:shadow-sky-400 hover:shadow-lg text-green-500 hover:cursor-pointer h-6 w-6' onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/myblogs/update/${blog?._id}`)
                                                }} />
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        )

                        )}
                    </div>

                </div>
            </div>

        </div>
    )
}

export default BlogProfile