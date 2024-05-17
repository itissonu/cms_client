import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { url } from '../utils/BackEndUrl'

const SingleBlog = () => {
  const { id } = useParams()
  console.log(id)
  const [blogs, setBlogData] = useState([])
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const responsedata = await axios.get(`${url}/api/blog/blogs/${id}`);
        if (responsedata) {
          setBlogData(responsedata.data);
        } else {
          throw new Error('Failed to fetch blog data');
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (id) {
      fetchBlogData()
    }

  }, [id])
  console.log(blogs)
  return (
    <div className='bg-gray-200  flex justify-center items-center h-screen p-3'>
      <div className='w-[92%] h-[90%] flex flex-col p-6 bg-white overflow-y-auto overflow-hidden custom-scrollbar rounded-lg shadow-md'>
        <div className='flex flex-col md:flex-row'>
          <div className='w-[40%] '>
            <h3 className='text-4xl text-[#211e25] font-bold '>{blogs?.title}</h3>
            <h2 className='text-[#383838] text-xl m-2'>{blogs?.Summary}</h2>
            <span className='underline capitalize text-sky-500  '>Written by:{blogs?.author?.personalDetails?.FirstName}</span>
            <span className='font-bold ml-6'>published at:{(new Date(blogs?.date)).toDateString()}</span>
            <div className='flex gap-2 m-3'>
            {blogs?.tags?.map((tag,i)=>(
              <span className='h-max text-gray w-max p-2 font-semibold text-xs bg-green-100 rounded-2xl' key={i}>{tag}</span>
            ))}
          </div>
          </div>
          <div className=' p-2 w-[60%] m-3 h-[400px]'>
            <img className='h-full w-full' src={blogs.CoverPhoto}/>
          </div>
         
        </div>
        <div className='mt-3' dangerouslySetInnerHTML={{ __html: blogs.content }} />
      </div>
    </div>
  )
}

export default SingleBlog