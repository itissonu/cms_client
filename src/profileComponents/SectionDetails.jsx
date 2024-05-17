import React, { useEffect, useState } from 'react'
import { url } from '../utils/BackEndUrl'
import axios from 'axios'
import SectionModal from '../modals/SectionModal'
import { CiEdit } from 'react-icons/ci'
import { IoIosAddCircleOutline } from 'react-icons/io'

const SectionDetails = () => {
  const [sections, setSections] = useState([])
  useEffect(() => {

    fetchApi()

  }, [])
  const fetchApi = async () => {

    const sectionS = await axios.get(`${url}/api/section/allSection`);
    setSections(sectionS?.data?.section)

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

  return (
    <div>
      {open && <SectionModal
        open={open}
        handleClose={handleClose}
        initialData={editData}
        editAllow={editAllow}
      />}
      <div className="container mx-auto p-4">
        <div className='flex justify-between p-2 bg-yellow-50 items-center border-l-8 border-yellow-500  '>
          <h1 className="text-2xl font-bold mb-4 uppercase">Section List</h1>
          <button className='bg-black shadow-md w-max p-2 rounded-md font-bold text-white m-3 gap-2 flex items-center ' onClick={handleOpen}><span>Create</span><IoIosAddCircleOutline className='text-white font-bold h-6 w-6' />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department Name</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sections.length !== 0 && sections.map((section) => (
                <tr key={section._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{section.SectionName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{section.DepartmentName.DepartmentName}<button className='bg-yellow-300 text-white flex justify-center items-center h-10 border-[1px] shadow-md rounded-md w-10 p-2 hover:cursor-pointer'
                    onClick={() => handleEdit(section)}> <CiEdit /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default SectionDetails