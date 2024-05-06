import React, { useEffect, useState } from 'react'
import logo from "../assets/login.jpg";
import { FaBook } from "react-icons/fa6";
import { MdPersonOutline } from "react-icons/md";
import Chart from 'react-apexcharts';
import { ApexChart } from '../cards/ApexChart';
import { ApexChart2 } from '../cards/ApexChart';
import DateCalendarServerRequest from '../cards/ApexChart';
import axios from 'axios';
import { url } from '../utils/BackEndUrl';
import { useNavigate } from 'react-router-dom';
import FeesModal from '../modals/FeesModal';
import { LuArrowUpRightFromCircle } from 'react-icons/lu';
import { CiUser } from 'react-icons/ci';
import { MdDoubleArrow } from "react-icons/md";
const ProfilePage = () => {
    const holidays = [
        { "date": "2024-01-26", "name": "Republic Day" },
        { "date": "2024-08-15", "name": "Independence Day" },
        { "date": "2024-10-02", "name": "Gandhi Jayanti" },
        { "date": "2024-10-25", "name": "Dussehra" },
        { "date": "2024-12-25", "name": "Christmas" },
        { "date": "2024-05-01", "name": "May Day" },
        { "date": "2024-01-01", "name": "New Year's Day" },
        { "date": "2024-04-14", "name": "Dr. B.R. Ambedkar Jayanti" },
        { "date": "2024-09-02", "name": "Ganesh Chaturthi" },
        { "date": "2024-11-01", "name": "Kannada Rajyotsava" }, { "date": "2024-01-26", "name": "Republic Day" },
        { "date": "2024-08-15", "name": "Independence Day" },
        { "date": "2024-10-02", "name": "Gandhi Jayanti" },
        { "date": "2024-10-25", "name": "Dussehra" },
        { "date": "2024-12-25", "name": "Christmas" },
        { "date": "2024-05-01", "name": "May Day" },
        { "date": "2024-01-01", "name": "New Year's Day" },
        { "date": "2024-04-14", "name": "Dr. B.R. Ambedkar Jayanti" },
        { "date": "2024-09-02", "name": "Ganesh Chaturthi" },
        { "date": "2024-11-01", "name": "Kannada Rajyotsava" }
    ];
    const quotes = [
        "The only way to do great work is to love what you do. - Steve Jobs",
        "In the middle of every difficulty lies opportunity. - Albert Einstein",
        "The best way to predict the future is to invent it. - Alan Kay",
        "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
        "Believe you can and you're halfway there. - Theodore Roosevelt",
        "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
        "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
        "Do not wait to strike till the iron is hot, but make it hot by striking. - William Butler Yeats",
        "Everything you’ve ever wanted is on the other side of fear. - George Addair",
        "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. - Albert Schweitzer"
    ];

    const [currentInd, setCurrentQuoteIndex] = useState(0);
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
          setOpacity(0); 
          setTimeout(() => {
            setCurrentQuoteIndex((prevInd) => (prevInd + 1) % quotes.length);
            setOpacity(1); 
          }, 500);
        }, 5000); 
    
        return () => clearInterval(interval);
      }, [quotes]);
    const [blogs, setBlogData] = useState([])
    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const responsedata = await axios.get(`${url}/api/blog/blogs`);
                if (responsedata) {
                    setBlogData(responsedata.data);
                } else {
                    throw new Error('Failed to fetch blog data');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchBlogData();

    }, []);
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState({})
    const [userAttandance, setUserAttandance] = useState({})
    const totalAttendance = Object?.values(userAttandance)?.reduce(
        (total, record) => total + record.present + record.absent
        ,
        0 // Initial value
    );
    const presentAttendance = Object?.values(userAttandance)?.reduce(
        (total, record) => total + record.present
        ,
        0 // Initial value
    );

    const user = JSON.parse(localStorage.getItem("user"))
    const getAttandaceDetails = async () => {
        try {
            const { data } = await axios.get(`${url}/api/attendance/allatt?_id=${user?._id}`);
            console.log(data.attendanceBySubject)
            setUserAttandance(data?.attendanceBySubject)
        } catch (error) {
            console.log('error', error)
        }
    }
    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const { data } = await axios.get(`${url}/api/user/singleuser/${user?._id}`);
                setUserDetails(data?.user)
            } catch (error) {
                console.log('error', error)
            }
        }
        getUserDetails()
        getAttandaceDetails()
    }, [])
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        console.log("closed")
        setOpen(false);
    }
    const handleOpen = () => {
        setOpen(true);
    }
    return (
        <div className='bg-gray-200  flex justify-center items-center h-screen'>
            {open && <FeesModal
                open={open}
                userid={user?._id}
                handleClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            />}
            <div className='w-[92%] h-[90%] flex flex-col gap-10 bg-white overflow-y-auto overflow-hidden custom-scrollbar rounded-lg shadow-md'>
                <div className='h-[100px] w-[100%] flex  mt-5 justify-center'>
                    <div className='h-[80px] w-[82%] flex bg-[#402277] rounded-2xl justify-center items-center shadow-md' >
                        <span className={`text-white font-bold transition-opacity duration-1000 ease-in-out`}
                            style={{ opacity: opacity }}>{quotes[currentInd]}</span>
                    </div>

                </div>
                <div className='w-full md:flex-row flex-col flex h-fit'>
                    <div className='md:w-[50%] w-full h-full pb-2  flex justify-center items-center '>

                        <div className='w-[95%] h-[90%]  '>
                            <div className='w-full md:h-[37%] h-[50%] flex flex-col md:flex-row items-center'>
                                <div className='md:w-[40%] w-full h-[70%] md:h-full p-2'>
                                    <img src={userDetails?.profilePic} className='w-44 h-44 rounded-full object-cover' alt="" />

                                </div>
                                <div className='md:w-[60%] w-full flex flex-col gap-2 h-[30%] md:h-full p-2'>
                                    <span className='w-full gap-4 md:px-4 justify-end  flex bg-gray-200 rounded-lg h-10 items-center capitalize'>{userDetails?.personalDetails?.FirstName + " " + userDetails?.personalDetails?.MiddleName + " " + userDetails?.personalDetails?.LastName}</span>
                                    <div className='w-full flex justify-end'>
                                        <div className='w-max h-max bg-sky-200 opacity-75 flex items-center p-2 gap-1 rounded-md shadow-md'>
                                            <span className='h-4 w-4 rounded-full bg-green-700 animate-pulse'></span>
                                            <span className='w-[30%] font-bold  capitalize flex  text-black'>{userDetails?.isActive ? "active" : "inActive"}</span>
                                        </div>

                                    </div>
                                </div>

                            </div>
                            <div className='md:h-[63%] h-[50%] w-full text-xs md:text-base flex flex-col gap-2  '>
                                <div className='w-full pl-4 rounded-md py-2  h-10 flex bg-sky-100  items-center'>
                                    <span className='w-[35%] font-semibold'>Registration No</span>
                                    <span className='w-[65%]'>{userDetails?.RegdNo}</span>
                                </div>
                                <div className='w-full pl-4 py-2 rounded-md   h-10 flex bg-gray-100 items-center'>
                                    <span className='w-[35%] font-semibold'>Course</span>
                                    <span className='w-[65%]'>{userDetails?.Course?.CourseName}</span>
                                </div>
                                <div className='w-full pl-4 py-2 rounded-md   h-10 flex bg-sky-100  items-center'>
                                    <span className='w-[35%] font-semibold'>Batch</span>
                                    <span className='w-[65%]'>{userDetails?.Batch}</span>
                                </div>
                                <div className='w-full pl-4 py-2 rounded-md   h-10 flex bg-gray-100   items-center'>
                                    <span className='w-[35%] font-semibold'>Section</span>
                                    <span className='w-[65%]'>{userDetails?.Section?.SectionName}</span>
                                </div>
                                <div className='w-full pl-4 py-2 rounded-md   h-10 flex bg-sky-100  items-center'>
                                    <span className='w-[35%] font-semibold'>Email ID</span>
                                    <span className='w-[65%]'>{userDetails?.email}</span>
                                </div>
                                <div className='w-full pl-4 py-2 rounded-md   h-10 flex bg-gray-100   items-center'>
                                    <span className='w-[35%] font-semibold'>Mobile No</span>
                                    <span className='w-[65%]'>{userDetails?.PhoneNo}</span>
                                </div>
                                <div className='w-full pl-4 py-2 rounded-md   h-10 flex bg-sky-100   items-center'>
                                    <span className='w-[35%] font-semibold'>Department</span>
                                    <span className='w-[65%]'>{userDetails?.Department?.DepartmentName}</span>
                                </div>
                                <div className='w-full pl-4 py-2 rounded-md justify-end  h-8jutg.0ounnnnnnhi flex   items-center'>
                                    <button onClick={() => { navigate(`/details/:${user._id}`) }} className='md:w-[25%] w-full  border-red-300  border-[1px]  shadow-md  rounded-md p-2 flex items-center justify-center gap-3 text-red-400 font-bold'>More Info<MdDoubleArrow className='animate-ping h-8 w-10 flex text-orange-500 ' /></button>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='md:w-[50%] w-full h-full flex flex-col bg-white'>
                        <div onClick={() => navigate('/overview')}
                            className='w-full md:h-[65%] h-full flex justify-center items-center cursor-pointer'>
                            <div className='w-[90%] h-[80%] rounded-md border-b-2 border-l-2 border-r-2 '>
                                <span className='h-12 font-bold text-md p-4 text-center flex bg-gray-200 '>
                                    Attandacne overview
                                </span>
                                <div className='w-full md:h-[95%] h-full  flex flex-col md:flex-row pl-2 '>
                                    <div className='md:h-full h-[33%] md:w-[35%] w-full flex  text-black items-center '>
                                        <ApexChart totalAttendance={totalAttendance} presentAttendance={presentAttendance} />
                                    </div>
                                    <div className='flex md:w-[65%] w-full justify-center items-center h-full py-4  md:h-full'>
                                        <div className='md:h-[70%] h-full  w-full flex md:flex-row md:flex-wrap flex-col '>
                                            {
                                                Object?.values(userAttandance)?.map((item, ind) => (
                                                    <div key={ind} className='md:w-[50%] w-full  flex items-center  gap-1 '>
                                                        <span className='md:p-4 p-2 rounded-full  text-white bg-lime-300'><FaBook /> </span>
                                                        <div className='md:font-bold text-xs '>
                                                            <span className='flex gap-2 justify-center items-center'>{(item?.present + item?.absent) === 0 ? (0) : ((item?.present * 100) / (item?.present + item?.absent)).toFixed(2) || 0} % <MdPersonOutline size={22} /></span>
                                                            <span className='flex gap-2 justify-center text-center  text-[9px] items-center'>{item?.subjectId}</span>
                                                        </div>
                                                    </div>
                                                ))
                                            }



                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full md:h-[35%] h-full flex flex-col gap-3 justify-between items-center'>
                            <span className='border-green-600 border-l-8 bg-green-100 h-10 w-full font-bold flex p-2 ml-4'>Fee Structure</span>
                            <div className='flex gap-2 justify-center flex-col md:flex-row items-center' onClick={handleOpen} >
                                <ApexChart2 dueAmout={userDetails?.DueAmount} />
                                <span>Total : 100000</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='p-4 border-[1px] border-gray-100'>
                    <span className='border-red-600 border-l-8 bg-red-100 h-10 w-full font-bold flex p-2 '>Read Some Articles</span>
                    <div className='flex overflow-x-auto '>
                        {blogs?.map((blog, indx) => (
                            <div onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/myblogs/${blog?._id}`)
                            }} key={indx} className='hover:cursor-pointer flex-shrink-0 w-[25%] gap-2 h-[250px] p-2 m-1  rounded-md  border-[1px] border-gray-50 shadow-md hover:shadow-sky-100 '
                            style={{ transition: 'transform 0.3s ease-in-out' }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                                <div className='w-[100%] h-[100%] group/item relative justify-center items-center'>

                                    <span className='z-5 invisible group-hover/item:visible absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sky-400 rounded-full p-1'>
                                        <LuArrowUpRightFromCircle className='h-8 w-8 text-sky-100' />
                                    </span>
                                    <img src={blog.CoverPhoto} className='h-[100%] w-[100%] object-cover rounded-xl hover:opacity-25' />

                                    <span className='absolute bottom-0 left-0 right-0 p-2  bg-opacity-50 font-bold text-white text-center text-xs  line-clamp-2 truncate max-w-80  group-hover/item:h-14 group-hover/item:bg-gray-600 '>
                                        {blog?.title}
                                    </span>
                                </div>

                            </div>

                        )

                        )}
                    </div>
                </div>
                <div className='flex md:flex-row h-full flex-col  w-full'>
                    <div className='md:w-[50%] w-full h-full'>
                        <DateCalendarServerRequest />
                    </div>
                    <div className="flex  justify-center flex-col m-2 gap-4 w-[80%] border-[1px] border-gray-200 p-10     overflow-y-auto overflow-x-hidden h-[90%] overflow-hidden "  >
                        {holidays.map((holiday, index) => (
                            <div key={index} className="bg-blue-200   rounded-lg p-4 text-center">
                                <p className="text-lg font-semibold">{holiday.name}</p>
                                <p className="text-sm text-gray-600">{new Date(holiday.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
