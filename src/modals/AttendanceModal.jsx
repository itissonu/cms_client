import React from 'react'
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const AttendanceModal = ({ isOpen, onClose, rowData }) => {
    // const {   totalClasses, absents, presents, presentDate, absentDate } = rowData;
    console.log(rowData)
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 600,
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <div className="attendance-details">
                    <h3 className='p-2 border-b-1 border-gray-200 shadow-lg'>{rowData?.subject} Attendance Details (Total Classes: {rowData?.totalClasses})</h3>

                    <p className=' uppercase font-bold text-lg m-2 text-gray-800'>Absents: {rowData?.absents}</p>
                    <div>
                        {rowData?.absentDate.map((date, index) => (
                            <div className='p-2 bg-red-100 m-2 flex justify-between'>
                                <span>Absent Date:</span>
                                <span  key={index}> {new Date(date?.date).toLocaleDateString()} {' '}</span>
                                <span className='h-max w-max p-1 bg-red-200 font-semibold rounded-lg'>{date.time}</span>
                                <br />
                            </div>

                        ))}
                    </div>
                    <p className='border-[1px]  bg-slate-200 w-max uppercase font-bold text-lg m-2  text-gray-800'>Presents: {rowData?.presents}</p>
                    <div>
                        {rowData?.presentDate.map((date, index) => (
                            <div className='p-2 bg-slate-200 m-2 flex justify-between'>
                                <span>Present Date:</span>
                                <span key={index}> {new Date(date?.date).toLocaleDateString()}{' '}</span>
                                <span className='h-max w-max p-1 bg-green-200 font-semibold rounded-lg'>{date.time}</span>
                                <br />
                            </div>
                        ))}
                    </div>
                </div>

            </Box>
        </Modal>
    )
}

export default AttendanceModal