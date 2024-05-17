import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { url } from '../utils/BackEndUrl';
import { CiEdit } from 'react-icons/ci'
import { IoIosAddCircleOutline } from 'react-icons/io'
import FeeDetailModal from '../modals/FeeDetailModal';

const FeesDetails = () => {
    const [feesData, setFeesData] = useState([]);

    useEffect(() => {
       

        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.get(`${url}/api/fees/getAllFees`);
            setFeesData(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const handleOpen = () => setOpen(true);
    const [editAllow, setEditAllow] = useState(false)
    const handleClose = (hasChanged) => {
      setOpen(false);
      setEditAllow(false)
      if (hasChanged) {
       
        fetchData();
      }
    };

    const handleEdit = (data) => {
        setEditAllow(true)
        setEditData(data);
        handleOpen();
      };
    

    return (
        <div>
         {open && <FeeDetailModal
        open={open}
        handleClose={handleClose}
        initialData={editData}
        editAllow={editAllow}
      />}
            <div className='flex justify-between p-2 bg-yellow-50 items-center border-l-8 border-yellow-500  '>
                <h1 className="text-2xl font-bold mb-4 uppercase">Fee Details</h1>
                <button className='bg-black shadow-md w-max p-2 rounded-md font-bold text-white m-3 gap-2 flex items-center ' onClick={handleOpen}><span>Create</span><IoIosAddCircleOutline className='text-white font-bold h-6 w-6' />
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Regd No</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid Status</th>

                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {feesData?.map((fee) => (
                            <tr key={fee._id}>
                                <td className="px-6 py-4 whitespace-nowrap">{fee.userId?.RegdNo}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{fee.departmentId?.DepartmentName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{fee.courseId?.CourseName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{fee.transactionId}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{fee.paymentMethod}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{fee.paidAmount}</td>
                                <td className={`px-6 py-4 ${fee?.type==="credited"?'bg-green-100 ':' bg-red-100'} whitespace-nowrap`}>{fee?.type}</td>

                                <td>{new Date(fee.createdAt).toLocaleString()}</td>
                                {/* <button className='bg-yellow-300 text-white flex justify-center items-center h-10 border-[1px] shadow-md rounded-md w-10 p-2 hover:cursor-pointer'
                    onClick={() => handleEdit(fee)}> <CiEdit /></button> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default FeesDetails