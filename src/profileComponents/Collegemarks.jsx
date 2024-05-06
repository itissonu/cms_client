import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { url } from '../utils/BackEndUrl';

const Collegemarks = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userid = user?._id
    const [marks, setCollegemarks] = useState({})
    useEffect(() => {
        const fetchFeeDetails = async () => {

            try {
                const resdata = await axios.get(`${url}/api/exammark/getexammarkofanuser/${userid}/1`);
                console.log(resdata)
                setCollegemarks(resdata?.data);
            } catch (error) {
                console.error('Error fetching fee details:', error);
            }
        };

        fetchFeeDetails();
    }, [userid]);
    console.log(marks)
    const[subjectIndex,setIndexOfexam]=useState('')
    const [selectedExamIndex, setSelectedExamIndex] = useState(null);
    const handleExamTypeClick = (index) => {
        setSelectedExamIndex(index);
    };
    return (
        <div> 
         {/* <div className='flex flex-col p-4'>

            {marks && Object.keys(marks).map((examType, index) => (
                <div key={index} className='border-gray-400 border-[1px]'>
                    <h3 onClick={()=>setIndexOfexam(index)} className='w-full bg-green-200 p-4'>{examType}</h3>

                    {marks[examType].map((item, subIndex) => (
                        <div key={subIndex} className={` ${index===subjectIndex?'':'hidden'} border-[1px] border-gray-400`} >

                            <span>Subject Name: {item?.subject.subjectName}</span>
                            <span>Subject Code: {item?.subject.SubjectCode}</span>
                            <span>Exam Marks: {item?.Marks?.examSubject
                                ?.fullmark}/{item.examMarks}</span>
                            <hr />
                            <br />
                        </div>
                    ))}
                </div>
            ))}
        </div> */}
        <div className='flex flex-col p-4 gap-3'>
            {marks && Object.keys(marks).map((examType, index) => (
                <div key={index}>
                    <h2 onClick={() => handleExamTypeClick(index)} className='w-full bg-gray-100 p-3 text-lg text-gray-950 font-bold border-l-8 border-l-yellow-500'>{examType}</h2>
                    {selectedExamIndex === index && (
                        <table className={`border-[1px] border-gray-400 w-full`}>
                            
                                <tr className='w-full bg-sky-100'>
                                    <th className='text-left p-2'>Subject Name</th>
                                    <th className='text-left p-2'>Subject Code</th>
                                    <th className='text-left p-2'>Exam Marks</th>
                                </tr>
                           
                                
                                {marks[examType].map((item, subIndex) => (
                                    <tr key={subIndex} className=' p-5 bg-white mx-1'>
                                        <td className='p-2 text-lg font-bold text-red-950'>{item?.subject.subjectName}</td>
                                        <td className='p-2 text-emerald-950 font-bold'>{item?.subject.SubjectCode}</td>
                                        <td className='p-2'><span className='bg-red-100  w-14 rounded-lg p-2'>{item?.Marks?.examSubject?.fullmark?item?.Marks?.examSubject?.fullmark:'100'}/{item.examMarks}</span></td>
                                    </tr>
                                ))}
                           
                        </table>
                    )}
                </div>
            ))}
        </div>
        </div>
    )
}

export default Collegemarks