import React, { useEffect, useState } from 'react'
import logo from "../assets/login.jpg";
import { FaBook } from "react-icons/fa6";
import { MdPersonOutline } from "react-icons/md";
import Chart from 'react-apexcharts';
import { ApexChart } from '../cards/ApexChart';
import { ApexChart2 } from '../cards/ApexChart';
import DateCalendarServerRequest from '../cards/ApexChart';
import axios from 'axios';
import { url } from '../utils/BackEndUrl';
import { useNavigate } from 'react-router-dom';
const ProfilePage = () => {
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState({})
    const [userAttandance, setUserAttandance] = useState({})
    const totalAttendance = Object?.values(userAttandance)?.reduce(
        (total, record) => total + record.present + record.absent
        ,
        0 // Initial value
    );
    const presentAttendance = Object?.values(userAttandance)?.reduce(
        (total, record) => total + record.present
        ,
        0 // Initial value
    );

    const user = JSON.parse(localStorage.getItem("user"))
    const getAttandaceDetails = async () => {
        try {
            const { data } = await axios.get(`${url}/api/attendance/allatt`, { id: user?._id });
            setUserAttandance(data?.attendanceBySubject)
        } catch (error) {
            console.log('error', error)
        }
    }
    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const { data } = await axios.get(`${url}/api/user/singleuser/${user?._id}`);
                setUserDetails(data?.user)
            } catch (error) {
                console.log('error', error)
            }
        }
        getUserDetails()
        getAttandaceDetails()
    }, [])

    return (
        <div className='bg-gray-200  flex justify-center items-center h-screen'>
            <div className='w-[92%] h-[90%] flex flex-col gap-10 bg-white overflow-y-auto overflow-hidden custom-scrollbar rounded-lg shadow-md'>
                <div className='w-full md:flex-row flex-col flex h-fit'>
                    <div className='md:w-[50%] w-full h-full pb-2  flex justify-center items-center '>
                        <div className='w-[95%] h-[90%]  '>
                            <div className='w-full md:h-[37%] h-[50%] flex flex-col md:flex-row items-center'>
                                <div className='md:w-[40%] w-full h-[70%] md:h-full p-2'>
                                    <img src={userDetails?.profilePic} className='w-44 h-44 rounded-full object-cover' alt="" />

                                </div>
                                <div className='md:w-[60%] w-full flex flex-col gap-2 h-[30%] md:h-full p-2'>
                                    <span className='w-full gap-4 md:px-4 justify-end  flex bg-gray-200 rounded-lg h-10 items-center'>{userDetails?.personalDetails?.FirstName + " " + userDetails?.personalDetails?.MiddleName + " " + userDetails?.personalDetails?.LastName}</span>
                                    <div className='w-full flex justify-end'>
                                        <span>gula</span>
                                        <span className='w-[30%] font-bold gap-4 px-4 justify-center  flex bg-green-500 text-white rounded-lg h-8 items-center'>{userDetails?.isActive ? "active" : "inActive"}</span>

                                    </div>
                                </div>

                            </div>
                            <div className='md:h-[63%] h-[50%] w-full text-xs md:text-base flex flex-col gap-2  '>
                                <div className='w-full pl-4 rounded-md py-2  h-10 flex bg-sky-100  items-center'>
                                    <span className='w-[35%] font-semibold'>Registration No</span>
                                    <span className='w-[65%]'>{userDetails?.RegdNo}</span>
                                </div>
                                <div className='w-full pl-4 py-2 rounded-md   h-10 flex bg-gray-100 items-center'>
                                    <span className='w-[35%] font-semibold'>Course</span>
                                    <span className='w-[65%]'>{userDetails?.Course?.CourseName}</span>
                                </div>
                                <div className='w-full pl-4 py-2 rounded-md   h-10 flex bg-sky-100  items-center'>
                                    <span className='w-[35%] font-semibold'>Batch</span>
                                    <span className='w-[65%]'>{userDetails?.Batch}</span>
                                </div>
                                <div className='w-full pl-4 py-2 rounded-md   h-10 flex bg-gray-100   items-center'>
                                    <span className='w-[35%] font-semibold'>Section</span>
                                    <span className='w-[65%]'>{userDetails?.Section?.SectionName}</span>
                                </div>
                                <div className='w-full pl-4 py-2 rounded-md   h-10 flex bg-sky-100  items-center'>
                                    <span className='w-[35%] font-semibold'>Email ID</span>
                                    <span className='w-[65%]'>{userDetails?.email}</span>
                                </div>
                                <div className='w-full pl-4 py-2 rounded-md   h-10 flex bg-gray-100   items-center'>
                                    <span className='w-[35%] font-semibold'>Mobile No</span>
                                    <span className='w-[65%]'>{userDetails?.PhoneNo}</span>
                                </div>
                                <div className='w-full pl-4 py-2 rounded-md   h-10 flex bg-sky-100   items-center'>
                                    <span className='w-[35%] font-semibold'>Department</span>
                                    <span className='w-[65%]'>{userDetails?.Department?.DepartmentName}</span>
                                </div>
                                <div className='w-full pl-4 py-2 rounded-md justify-end  h-8jutg.0ounnnnnnhi flex   items-center'>
                                    <button onClick={() => { navigate(`/details/:${user._id}`) }} className='md:w-[25%] w-full font-semibold bg-gray-100 border-2 border-gray-200 shadow-md hover:bg-gray-300 rounded-md p-2'>More Info</button>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='md:w-[50%] w-full h-full flex flex-col bg-white'>
                        <div   onClick={() => navigate('/overview')}
                         className='w-full md:h-[65%] h-full flex justify-center items-center cursor-pointer'>
                            <div className='w-[90%] h-[80%] rounded-md border-b-2 border-l-2 border-r-2 '>
                                <span className='h-12 font-bold text-md p-4 text-center flex bg-gray-200 '>
                                    Attandacne overview
                                </span>
                                <div className='w-full md:h-[95%] h-full  flex flex-col md:flex-row pl-2 '>
                                    <div className='md:h-full h-[33%] md:w-[35%] w-full flex  text-black items-center '>
                                        <ApexChart totalAttendance={totalAttendance} presentAttendance={presentAttendance} />
                                    </div>
                                    <div className='flex md:w-[65%] w-full justify-center items-center h-full py-4  md:h-full'>
                                        <div className='md:h-[70%] h-full  w-full flex md:flex-row md:flex-wrap flex-col '>
                                            {
                                                Object?.values(userAttandance)?.map((item,ind) => (
                                                    <div key={ind} className='md:w-[50%] w-full  flex items-center  gap-4 '>
                                                        <span className='md:p-4 p-2 rounded-full  text-white bg-lime-300'><FaBook /> </span>
                                                        <div className='md:font-bold text-xs '>
                                                            <span className='flex gap-2 justify-center items-center'>{(item?.present * 100) / (item?.present + item?.absent) || 0} % <MdPersonOutline size={22} /></span>
                                                            <span className='flex gap-2 justify-center text-center  text-xs items-center'>{item?.subjectId}</span>
                                                        </div>
                                                    </div>
                                                ))
                                            }



                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full md:h-[35%] h-full flex flex-col gap-3 justify-between items-center'>
                            <span>Fee Structure</span>
                            <div className='flex gap-2 justify-center flex-col md:flex-row items-center'>
                                <ApexChart2 dueAmout={userDetails?.DueAmount} />
                                <span>Total : 100000</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex md:flex-col h-full flex-row  w-full'>
                    <div className='md:w-[50%] w-full h-full'>
                        <DateCalendarServerRequest />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
