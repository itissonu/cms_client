import React from 'react'

const Guardians = ({ userDetails }) => {
    console.log(userDetails)
  return (
    <div className='border-[1px]'>
      <div className='md:h-[63%] h-[50%] w-[90%] text-xs md:text-base flex flex-col gap-2'>
        <div className='w-full pl-4 rounded-md py-2 h-10 flex bg-gray-100 items-center'>
          <span className='w-[35%] font-semibold'>Name</span>
          <span className='w-[65%]'>{userDetails?.Guardian?.name}</span>
        </div>
        <div className='w-full pl-4 py-2 rounded-md h-10 flex bg-gray-100 items-center'>
          <span className='w-[35%] font-semibold'>Relation</span>
          <span className='w-[65%]'>{userDetails?.Guardian?.relation}</span>
        </div>
        <div className='w-full pl-4 py-2 rounded-md h-10 flex bg-gray-100 items-center'>
          <span className='w-[35%] font-semibold'>Phone No</span>
          <span className='w-[65%]'>{userDetails?.Guardian?.phoneNo}</span>
        </div>
        <div className='w-full pl-4 py-2 rounded-md h-10 flex bg-gray-100 items-center'>
          <span className='w-[35%] font-semibold'>Address</span>
          <span className='w-[65%]'>{userDetails?.Guardian?.address}</span>
        </div>
        <div className='w-full pl-4 py-2 rounded-md h-10 flex bg-gray-100 items-center'>
          <span className='w-[35%] font-semibold'>Profession</span>
          <span className='w-[65%]'>{userDetails?.Guardian?.profession}</span>
        </div>
      </div>
    </div>
  )
}

export default Guardians