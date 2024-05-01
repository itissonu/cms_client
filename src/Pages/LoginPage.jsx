import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import logo from "../assets/s-developers_transparent.png"
import Person2Icon from '@mui/icons-material/Person2';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import login from "../assets/login.jpg"
import axios from "axios"
import { url } from '../utils/BackEndUrl';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
// defining th zod schema 
const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});



const LoginPage = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
        resolver: zodResolver(schema)
    })
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false)
    const handleVisible = (e) => {
        e.preventDefault()
        setVisible(state => !state)
    }
    const onSubmit = async (form) => {
        try {
            const formData = {
                email: form?.email,
                password: form?.password
            }
            const { data } = await axios.post(`${url}/api/user/login`, formData)
            if (data.success) {
                toast.success(data.message);
                navigate(`/otp/${form?.email}`)
            }

        } catch (error) {

            setError("email", {
                message: error.response.data.message
            })
        }
    }
    return (
        <div className='bg-sky-100 flex justify-center items-center w-full h-screen'>
            <div className='w-3/5 h-3/5 flex rounded-3xl '>
                <div className='w-[55%]'>
                    <img src={login} className='w-full  h-full object-cover' alt="" />

                </div>
                <div className='bg-white w-full md:w-[45%] h-full rounded-md shadow-lg'>
                    <div className='w-full h-1/6 justify-between items-center flex bg-gray-200'>
                        <img src={logo} alt="logo" className=' h-full object-cover' />
                        <span className='w-5/6 text-wrap text-xs md:text-sm text-purple-800 font-bold'> SOUMYA INSTITUTE FOR TECHNOLOGY ,GANGAPADA</span>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className='h-5/6 flex  flex-col justify-start items-center w-full'>
                        <h1 className='h-1/6 pt-10 text-xs md:text-3xl font-semibold text-gray-900 font-sans '> Sign In</h1>
                        <div className='h-3/6  flex flex-col items-center justify-center gap-4 w-full'>
                            <div className='w-3/4 h-1/4 border   px-4 gap-2 md:px-10 flex justify-between items-center border-gray-300'>
                                <input {...register("email")} type="text" name="email" placeholder='UserName' className=' w-full  outline-none h-full' />
                                <Person2Icon />
                            </div>
                            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}

                            <div className='w-3/4 h-1/4 border px-4 gap-2 md:px-10 flex justify-between items-center border-gray-300'>
                                <input {...register("password")} placeholder="PassWord" name="password" type={visible ? "text" : "password"} className='w-full   outline-none h-full' />
                                <button onClick={handleVisible}><VisibilityIcon fontSize="small" /></button>

                            </div>
                            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}

                        </div>
                        <div className='h-2/6 font-bold flex flex-col justify-start items-center gap-4  w-3/4'>
                            <button className='text-gray-300'>Forgot Password ?</button>

                            <button type='submit' disabled={isSubmitting} className='text-white bg-purple-500 hover:bg-purple-600 uppercase px-2 w-2/4 rounded-md shadow-md  h-1/3'>{isSubmitting ? "loading...." : "Sign In"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
