import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { url } from '../utils/BackEndUrl';
import { FaLink } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import { IoIosAddCircleOutline } from 'react-icons/io';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 400,
    bgcolor: 'background.paper',
  
    boxShadow: 24,
    p: 4,
};


const RefaranceModal = ({ open, handleClose ,initialData}) => {
    const [departments, setDepartments] = useState([]);
    const [departmentValue, setDepartmentsValue] = useState(null)
    const [subject, setSubject] = useState([]);
    const [subjectValue, setSubjectValue] = useState(null);
    const [loading, setLoading] = useState(false)
    const [formValue, setFormValue] = useState({})

    useEffect(()=>{
        if (initialData) {
            console.log(initialData)
            const { URL, Description, type } = initialData;
            setFormValue({ URL, Description, type });
           
            setDepartmentsValue(initialData.DepartmentName);
            setSubjectValue(initialData.subject.subjectName);
        }
    },[])
    useEffect(() => {
        const cllApi = async () => {


            const departmentRes = await axios.get(`${url}/api/department/allDepartment`);
            if (departmentRes) {
                setDepartments(departmentRes?.data?.department)
            }
            if (departmentValue) {

                const subjectS = await axios.get(`${url}/api/subject/allSubject/${departmentValue}/1`);

                setSubject(subjectS?.data?.subjects)
            }

        }
        cllApi()
       

    }, [departmentValue,initialData])
    const handleChange = async (e) => {
        setFormValue(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const newData = {
            ...formValue,
            subject: subjectValue,
            DepartmentName: departmentValue
        }

        
        try {
            let noteRes;
            if (initialData) {
                noteRes = await axios.put(`${url}/api/notes/editNote/${initialData._id}`, newData);
            } else {
                noteRes = await axios.post(`${url}/api/notes/createNote`, newData);
            }
            if (noteRes?.data?.success) {
                toast.success(noteRes?.data?.message);
                setFormValue({}); 
                handleClose(true);
            }
        } catch (error) {
            console.error('Error creating note:', error);
        } finally {
            setLoading(false);
            handleClose(false) 
        }

    }
    return (
        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-3'>
                            <div className='flex gap-4 items-center justify-between'>
                                <label htmlFor="lunch" className=" text-gray-600 ">Department</label>
                                <select onChange={(e) => setDepartmentsValue(e.target.value)} value={departmentValue} className="bg-red h-10 w-40 shadow-md rounded-lg bg-black text-white shadow-gray-300 text-sm outline-none p-1">
                                    <option value="" disabled selected>Select Department</option>
                                    {departments.length !== 0 && departments.map((department) => (
                                        <option key={department._id} value={department._id}>
                                            {department?.DepartmentName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex gap-4 items-center justify-between'>
                                <label htmlFor="lunch" className=" text-gray-600 ">Subject</label>
                                <select onChange={(e) => setSubjectValue(e.target.value)} value={subjectValue} className="bg-red h-10 w-40 shadow-md rounded-lg bg-black text-white shadow-gray-300  outline-none p-1">
                                    <option value="" disabled selected>Select Subject</option>
                                    {subject.length !== 0 && subject.map((sub) => (
                                        <option key={sub._id} value={sub._id}>
                                            {sub?.subjectName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='w-full flex justify-between'>
                                <div className='flex justify-center gap-3 items-center'>
                                    <span ><FaLink className='h-14 w-14' /></span>
                                    <span>URL</span>
                                </div>
                                <input name='URL' type='url' onChange={handleChange} value={formValue.URL} className='w-40 p-1 h-10 bg-gray-50 rounded-sm border-2 border-gray-400  ' required />
                            </div>
                            <div className='w-full flex justify-between'>
                                <div className='flex justify-center gap-3 items-center'>
                                    <span ><FaLink className='h-14 w-14' /></span>
                                    <span>Description</span>
                                </div>
                                <textarea name='Description' type='text' onChange={handleChange} value={formValue.Description} className='w-40 p-1 h-40 bg-gray-50 rounded-sm border-2 border-gray-400  ' required/>
                            </div>
                            <div className='w-full flex justify-between'>
                                <label htmlFor="lunch" className=" text-gray-600 ">Type</label>
                                <select onChange={handleChange} name='type' id='type'  value={formValue.type} className="bg-red h-10 w-40 shadow-md rounded-lg bg-black text-white shadow-gray-300  outline-none p-1" required>
                                    <option value="" disabled selected>Select type</option>

                                    <option value="video">
                                        Video
                                    </option>
                                    <option value="article">
                                        Article
                                    </option>

                                </select>
                            </div>
                            <div className='w-full justify-center flex'>
                                <button className='bg-sky-300 text-white flex justify-center items-center h-10 border-[1px] shadow-md rounded-md w-32 p-2 hover:cursor-pointer' type='submit'>{loading ? <span className='h-6 w-6 rounded-full border-b-2 border-white animate-spin flex '></span> : <div className='flex gap-2 justify-center items-center'>Add<IoIosAddCircleOutline className='text-white' /></div>}</button>
                            </div>

                        </div>
                    </form>
                </Box>
            </Modal>

        </div>
    )
}

export default RefaranceModal