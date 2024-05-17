import React, { useEffect, useMemo, useState } from 'react'
import { BsAmd } from "react-icons/bs";
import { GoSun } from "react-icons/go";
import { IoPeopleCircleSharp } from "react-icons/io5";
import { FaPeopleRobbery } from "react-icons/fa6";
import { FaPeopleGroup } from "react-icons/fa6";
import { TbMoodKid } from "react-icons/tb";
import DateCalendarServerRequest from '../cards/ApexChart';
import axios from 'axios';
import { url } from '../utils/BackEndUrl';
import { TfiFaceSad } from "react-icons/tfi";
import FullCalendar from '@fullcalendar/react';
import { debounce } from 'lodash';


import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import Carousel from '../cards/Carousel';
import Carouselcomponent from '../cards/Carousel';

const TeacherProfile = () => {
    const [currentTime, setCurrentTime] = useState('');


    const formattedTime = useMemo(() => {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        const amOrPm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12 || 12;
        hours = hours < 10 ? `0${hours}` : hours;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;

        return `${hours}:${minutes}:${seconds} ${amOrPm}`;
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(formattedTime);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [formattedTime])
    const [currentDay, setCurrentDay] = useState('');
    const [currentMonth, setCurrentMonth] = useState('');
    const [currentYear, setCurrentYear] = useState('');

    useEffect(() => {
        const now = new Date();
        const optionsDay = { day: 'numeric' };
        const optionsMonth = { month: 'long' };
        const optionsYear = { year: 'numeric' };

        const formattedDay = now.toLocaleDateString('en-US', optionsDay);
        const formattedMonth = now.toLocaleDateString('en-US', optionsMonth);
        const formattedYear = now.toLocaleDateString('en-US', optionsYear);

        setCurrentDay(formattedDay);
        setCurrentMonth(formattedMonth);
        setCurrentYear(formattedYear);
    }, []);
    const [tabledata, setTableData] = useState([])


    const dateformat = new Date(Date.now());
    const isoDateString = dateformat.toISOString();

    const [selectedDate, setSelectedDate] = useState(isoDateString);
    const [allnotices, setNotices] = useState([])

    const handleDateClick = (arg) => {

        const dateStr = arg.dateStr;
        const dateObj = new Date(dateStr);
        const isoString = dateObj.toISOString();
        setSelectedDate(isoString)

        fetchTableData()

    }
    const date = selectedDate

    const fetchTableData = async () => {
        try {
            const responsedata = await axios.get(`${url}/api/timetable/datewisetimetableteacher/${date}`, {
                withCredentials: true,
            });
            if (responsedata) {
                setTableData(responsedata.data.filterdata);
            } else {
                throw new Error('Failed to fetch blog data');
            }
        } catch (error) {
            console.error(error);
        }
    };
    const debouncedFetchTableData = debounce(fetchTableData, 1000);


    useEffect(() => {

        fetchTableData()
        fetchNotices()

    }, [selectedDate])
    const fetchNotices = async () => {
        const responsedata = await axios.get(`${url}/api/notes/notices`, {
            withCredentials: true,
        });
        console.log(responsedata.data)
        setNotices(responsedata?.data?.data)
    }
    console.log(allnotices)
    const [count, setCount] = useState(0);
    const targetValue = 56;
    const intervalDuration = 50; // milliseconds

    useEffect(() => {
        const interval = setInterval(() => {
            if (count < targetValue) {
                setCount(prevCount => prevCount + 1);
            } else {
                clearInterval(interval);
            }
        }, intervalDuration);

        return () => clearInterval(interval);
    }, [count, targetValue]);

    return (
        <div className='w-full p-10 flex h-max flex-col gap-10 bg-slate-100'>
            <div className='h-20 w-[95%] m-auto p-4 flex border-[1px] shadow-md border-gray-100 bg-white'>
                <div className='w-full flex items-center gap-4'><span className='text-2xl text-gray-600 font-bold '>Teacher Dashboard</span><BsAmd size={28} className='text-red-400' /></div>
            </div>
            <div className='w-[95%] h-[300px] flex'>
                <div className='flex-[2] border-r-4 border-red-500 h-[98%] flex justify-center items-center'>
                    <div className='w-[86%] h-[98%] shadow-xl border-[1px] border-gray-100 bg-white flex-col flex'>
                        <div className='flex gap-4 h-1/2 p-5'>
                            <GoSun size={42} />
                            <div className=' flex flex-col'>
                                <span className='text-gray-900 opacity-80 text-lg font-bold'>{currentTime}</span>
                                <span className='text-xs opacity-75'>So Sunny Out There</span>
                            </div>
                        </div>
                        <div className='h-1/2 flex flex-col p-4'>
                            <span className='text-2xl font-extrabold'>Today:</span>
                            <span className='text-2xl font-extrabold'>{currentDay} {currentMonth}</span>
                            <span className='text-2xl font-extrabold'>{currentYear}</span>
                        </div>

                    </div>
                </div>
                <div className='flex-[3] border flex flex-wrap gap-3 p-4'>
                    <div className='flex w-[31%] h-[42%] bg-white border-gray-100 shadow-lg border flex-col p-3 gap-3 border-b-red-500'>
                        <div className='flex justify-between p-1'>
                            <span className='text-4xl font-extrabold'>{count}</span>
                            <div className='w-max flex h-max p-2 rounded-full bg-red-50 justify-center items-center'><FaPeopleGroup className='text-red-700 h-4 w-4' /></div>

                        </div>
                        <span className=' font-bold'>Total Student</span>
                    </div>
                    <div className='flex w-[31%] h-[42%] bg-white border-gray-100 shadow-lg border flex-col p-3 gap-3 border-b-red-500'>
                        <div className='flex justify-between p-1'>
                            <span className='text-4xl font-extrabold'>6</span>
                            <div className='w-max flex h-max p-2 rounded-full bg-red-50 justify-center items-center'><FaPeopleRobbery className='text-red-700 h-4 w-4' /></div>

                        </div>
                        <span className=' font-bold'>Total Present</span>
                    </div>
                    <div className='flex w-[31%] h-[42%] bg-white border-gray-100 shadow-lg border flex-col p-3 gap-3 border-b-red-500'>
                        <div className='flex justify-between p-1'>
                            <span className='text-4xl font-extrabold'>4</span>
                            <div className='w-max flex h-max p-2 rounded-full bg-red-50 justify-center items-center'><TbMoodKid className='text-red-700 h-4 w-4' /></div>

                        </div>
                        <span className=' font-bold'>Total Absent</span>
                    </div>
                    <div className='flex w-[31%] h-[42%] bg-white border-gray-100 shadow-lg border flex-col p-3 gap-3 border-b-red-500'>
                        <div className='flex justify-between p-1'>
                            <span className='text-4xl font-extrabold'>5</span>
                            <div className='w-max flex h-max p-2 rounded-full bg-red-50 justify-center items-center'><IoPeopleCircleSharp className='text-red-700 h-4 w-4' /></div>

                        </div>
                        <span className=' font-bold'>Total sections</span>
                    </div>

                </div>


            </div>
            <div classname='w-[90%] flex  ' style={{ display: 'flex', gap: '10px' }}>
                <div className='w-[55%] border bg-white shadow-lg h-[300px] border-l-4 border-l-red-600 overflow-hidden overflow-y-auto'>
                    <div className='w-full gap-4 flex flex-col p-5'>
                        {/* {allNotices.map(notice => ( */}
                        <div

                            className={`notice-item flex flex-col  p-4 border rounded-lg w-[86%] border-gray-300'}`}
                        >
                            <h3 className='text-lg font-semibold bg-green-300 text-sky-900'>Dear students and faculty, please be informed that there will be scheduled maintenance on our online learning platform on Satu</h3>
                            <p className='text-gray-700'>notice.content</p>
                            <span className='text-sm text-gray-500 block'>Date: {new Date(('2024-05-09T09:36:51.000Z')).toLocaleDateString()}</span>
                            <span className={`notice-item h-max w-max p-1 border rounded-lg ${true ? 'bg-red-100 border-red-400' : 'bg-white border-gray-300'}`} >urgent</span>
                            {/* Add more information as needed */}
                        </div>
                        {/* ))} */}
                    </div>
                    <div className='w-full gap-4 flex flex-col p-5'>
                        {/* {allNotices.map(notice => ( */}
                        <div

                            className={`notice-item flex flex-col  p-4 border rounded-lg w-[86%] border-gray-300'}`}
                        >
                            <h3 className='text-lg font-semibold'>Dear students and faculty, please be informed that there will be scheduled maintenance on our online learning platform on Satu</h3>
                            <p className='text-gray-700'>notice.content</p>
                            <span className='text-sm text-gray-500 block'>Date: {new Date(('2024-05-09T09:36:51.000Z')).toLocaleDateString()}</span>
                            <span className={`notice-item h-max w-max p-1 border rounded-lg ${true ? 'bg-red-100 border-red-400' : 'bg-white border-gray-300'}`} >urgent</span>
                            {/* Add more information as needed */}
                        </div>
                        {/* ))} */}
                    </div>
                    <div className='w-full gap-4 flex flex-col p-5'>
                        {/* {allNotices.map(notice => ( */}
                        <div

                            className={`notice-item flex flex-col  p-4 border rounded-lg w-[86%] border-gray-300'}`}
                        >
                            <h3 className='text-lg font-semibold'>Dear students and faculty, please be informed that there will be scheduled maintenance on our online learning platform on Satu</h3>
                            <p className='text-gray-700'>notice.content</p>
                            <span className='text-sm text-gray-500 block'>Date: {new Date(('2024-05-09T09:36:51.000Z')).toLocaleDateString()}</span>
                            <span className={`notice-item h-max w-max p-1 border rounded-lg ${true ? 'bg-red-100 border-red-400' : 'bg-white border-gray-300'}`} >urgent</span>
                            {/* Add more information as needed */}
                        </div>
                        {/* ))} */}
                    </div>
                    <div className='w-full gap-4 flex flex-col p-5'>
                        {/* {allNotices.map(notice => ( */}
                        <div

                            className={`notice-item flex flex-col  p-4 border rounded-lg w-[86%] border-gray-300'}`}
                        >
                            <h3 className='text-lg font-semibold bg-green-100'>Dear students and faculty, please be informed that there will be scheduled maintenance on our online learning platform on Saturday</h3>
                            <p className='text-gray-700'>notice.content</p>
                            <span className='text-sm text-gray-500 block'>Date: {new Date(('2024-05-09T09:36:51.000Z')).toLocaleDateString()}</span>
                            <span className={`notice-item h-max w-max p-1 border rounded-lg ${true ? 'bg-red-100 border-red-400' : 'bg-white border-gray-300'}`} >urgent</span>

                        </div>
                        {/* ))} */}
                    </div>
                </div>
                <div className='w-[40%] bg-white shadow-md hover:cursor-pointer'>
                    <Carouselcomponent />
                </div>
            </div>
            <div className='w-[92%] h-[90%] flex  gap-10 bg-white overflow-y-auto overflow-hidden custom-scrollbar rounded-lg shadow-md'>
                <div className='w-[100%] h-[80%] max-w-[800px] max-h-[800px] p-5'>
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        dateClick={handleDateClick}
                        initialView="dayGridMonth"
                        weekends={true}
                    />
                </div>
                <div className='w-[80%] h-[80%] max-w-[600px] max-h-[800px] border-t-8 m-4 border-[1px] border-gray-200 border-t-red-600'>
                    {(tabledata?.length === 0 ? (
                        <div className='h-full w-full flex justify-center items-center'><p className='text-xl font-extrabold '>Timetable is not yet available.</p><TfiFaceSad className='h-12 w-12 text-yellow-500' /></div>
                    ) : (
                        <table className='  w-full'>
                            <thead className=' p-1'>
                                <div className='text-center font-bold margin-b-[1px] shadow-md p-3'>{(new Date(tabledata[0]?.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }))}</div>
                                <tr className='flex gap-4 justify-between bg-white m-1' >
                                    <th className='m-1 text-gray-900 uppercase'>Time Slot</th>
                                    <th className='m-1 text-gray-900 uppercase'>Subject</th>
                                    <th className='m-1 text-gray-900 uppercase'>Teacher</th>
                                </tr>
                            </thead>
                            <tbody >
                                {tabledata?.map((item) => (
                                    <tr key={item._id} className='flex gap-4 justify-between border-b-[1px] border-b-gray-300 p-3 bg-sky-50'>
                                        <td className='h-max w-max text-xs p-1 bg-green-200 font-semibold rounded-lg'>{item.TimeSlot}</td>
                                        <td className='font-semibold text-xs'>{item.subject.subjectName}</td>
                                        <td className=' font-semibold text-xs '>{item.teacher?.personalDetails?.FirstName}{' '}{item.teacher?.personalDetails?.MiddleName}{' '}{item.teacher?.personalDetails?.LasttName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ))}
                </div>
            </div>


        </div>
    );
}

export default TeacherProfile