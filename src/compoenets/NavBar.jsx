import React from 'react'
import { MdPersonOutline } from "react-icons/md";
import { CiBellOn } from "react-icons/ci";
import { NavLink } from 'react-router-dom';
const NavBar = () => {
    return (
        <div className='fixed z-30 h-16 w-full items-center flex justify-end bg-gray-500 shadow-lg'>
            <div className='w-[40%] flex items-center justify-evenly h-full '>
                <div className='flex items-center relative cursor-pointer '>
                    <CiBellOn size={32} />
                    <span className='w-5 h-5 text-xs font-bold items-center mb-4 flex justify-center rounded-full absolute  top-[-3px] left-6 bg-yellow-500'>2</span>
                </div>
                <div className='flex items-center justify-center gap-4  relative group  cursor-pointer '>
                    <MdPersonOutline size={32} />
                    <span className=' text-md  font-bold items-center  flex justify-center '>Soumya Sundar Mohapatra</span>
                    <div className="absolute top-10  bg-white w-80 h-80  rounded-md shadow-md  invisible  group-hover:visible transition duration-300">
                        <div className='flex text-center flex-col justify-evenly items-start w-full h-full'>
                            <div className=" border-b-2 flex flex-col justify-center w-full items-center h-2/5">
                                <p className='my-3'>{"hello .. account details here "}</p>
                                <NavLink to={"/login"} className=" flex justify-center text-white px-20 h-12 items-center w-1/3 bg-blue-300 rounded-sm"  >{"Account"}</NavLink>
                            </div>
                            <div className=" border-b-2 flex flex-col justify-evenly w-full h-2/5">
                                <NavLink to="/order" className="flex justify-start mx-4 text-black text-center  h-1/6 ">orders</NavLink>
                                <NavLink to="/wishlist" className="flex justify-start mx-4 text-black text-center  h-1/6  ">wishlist</NavLink>
                                <NavLink to="/address" className="flex  justify-start items-start mx-4 text-black text-center  h-1/6 w-full">saved addresses</NavLink>
                            </div>

                        </div>
                    </div>
                    {/* 

 <section className='flex relative group  flex-col items-center cursor-pointer'><PersonOutlineIcon />profile
                    <div className="absolute top-10  bg-white w-80 h-80  rounded-md shadow-md  invisible  group-hover:visible transition duration-300">
                        <div className='flex text-center flex-col justify-evenly items-start w-full h-full'>
                            <div className=" border-b-2 flex flex-col justify-center w-full items-center h-2/5">
                                <p className='my-3'>{isLogin ? "hello .. account details here " : "welcome ! please login to access the account"}</p>
                                <NavLink to={isLogin ? "/profile" : "/login"} className=" flex justify-center text-white px-20 h-12 items-center w-1/3 bg-blue-300 rounded-sm"  >{isLogin ? "Account" : "login/signUp"}</NavLink>
                            </div>
                            <div className=" border-b-2 flex flex-col justify-evenly w-full h-2/5">
                                <NavLink to="/order" className="flex justify-start mx-4 text-black text-center  h-1/6 ">orders</NavLink>
                                <NavLink to="/wishlist" className="flex justify-start mx-4 text-black text-center  h-1/6  ">wishlist</NavLink>
                                <NavLink to="/address" className="flex  justify-start items-start mx-4 text-black text-center  h-1/6 w-full">saved addresses</NavLink>
                            </div>
                            {isLogin && <div className='flex justify-end items-center w-full h-1/5'>
                                <button className=" flex justify-center text-black mx-10 h-8 items-center w-20 bg-blue-300 rounded-sm" onClick={handleLogout}>logout</button>
                            </div>}
                        </div>
                    </div>
                </section>
*/}


                </div>

            </div>
        </div>
    )
}

export default NavBar
