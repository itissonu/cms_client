import React from 'react'
import { useEffect, useState } from 'react'
import { url } from '../utils/BackEndUrl';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import toast from 'react-hot-toast';
import axios from 'axios';

const ExamMarkOverView = () => {
    const userDetails = JSON.parse(localStorage.getItem("user"));
    const [sectionValue, setSectionsValue] = useState(null);
    const [sections, setSections] = useState([]);
    const [subject, setSubject] = useState([]);
    const [subjectValue, setSubjectValue] = useState(null);
    const [semester, setSemesterValue] = useState(null);
    const [examtypesMark, setExamtypesMark] = useState([]);
    //const [examtypesValueMark, setExamtypesValueMark] = useState(null);
    const [examtypes, setExamtypes] = useState([]);
    const [examtypesValue, setExamtypesValue] = useState(null);
    const [allstudents, setStudents] = useState([])
    const [loading, setLoading] = useState(false);
    const [loadingStates, setLoadingStates] = useState({});
    const [allstudentMarks, setAllStudentmarks] = useState(null);
    //const[updatedatta,setUpdattat]=useEffect('')
    useEffect(() => {
        const apiCallFuncetion = async () => {
            try {
                const sectionsRes = await axios.get(`${url}/api/section/allSection/${userDetails?.Department}`);
                if (sectionsRes) {
                    setSections(sectionsRes?.data?.section)
                }
                if (sectionValue && semester) {
                    console.log("gotchaa")
                    const subjectS = await axios.get(`${url}/api/subject/allSubject/${userDetails?.Department}/${semester}`);

                    setSubject(subjectS?.data?.subjects)
                }
                if (sectionValue && semester) {
                    const examtypes = await axios.get(`${url}/api/examType/getallexamtypes`);
                    setExamtypes(examtypes?.data?.allTypes)
                }
                if (sectionValue && semester && examtypesValue) {

                    const examTyoessubject = await axios.get(`${url}/api/examsubject/getexamsubjectbysections?DepartmentName=${userDetails?.Department}&subject=${subjectValue}&examCategory=${examtypesValue}`);
                    console.log(examTyoessubject?.data)
                    setExamtypesMark(examTyoessubject?.data?.subjects)

                    const students = await axios.get(`${url}/api/user/getuserbysectionandall?DepartmentName=${userDetails?.Department}&Section=${sectionValue}`)
                    setStudents(students?.data?.alluser);


                }

                const initialLoadingStates = {};
                allstudents.forEach(student => {
                    initialLoadingStates[student._id] = false;
                });
                setLoadingStates(initialLoadingStates);
            } catch (error) {

            }
        }
        if (userDetails?.Department) {
            apiCallFuncetion()
        }
    }, [semester, examtypesValue])

    useEffect(() => {
        const apicallforStudenys = async () => {
            if (sectionValue && semester && examtypesValue && examtypesMark.length !== 0) {
                console.log(examtypesMark.length)
                const studentMarks = await axios.get(`${url}/api/exammark/getexamsubjectbysections/${examtypesMark[0]?._id}/${subjectValue}/?DepartmentName=${userDetails?.Department}&Section=${sectionValue}`);
                setAllStudentmarks(studentMarks?.data)
            }
        }
        if (examtypesMark.length !== 0) {
            apicallforStudenys()
        }
    }, [examtypesMark])

    console.log(allstudentMarks)
    console.log(examtypesMark)

    const [userInfo, setUserInfo] = useState('');

    const handleChangeInput = async (e) => {
        setUserInfo((previous) => ({
            ...previous,
            [e.target.name]: e.target.value
        }
        ));
    };

    const handleAddMark = async (userId, securedMark, semester, examSubjectId,detail) => {
        try {
            setLoadingStates(prevStates => ({
                ...prevStates,
                [userId]: true
            }));
            const markData = {
                userId: userId,
                securedMark: Number(securedMark),
                semester: Number(semester),
                examSubject: examSubjectId
            };
            console.log(markData)
            const response = await axios.post(`${url}/api/exammark/creatAExamMark`, markData);
            if (response?.data?.success) {

                toast.success(response?.data?.message)
                const updatedMarks = { ...allstudentMarks };
                updatedMarks[detail].securedMark = securedMark;
                setAllStudentmarks(updatedMarks);
                setLoadingStates(prevStates => ({
                    ...prevStates,
                    [userId]: false
                }));
            }
            console.log(markData);
        } catch (error) {
            setLoadingStates(prevStates => ({
                ...prevStates,
                [userId]: false
            }));
            toast.error(error.message)
            console.error('Error adding mark:', error);
        }
    };
    return (
        <div>
            <div>
                <div className='flex justify-between p-10'>
                    <div className='flex flex-col'>
                        <label htmlFor="lunch" className="text-lg text-blue-400 uppercase ">Section</label>
                        <select onChange={(e) => setSectionsValue(e.target.value)} className="rounded-md outline-none h-14 p-2 bg-black shadow-lg shadow-violet-300 text-white   ">
                            <option value="" className='text-white' disabled selected>Select Section</option>
                            {sections.length !== 0 && sections.map((section) => (
                                <option key={section._id} value={section._id}>
                                    {section?.SectionName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="lunch" className="text-lg text-blue-400 uppercase ">Semester</label>
                        <select onChange={(e) => setSemesterValue(e.target.value)} className="rounded-md outline-none h-14 p-2 bg-black shadow-lg shadow-violet-300 text-white font-bold ">
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
                        <label htmlFor="lunch" className="text-lg text-blue-400 uppercase ">Subject</label>
                        <select onChange={(e) => setSubjectValue(e.target.value)} className="rounded-md outline-none h-14 p-2 bg-black shadow-lg shadow-violet-300 text-white ">
                            <option value="" disabled selected>Select Subject</option>
                            {subject.length !== 0 && subject.map((sub) => (
                                <option key={sub._id} value={sub._id}>
                                    {sub?.subjectName}
                                </option>
                            ))}
                        </select>
                    </div>


                    <div className='flex flex-col'>
                        <label htmlFor="lunch" className="text-lg text-blue-400 uppercase ">Exam Type</label>
                        <select onChange={(e) => setExamtypesValue(e.target.value)} className="rounded-md outline-none h-14 p-2 bg-black shadow-lg shadow-violet-300 text-white ">
                            <option value="" disabled selected>Select ExamTypes</option>
                            {examtypes.length !== 0 && examtypes.map((sub) => (
                                <option key={sub._id} value={sub._id}>
                                    {sub?.ExamType}
                                </option>
                            ))}
                        </select>
                    </div>


                </div>
            </div>
            <div className='w-[90%]'>
                <Table className='m-3 p-4 w-[90%] border-2'>
                    <TableHead className='border-purple-200 border-2 shadow-lg'>
                        <TableRow className='bg-red-50'>
                            <TableCell className='font-bold text-red-950 border-2 border-purple-200' ><span>Roll No</span></TableCell>
                            <TableCell className='border-2 border-purple-200' ><span className='flex  h-full'>Registration No</span></TableCell>
                            <TableCell className='border-2 border-purple-200 hidden'><span>Name</span></TableCell>
                            <TableCell className='border-2 border-purple-200'><span>Full Mark</span></TableCell>
                            <TableCell className='border-2 border-purple-200'><span>Secured Mark</span></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className='shadow-md'>
                        {(allstudentMarks !== null && examtypesMark.length !== 0) && Object.keys(allstudentMarks)?.map((detail, index) => (
                            <TableRow key={index} className='p-1  m-2 border-purple-200 border-l-2'>
                                <TableCell className='border-2' ><span className='h-max w-10 p-2 items-center justify-center rounded-lg border-[1px]  border-blue-500 shadow-md flex font-bold '>{allstudentMarks[detail]?.user?.rollno}{console.log(allstudentMarks[detail])}</span></TableCell>

                                <TableCell className='border-2'>{allstudentMarks[detail]?.user?.RegdNo}</TableCell>
                                <TableCell className='border-2'><span className='h-max w-max rounded-lg border-[1px]  border-blue-500 shadow-md  p-2 text-xs font-semibold  '>{allstudentMarks[detail]?.user?.personalDetails?.FirstName + " " + allstudentMarks[detail]?.user?.personalDetails?.LastName}</span></TableCell>
                                <TableCell className='border-2' ><span className='h-max w-max border-[1px] p-2 text-xs font-semibold  bg-green-300 rounded-xl'> {examtypesMark[0]?.fullmark}</span></TableCell>

                                <TableCell className='border-2 flex gap-5'>
                                    <div className='flex gap-10'>
                                        <span className='flex text-white h-max w-max border-[1px] p-2 text-xs font-semibold  bg-red-300 rounded-xl' >{allstudentMarks[detail]?.securedMark}</span>
                                        <input type='number' className='h-max w-max border-[1px] border-gray-400 p-2 text-xs ' name={index} onChange={handleChangeInput} max={examtypesMark[0]?.fullmark} />
                                        <button className='h-max w-max p-2 bg-sky-300 font-bold text-white rounded-md shadow-sky-100' onClick={() => handleAddMark(allstudentMarks[detail]?.user?._id, userInfo[index], semester, examtypesMark[0]?._id,detail)}>{loadingStates[index] ? (
                                            <div className='w-7 h-7 rounded-full border-b-4 border-dashed border-white animate-spin'></div>
                                        ) : (
                                            'Update'
                                        )}</button>
                                    </div></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

        </div>
    )
}

export default ExamMarkOverView