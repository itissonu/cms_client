import React from 'react'
import logo from "../assets/login.jpg"
import { IoMdExit } from "react-icons/io";
import { IoSchool } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FaBook } from "react-icons/fa6";
import { CiVideoOn, CiBellOn } from "react-icons/ci";

const SideBar = () => {
    return (
        <div className='w-full flex flex-col justify-between h-screen'>
            <div className='h-[60%] w-full flex flex-col gap-2 pt-4'>
                <div className='flex  gap-2 justify-center w-full items-center'>
                    <IoSchool size={32} />
                    <span className='text-lg font-bold '> Student CMS</span>
                </div>
                <div className='w-full flex flex-col justify-center  font-semibold items-center gap-2 '>
                    <button className='flex w-[90%] gap-4 px-4  rounded-lg h-10 items-center'>
                        <IoHomeOutline size={22} />
                        Home</button>
                    <button className='flex w-[90%] gap-4 px-4 bg-white rounded-lg h-10 items-center'>
                        <IoChatbubblesOutline size={22} />
                        Chat</button>
                    <button className='flex w-[90%] gap-4 px-4 rounded-lg h-10 items-center'>
                        <FaBook size={22} />
                        Syllabus</button>
                    <button className='flex w-[90%] gap-4 px-4 rounded-lg h-10 items-center'>
                        <CiVideoOn size={22} />
                        REferrence</button>

                </div>



            </div>
            <div className='flex justify-center items-center h-[40%] w-full flex-col gap-6 '>
                <div className='flex w-[90%] justify-between bg-white rounded-lg h-16 items-center'>
                    <img src={logo} className='w-12 ml-2 h-12 rounded-full object-cover' alt="" />
                    <div className='flex flex-col w-[90%]  pl-4 gap-1  items-center'>
                        <span className='text-sm w-full '>Soumya Sundar mohapatra</span>
                        <span className='text-xs w-full text-gray-500'>smohapatra2022@gift.edu.in </span>
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
                    <button className='flex items-center w-full   gap-2'> <IoMdExit size={24} />signout</button>

                </div>
            </div>
        </div>
    )
}

export default SideBar
