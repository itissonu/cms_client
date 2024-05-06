import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { url } from '../utils/BackEndUrl';
import FullCalendar from '@fullcalendar/react';

import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

const TimeTable = () => {
    const [tabledata, setTableData] = useState([])


    const dateformat = new Date(Date.now());
    const isoDateString = dateformat.toISOString();

    const [selectedDate, setSelectedDate] = useState(isoDateString);

    const handleDateClick = (arg) => {

        const dateStr = arg.dateStr;
        const dateObj = new Date(dateStr);
        const isoString = dateObj.toISOString();
        setSelectedDate(isoString)
    }
    console.log(selectedDate)

    const date = selectedDate

    useEffect(() => {
        const fetchTableData = async () => {
            try {
                const responsedata = await axios.get(`${url}/api/timetable/datewisetimetable/${date}`, {
                    withCredentials: true,
                });
                if (responsedata) {
                    setTableData(responsedata.data);
                } else {
                    throw new Error('Failed to fetch blog data');
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchTableData()

    }, [selectedDate])
    console.log(tabledata)
    return (
        <div className='bg-gray-200  flex justify-center items-center h-screen'>
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
                    {tabledata.length !== 0 && (tabledata?.tableData.length === 0 ? (
                        <p>Timetable is not yet available.</p>
                    ) : (
                        <table className='  w-full'>
                            <thead className=' p-1'>
                                <tr className='flex gap-4 justify-between bg-white m-1' >
                                    <th className='m-1 text-gray-900'>Time Slot</th>
                                    <th className='m-1 text-gray-900'>Subject</th>
                                    <th className='m-1 text-gray-900'>Teacher</th>
                                </tr>
                            </thead>
                            <tbody >
                                {tabledata?.tableData.map((item) => (
                                    <tr key={item._id} className='flex gap-4 justify-between border-b-[1px] border-b-gray-300 p-3 bg-sky-50'>
                                        <td className='h-max w-max text-xs p-1 bg-green-200 font-semibold rounded-lg'>{item.TimeSlot}</td>
                                        <td className='font-bold text-purple-950'>{item.subject.subjectName}</td>
                                        <td className='text-gray-400 font-bold'>{item.teacher?.personalDetails?.FirstName}{' '}{item.teacher?.personalDetails?.MiddleName}{' '}{item.teacher?.personalDetails?.LasttName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TimeTable