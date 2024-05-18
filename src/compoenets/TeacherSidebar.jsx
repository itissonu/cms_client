import React from 'react'
import { IoMdExit } from "react-icons/io";
import { IoSchool } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FaBook } from "react-icons/fa6";
import { CiVideoOn, CiBellOn } from "react-icons/ci";
import { useLocation, useNavigate } from 'react-router-dom';
import { PiStudentFill } from "react-icons/pi";
import { FaCalendarAlt } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { LuStickyNote } from "react-icons/lu";
import { CgWebsite } from "react-icons/cg";
import { FaBookReader } from "react-icons/fa";
import { url } from '../utils/BackEndUrl';
import axios from 'axios';

const TeacherSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate()
    
    const userDetails = JSON.parse(localStorage.getItem("user"));
    console.log(userDetails)
    const handleLogout = async () => {
        try {

            const response = await axios.post(`${url}/api/user/logout`, {
                withCredentials: true,
            });
            if (response.data.success) {

                localStorage.removeItem('auth-token');
                localStorage.removeItem('user');

                navigate('/login');
            } else {

                console.error('Logout failed:', response.data.message);
            }
        } catch (error) {

            console.error('Logout error:', error);
        }
    };
    return (
        <div className='w-full flex flex-col justify-between h-screen'>
            <div className='h-[60%] w-full flex flex-col gap-2 pt-4'>
                <div className='flex  gap-2 justify-center w-full items-center'>
                    <IoSchool size={32} />
                    <span className='text-lg font-bold '> Student CMS</span>
                </div>
                <div className='w-full flex flex-col justify-center  font-semibold items-center gap-2 '>
                    <button onClick={() => { navigate("/teacher") }} className={`flex w-[90%] gap-4 px-4 hover:bg-white hover:font-bold hover:shadow-md hover:scale-100 duration-300 ease-in-out rounded-lg h-10 items-center ${location?.pathname === "/" ? "bg-white font-bold shadow-md scale-100 duration-300 ease-in-out " : ""}`}>
                        <IoHomeOutline size={22} />
                        Home</button>
                    <button onClick={() => { navigate("/teacher/studentregistration") }} className={`flex w-[90%] gap-4 px-4 hover:bg-white hover:font-bold hover:shadow-md hover:scale-100 duration-300 ease-in-out   rounded-lg h-10 items-center ${location?.pathname === "/studentregistration" ? "bg-white font-bold shadow-md scale-100 duration-300 ease-in-out " : ""}`}>
                        <PiStudentFill size={22} />
                        Registration</button>
                    <button onClick={() => { navigate("/teacher/attendance") }} className={`flex w-[90%] gap-4 px-4 hover:bg-white hover:font-bold hover:shadow-md hover:scale-100 duration-300 ease-in-out   rounded-lg h-10 items-center ${location?.pathname === "/attendance" ? "bg-white font-bold shadow-md scale-100 duration-300 ease-in-out " : ""}`}>
                        <FaCalendarAlt size={22} />
                        Attendance</button>
                    <button onClick={() => { navigate("/teacher/addmark") }} className={`flex w-[90%] gap-4 px-4 hover:bg-white hover:font-bold hover:shadow-md hover:scale-100 duration-300 ease-in-out   rounded-lg h-10 items-center ${location?.pathname === "/addmark" ? "bg-white font-bold shadow-md scale-100 duration-300 ease-in-out " : ""}`}>
                        <GiNotebook size={22} />
                        Exam Mark</button>
                    <button onClick={() => { navigate("/teacher/markoverview") }} className={`flex w-[90%] gap-4 px-4 hover:bg-white hover:font-bold hover:shadow-md hover:scale-100 duration-300 ease-in-out   rounded-lg h-10 items-center ${location?.pathname === "/markoverview" ? "bg-white font-bold shadow-md scale-100 duration-300 ease-in-out " : ""}`}>
                        <FaBookReader size={22} />
                        Mark Overview</button>
                    <button onClick={() => { navigate("/teacher/attendance/overview") }} className={`flex w-[92%] gap-4 px-4 hover:bg-white hover:font-bold hover:shadow-md hover:scale-100 duration-300 ease-in-out   rounded-lg h-10 items-center ${location?.pathname === "/attendance/overview" ? "bg-white font-bold shadow-md scale-100 duration-300 ease-in-out " : ""}`}>
                        <IoCalendarNumberOutline size={22} />
                        Attendance Overview</button>

                    <button onClick={() => { navigate("/teacher/referances") }} className={`flex w-[90%] gap-4 px-4 hover:bg-white hover:font-bold hover:shadow-md hover:scale-100 duration-300 ease-in-out   rounded-lg h-10 items-center ${location?.pathname === "/referances" ? "bg-white font-bold shadow-md scale-100 duration-300 ease-in-out " : ""}`}>
                        <LuStickyNote size={22} />
                        Referance </button>
                        <button onClick={() => { navigate("/teacher/compiler") }} className={`flex w-[90%] gap-4 px-4 hover:bg-white hover:font-bold hover:shadow-md hover:scale-100 duration-300 ease-in-out   rounded-lg h-10 items-center ${location?.pathname === "/compiler" ? "bg-white font-bold shadow-md scale-100 duration-300 ease-in-out " : ""}`}>
                        <FaBookReader size={22} />
                       Code Compiler</button>

                    <button onClick={() => { navigate("/teacher/subjectandall") }} className={`flex w-[90%] gap-4 px-4 hover:bg-white hover:font-bold hover:shadow-md hover:scale-100 duration-300 ease-in-out   rounded-lg h-10 items-center ${location?.pathname === "/subjectandall" ? "bg-white font-bold shadow-md scale-100 duration-300 ease-in-out " : ""}`}>
                        <CgWebsite size={22} />
                        Subject and etc </button>
                        <button onClick={() => { navigate("/teacher/fees") }} className={`flex w-[90%] gap-4 px-4 hover:bg-white hover:font-bold hover:shadow-md hover:scale-100 duration-300 ease-in-out   rounded-lg h-10 items-center ${location?.pathname === "/fees" ? "bg-white font-bold shadow-md scale-100 duration-300 ease-in-out " : ""}`}>
                        <CgWebsite size={22} />
                        Fees </button>

                </div>



            </div>
            <div className='flex justify-center items-center h-[40%] w-full flex-col gap-6 '>
                <div className='flex w-[90%] justify-between bg-white rounded-lg h-16 items-center'>
                    <img src={userDetails?.profilePic} className='w-12 ml-2 h-12 rounded-full object-cover' alt="" />
                    <div className='flex flex-col w-[90%]  pl-4 gap-1  items-center'>
                        <span className='text-sm w-full '>{userDetails?.personalDetails?.FirstName + " " + userDetails?.personalDetails?.MiddleName + " " + userDetails?.personalDetails?.LastName}</span>
                        <span className='text-xs w-full text-gray-500'>{userDetails?.email} </span>
                    </div>
                </div>
                <div className='flex pl-4 w-full font-semibold'>
                    <div className='flex items-center relative cursor-pointer '>
                        <CiBellOn size={32} />
                        <span className='w-5 h-5 text-xs font-bold items-center mb-4 flex justify-center rounded-full absolute  top-[-3px] left-6 bg-yellow-500'>2</span>

                    </div>
                    <span className='mx-4'>Notifications</span>
                </div>
                <div className='w-full pl-5 font-semibold'>
                    <button className='flex items-center w-full   gap-2' onClick={handleLogout}> <IoMdExit size={24} />signout</button>

                </div>
            </div>
        </div>
    )

}

export default TeacherSidebar