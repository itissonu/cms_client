import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { url } from '../utils/BackEndUrl'
import SubjectModal from '../modals/SubjectModal'
import { CiEdit } from 'react-icons/ci'
import { IoIosAddCircleOutline } from 'react-icons/io'

const SubjecDetails = () => {

    const [subjects, setSubjects] = useState([])
    useEffect(() => {
       
        fetchApi()

    }, [])
    const fetchApi = async () => {

        const subjectS = await axios.get(`${url}/api/subject/allsubject`);
        setSubjects(subjectS?.data?.subjects)

    }
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const handleOpen = () => setOpen(true);
    const handleClose = (hasChanged) => {
        setOpen(false);
        if (hasChanged) {
            fetchApi()
        }
        setEditAllow(false)
    };
    const[editAllow,setEditAllow]=useState(false)
    const handleEdit = (data) => {
        setEditAllow(true)
        setEditData(data);
        handleOpen();
    };
    return (
        <div>
            {open && <SubjectModal
                open={open}
                handleClose={handleClose}
                initialData={editData}
                editAllow={editAllow}
            />}

           
          
            <div className="container mx-auto p-4">
            <div className='flex justify-between p-2 bg-yellow-50 items-center border-l-8 border-yellow-500  '>  <h1 className="text-2xl font-bold mb-4 uppercase">Subject List</h1>
                <button className='bg-black shadow-md w-max p-2 rounded-md font-bold text-white m-3 gap-2 flex items-center ' onClick={handleOpen}><span>Create</span><IoIosAddCircleOutline className='text-white font-bold h-6 w-6' /></button></div>
              

                <div className="overflow-x-auto mt-2">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject Code</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {subjects?.length !== 0 && subjects.map((subject) => (
                                <tr key={subject._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{subject.subjectName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{subject.SubjectCode}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{subject.Credits}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{subject.Semester}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{subject.Department.DepartmentName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{subject.Course.CourseName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{subject.Course.Fee}<button className='bg-yellow-300 text-white flex justify-center items-center h-10 border-[1px] shadow-md rounded-md w-10 p-2 hover:cursor-pointer'
                                onClick={() => handleEdit(subject)}> <CiEdit /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div></div>
    )
}

export default SubjecDetails