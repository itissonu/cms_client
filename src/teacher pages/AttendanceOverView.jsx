import React, { useEffect, useState } from 'react'
import { url } from '../utils/BackEndUrl';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Checkbox } from '@mui/material';
import toast from 'react-hot-toast';
import { IoSearchOutline } from "react-icons/io5";
const AttendanceOverView = () => {
    const userDetails = JSON.parse(localStorage.getItem("user"));
    const [sectionValue, setSectionsValue] = useState(null);
    const [sections, setSections] = useState([]);
    const [subject, setSubject] = useState([]);
    const [subjectValue, setSubjectValue] = useState(null);
    const [semester, setSemesterValue] = useState(null);
    const [allstudents, setStudents] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date());

    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [attendance, setAttendance] = useState({});
    const [presentStudents, setPresentStudents] = useState([]);
    const [AttendendStudent, setAttendedStudent] = useState([])
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [loading, setLoading] = useState(false);
    const [DateForEdit, setDateForEdit] = useState('')
    console.log(DateForEdit)
    useEffect(() => {
        const apiCallFuncetion = async () => {

            try {
                const sectionsRes = await axios.get(`${url}/api/section/allSection/${userDetails?.Department}`);
                if (sectionsRes) {
                    setSections(sectionsRes?.data?.section)
                }
                if (sectionValue && semester) {

                    const subjectS = await axios.get(`${url}/api/subject/allSubject/${userDetails?.Department}/${semester}`);

                    setSubject(subjectS?.data?.subjects)
                }

                if (sectionValue !== null) {
                    const students = await axios.get(`${url}/api/user/getuserbysectionandall?DepartmentName=${userDetails?.Department}&Section=${sectionValue}`)
                    setStudents(students?.data?.alluser);

                }

            } catch (error) {
            }
        }
        if (userDetails?.Department) {
            apiCallFuncetion()
        }
    }, [semester, sectionValue, selectedDate, startTime, endTime])

    const handleDateChange = date => {
        setSelectedDate(date);
    };


    const handleAttChange = (studentId, present) => {
        if (present && !presentStudents.includes(studentId)) {
            setPresentStudents(prevStudents => [...prevStudents, studentId]);
        } else {
            setPresentStudents(prevStudents => prevStudents.filter(id => id !== studentId));
        }

        setAttendance(prevAttendance => ({
            ...prevAttendance,
            [studentId]: present
        }));
    };

    useEffect(() => {

        console.log(AttendendStudent)

        handleSerach();

    }, [sectionValue, semester, subjectValue, selectedDate, startTime, endTime,])


    const handleSerach = async () => {
        const attData = {
            Section: sectionValue,
            time: (`${startTime}-${endTime}`),
            subject: subjectValue,
            date: selectedDate.toISOString()
        }

        try {
            if (sectionValue && semester && subjectValue && selectedDate && startTime && endTime) {


                const attendances = await axios.post(`${url}/api/attendance/attendancefilter`, attData, {
                    withCredentials: true,
                });
                console.log(attendances?.data?.attendance?.length === 0)
                if (attendances?.data?.attendance?.length === 0) {

                    setAttendedStudent([])
                }
                console.log(AttendendStudent)
                if (attendances?.data?.attendance?.length !== 0) {
                    setDateForEdit(attendances?.data?.attendance[0]?.date)
                    setAttendedStudent(attendances?.data?.attendance[0]?.Students);
                    setPresentStudents(attendances?.data?.attendance[0]?.Students)
                }

            }

        } catch (error) {
            console.error('Error fetching attendance:', error);
            toast.error('Error fetching attendance');
        }
    }
    console.log(attendance)

    const handleSearchButtonClick = async () => {
        handleSerach();
    };
    useEffect(() => {
        if (AttendendStudent.length > 0) {
            let checkedValues = allstudents.reduce((acc, student) => {
                acc[student._id] = AttendendStudent.includes(student._id);
                return acc;
            }, {});

            allstudents.forEach(student => {
                if (!(student._id in checkedValues)) {
                    checkedValues[student._id] = false;
                }
            });
            setAttendance(checkedValues)

        }
    }, [AttendendStudent])
    const [editAllowed, setEditAllowed] = useState(false);

    useEffect(() => {
        const currentDate = new Date();
        const isSameDay = currentDate.toDateString() === new Date(DateForEdit).toDateString();

        setEditAllowed(isSameDay);
    }, [DateForEdit]);

    console.log(editAllowed)

    console.log(presentStudents)
    return (
        <div className='flex flex-col justify-center items-center w-full'>
            <h3 className='text-2xl font-bold '>Attendance Overview and update</h3>
            <div className='flex justify-between items-center p-4 w-[90%] border-[1px] border-gray-300 mt-3 shadow-md shadow-gray-200'>
                <div className='flex flex-col'>
                    <label htmlFor="lunch" className="text-lg text-gray-600 font-bold">Section</label>
                    <select onChange={(e) => setSectionsValue(e.target.value)} className="rounded-md outline-none h-14 p-2  shadow-lg shadow-violet-300 border-[1px] border-gray-400 text-gray-800  font-bold uppercase hover:scale-105 transition-all ">
                        <option value="" className='text-white' disabled selected>Select Section</option>
                        {sections.length !== 0 && sections.map((section) => (
                            <option key={section._id} value={section._id}>
                                {section?.SectionName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="lunch" className="text-lg text-sky-400 font-bold">Semester</label>
                    <select onChange={(e) => setSemesterValue(e.target.value)} className="rounded-md outline-none h-14 p-2 shadow-lg shadow-violet-300 border-[1px] border-gray-400 text-gray-800  font-bold uppercase hover:scale-105 transition-all">
                        <option value="" disabled selected>Select Semester</option>

                        <option key='1' value={1}>
                            First
                        </option>
                        <option key='2' value={2}>
                            Second
                        </option>
                        <option key='3' value={3}>
                            Third
                        </option>
                        <option key='4' value={4}>
                            Fourth
                        </option>
                        <option key='5' value={5}>
                            Fifth
                        </option>
                        <option key='6' value={6}>
                            Six
                        </option>

                    </select>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="lunch" className="text-lg text-sky-400 font-bold">Subject</label>
                    <select onChange={(e) => setSubjectValue(e.target.value)} className="rounded-md outline-none h-14 p-2  shadow-lg shadow-violet-300 border-[1px] border-gray-400 text-gray-800 uppercase hover:scale-105 transition-all font-bold">
                        <option value="" disabled selected>Select Subject</option>
                        {subject.length !== 0 && subject.map((sub) => (
                            <option key={sub._id} value={sub._id}>
                                {sub?.subjectName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='date' className='text-lg text-sky-400 font-bold'>
                        Date
                    </label>
                    <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat='dd/MM/yyyy' className="rounded-md outline-none h-14 p-2  shadow-lg shadow-violet-300 border-[1px] border-gray-400 text-gray-800 hover:scale-105 transition-all font-bold" />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor='start-time' className='text-lg text-sky-400 font-bold'>
                        Start Time
                    </label>
                    <input
                        type='time'
                        id='start-time'
                        value={startTime}
                        onChange={e => setStartTime(e.target.value)}
                        className='rounded-md outline-none h-12 p-2 shadow-lg shadow-violet-300 hover:scale-105 transition-all border-[1px] border-gray-800 text-gray-400 font-bold'
                    />

                </div>
                <div className='flex flex-col'>
                    <label htmlFor='end-time' className='text-lg text-sky-400 font-bold'>
                        End Time
                    </label>
                    <input
                        type='time'
                        id='end-time'
                        value={endTime}
                        onChange={e => setEndTime(e.target.value)}
                        className='rounded-md outline-none h-12 p-2 shadow-lg hover:scale-105 transition-all shadow-violet-300 border-[1px] border-gray-800 text-gray-400 font-bold'
                    />
                </div>
                <div className=' mt-6 flex gap-2 items-center justify-center bg-blue-600 h-12 p-2 rounded-md shadow-md hover:cursor-pointer ' onClick={handleSearchButtonClick}>
                    <span className='flex text-white font-bold hover:cursor-pointer'>Serach</span><IoSearchOutline />
                </div>


            </div>
            <div>{!editAllowed &&<span className='text-red-600 text-lg font-bold'>*Not Allowed To Edit only At the Same date editable</span>}</div>
            <div>
                <div className="w-[95%] overflow-x-auto flex flex-col justify-center ">

                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Roll</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Reg No</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Profile Pic</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Present/Not
                                </th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {AttendendStudent.length !== 0 && allstudents.length !== 0 && allstudents.map(student => (
                                <tr key={student._id}>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{student.rollno}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{student.RegdNo}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500"><img src={student.profilePic} alt="Profile Pic" className="h-12 w-12 rounded-full" /></td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{`${student.personalDetails.FirstName} ${student.personalDetails.LastName}`}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                        {/* 
                                        <Checkbox {...label} color="success" checked={AttendendStudent.includes(student._id) || false}
                                            onChange={e => handleAttChange(student._id, e.target.checked)} /> */}
                                        <Checkbox {...label} color="success" checked={attendance[student._id] || false}
                                            onChange={e => handleAttChange(student._id, e.target.checked)} disabled={!editAllowed} />
                                    </td>

                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                        {presentStudents.includes(student._id) ? (
                                            <span className=" flex h-10 w-20 border-[1px] p-2 rounded-xl bg-[#7cfc007d] font-bold text-white font-times ">Present</span>
                                        ) : (
                                            <span className="flex font-times h-10 w-20 border-[1px] rounded-xl p-2 bg-red-500 text-white font-bold">Absent</span>
                                        )}
                                    </td>


                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* <div className='flex w-full justify-center items-center'>
    {allstudents.length !== 0 && <button className={`hover:cursor-pointer justify-center items-center flex hover:bg-cyan-400 w-28 font-bold h-12 p-1 rounded bg-sky-400 text-amber-50 shadow-xl mt-4  `}  >{loading ? <div className='w-7 h-7 rounded-full border-b-4 border-dashed border-white animate-spin'></div> : 'ADD'}</button>}
</div> */}
                </div>
            </div>
        </div>
    )
}

export default AttendanceOverView

