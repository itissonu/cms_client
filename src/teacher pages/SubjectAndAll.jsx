import React, { useState } from 'react'
import SubjecDetails from '../profileComponents/SubjecDetails';
import SectionDetails from '../profileComponents/SectionDetails';
import ExamTypes from '../profileComponents/ExamTypes';
import ExamSubject from '../profileComponents/ExamSubject';
import Departmentview from '../profileComponents/Departmentview';
import { HiOutlineAcademicCap } from 'react-icons/hi2';
import { BsPersonStanding } from 'react-icons/bs';
import { RxPerson } from 'react-icons/rx';
import { IoHomeOutline } from 'react-icons/io5';

const SubjectAndAll = () => {
    const [activeButton, setActiveButton] = useState(0);

    const arr = [{
        name: "Subject",
        icon: <BsPersonStanding />,
        component: <SubjecDetails />

    }, {
        name: "Section",
        icon: <HiOutlineAcademicCap />,
        component: <SectionDetails />
    }, {
        name: "Exam Types",
        icon: <RxPerson />,
        component: <ExamTypes />
    }, {
        name: "Exam Subject",
        icon: <IoHomeOutline />,
        component: <ExamSubject />
    }, {
        name: "Department",
        icon: <RxPerson />,
        component: <Departmentview />
    }]

    const handleButtonClick = (index) => {
        setActiveButton(index);
    };
    return (
        <div className='p-5'>
            <div className='md:w-[100%] w-full p-4 gap-2 flex flex-wrap border-b-[1px] shadow-md border-gray-300'>
                {arr?.map((item, index) => (
                    <button
                        key={index}
                        className={`h-10 px-4  text-white rounded-md font-semibold flex items-center gap-2    border  ${activeButton === index ? 'bg-cyan-500  text-black' : 'bg-black text-cyan-700 hover:bg-gray-200 hover:text-black'}`}
                        onClick={() => handleButtonClick(index)}
                    >
                        {item?.icon}
                        {item?.name}
                    </button>
                ))}
            </div>
            <div className={`mt-5 w-full  `}>{arr[activeButton]?.component}</div>
        </div>
    )
}

export default SubjectAndAll