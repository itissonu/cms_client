import React from 'react'
import { FaKey } from "react-icons/fa";
const NewPassword = () => {
    return (
        <div className='w-full h-screen flex justify-center items-center '>
            <div className='md:w-[40%] w-full h-[50%] rounded-md flex flex-col gap-4 items-center md:border-2 md:shadow-lg  md:border-gray-200'>
                <div className='w-full h-10 flex items-center mt-4 justify-center'>
                    <div className='flex w-10 h-10 items-center justify-center  border-2 shadow-lg  border-gray-200 '>
                        <FaKey size={22} />
                    </div>

                </div>
                <span className='font-bold text-2xl'>Choose A Password</span>
                <form className='flex flex-col gap-2 md:p-0 p-4 w-full md:w-[50%]' action="">
                    <input className='h-12 w-full outline-none border-b-2 border-gray-200' placeholder='New Password' type="text" name="" id="" />
                    <input className='h-12 w-full outline-none border-b-2 mb-2 border-gray-200' placeholder='Confirm New Password' type="text" name="" id="" />
                    <button className='w-full h-12 text-white   bg-gray-900'>change password</button>
                </form>
            </div>
        </div>
    )
}

export default NewPassword
