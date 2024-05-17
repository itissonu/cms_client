import React, { useEffect, useState } from 'react'
import { url } from '../utils/BackEndUrl';
import axios from 'axios';

import DatePicker from 'react-datepicker';
import { IoIosAddCircleOutline } from "react-icons/io";
import toast from 'react-hot-toast';

const AddTimeTable = () => {

  const [courses, setCourses] = useState([]);
  const [courseValue, setCourseValue] = useState(null)
  const [departments, setDepartments] = useState([]);
  const [departmentValue, setDepartmentsValue] = useState(null)
  const [sections, setSections] = useState([]);
  const [sectionValue, setSectionsValue] = useState(null)
  const [mentors, setMentors] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [mentorValue, setMentorValue] = useState(null);
  const [loading, setLoading] = useState(false)
  const [timetable, setTimetableData] = useState([])
  const [subject, setSubject] = useState([]);
  const [subjectValue, setSubjectValue] = useState(null);

  useEffect(() => {
    const apiCallFunction = async () => {
      try {
        const timeTable = await axios.get(`${url}/api/timetable/alltimetable`)
        setTimetableData(timeTable?.data?.tableData);

        const cousreRes = await axios.get(`${url}/api/course/allCourse`);
        if (cousreRes) {
          setCourses(cousreRes?.data?.courses)
        }

        if (courseValue) {
          const departmentRes = await axios.get(`${url}/api/department/allDepartment/${courseValue}`);

          if (departmentRes) {
            setDepartments(departmentRes?.data?.department)
          }
        }
        if (departmentValue) {

          const sectionsRes = await axios.get(`${url}/api/section/allSection/${departmentValue}`);

          if (sectionsRes) {
            setSections(sectionsRes?.data?.section)
          }
        }
        if (sectionValue) {

          const subjectS = await axios.get(`${url}/api/subject/allSubject/${departmentValue}/1`);

          setSubject(subjectS?.data?.subjects)
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    apiCallFunction()

  }, [courseValue, departmentValue, sectionValue]);

  const handleDateChange = date => {
    setSelectedDate(date);
  };


  //// for setting up the teacher
  useEffect(() => {

    const apiCallForSectionAvaile = async () => {
      if (startTime && endTime && courseValue && departmentValue && sectionValue && subjectValue) {
        const newData = {
          TimeSlot: (`${startTime}-${endTime}`),
          Course: courseValue,
          date: selectedDate.toISOString(),
          Department: departmentValue
        }
        const mentorRes = await axios.post(`${url}/api/timetable/getavailableTeacher`, newData, {
          withCredentials: true,
        })
        if (mentorRes) {
          console.log(mentorRes)
          if (mentorRes?.data?.availTeacher.length === 0) {
            setMentors([])
          }
          if (mentorRes?.data?.availTeacher.length !== 0) {
            setMentors(mentorRes?.data?.availTeacher)
          }

        }
      }
    }
    apiCallForSectionAvaile()

  }, [sectionValue, startTime, endTime, selectedDate, courseValue, subjectValue])

  const [slotError, setError] = useState(false)


  //// for setting up the time slot availanilty

  useEffect(() => {
    const callForTeacher = async () => {
      const NewInfo = {
        TimeSlot: (`${startTime}-${endTime}`),
        date: selectedDate.toISOString(),
        Section: sectionValue,

      }
      console.log(NewInfo)
      const SectionRes = await axios.post(`${url}/api/timetable/getavailablity`, NewInfo, {
        withCredentials: true,
      })
      console.log(SectionRes)
      if (!SectionRes?.data?.success) {
        console.log(SectionRes?.data)
        setError(true)
        return toast.error(SectionRes?.data?.message)
      }
      if (SectionRes?.data?.success) {

        setError(false)

      }

    }

    callForTeacher()

  }, [selectedDate, startTime, endTime, courseValue, sectionValue])

  ////creating time table  
  const handleCrerate = async () => {
    if (!startTime || !endTime || !courseValue || !departmentValue || !mentorValue || !sectionValue || !subjectValue) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      setLoading(true)
      const newData = {
        TimeSlot: (`${startTime}-${endTime}`),
        Course: courseValue,
        date: selectedDate.toISOString(),
        Department: departmentValue,
        teacher: mentorValue,
        Section: sectionValue,
        subject: subjectValue
      }
      if (!slotError) {
        const apicallres = await axios.post(`${url}/api/timetable/createtimetable`, newData, {
          withCredentials: true,
        })
        if (apicallres?.data?.success) {
          toast.success(apicallres?.data?.message)
          setLoading(false)

        }
        if (!apicallres?.data?.success) {

          toast.error(apicallres?.data?.message)
          setLoading(false)
        }
      } else {
        toast.error("please select another time slot")
      }

      setLoading(false)

    } catch (error) {
      toast.error(error?.message)
      setLoading(false)
    }
  }



  return (
    <div className='w-full flex-col flex gap-2 justify-center items-center '>
      <div className='h-14 w-[90%] border-[1px] border-gray-100 shadow-md rounded-md p-5 items-center shadow-red-100'>
        <h3 className='text-gray-500 font-bold'>Time Table Management</h3>
      </div>
      <div className='w-full flex '>
        <div className='flex w-[25%] flex-col m-4 p-5 gap-3 border-[1px] border-gray-100 shadow-md'>
          <div className='flex gap-4 items-center justify-between'>
            <label htmlFor="lunch" className="text-lg text-gray-400 font-bold">Course</label>
            <select onChange={(e) => setCourseValue(e.target.value)} className="bg-red h-10 w-32 shadow-md rounded-lg bg-black text-white shadow-gray-300 text-sm outline-none p-1">
              {courses.length !== 0 && courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course?.CourseName}
                </option>
              ))}
            </select>
          </div>

          <div className='flex gap-4 items-center justify-between'>
            <label htmlFor="lunch" className="text-lg text-gray-400 font-bold">Department</label>
            <select onChange={(e) => setDepartmentsValue(e.target.value)} disabled={!courseValue} className="bg-red h-10 w-32 shadow-md rounded-lg bg-black text-white shadow-gray-300 text-sm outline-none p-1">
              <option value="" disabled selected>Select Department</option>
              {departments.length !== 0 && departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department?.DepartmentName}
                </option>
              ))}
            </select>
          </div>


          <div className='flex gap-4 items-center justify-between'>
            <label htmlFor="lunch" className="text-lg text-gray-400 font-bold">Section</label>
            <select onChange={(e) => setSectionsValue(e.target.value)} disabled={!courseValue || !departmentValue} className="bg-red h-10 w-32 shadow-md rounded-lg bg-black text-sm text-white shadow-gray-300  outline-none p-1">
              <option value="" disabled selected>Select Section</option>
              {sections.length !== 0 && sections.map((section) => (
                <option key={section._id} value={section._id}>
                  {section?.SectionName}
                </option>
              ))}
            </select>
          </div>
          <div className='flex gap-4 items-center justify-between'>
            <label htmlFor="lunch" className="text-lg text-gray-600 font-bold">Subject</label>
            <select onChange={(e) => setSubjectValue(e.target.value)} className="bg-red h-10 w-32 shadow-md rounded-lg bg-black text-white shadow-gray-300  outline-none p-1">
              <option value="" disabled selected>Select Subject</option>
              {subject.length !== 0 && subject.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub?.subjectName}
                </option>
              ))}
            </select>
          </div>



          <div className='flex gap-4 items-center justify-between'>
            <label htmlFor='date' className='text-lg text-gray-400 font-bold'>
              Date
            </label>
            <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat='dd/MM/yyyy' className="bg-red h-10 w-32 shadow-md rounded-lg bg-black text-white shadow-gray-300  outline-none p-1" />
          </div>

          <div className='flex gap-4 items-center justify-between'>
            <label htmlFor='start-time' className='text-lg text-gray-400 font-bold'>
              Start Time
            </label>
            <input
              type='time'
              id='start-time'
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
              className="bg-red h-10 w-32 shadow-md rounded-lg bg-black text-white shadow-gray-300  outline-none p-1"
            />

          </div>
          <div className='flex gap-4 items-center justify-between'>
            <label htmlFor='end-time' className='text-lg text-gray-400 font-bold'>
              End Time
            </label>
            <input
              type='time'
              id='end-time'
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
              className="bg-red h-10 w-32  rounded-lg bg-gray-900 text-white shadow-gray-300  outline-none p-1 shadow-lg"
            />
          </div>
          {slotError && <span className='text-red-800'>Time Slot Taken</span>}
          <div className='flex gap-4 items-center justify-between '>
            <label htmlFor="lunch" className="text-lg text-gray-400 font-bold">Mentor</label>
            <select onChange={(e) => setMentorValue(e.target.value)} className="bg-red h-10 w-32 shadow-md rounded-lg bg-black text-white shadow-gray-300  outline-none p-1">
              <option value="" disabled selected>Select mentor</option>
              {mentors.length !== 0 && mentors.map((mentor) => (
                <option key={mentor._id} value={mentor._id}>
                  {mentor?.personalDetails?.FirstName + '' + mentor?.personalDetails?.LastName}
                </option>
              ))}
            </select>
          </div>
          <div className='flex justify-center'>
            <button className='bg-sky-300 text-white flex justify-center items-center h-10 border-[1px] shadow-md rounded-md w-32 p-2 hover:cursor-pointer' onClick={handleCrerate}>{loading ? <span className='h-6 w-6 rounded-full border-b-2 border-white animate-spin flex '></span> : <div className='flex gap-2 justify-center items-center'>Add<IoIosAddCircleOutline className='text-white' /></div>}</button>
          </div>
        </div>
        <div className='w-[55%]'>
          <div className="max-w-screen-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">Student Management System</h2>
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="border border-red-200 bg-red-100 px-4 py-2">Department Name</th>
                    <th className="border border-red-200 bg-red-100 px-4 py-2">Course Name</th>
                    <th className="border border-red-200 bg-red-100 px-4 py-2">Subject Name</th>
                    <th className="border border-red-200 bg-red-100 px-4 py-2">Time Slot</th>
                    <th className="border border-red-200 bg-red-100 px-4 py-2">Teacher Name</th>
                    <th className="border border-red-200 bg-red-100 px-4 py-2">Date</th>
                    <th className="border border-red-200 bg-red-100 px-4 py-2">Section</th>
                  </tr>
                </thead>
                <tbody>
                  {timetable?.length !== 0 && timetable.map(item => (
                    <tr key={item._id} className="hover:bg-gray-100">
                      <td className="border-r border-red-200 border-l px-4 py-2">{item.Department.DepartmentName}</td>
                      <td className="border-r border-red-200 border-l px-4 py-2">{item.Course.CourseName}</td>
                      <td className="border-r  border-red-200 border-l px-4 py-2">{item.subject.subjectName}</td>
                      <td className="border-r border-red-200 border-l px-4 py-2">{item.TimeSlot}</td>
                      <td className="border-r border-red-200 border-l px-4 py-2">{`${item.teacher.personalDetails.FirstName} ${item.teacher.personalDetails.LastName}`}</td>
                      <td className="border-r border-red-200 border-l px-4 py-2">{new Date(item.date).toLocaleDateString()}</td>
                      <td className="border-r border-red-200 border-l px-4 py-2">{item.Section.SectionName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddTimeTable