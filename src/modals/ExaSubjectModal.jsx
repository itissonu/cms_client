import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { url } from '../utils/BackEndUrl';
import toast from 'react-hot-toast';
import { IoIosAddCircleOutline } from 'react-icons/io';

const ExaSubjectModal = ({ open, handleClose, initialData, editAllow }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [formData, setFormData] = useState({
        subject: '',
        Course: '',
        DepartmentName: '',
        semester: '',
        subjectValue: '',
        examCategory: '',
        fullmark: 0,
    });

    const [courses, setCourses] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [subject, setSubject] = useState([]);
    const [examtypes, setExamtypes] = useState([]);

    useEffect(() => {
        if (initialData && editAllow) {
            console.log(initialData)
            setFormData({ ...formData,
                subject: initialData?.subject?._id,
                Course: initialData?.Course?._id,
                DepartmentName: initialData?.DepartmentName?._id,
                semester:initialData?.semester,
                examCategory:initialData?.examCategory?._id,
                fullmark:initialData?.fullmark
               
            });
        } else {
            setFormData({
                subject: '',
                Course: '',
                DepartmentName: '',
                ...formData,
            });
        }
    }, [initialData]);
    console.log(formData)

    useEffect(() => {
        const fetchCoursesAndDepartments = async () => {
            const examtypesRes = await axios.get(`${url}/api/examType/getallexamtypes`);
            setExamtypes(examtypesRes?.data?.allTypes);

            try {
                const coursesResponse = await axios.get(`${url}/api/course/allCourse`);
                setCourses(coursesResponse?.data?.courses || []);
                    let departmentsResponse
                    if (initialData) {
                        departmentsResponse = await axios.get(`${url}/api/department/allDepartment/${formData.Course}`);
                    }
                if (formData.Course) {
                    departmentsResponse = await axios.get(
                        `${url}/api/department/allDepartment/${formData.Course}`
                    );
                    setDepartments(departmentsResponse?.data?.department || []);
                }
            } catch (error) {
                console.error('Error fetching courses and departments:', error);
            }
        };
        const fetchSubject = async () => {
            try {
                if (formData.Course && formData.DepartmentName && formData.semester) {
                    const subjectRes = await axios.get(
                        `${url}/api/subject/allSubject/${formData.DepartmentName}/${formData.semester}`
                    );

                    setSubject(subjectRes?.data?.subjects);
                }
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };
        fetchSubject();
        fetchCoursesAndDepartments();
    }, [formData.Course, formData.DepartmentName, formData.semester]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let examSubjectRes;
            const newData = { ...formData };

            if (initialData && editAllow) {
                examSubjectRes = await axios.put(
                    `${url}/api/examSubject/editexamsubjects/${initialData._id}`,
                    newData
                );
            } else {
                examSubjectRes = await axios.post(`${url}/api/examSubject/creatAExamsubject`, newData, {
                    withCredentials: true,
                });
            }

            if (examSubjectRes?.data?.success) {
                toast.success(examSubjectRes?.data?.message);
                setFormData({
                    subject: '',
                    Course: '',
                    DepartmentName: '',
                    semester: '',
                   
                    examCategory: '',
                    fullmark: 0,
                });
                handleClose(true);
            }
        } catch (error) {
            if (error.response) {
                console.log('Error creating/updating exam subject:', error.response.data.message);
                toast.error(error.response.data.message);
            }
            console.error('Error creating/updating exam subject:', error);
        } finally {
            setLoading(false);
            handleClose(false);
        }
    };

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
                                <label htmlFor="Course" className="text-gray-600">
                                    Course
                                </label>
                                <select
                                    name="Course"
                                    value={formData.Course}
                                    onChange={handleChange}
                                    className="bg-red h-10 w-40 shadow-md rounded-lg bg-black text-white shadow-gray-300 text-sm outline-none p-1"
                                >
                                    <option value="" disabled>
                                        Select Course
                                    </option>
                                    {courses.map((course) => (
                                        <option key={course._id} value={course._id}>
                                            {course.CourseName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex gap-4 items-center justify-between">
                                <label htmlFor="DepartmentName" className="text-gray-600">
                                    Department
                                </label>
                                <select
                                    name="DepartmentName"
                                    value={formData.DepartmentName}
                                    onChange={handleChange}
                                    className="bg-red h-10 w-40 shadow-md rounded-lg bg-black text-white shadow-gray-300 text-sm outline-none p-1"
                                >
                                    <option value="" disabled>
                                        Select Department
                                    </option>
                                    {departments.map((department) => (
                                        <option key={department._id} value={department._id}>
                                            {department.DepartmentName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex gap-4 items-center justify-between'>
                                <label htmlFor="semester" className="text-lg text-gray-400 ">Semester</label>

                                <select onChange={handleChange} name="semester" value={formData.semester}   className="bg-red h-10 w-40 shadow-md rounded-lg bg-black text-white shadow-gray-300 text-sm outline-none p-1">
                                    <option value="" disabled selected>Select Semester</option>

                                    <option key='1' value={1}>
                                        First
                                    </option>
                                    <option key='2' value={2}>
                                        Second
                                    </option>
                                    <option key='3' value={3}>
                                        Third
                                    </option>
                                    <option key='4' value={4}>
                                        Fourth
                                    </option>
                                    <option key='5' value={5}>
                                        Fifth
                                    </option>
                                    <option key='6' value={6}>
                                        Six
                                    </option>

                                </select>
                            </div>
                            <div className="flex gap-4 items-center justify-between">
                                <label htmlFor="subject" className="text-gray-600">
                                    Subject Name
                                </label>
                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="bg-red h-10 w-40 shadow-md rounded-lg bg-black text-white shadow-gray-300 text-sm outline-none p-1"
                                >
                                    <option value="" disabled>
                                        Select subject
                                    </option>
                                    {subject.map((subject) => (
                                        <option key={subject._id} value={subject._id}>
                                            {subject.subjectName}
                                        </option>
                                    ))}
                                </select>

                            </div>
                           
                          
                            <div className='flex gap-4 items-center justify-between'>
                                <label htmlFor="examCategorye" className="text-lg text-gray-400 ">Exam Type</label>
                                <select
                                    name="examCategory"
                                    value={formData.examCategory}
                                    onChange={handleChange}
                                    className="bg-red h-10 w-40 shadow-md rounded-lg bg-black text-white shadow-gray-300 text-sm outline-none p-1"
                                >
                                    <option value="" disabled>
                                        Select Exam Type
                                    </option>
                                    {examtypes.map((exam) => (
                                        <option key={exam._id} value={exam._id}>
                                            {exam?.ExamType}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex gap-4 items-center justify-between">
                                <label htmlFor="mark" className="text-gray-600">
                                    Mark
                                </label>
                                <input
                                    type="number"
                                    name="fullmark"
                                    value={formData.fullmark}
                                    onChange={handleChange}
                                    className="w-40 p-1 h-10 bg-gray-50 rounded-sm border-2 border-gray-400"
                                    required
                                />
                            </div>
                            <div className="w-full justify-center flex"></div>
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

export default ExaSubjectModal;
