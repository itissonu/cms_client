import React, { useState } from 'react'
import OTPInput from "otp-input-react";
const OtpValidation = () => {
    const mail = "demobabu123@gmail.com";
    const [OTP, setOTP] = useState(""); 
    return (
        <div className='bg-sky-200 font-times w-full flex items-center justify-center h-screen'>
            <div className='md:w-2/5  m-4 w-full bg-gray-100  h-80 shadow-2xl flex justify-center flex-col rounded-md '>
                <div className='flex h- gap-4 justify-center items-center border-gray-200  h-1/4 w-full  border-b-2'>
                    <span className='text-wrap md:text-sm text-xs'>Enter Otp Sent to your E-mail   </span>
                    <p className='text-blue-500'>{mail}</p>
                </div>
                <div className='flex h-2/5 flex-col justify-between items-center '>
                    <div className='h-1/4 flex justify-center items-center p-10'>
                        <OTPInput value={OTP} inputStyles={{ outline: "none", }} onFocus={(event) => event.target.style.borderColor = 'blue'} onChange={setOTP} autoFocus OTPLength={4} otpType="number" disabled={false} />

                    </div>
                    <div className='flex  justify-center items-center h-3/4 gap-10 '>
                        <button type='submit' className='bg-sky-200 hover:bg-sky-500 w-20  h-10'>Validate</button>
                        <button className='bg-blue-200 hover:bg-blue-500 w-20  h-10'>Resend</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OtpValidation
