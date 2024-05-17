import React, { useEffect, useState } from 'react'
import { url } from '../utils/BackEndUrl'
import axios from 'axios'
import DepartmentModal from '../modals/DepartmentModal'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { CiEdit } from 'react-icons/ci'

const Departmentview = () => {
  const [Department, setDepartment] = useState([])
  useEffect(() => {

    fetchApi()

  }, [])
  const fetchApi = async () => {

    const Departments = await axios.get(`${url}/api/department/allDepartment`);
    setDepartment(Departments?.data?.department)

  }
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const handleOpen = () => setOpen(true);
  const [editAllow, setEditAllow] = useState(false)
  const handleClose = (hasChanged) => {
    setOpen(false);
    setEditAllow(false)
    if (hasChanged) {
      fetchApi()
    }
  };
  const handleEdit = (data) => {
    setEditAllow(true)
    setEditData(data);
    handleOpen();
  };
  console.log(Department)
  return (
    <div>
      {open && <DepartmentModal
        open={open}
        handleClose={handleClose}
        initialData={editData}
        editAllow={editAllow}
      />}   <div className="container mx-auto p-4">
        <div className='flex justify-between p-2 bg-yellow-50 items-center border-l-8 border-yellow-500  '>  <h1 className="text-2xl font-bold mb-4 uppercase">Exam subject List</h1>
          <button className='bg-black shadow-md w-max p-2 rounded-md font-bold text-white m-3 gap-2 flex items-center ' onClick={handleOpen}><span>Create</span><IoIosAddCircleOutline className='text-white font-bold h-6 w-6' /></button></div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Department.length !== 0 && Department.map((dept) => (
                <tr key={dept._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{dept.DepartmentName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{dept.Course.CourseName}<button className='bg-yellow-300 text-white flex justify-center items-center h-10 border-[1px] shadow-md rounded-md w-10 p-2 hover:cursor-pointer'
                    onClick={() => handleEdit(dept)}> <CiEdit /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div></div>
  )
}

export default Departmentview