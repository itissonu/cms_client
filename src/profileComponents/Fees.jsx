import React, { useEffect, useState } from 'react'

import { url } from '../utils/BackEndUrl';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '1px solid gray',
    boxShadow: 24,
    maxHeight: '80vh',
    overflowX: 'auto',
    p: 4,
};
const Fees = () => {
    const [feeDetails, setFeeDetails] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));
    const userid=user?._id
    useEffect(() => {
        const fetchFeeDetails = async () => {
            try {
                const resdata = await axios.get(`${url}/api/fees/getFeesByUserId/${userid}`);
                setFeeDetails(resdata?.data?.data);
            } catch (error) {
                console.error('Error fetching fee details:', error);
            }
        };

        fetchFeeDetails();
    }, [userid]);
    console.log(feeDetails)
    return (
        <div className='m-3'>
                <TableContainer sx={{ overflowX: 'auto' }}>
                    <Table>
                        <TableHead>
                            <TableRow >
                                <TableCell >Serial No</TableCell>

                                <TableCell >Transaction ID</TableCell>
                                <TableCell>Paid Amount</TableCell>
                                <TableCell>Payment Method</TableCell>
                                <TableCell>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {feeDetails?.map((detail, index) => (
                                <TableRow key={detail._id} className='p-1 bg-yellow-50 m-2'>
                                    <TableCell>{index + 1}</TableCell>

                                    <TableCell>{detail?.transactionId}</TableCell>
                                    <TableCell ><span className='h-max w-max border-[1px] p-2 text-xs font-semibold  bg-green-300 rounded-xl'> &#8377;{detail?.paidAmount}</span></TableCell>
                                    <TableCell><span className='h-max w-max border-[1px] p-2 text-xs font-semibold  bg-green-300 rounded-xl'>{detail?.paymentMethod}</span></TableCell>
                                    <TableCell><span className='h-max w-max border-[1px] p-2 text-xs font-semibold  bg-green-300 rounded-xl'>{new Date(detail.createdAt).toLocaleDateString()}</span></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
          

        </div>
    )
}

export default Fees