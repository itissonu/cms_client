import React, { useState } from 'react'
import { AttendenceChart, TotalAttendance } from '../cards/attendenceChart'
import { DynamicTable } from '../cards/DynamicTable'
import axios from 'axios'
import { url } from '../utils/BackEndUrl';
import { useEffect } from 'react';

const AttendenceOverview = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [userAttandance, setUserAttandance] = useState({})
    const { totalAttendance, totalPresent, totalAbsent } = Object.values(userAttandance)?.reduce((acc, cur) => {
        acc.totalAttendance += cur.absent + cur.present;
        acc.totalPresent += cur.present;
        acc.totalAbsent += cur.absent;
        return acc;
    }, { totalAttendance: 0, totalPresent: 0, totalAbsent: 0 });
    console.log("userAttendence", userAttandance)
    useEffect(() => {
        getAttendenceDetails();
    }, [])
    const getAttendenceDetails = async () => {
        try {
            const { data } = await axios.get(`${url}/api/attendance/allatt?_id=${user?._id}`);
            setUserAttandance(data?.attendanceBySubject);
        } catch (error) {
            console.log(error)
        }
    }
    const headerData = [
        { label: "Subject", field: "subject" },
        { label: "Total Classes", field: "totalClasses" },
        { label: "Absents", field: "absents" },
        { label: "Presents", field: "presents" },
        { label: "Percentage", field: "percentage" }
    ];
    const rowData = Object.values(userAttandance)?.map((item) => ({
        subject: item?.subjectId,
        totalClasses: Number(item?.absent || 0) + Number(item?.present || 0),
        absents: item?.absent,
        presents: item?.present,
        percentage: item?.present * 100 / (item?.present + item?.absent) || 0
    }));
    return (
        <div className='bg-gray-200  flex justify-center items-center h-screen'>
            <div className='w-[92%] h-[90%] flex flex-col gap-10 bg-white overflow-y-auto overflow-hidden custom-scrollbar rounded-lg shadow-md'>
                <div className='flex justify-evenly pt-4'>
                    <div className='w-[40%]'>
                        <TotalAttendance
                            totalAbsent={totalAbsent}
                            totalAttendance={totalAttendance}
                            totalPresent={totalPresent} />
                    </div>
                    <div className='w-[60%]'>
                        <AttendenceChart userAttendance={userAttandance} />
                    </div>
                </div>
                <div className='border-[#e0e0e0] border-t-2  w-full pt-2'></div>
                <div className='px-4'>
                    <DynamicTable rowData={rowData} headerData={headerData} />
                </div>

            </div>
        </div>
    )
}

export default AttendenceOverview