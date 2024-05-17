import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { url } from '../utils/BackEndUrl';
import toast from 'react-hot-toast';
import { IoIosAddCircleOutline } from 'react-icons/io';

const FeeDetailModal = ({ open, handleClose, initialData, editAllow }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxWidth: 500,
        bgcolor: 'background.paper',
       
        
        boxShadow: 24,
        p: 4,
    };

    const [courses, setCourses] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [users, setUsers] = useState([]);
    const [feeAmount, setFeeAmount] = useState(0);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState('credited'); // Default to credited
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            const coursesResponse = await axios.get(`${url}/api/course/allCourse`);
            setCourses(coursesResponse?.data?.courses || []);
        };

        const fetchDepartments = async () => {
            const departmentsResponse = await axios.get(`${url}/api/department/allDepartment/${selectedCourse}`);
            setDepartments(departmentsResponse?.data?.department || []);
        };

        const fetchUsers = async () => {
            const usersResponse = await axios.get(`${url}/api/user/getalluser?Department=${selectedDepartment}`);
            setUsers(usersResponse?.data?.users || []);
        };

        fetchCourses();

        fetchDepartments();
        if (selectedDepartment) {
            fetchUsers();
        }


    }, [selectedCourse,selectedDepartment]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const newFee = {
                courseId: selectedCourse,
                departmentId: selectedDepartment,
                userId: selectedUser,
                transactionId: transactionId,
                paymentMethod: paymentMethod,
                type: type,
                description: description,
                paidAmount: feeAmount,
            };
            console.log(newFee)

            const createFeeResponse = await axios.post(`${url}/api/fees/create`, newFee);

            if (createFeeResponse?.data?.success) {
                toast.success(createFeeResponse?.data?.message);
                handleClose(true);
            }
        } catch (error) {
            console.error('Error creating fee:', error);
            toast.error('Error creating fee. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div> <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
                    <div className="flex gap-4 items-center justify-between">

                        <label htmlFor="course" className="text-gray-600">Course</label>
                        <select id="course" value={selectedCourse} className="bg-red h-10 w-48 shadow-md rounded-lg bg-black text-white shadow-gray-300 text-sm outline-none p-1" onChange={(e) => setSelectedCourse(e.target.value)} >
                            <option value="">Select Course</option>
                            {courses.map((course) => (
                                <option key={course._id} value={course._id}>
                                    {course.CourseName}
                                </option>
                            ))}
                        </select>

                    </div>


                    <div className="flex gap-4 items-center justify-between" >
                        <label htmlFor="department" className="text-gray-600">Department</label>
                        <select id="department" value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)} className="bg-red h-10 w-48 shadow-md rounded-lg bg-black text-white shadow-gray-300 text-sm outline-none p-1">
                            <option value=""  >Select Department</option>
                            {departments?.map((dept) => (
                                <option key={dept?._id} value={dept?._id}>
                                    {dept?.DepartmentName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-4 items-center justify-between">
                        <label htmlFor="department" className="text-gray-600">Student</label>
                        <select id="user" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} className="bg-red h-10 w-48 shadow-md rounded-lg bg-black text-white shadow-gray-300 text-sm outline-none p-1">
                            {users.length > 0 ? (
                                <>
                                    <option value="">Select RegdNo</option>
                                    {users.map((user) => (
                                        <option key={user?._id} value={user?._id}>
                                            {user?.RegdNo}
                                        </option>
                                    ))}
                                </>
                            ) : (
                                <option value="" disabled>No users found</option>
                            )}
                        </select>
                    </div>
                    <div className="flex gap-4 items-center justify-between">
                        <label htmlFor="amount">Amount</label>
                        <input type="number" id="amount" className="bg-red h-10 w-48 shadow-md rounded-lg bg-black text-white shadow-gray-300 text-sm outline-none p-1" value={feeAmount} onChange={(e) => setFeeAmount(e.target.value)} required />
                    </div>
                    <div className="flex gap-4 items-center justify-between">
                        <label htmlFor="paymentMethod">Payment Method</label>
                        <select id="paymentMethod" value={paymentMethod} className="bg-red h-10 w-48 shadow-md rounded-lg bg-black text-white shadow-gray-300 text-sm outline-none p-1" onChange={(e) => setPaymentMethod(e.target.value)} required>
                        <option value="" disabled>
                                        Select Method
                                    </option>
                            <option value="Online">Online</option>
                            <option value="UPI">UPI</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Debit Card">Debit Card</option>
                            <option value="Cash">Cash</option>
                            <option value="College">College</option>

                        </select>
                    </div>
                    <div className="flex gap-4 items-center justify-between">
                        <label htmlFor="transactionId">Transaction ID</label>
                        <input type="text" id="transactionId" className="bg-red h-10 w-48 shadow-md rounded-lg bg-black text-white shadow-gray-300 text-sm outline-none p-1" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} required />

                    </div>
                    <div className="flex gap-4 items-center justify-between">
                        <label htmlFor="type">Type</label>
                        <select id="type" value={type} onChange={(e) => setType(e.target.value)} className="bg-red h-10 w-48 shadow-md rounded-lg bg-black text-white shadow-gray-300 text-sm outline-none p-1" required>
                            <option value="credited">Credited</option>
                            <option value="debited">Debited</option>
                        </select></div>

                    <div className="flex gap-4 items-center justify-between">
                        <label htmlFor="description">Description</label>
                        <input type="text" id="description" value={description} className="bg-red h-10 w-48 shadow-md rounded-lg bg-black text-white shadow-gray-300 text-sm outline-none p-1" onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className='flex justify-center  items-center w-full'>
                        <button type="submit" className=' bg-blue-400 h-max text-white w-max p-3 font-bold rounded-md shadow-md border  '>{loading ? 'Loading...' : 'CREATE'}</button>
                    </div>

                </form>
            </Box>
        </Modal></div>
    )
}

export default FeeDetailModal