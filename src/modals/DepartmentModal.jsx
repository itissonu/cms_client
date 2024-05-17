import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { url } from '../utils/BackEndUrl';
import toast from 'react-hot-toast';
import { IoIosAddCircleOutline } from 'react-icons/io';

const DepartmentModal = ({ open, handleClose, initialData, editAllow }) => {
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
    const [courses, setCourses] = useState([]);
    const [DepartmentName, setDepartment] = useState('')
    const [courseValue, setCourseValue] = useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (initialData && editAllow) {

            const { DepartmentName, Course } = initialData;
            setDepartment(DepartmentName);
            setCourseValue(Course._id
            );
        }
    }, [initialData])

    useEffect(() => {
        const fetchCourses = async () => {
            const coursesResponse = await axios.get(`${url}/api/course/allCourse`);
            setCourses(coursesResponse?.data?.courses || []);

        };
        fetchCourses()

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (initialData && editAllow) {
                const newData = {
                    DepartmentName: DepartmentName,
                    Course: courseValue
                }
                const Departments = await axios.put(`${url}/api/department/editdepartments/${initialData?._id}`, newData);
                if (Departments?.data?.success) {
                    handleClose(true);
                  return  toast.success(Departments?.data?.message)
                }
               
            }else{const newData = {
                DepartmentName: DepartmentName,
                Course: courseValue
            }
            const Departments = await axios.post(`${url}/api/department/newDepartment`, newData);
            if (Departments?.data?.success) {
                toast.success(Departments?.data?.message)
            }
            handleClose(true);}
            
        } catch (error) {
            if (error.response) {
                console.log('Error creating/updating department:', error.response.data.message);
                toast.error(error.response.data.message);
            }
            console.log('Error creating Department:', error.response.data.message);
        } finally {
            setLoading(false);
            handleClose(false)
        }
    }
    return (
        <div><Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-4 items-center justify-between">
                            <label htmlFor="Course" className="text-gray-600">
                                Course
                            </label>
                            <select onChange={(e) => setCourseValue(e.target.value)} className="bg-red h-10 w-40 shadow-md rounded-lg bg-black text-white shadow-gray-300 text-sm outline-none p-1" required>
                                <option value="" disabled selected>Select Course</option>
                                {courses.length !== 0 && courses.map((course) => (
                                    <option key={course._id} value={course._id}>
                                        {course?.CourseName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex gap-4 items-center justify-between">
                            <label htmlFor="DepartmentName" className="text-gray-600">
                                Department
                            </label>
                            <input name='DepartmentName' id='DepartmentName' type='text' value={DepartmentName} onChange={(e) => setDepartment(e.target.value)} className="bg-red h-10 w-40 shadow-md rounded-lg bg-black text-white shadow-gray-300 text-sm outline-none p-1" required />

                        </div>


                        <div className="w-full justify-center flex">
                            <button
                                type="submit"
                                className="bg-sky-300 text-white flex justify-center items-center h-10 border-[1px] shadow-md rounded-md w-32 p-2 hover:cursor-pointer"
                            >
                                {loading ? (
                                    <span className="h-6 w-6 rounded-full border-b-2 border-white animate-spin flex"></span>
                                ) : (
                                    <div className="flex gap-2 justify-center items-center">
                                        Add<IoIosAddCircleOutline className="text-white" />
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </Box>
        </Modal></div>
    )
}

export default DepartmentModal