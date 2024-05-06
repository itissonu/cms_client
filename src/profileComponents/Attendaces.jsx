import React, { useEffect, useState } from 'react'
import { DynamicTable } from '../cards/DynamicTable';
import axios from 'axios';
import { url } from '../utils/BackEndUrl';

const Attendaces = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [userAttandance, setUserAttandance] = useState({})
    // const { totalAttendance, totalPresent, totalAbsent } = Object.values(userAttandance)?.reduce((acc, cur) => {
    //     acc.totalAttendance += cur.absent + cur.present;
    //     acc.totalPresent += cur.present;
    //     acc.totalAbsent += cur.absent;
    //     return acc;
    // }, { totalAttendance: 0, totalPresent: 0, totalAbsent: 0 });
    // console.log("userAttendence", userAttandance)
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
        presentDate: item?.presentDate,
        absentDate: item?.absentDate,
        percentage: item?.present * 100 / (item?.present + item?.absent) || 0
    }));
    return (
        <div className='bg-gray-200  flex flex-col justify-center items-center'>
          
                <span className='text-red-700 font-bold'>* You can see thedatails of Attendance subject wise please click</span>
                <div className='hover:cursor-pointer'>
                    <DynamicTable rowData={rowData} headerData={headerData} />
                </div>

         
        </div>
    )
}

export default Attendaces