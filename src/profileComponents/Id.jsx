import { red } from '@mui/material/colors';
import React from 'react'
import { BiSolidDonateBlood } from "react-icons/bi";

const Id = ({ userDetails }) => {
    return (
        <div className='border-[2px]  w-[70%] mx-auto'>
            <div className='flex items-center justify-center h-16 bg-red-800'><span className='text-white font-bold'>GANDHI INSTITUTE FOR TECHNOLOGY</span></div>
            <div className='flex items-center p-4'>

                <div className='w-40 h-40 rounded-full overflow-hidden mr-4'>
                    <img src={userDetails?.profilePic} alt='Profile' className='w-full h-full object-cover' />
                </div>
                <div>
                    <div className='flex gap-2'> <span className='font-semibold mb-1'>Blood Group: {userDetails?.personalDetails?.Bloodgrp}</span>
                        <BiSolidDonateBlood  className='text-red bg-red h-8 w-8' style={{ color: 'red' }}/>
                        </div>

                    <p className='font-semibold mb-1'>Department: {userDetails?.Department?.DepartmentName}</p>

                    <p className='font-semibold mb-1 uppercase'>Name: {userDetails?.personalDetails?.FirstName} {userDetails?.personalDetails?.LastName}</p>
                    <p className='font-semibold mb-1'>Batch: {userDetails?.Batch} </p>
                </div>
            </div>
        </div>
    )
}

export default Id