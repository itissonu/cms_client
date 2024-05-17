import React from 'react'

const Address = ({ userDetails }) => {
  return (
    <div className='border-[1px]'>
      <div className='md:h-[63%] h-[50%] w-[90%] text-xs md:text-base flex flex-col gap-2 '>
     
          <div className='w-full pl-4 rounded-md py-2 h-10 flex bg-gray-100 items-center'>
            <span className='w-[35%] font-semibold'>House No</span>
            <span className='w-[65%]'>{userDetails?.address?.houseNo}</span>
          </div>
          
        
        <div className='w-full pl-4 py-2 rounded-md h-10 flex bg-gray-100 items-center'>
          <span className='w-[35%] font-semibold'>District</span>
          <span className='w-[65%]'>{userDetails?.address?.district}</span>
        </div>
        <div className='w-full pl-4 py-2 rounded-md h-10 flex bg-gray-100 items-center'>
          <span className='w-[35%] font-semibold'>City</span>
          <span className='w-[65%]'>{userDetails?.address?.city}</span>
        </div>
        <div className='w-full pl-4 py-2 rounded-md h-10 flex bg-gray-100 items-center'>
          <span className='w-[35%] font-semibold'>State</span>
          <span className='w-[65%]'>{userDetails?.address?.state}</span>
        </div>
        <div className='w-full pl-4 py-2 rounded-md h-10 flex bg-gray-100 items-center'>
          <span className='w-[35%] font-semibold'>Country</span>
          <span className='w-[65%]'>{userDetails?.address?.country}</span>
        </div>
        <div className='w-full pl-4 py-2 rounded-md h-10 flex bg-gray-100 items-center'>
          <span className='w-[35%] font-semibold'>Pincode</span>
          <span className='w-[65%]'>{userDetails?.address?.pincode}</span>
        </div>
       
      </div>
    </div>
  )
}

export default Address