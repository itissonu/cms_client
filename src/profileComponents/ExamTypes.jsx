import React, { useEffect, useState } from 'react'
import { url } from '../utils/BackEndUrl'
import axios from 'axios'

const ExamTypes = () => {
  const [examtype, setexamtype] = useState([])
  useEffect(() => {
    const fetchApi = async () => {

      const examtype = await axios.get(`${url}/api/examType/getallexamtypes`);
      setexamtype(examtype?.data?.allTypes)

    }
    fetchApi()

  }, [])
  console.log(examtype)
  return (
    <div>
       <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Exam Type List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam Type</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {examtype.length!==0 && examtype.map((examType) => (
              <tr key={examType._id}>
                <td className="px-6 py-4 whitespace-nowrap">{examType.ExamType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}

export default ExamTypes