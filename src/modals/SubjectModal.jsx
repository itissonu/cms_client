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
const SubjectModal = ({ open, handleClose, initialData,editAllow }) => {

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

    const [departments, setDepartments] = useState([]);
    const [departmentValue, setDepartmentsValue] = useState(null)
    const [courses, setCourses] = useState([]);
    const [courseValue, setCourseValue] = useState(null)
    const [loading, setLoading] = useState(false)
    const [formValue, setFormValue] = useState({})

    useEffect(() => {
        if (initialData && editAllow) {
            
            const { SubjectCode, subjectName,Credits,Semester} = initialData;
          
            setFormValue({ SubjectCode, subjectName ,Credits,Semester});
            setDepartmentsValue(initialData.Department._id);
            setCourseValue(initialData.Course._id
            );
        }
    }, [])
    useEffect(() => {
        const cllApi = async () => {
            const cousreRes = await axios.get(`${url}/api/course/allCourse`);
            if (cousreRes) {
                setCourses(cousreRes?.data?.courses)
            }
            if (courseValue) {
                const departmentRes = await axios.get(`${url}/api/department/allDepartment/${courseValue}`);
                if (departmentRes) {
                    setDepartments(departmentRes?.data?.department)
                }
            }


        }
        cllApi()


    }, [courseValue, initialData])
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
            Course: courseValue,
            Department: departmentValue
        }


        try {
            let subRes;
            console.log(newData)
            if (initialData) {
                subRes = await axios.put(`${url}/api/subject/subjectsupdate/${initialData._id}`, newData, {
                    withCredentials: true,
                });
            } else {
               
                subRes = await axios.post(`${url}/api/subject/newSubject`, newData, {
                    withCredentials: true,
                });
               
            }
            if (subRes?.data?.success) {
                toast.success(subRes?.data?.message);
                setFormValue({});
                handleClose(true);
            }
            
        } catch (error) {
            if (error.response) {
                console.log('Error creating/updating note:', error.response.data.message);
                toast.error(error.response.data.message); 
            }
           // toast.error(error)
            console.log('Error creating note:', error.response.data.message);
        } finally {
            setLoading(false);
            handleClose(false)
        }

    }

    return (
        <div> <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-3'>
                        <div className='flex gap-4 items-center justify-between'>
                            <label htmlFor="lunch" className=" text-gray-600 ">Course</label>
                            <select onChange={(e) => setCourseValue(e.target.value)} className="bg-red h-10 w-40 shadow-md rounded-lg bg-black text-white shadow-gray-300 text-sm outline-none p-1">
                                {courses.length !== 0 && courses.map((course) => (
                                    <option key={course._id} value={course._id}>
                                        {course?.CourseName}
                                    </option>
                                ))}
                            </select>
                        </div>
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

                        <div className='w-full flex justify-between'>
                            <div className='flex justify-center gap-3 items-center'>

                                <span>Subject Code</span>
                            </div>
                            <input name='SubjectCode' type='text' onChange={handleChange} value={formValue.SubjectCode} className='w-40 p-1 h-10 bg-gray-50 rounded-sm border-2 border-gray-400  ' required />
                        </div>
                        <div className='w-full flex justify-between'>
                            <div className='flex justify-center gap-3 items-center'>

                                <span>Credits</span>
                            </div>
                            <input name='Credits' type='number' onChange={handleChange} value={formValue.Credits} className='w-40 p-1 h-10 bg-gray-50 rounded-sm border-2 border-gray-400  ' required />
                        </div>
                        <div className='w-full flex justify-between'>
                            <div className='flex justify-center gap-3 items-center'>

                                <span>Semester</span>
                            </div>
                            <input name='Semester' type='number' onChange={handleChange} value={formValue.Semester} className='w-40 p-1 h-10 bg-gray-50 rounded-sm border-2 border-gray-400  ' required />
                        </div>
                        <div className='w-full flex justify-between'>
                            <div className='flex justify-center gap-3 items-center'>

                                <span>Description</span>
                            </div>
                            <input name='subjectName' type='text' onChange={handleChange} value={formValue.subjectName} className='w-40 p-1 h-10 bg-gray-50 rounded-sm border-2 border-gray-400  ' required />
                        </div>

                        <div className='w-full justify-center flex'>
                            <button className='bg-sky-300 text-white flex justify-center items-center h-10 border-[1px] shadow-md rounded-md w-32 p-2 hover:cursor-pointer' type='submit'>{loading ? <span className='h-6 w-6 rounded-full border-b-2 border-white animate-spin flex '></span> : <div className='flex gap-2 justify-center items-center'>Add<IoIosAddCircleOutline className='text-white' /></div>}</button>
                        </div>

                    </div>
                </form>
            </Box>
        </Modal></div>
    )
}

export default SubjectModal