import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { url } from '../utils/BackEndUrl'
import { FaLink } from 'react-icons/fa6'
import { MdOutlineOndemandVideo } from "react-icons/md";
import { RiArticleLine } from "react-icons/ri";
import { IoIosAddCircleOutline } from 'react-icons/io';
import RefaranceModal from '../modals/RefaranceModal';
import { CiEdit } from "react-icons/ci";

const Referances = () => {
    const [referances, setRefarances] = useState([])
    useEffect(() => {


        apiCallFun()
    }, [])
    const apiCallFun = async () => {

        const subjectS = await axios.get(`${url}/api/notes/allarticles`)
        if (subjectS?.data) {
            setRefarances(subjectS?.data?.data)
        }
    }
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const handleOpen = () => setOpen(true);
    const handleClose = (hasChanged) => {
        setOpen(false);
        if (hasChanged) {

            apiCallFun();
        }
    };

    const handleEdit = (data) => {
        setEditData(data);
        handleOpen();
    };
    return (

        <div className='flex w-full flex-col p-5'>
            {open && <RefaranceModal
                open={open}
                handleClose={handleClose}
                initialData={editData}
            />}

            <button className='bg-black shadow-md w-max p-2 rounded-md font-bold text-white m-3 gap-2 flex items-center ' onClick={handleOpen}><span>Create</span><IoIosAddCircleOutline className='text-white font-bold h-6 w-6' /></button>
            <div>
                {referances.length === 0 ? <span> Loading...</span> : referances?.map((article, ind) => (
                    <div key={ind} className='m-4 p-4 border-[1px] border-gray-300 h-max w-[90%] shadow-md'>
                        <div><FaLink className='h-14 w-14' />
                            <p className='underline text-blue-300 text-3xl hover:cursor-pointer' onClick={() => window.location.href = article.URL}>{article.URL}</p>
                        </div>
                        <p className='text-lg font-bold '>{article.Description}</p>
                        <span className='mt-3 flex h-max text-gray w-max p-2 font-semibold text-xs bg-green-100 rounded-2xl' >{article?.subject?.subjectName}</span>

                        <div className='flex justify-between p-4'>
                            {article?.type === 'video' ?
                                <div className='flex gap-2 p-1 items-center  justify-center max-w-24 w-full '>
                                    <MdOutlineOndemandVideo className='text-red-800 size-7' />
                                    <span className='mt-3 flex h-max text-gray w-max p-2 font-semibold text-xs bg-red-100 rounded-2xl' >
                                        {article?.type}</span>
                                </div> :
                                <div className=' items-center justify-center max-w-24 w-full flex p-2 gap-2 '>
                                    <RiArticleLine className='text-blue-800 size-7' />
                                    <span className='mt-3 flex h-max text-gray w-max p-2 font-semibold text-xs bg-blue-600 rounded-2xl' >
                                        {article?.type}</span>
                                </div>}
                            <button className='bg-yellow-300 text-white flex justify-center items-center h-10 border-[1px] shadow-md rounded-md w-32 p-2 hover:cursor-pointer'
                                onClick={() => handleEdit(article)}>Edit <CiEdit /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Referances