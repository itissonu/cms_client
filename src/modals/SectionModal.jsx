import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { url } from '../utils/BackEndUrl';
import toast from 'react-hot-toast';
import { IoIosAddCircleOutline } from 'react-icons/io';

const SectionModal = ({ open, handleClose, initialData, editAllow }) => {
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

    const [sectionName, setSectionName] = useState('');
    const [courseId, setCourseId] = useState('');
    const [departmentId, setDepartmentId] = useState('');
    const [courses, setCourses] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData && editAllow) {
            setSectionName(initialData.SectionName);
            setCourseId(initialData.Course._id);
            setDepartmentId(initialData.DepartmentName._id);
        } else {
            setSectionName('');
            setCourseId('');
            setDepartmentId('');
        }
    }, [initialData]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${url}/api/course/allCourse`);
                setCourses(response?.data?.courses || []);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        const fetchDepartments = async () => {
            try {
                let response
                if (initialData) {
                    response = await axios.get(`${url}/api/department/allDepartment/${courseId}`);
                }
                response = await axios.get(`${url}/api/department/allDepartment/${courseId}`);
                setDepartments(response?.data?.department || []);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };

        fetchCourses();
        fetchDepartments();
    }, [initialData,courseId,departmentId]);

    const handleChange = (e) => {
        if (e.target.name === 'courseId') {
            setCourseId(e.target.value);
            setDepartmentId('');
        } else if (e.target.name === 'departmentId') {
            setDepartmentId(e.target.value);
        } else {
            setSectionName(e.target.value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let sectionRes;
            if (initialData && editAllow) {
                const newData = { SectionName: sectionName, Course: courseId, DepartmentName: departmentId }
                sectionRes = await axios.put(
                    `${url}/api/section/sections/${initialData._id}`,
                    newData
                );
            } else {
                const newData = { SectionName: sectionName, Course: courseId, DepartmentName: departmentId }
                sectionRes = await axios.post(
                    `${url}/api/section/newSection`,newData,
                    { withCredentials: true }
                );
            }
            if (sectionRes?.data?.success) {
                toast.success(sectionRes?.data?.message);
                setSectionName('');
                setCourseId('');
                setDepartmentId('');
                handleClose(true);
            }
        } catch (error) {
            if (error.response) {
                console.log('Error creating/updating note:', error.response.data.message);
                toast.error(error.response.data.message);
            }
            console.error('Error creating/updating section:', error);
        } finally {
            setLoading(false);
            handleClose(false);
        }
    };
    useEffect(() => {
        if (!open) {
            setSectionName('');
            setCourseId('');
            setDepartmentId('');
        }
    }, [open]);
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
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-4 items-center justify-between">
                                <label htmlFor="courseId" className="text-gray-600">Course</label>
                                <select
                                    name="courseId"
                                    value={courseId}
                                    onChange={handleChange}
                                    className="bg-red h-10 w-40 shadow-md rounded-lg bg-black text-white shadow-gray-300 text-sm outline-none p-1"
                                >
                                    <option value="" disabled>Select Course</option>
                                    {courses.map((course) => (
                                        <option key={course._id} value={course._id}>
                                            {course.CourseName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex gap-4 items-center justify-between">
                                <label htmlFor="departmentId" className="text-gray-600">Department</label>
                                <select
                                    name="departmentId"
                                    value={departmentId}
                                    onChange={handleChange}
                                    className="bg-red h-10 w-40 shadow-md rounded-lg bg-black text-white shadow-gray-300 text-sm outline-none p-1"
                                >
                                    <option value="" disabled>Select Department</option>
                                    {departments.map((department) => (
                                        <option key={department._id} value={department._id}>
                                            {department.DepartmentName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex gap-4 items-center justify-between">
                                <label htmlFor="sectionName" className="text-gray-600">Section Name</label>
                                <input
                                    type="text"
                                    name="sectionName"
                                    value={sectionName}
                                    onChange={handleChange}
                                    className="w-40 p-1 h-10 bg-gray-50 rounded-sm border-2 border-gray-400"
                                    required placeholder='eg:G1,G2...'
                                />
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
            </Modal>
        </div>
    );
};

export default SectionModal;
