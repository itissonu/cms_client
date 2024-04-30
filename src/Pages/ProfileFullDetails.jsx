import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { url } from '../utils/BackEndUrl';
import axios from 'axios';
import { BsPersonStanding } from "react-icons/bs";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { RxPerson } from "react-icons/rx";
import { IoHomeOutline, IoDocumentTextOutline } from "react-icons/io5";
import { MdCurrencyRupee } from "react-icons/md";
import { BsHeartbreakFill } from "react-icons/bs";
import { FaRegImage } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";
const ProfileFullDetails = () => {
    const [activeButton, setActiveButton] = useState(0);

    // Function to handle button clicks
    const handleButtonClick = (index) => {
        setActiveButton(index); // Set the active button based on index
    };

    const arr = [{
        name: "Personal",
        icon: <BsPersonStanding />,

    }, {
        name: "Academics",
        icon: <HiOutlineAcademicCap />
    }, {
        name: "Guardians",
        icon: <RxPerson />
    }, {
        name: "Address",
        icon: <IoHomeOutline />
    }, {
        name: "Documents",
        icon: <IoDocumentTextOutline />
    }, {
        name: "Fees",
        icon: <MdCurrencyRupee />
    }, {
        name: "Attandance",
        icon: <HiOutlineAcademicCap />
    }, {
        name: "College Marks",
        icon: <HiOutlineAcademicCap />
    }, {
        name: "Univercity Marks",
        icon: <HiOutlineAcademicCap />
    }, {
        name: "Health",
        icon: <BsHeartbreakFill />
    }, {
        name: "Id Card",
        icon: <FaRegImage />
    }, {
        name: "Biomatrics",
        icon: <AiFillLike />
    }]
    const navigate = useNavigate()
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem("user"))

    const [userDetails, setUserDetails] = useState({});
    console.log('userDetails', userDetails)
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
    }, [])
    return (
        <div className='bg-gray-200  flex justify-center items-center h-screen'>
            <div className='w-[92%] h-[90%] flex flex-col gap-10 bg-white overflow-y-auto overflow-hidden custom-scrollbar rounded-lg shadow-md'>
                <div className='w-full md:flex-row flex-col flex h-fit'>
                    <div className='md:w-[37%] w-full h-full pb-2  flex justify-center items-center '>
                        <div className='w-[95%] h-[90%]  '>
                            <div className='w-full md:h-[37%] h-[50%] flex flex-col md:flex-row items-center'>
                                <div className='md:w-[40%] w-full h-[70%] md:h-full p-2'>
                                    <img src={userDetails?.profilePic} className='w-32 h-32 rounded-full object-cover' alt="" />

                                </div>
                                <div className='md:w-[60%] w-full flex flex-col gap-2 h-[30%] md:h-full p-2'>
                                    <span className='w-full gap-4 md:px-4 justify-center  flex bg-gray-200 rounded-lg h-10 items-center'>{userDetails?.personalDetails?.FirstName + " " + userDetails?.personalDetails?.LastName}</span>
                                    <div className='w-full flex justify-end'>
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


                            </div>
                        </div>
                    </div>
                    <div className='md:w-[63%] w-full h-fit gap-2 flex flex-wrap mt-10 '>            {arr?.map((item, index) => (
                        <button
                            key={index}
                            className={`h-10 px-4 rounded-md font-semibold flex items-center gap-2   border-blue-400  border  ${activeButton === index ? 'bg-cyan-500  text-white' : 'bg-white text-cyan-700 hover:bg-gray-200'}`}
                            onClick={() => handleButtonClick(index)} // Set the active button on click
                        >
                            {item?.icon}
                            {item?.name}
                        </button>
                    ))}
                    </div>
                </div>
            </div>

        </div>


    )
}

export default ProfileFullDetails
{/* */ }