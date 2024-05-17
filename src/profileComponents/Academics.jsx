import React from 'react'

const Academics = ({academicsDetails}) => {
  return (
    <div className='border-[1px]'>
      <div className='md:h-[63%] h-[50%] w-[90%] text-xs md:text-base'>
        <table className='w-full '>
          <thead>
            <tr className='bg-gray-100'>
              <th className='border  py-2'>Degree</th>
              <th className='border  py-2'>Paper</th>
              <th className='border  py-2'>Percentage</th>
              <th className='border  py-2'>Institution</th>
              <th className='border  py-2'>Passing Year</th>
            </tr>
          </thead>
          <tbody>
            <tr className='bg-gray-200'>
              <td className='border px-4 py-2'>Matriculation</td>
              <td className='border px-4 py-2'>{academicsDetails?.Matriculation?.percentage || 'NA'}</td>
              <td className='border px-4 py-2'>NA</td>
              <td className='border px-4 py-2'>{academicsDetails?.Matriculation?.institution || 'NA'}</td>
              <td className='border px-4 py-2'>{academicsDetails?.Matriculation?.PassingYear || 'NA'}</td>
            </tr>
            <tr className='bg-gray-100'>
              <td className='border px-4 py-2'>UG</td>
              <td className='border px-4 py-2'>{academicsDetails?.UG?.percentage || 'NA'}</td>
              <td className='border px-4 py-2'>NA</td>
              <td className='border px-4 py-2'>{academicsDetails?.UG?.institution || 'NA'}</td>
              <td className='border px-4 py-2'>{academicsDetails?.UG?.PassingYear || 'NA'}</td>
            </tr>
            <tr className='bg-gray-100'>
              <td className='border px-4 py-2'>Class 12</td>
              <td className='border px-4 py-2'>{academicsDetails?.Class12?.percentage || 'NA'}</td>
              <td className='border px-4 py-2'>NA</td>
              <td className='border px-4 py-2'>{academicsDetails?.Class12?.institution || 'NA'}</td>
              <td className='border px-4 py-2'>{academicsDetails?.Class12?.PassingYear || 'NA'}</td>
            </tr>
            <tr className='bg-gray-200'>
              <td className='border px-4 py-2'>Diploma</td>
              <td className='border px-4 py-2'>{academicsDetails?.Diploma?.percentage || 'NA'}</td>
              <td className='border px-4 py-2'>{academicsDetails?.Diploma?.paper || 'NA'}</td>
              <td className='border px-4 py-2'>{academicsDetails?.Diploma?.institution || 'NA'}</td>
              <td className='border px-4 py-2'>{academicsDetails?.Diploma?.PassingYear || 'NA'}</td>
            </tr>
            <tr className='bg-gray-100'>
              <td className='border px-4 py-2'>BCA</td>
              <td className='border px-4 py-2'>{academicsDetails?.BCA?.percentage || 'NA'}</td>
              <td className='border px-4 py-2'>NA</td>
              <td className='border px-4 py-2'>{academicsDetails?.BCA?.institution || 'NA'}</td>
              <td className='border px-4 py-2'>{academicsDetails?.BCA?.PassingYear || 'NA'}</td>
            </tr>
            <tr className='bg-gray-200'>
              <td className='border px-4 py-2'>MCA</td>
              <td className='border px-4 py-2'>{academicsDetails?.MCA?.percentage || 'NA'}</td>
              <td className='border px-4 py-2'>NA</td>
              <td className='border px-4 py-2'>{academicsDetails?.MCA?.institution || 'NA'}</td>
              <td className='border px-4 py-2'>{academicsDetails?.MCA?.PassingYear || 'NA'}</td>
            </tr>
        
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Academics