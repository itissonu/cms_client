import React from 'react'
import logo from "../assets/login.jpg";
import { FaBook } from "react-icons/fa6";
import { MdPersonOutline } from "react-icons/md";
import Chart from 'react-apexcharts';
import { ApexChart } from '../cards/ApexChart';
import { ApexChart2 } from '../cards/ApexChart';
import DateCalendarServerRequest from '../cards/ApexChart';
const ProfilePage = () => {


    return (
        
        <div className='bg-gray-200  flex justify-center items-center h-screen'>
            <div className='w-[92%] h-[90%] flex flex-col gap-10 bg-white overflow-y-auto overflow-hidden custom-scrollbar rounded-lg shadow-md'>
                <div className='w-full md:flex-row flex-col flex h-fit'>
                    <div className='md:w-[50%] w-full h-full pb-2  flex justify-center items-center '>
                        <div className='w-[95%] h-[90%]  '>
                            <div className='w-full md:h-[37%] h-[50%] flex flex-col md:flex-row items-center'>
                                <div className='md:w-[40%] w-full h-[70%] md:h-full p-2'>
                                    <img src={logo} className='w-[90%] h-[90%] rounded-full object-cover' alt="" />

                                </div>
                                <div className='md:w-[60%] w-full flex flex-col gap-2 h-[30%] md:h-full p-2'>
                                    <span className='w-full gap-4 md:px-4 justify-center  flex bg-gray-200 rounded-lg h-10 items-center'>Soumya Sundar Mohapatra</span>
                                    <div className='w-full flex justify-end'>
                                        <span className='w-[30%] font-bold gap-4 px-4 justify-center  flex bg-green-500 text-white rounded-lg h-8 items-center'>Active</span>

                                    </div>
                                </div>

                            </div>
                            <div className='md:h-[63%] h-[50%] w-full text-xs md:text-lg flex flex-col gap-2  '>
                                <div className='w-full pl-4 rounded-md   h-10 flex bg-sky-100  items-center'>
                                    <span className='w-[35%] font-semibold'>Registration No</span>
                                    <span className='w-[65%]'>2205298178</span>
                                </div>
                                <div className='w-full pl-4 rounded-md   h-10 flex bg-gray-100 items-center'>
                                    <span className='w-[35%] font-semibold'>Course</span>
                                    <span className='w-[65%]'>Mca</span>
                                </div>
                                <div className='w-full pl-4 rounded-md   h-10 flex bg-sky-100  items-center'>
                                    <span className='w-[35%] font-semibold'>Batch</span>
                                    <span className='w-[65%]'>	MCA 2024-P</span>
                                </div>
                                <div className='w-full pl-4 rounded-md   h-10 flex bg-gray-100   items-center'>
                                    <span className='w-[35%] font-semibold'>Section</span>
                                    <span className='w-[65%]'>MCA - Genius</span>
                                </div>
                                <div className='w-full pl-4 rounded-md   h-10 flex bg-sky-100  items-center'>
                                    <span className='w-[35%] font-semibold'>Email ID</span>
                                    <span className='w-[65%]'>example@gmasil.com</span>
                                </div>
                                <div className='w-full pl-4 rounded-md   h-10 flex bg-gray-100   items-center'>
                                    <span className='w-[35%] font-semibold'>Mobile No</span>
                                    <span className='w-[65%]'>2205298178</span>
                                </div>
                                <div className='w-full pl-4 rounded-md   h-10 flex bg-sky-100   items-center'>
                                    <span className='w-[35%] font-semibold'>Branch</span>
                                    <span className='w-[65%]'>Mca</span>
                                </div>
                                <div className='w-full pl-4 rounded-md justify-end  h-10 flex   items-center'>
                                    <button className='md:w-[25%] w-full font-semibold bg-gray-100 border-2 border-gray-200 shadow-md hover:bg-gray-300 rounded-md p-2'>More Info</button>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='md:w-[50%] w-full h-full flex flex-col bg-white'>
                        <div className='w-full md:h-[65%] h-full flex justify-center items-center '>
                            <div className='w-[90%] h-[80%] rounded-md border-b-2 border-l-2 border-r-2 '>
                                <span className='h-12 font-bold text-md p-4 text-center flex bg-gray-200 '>
                                    Attandacne overview
                                </span>
                                <div className='w-full md:h-[95%] h-full  flex flex-col md:flex-row pl-2 '>
                                    <div className='md:h-full h-[33%] md:w-[35%] w-full flex  text-black items-center '>
                                        <ApexChart />
                                    </div>
                                    <div className='flex md:w-[65%] w-full justify-center items-center h-full py-4  md:h-full'>
                                        <div className='md:h-[70%] h-full  w-full flex md:flex-row md:flex-wrap flex-col '>
                                            <div className='md:w-[50%] w-full  flex items-center justify-center gap-4 '>
                                                <span className='md:p-4 p-2 rounded-full text-white bg-lime-300'><FaBook /> </span>
                                                <div className='md:font-bold text-xs md:text-balance'>
                                                    <span className='flex gap-2 justify-center items-center'>90% <MdPersonOutline size={22} /></span>
                                                    <span className='flex gap-2 justify-center items-center'>DBMS</span>
                                                </div>
                                            </div>
                                            <div className='md:w-[50%] w-full  flex items-center justify-center gap-4 '>
                                                <span className='md:p-4 p-2  rounded-full text-white bg-lime-300'><FaBook /> </span>
                                                <div className='md:font-bold text-xs md:text-balance'>
                                                    <span className='flex gap-2 justify-center items-center'>90% <MdPersonOutline size={22} /></span>
                                                    <span className='flex gap-2 justify-center items-center'>DAA</span>
                                                </div>
                                            </div>
                                            <div className='md:w-[50%] w-full  flex items-center justify-center gap-4 '>
                                                <span className='md:p-4 p-2  rounded-full text-white bg-lime-300'><FaBook /> </span>
                                                <div className='md:font-bold text-xs md:text-balance'>
                                                    <span className='flex gap-2 justify-center items-center'>90% <MdPersonOutline size={22} /></span>
                                                    <span className='flex gap-2 justify-center items-center'>JAVA</span>
                                                </div>
                                            </div>
                                            <div className='md:w-[50%] w-full  flex items-center justify-center gap-4 '>
                                                <span className='md:p-4 p-2  rounded-full text-white bg-lime-300'><FaBook /> </span>
                                                <div className='md:font-bold text-xs md:text-balance'>
                                                    <span className='flex gap-2 justify-center items-center'>90% <MdPersonOutline size={22} /></span>
                                                    <span className='flex gap-2 justify-center items-center'>C</span>
                                                </div>
                                            </div>
                                            <div className='md:w-[50%] w-full  flex items-center justify-center gap-4 '>
                                                <span className='md:p-4 p-2  rounded-full text-white bg-lime-300'><FaBook /> </span>
                                                <div className='md:font-bold text-xs md:text-balance'>
                                                    <span className='flex gap-2 justify-center items-center'>90% <MdPersonOutline size={22} /></span>
                                                    <span className='flex gap-2 justify-center items-center'>DS</span>
                                                </div>
                                            </div>
                                            <div className='md:w-[50%] w-full  flex items-center justify-center gap-4 '>
                                                <span className='md:p-4 p-2  rounded-full text-white bg-lime-300'><FaBook /> </span>
                                                <div className='md:font-bold text-xs md:text-balance'>
                                                    <span className='flex gap-2 justify-center items-center'>90% <MdPersonOutline size={22} /></span>
                                                    <span className='flex gap-2 justify-center items-center'>Math</span>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full md:h-[35%] h-full flex flex-col gap-3 justify-between items-center'>
                            <span>Fee Structure</span>
                            <div className='flex gap-2 justify-center flex-col md:flex-row items-center'>
                                <ApexChart2 />
                                <span>Total : 100</span>
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
