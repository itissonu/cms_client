import React from 'react'
import forgot from "../assets/forgot.jpg";
import { IoFingerPrintOutline } from "react-icons/io5";
import { FaAnglesLeft } from "react-icons/fa6";
import logo from "../assets/s-developers_transparent.png"
import { useNavigate } from 'react-router-dom';
const ForgotPassword = () => {
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("hello")
        navigate("/newPassword");
    }
    return (
        <div className='w-full h-screen flex  '>
            <div className='md:w-[30%] w-full h-screen flex flex-col items-center '>
                <div className='flex justify-start mt-10 px-4 w-full h-20'>
                    <img src={logo} className='w-20 h-20 object-cover' alt="" />

                </div>
                <div className='w-full h-[50%] px-10 mt-[30%] flex flex-col gap-2'>
                    <div className='w-full h-12  '>
                        <div className='flex justify-center items-center bg-white w-12 h-12  rounded-md shadow-lg'>
                            <IoFingerPrintOutline size={32} />
                        </div>

                    </div>
                    <span className='text-2xl font-bold'>Forgot Password ?</span>
                    <span className=' '>no worries we will send you instructions..</span>
                    <form onSubmit={handleSubmit} className='flex flex-col w-full gap-4 mt-6' >
                        <input type="text" placeholder='Enter your Email' className='h-10 outline-none border-b-2 border-gray-400 w-full' />
                        <button className='w-full bg-gray-900 hover:font-bold duration-300 text-white h-10' type='submit'>Reset Password</button>
                    </form>
                    <button className='flex items-center gap-4 justify-center capitalize pt-4'> <FaAnglesLeft /> back to login</button>
                </div>
            </div>
            <div className='md:w-[70%] h-screen hidden md:flex justify-center items-center '>
                <img src={forgot} className='w-[80%] h-[80%] object-cover rounded-md' alt="" />
            </div>
        </div>
    )
}

export default ForgotPassword
