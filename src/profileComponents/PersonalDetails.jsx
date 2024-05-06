import React from 'react'

const PersonalDetails = ({ userDetails }) => {
    return (
        <div className='border-[1px] '>
            <div className='md:h-[63%] h-[50%] w-[90%] text-xs md:text-base flex flex-col gap-2  '>
                <div className='w-full pl-4 rounded-md py-2  h-10 flex bg-gray-100  items-center'>
                    <span className='w-[35%] font-semibold '> Name</span>
                    <span className='w-[65%] uppercase'>{userDetails?.personalDetails?.FirstName + " " + userDetails?.personalDetails?.LastName}</span>
                </div>
                <div className='w-full pl-4 py-2 rounded-md   h-10 flex bg-gray-100 items-center'>
                    <span className='w-[35%] font-semibold'>Caste</span>
                    <span className='w-[65%]'>{userDetails?.personalDetails?.Caste}</span>
                </div>
                <div className='w-full pl-4 py-2 rounded-md   h-10 flex bg-gray-100  items-center'>
                    <span className='w-[35%] font-semibold'>DOB</span>
                    <span className='w-[65%]'>{userDetails?.personalDetails?.DOB}</span>
                </div>
                <div className='w-full pl-4 py-2 rounded-md   h-10 flex bg-gray-100   items-center'>
                    <span className='w-[35%] font-semibold'>Nationality</span>
                    <span className='w-[65%]'>{userDetails?.personalDetails?.Natioanality}</span>
                </div>
                <div className='w-full pl-4 py-2 rounded-md   h-10 flex bg-gray-100  items-center'>
                    <span className='w-[35%] font-semibold'>Religion</span>
                    <span className='w-[65%]'>{userDetails?.personalDetails?.Religion}</span>
                </div>
                <div className='w-full pl-4 py-2 rounded-md   h-10 flex bg-gray-100   items-center'>
                    <span className='w-[35%] font-semibold'>Hostel</span>
                    <span className='w-[65%]'>{(userDetails?.personalDetails?.hostel)? 'Yes': 'No'}</span>
                </div>
                <div className='w-full pl-4 py-2 rounded-md   h-10 flex bg-gray-100   items-center'>
                    <span className='w-[35%] font-semibold'>Transport</span>
                    <span className='w-[65%]'>{(userDetails?.personalDetails?.transport) ? 'Yes' :'No'}</span>
                </div>

 
            </div>
        </div>
    )
}

export default PersonalDetails