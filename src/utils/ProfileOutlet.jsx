import React from 'react'
import SideBar from '../compoenets/SideBar'
import { Outlet } from 'react-router-dom'
const ProfileOutlet = () => {
    return (
        <div className='flex bg-gray-200' >
            <div className='w-[20%]  h-full'>
                <SideBar />
            </div>
            <div className='w-[80%]  h-full'>
                <Outlet />
            </div>
        </div>
    )
}

export default ProfileOutlet
