import React from 'react'
import TeacherSidebar from '../compoenets/TeacherSidebar'
import { Outlet } from 'react-router-dom'

const TeacherLayout = () => {
    return (
        <div className='flex bg-gray-200' >
            <div className='w-[15%]  h-full'>
                <TeacherSidebar />
            </div>
            <div className='w-[85%]  h-full'>
                <div className='bg-gray-200  flex justify-center items-center h-screen'>
                    <div className='w-[92%] h-[90%] flex flex-col gap-10 bg-white overflow-y-auto overflow-hidden custom-scrollbar rounded-lg shadow-md'> <Outlet /></div>

                </div>




            </div>
        </div>
    )
}

export default TeacherLayout