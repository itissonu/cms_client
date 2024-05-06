import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { url } from '../utils/BackEndUrl';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const schema = z.object({
    title: z.string().min(3),
    Summary: z.string().min(200).max(2000),
    category: z.string().min(3),
    tags: z.string().min(1),
    isPublished: z.string(),
});

const UpdateBlog = () => {
    const { id } = useParams()
    const [blogs, setBlogData] = useState([])

    const [filevalue, setFileValue] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const responsedata = await axios.get(`${url}/api/blog/blogs/${id}`);
                if (responsedata) {

                    setBlogData(responsedata?.data);
                    setValue('title', responsedata?.data?.title);
                    setValue('Summary', responsedata?.data?.Summary);
                    setValue('category', responsedata?.data?.category);
                    setValue('tags', responsedata?.data?.tags.join(', '));
                    setValue('isPublished', responsedata?.data?.isPublished.toString());
                    setContent(responsedata?.data?.content)
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
   
    const { register, handleSubmit, formState: { errors }, reset,setValue } = useForm({
        resolver: zodResolver(schema),
        defaultValues: blogs,

    });
    const [content, setContent] = useState(blogs?.content);
    const handleContentChange = (newContent) => {
        setContent(newContent);
    };


    const onSubmit = async (data) => {
        setLoading(true);
        let photo

        //<------****** Converting file to URL ussing cloudinary  ******---->
        const photodata = new FormData();
        if (filevalue) {
            photodata.append('file', filevalue);
            photodata.append('upload_preset', 'upload');
        }
        if (filevalue) {
            const uploadRes = await axios.post(
                'https://api.cloudinary.com/v1_1/dbsonu270/image/upload',
                photodata
            );
            const { url } = uploadRes.data;
            photo = url;
            //<------****** Converting file to URL ussing cloudinary  ******---->


        }
        const tagsArray = data.tags.split(',');
        console.log(data)
        const newData = {
            ...data,
            content: content,
            tags: tagsArray ,
            CoverPhoto: photo ,
            isPublished: data.isPublished === 'true',
        };
        try {
            console.log(newData)
            const resdata = await axios.put(`${url}/api/blog/blogs/${id}`, newData, {
                withCredentials: true,
            });

            if (resdata?.data?.success) {
               
                toast.success(resdata.data.message);
                setLoading(false);
               
            }
        } catch (error) {
            console.log(error)
            toast.error('An error occurred while creating the blog.');
        }
    };



    return (
        <div className='bg-gray-200  flex justify-center items-center h-screen p-3'>
            <div className='w-[92%] h-[90%] flex flex-col  bg-white overflow-y-auto overflow-hidden custom-scrollbar rounded-lg shadow-md'>
                <h3 className='m-3'>Update The Blog</h3>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col m-2 p-2'>
                        <label className='text-lg text-sky-400 font-bold' htmlFor="title">Title</label>
                        <input type='text' className='w-full h-10 outline-none bg-slate-200 rounded-lg p-2' name='title'  {...register('title', { required: true })}  required />
                        {errors.title && <p className='font-bold text-red-500'>*{errors.title.message}</p>}

                        <label className='text-lg text-sky-400 font-bold' htmlFor="Summary">Summary</label>
                        <textarea type='text' className='w-full h-20 outline-none bg-slate-200 rounded-lg p-2' name='Summary' {...register('Summary', { required: true })}  required />
                        {errors.Summary && <p className='font-bold text-red-500'>*{errors.Summary.message}</p>}

                        <label className='text-lg text-sky-400 font-bold' htmlFor="CoverPhoto">CoverPhoto</label>
                        <img src={blogs.CoverPhoto} alt='Cover Photo' className='w-full h-auto rounded-lg mt-2' />
                        <input onChange={(e) => { setFileValue(e.target.files[0]) }} placeholder='Change The Photo ' type='file' className='w-full h-10 outline-none bg-slate-200 rounded-lg p-2' name='CoverPhoto' />
                        {/* {errors.CoverPhoto && <p className='font-bold text-red-500'>*{errors.CoverPhoto.message}</p>} */}

                        <label className='text-lg text-sky-400 font-bold' htmlFor="content">Content:</label>
                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={handleContentChange}
                            id="content" className='w-[95%] mt-2 mr-3 bg-white  border border-gray-300 rounded-md focus:outline-none   px-4 py-2'
                        />


                        <label className='text-lg text-sky-400 font-bold' htmlFor="category">Category</label>
                        <input type='text' className='w-full h-10 outline-none bg-slate-200 rounded-lg p-2' name='category' {...register('category', { required: true })}  required />
                        {errors.category && <p className='font-bold text-red-500'>*{errors.category.message}</p>}

                        <label className='text-lg text-sky-400 font-bold' htmlFor="tags">Tag</label>
                        <input type='text' className='w-full h-10 outline-none bg-slate-200 rounded-lg p-2' name='tags' {...register('tags', { required: true })}  required />
                        {errors.tags && <p className='font-bold text-red-500'>*{errors.tags.message}</p>}

                        <label className='text-lg text-sky-400 font-bold' htmlFor="isPublished">Status</label>
                        <select className='w-full h-10 outline-none bg-slate-200 rounded-lg' name='isPublished' {...register('isPublished', { required: true })}  required>

                            <option value={true}>Published</option>
                            <option value={false}>Draft</option>
                        </select>
                        {errors.isPublished && <p className='font-bold text-red-500'>*{errors.isPublished.message}</p>}


                    </div>
                    <div className='w-full justify-center flex m-3'>
                        <button className={`hover:cursor-pointer justify-center items-center flex hover:bg-cyan-400 w-28 font-bold h-12 p-1 rounded bg-sky-400 text-amber-50 shadow-xl  `} type="submit">{loading ? <div className='w-7 h-7 rounded-full border-b-4 border-dashed border-white animate-spin'></div> : 'Create'}</button>
                    </div>

                </form>

            </div>
        </div>
    )
}

export default UpdateBlog