import React, { useEffect, useState } from 'react'
import { userSchema } from '../utils/RegistrationUserSchema'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import toast from 'react-hot-toast';
import { url } from '../utils/BackEndUrl';

import OTPInput from "otp-input-react";

const StudentRegistration = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(userSchema),
  });
  const [email, setEmail] = useState(null)
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [courseValue, setCourseValue] = useState(null)
  const [departments, setDepartments] = useState([]);
  const [departmentValue, setDepartmentsValue] = useState(null)
  const [sections, setSections] = useState([]);
  const [sectionValue, setSectionsValue] = useState(null)
  const [mentors, setMentors] = useState([]);
  const [mentorValue, setMentorValue] = useState('');
  const [filevalue, setFileValue] = useState('');
  const [OTP, setOTP] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleSendOtp = async () => {
    console.log('jj')
    setIsButtonDisabled(true);


    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 1 * 60 * 1000);

    const cousreRes = await axios.post(`${url}/api/otp/send-otp`, { email });
  }


  useEffect(() => {
    const apiCallFunction = async () => {
      try {
        const cousreRes = await axios.get(`${url}/api/course/allCourse`);
        if (cousreRes) {
          setCourses(cousreRes?.data?.courses)
        }
        if (courseValue) {
          const departmentRes = await axios.get(`${url}/api/department/allDepartment/${courseValue}`);

          if (departmentRes) {
            setDepartments(departmentRes?.data?.department)
          }
        }
        if (departmentValue) {
          const mentorRes = await axios.get(`${url}/api/mentor/getallmentor`)
          const sectionsRes = await axios.get(`${url}/api/section/allSection/${departmentValue}`);
          if (mentorRes) {
            setMentors(mentorRes?.data?.users)
          }
          if (sectionsRes) {
            setSections(sectionsRes?.data?.section)
          }
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    apiCallFunction()

  }, [courses]);

  const onSubmit = async (userdata) => {
    try {
      setLoading(true);
      let photo


      const photodata = new FormData();
      if (filevalue) {
        photodata.append('file', filevalue);
        photodata.append('upload_preset', 'upload');
      }
      if (filevalue) {
        const uploadRes = await axios.post(
          'https://api.cloudinary.com/v1_1/dbsonu270/image/upload',
          photodata
        );
        const { url } = uploadRes.data;
        photo = url;

      }
      let DueAmount
      if (courseValue) {
        const feeDetails = await axios.get(`${url}/api/course/getacourse/${courseValue}`);
        DueAmount = feeDetails?.data?.course?.Fee
      }
      if (userdata?.personalDetails?.transport === "true") {
        DueAmount = Number(DueAmount + 10000);
      }
      if (userdata?.personalDetails?.hostel === "true") {
        DueAmount = Number(DueAmount + 10000);
      }
      if (userdata?.personalDetails?.Lunch === "true") {
        DueAmount = Number(DueAmount + 10000);
      }

      console.log(DueAmount)
      const newPersonalDetails = {
        ...(userdata.personalDetails),
        transport: userdata?.personalDetails?.transport === "true",
        hostel: userdata?.personalDetails?.hostel === "true",
        Lunch: userdata?.personalDetails?.Lunch === "true"

      }
      const newData = {
        ...userdata,
        personalDetails: newPersonalDetails,
        DueAmount: DueAmount,
        otp: OTP,
        email: email,
        profilePic: photo

      };
      console.log('newData', newData)
      try {
        const resdata = await axios.post(`${url}/api/user/register`, newData, {
          withCredentials: true,
        });

        if (resdata?.data?.success) {

          toast.success(resdata.data.message);
          reset();
        }
      } catch (error) {
        console.log(error)
        toast.error('An error occurred while creating the blog.');
      setLoading(false)
      }
      setLoading(false)
      console.log(newData);
    } catch (error) {
      console.error(error);
      setLoading(false)
    }
  };
  return (
    <div>
      <h3 className='text-3xl font-extrabold text-center shadow-md border p-10'>Student Registration Form</h3>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col m-4 p-5'>
        {/* -------------------------------- Start Personal details-------------------------------------------- */}
        <div className="flex gap-2 w-full">
          <div className="w-[48%]">
            <div className="form-group ">
              <label className='text-lg text-sky-400 font-bold' htmlFor="firstName">First Name</label>
              <input type="text" id="FirstName" name='FirstName'  {...register('personalDetails.FirstName', { required: true })} className="form-control" />
            </div>

            {errors?.personalDetails?.FirstName && <span className='text-red-700 font-bold'>*{errors?.personalDetails?.FirstName.message}</span>}
            <div className="form-group ">
              <label htmlFor="LastName" className='text-lg text-sky-400 font-bold' >Last Name</label>
              <input type="text" id="LastName" {...register('personalDetails.LastName', { required: true })} className="form-control" />
            </div>
            {errors?.personalDetails?.LastName && <span className='text-red-700 font-bold'>*{errors?.personalDetails?.LastName.message}</span>}
            <div className="form-group ">
              <label htmlFor="middleName" className='text-lg text-sky-400 font-bold'>Middle Name</label>
              <input type="text" id="MiddleName" {...register('personalDetails.MiddleName')} className="form-control" />
            </div>
            <div className="form-group ">
              <label htmlFor="gender" className='text-lg text-sky-400 font-bold'>Gender</label>
              <select id="Gender" {...register('personalDetails.Gender', { required: true })} className="form-control">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            {errors?.personalDetails?.Gender && <span className='text-red-700 font-bold'>*{errors?.personalDetails?.Gender?.message}</span>}
            <div className="form-group ">
              <label htmlFor="caste" className='text-lg text-sky-400 font-bold'>Caste</label>
              <input type="text" id="Caste" {...register('personalDetails.Caste', { required: true })} className="form-control" />
            </div>
            {errors?.personalDetails?.Caste && <span className='text-red-700 font-bold'>*{errors?.personalDetails?.Caste?.message}</span>}

          </div>
          <div className="w-1/2">
            <div className="form-group ">
              <label htmlFor="dob" className='text-lg text-sky-400 font-bold'>Date of Birth</label>
              <input type="date" id="DOB" {...register('personalDetails.DOB', { required: true })} className="form-control" />
            </div>
            {errors?.personalDetails?.DOB && <span className='text-red-700 font-bold'>*{errors?.personalDetails?.DOB?.message}</span>}

            <div className="form-group ">
              <label htmlFor="bloodGroup" className='text-lg text-sky-400 font-bold'>Blood Group</label>
              <select id="Bloodgrp" {...register('personalDetails.Bloodgrp')} className="form-control">
                <option value='0+'>0+</option>
                <option value='B+'>B+</option>

              </select>
            </div>

            {errors?.personalDetails?.Bloodgrp && <span className='text-red-700 font-bold'>*{errors?.personalDetails?.Bloodgrp?.message}</span>}
            <div className="form-group">
              <label htmlFor="hostel" className="text-lg text-sky-400 font-bold">Hostel</label>
              <select id="hostel" {...register('personalDetails.hostel')} className="form-control">
                <option value="false">No</option>
                <option value="true">Yes</option>

              </select>
            </div>
            {errors?.personalDetails?.hostel && <span className='text-red-700 font-bold'>*{errors?.personalDetails?.hostel?.message}</span>}

            <div className="form-group">
              <label htmlFor="transport" className="text-lg text-sky-400 font-bold">Transport</label>
              <select id="transport" {...register('personalDetails.transport')} className="form-control">
                <option value="false">No</option>
                <option value="true">Yes</option>

              </select>
            </div>
            {errors?.personalDetails?.transport && <span className='text-red-700 font-bold'>*{errors?.personalDetails?.transport?.message}</span>}

            <div className="form-group">
              <label htmlFor="lunch" className="text-lg text-sky-400 font-bold">Lunch</label>
              <select id="Lunch" {...register('personalDetails.Lunch')} className="form-control">
                <option value='false'>No</option>
                <option value='true'>Yes</option>

              </select>
            </div>
            {errors?.personalDetails?.Lunch && <span className='text-red-700 font-bold'>*{errors?.personalDetails?.Lunch?.message}</span>}
          </div>
        </div>
        <div className="form-group ">
          <label htmlFor="nationality">Nationality</label>
          <input type="text" id="Nationality" {...register('personalDetails.Nationality')} className="form-control" />
        </div>
        {/* {errors?.personalDetails.Nationality && <span className='text-red-700 font-bold'>*{errors?.personalDetails.Nationality.message}</span>} */}



        {/*------------------------------------ end personal details -----------*/}
        <label htmlFor="lunch" className="text-lg text-sky-400 font-bold">Course</label>
        <select {...register('Course', { required: true })} onChange={(e) => setCourseValue(e.target.value)} className="form-control">
          <option value="" disabled selected>Select Course</option>
          {courses.length !== 0 && courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course?.CourseName}
            </option>
          ))}
        </select>
        {errors?.Course && <span className='text-red-700 font-bold'>{errors?.Course.message}</span>}

        <label htmlFor="lunch" className="text-lg text-sky-400 font-bold">Department</label>
        <select {...register('Department', { required: true })} onChange={(e) => setDepartmentsValue(e.target.value)} disabled={!courseValue} className="form-control mt-2">
          <option value="" disabled selected>Select Department</option>
          {departments.length !== 0 && departments.map((department) => (
            <option key={department._id} value={department._id}>
              {department?.DepartmentName}
            </option>
          ))}
        </select>
        {errors?.Department && <span className='text-red-700 font-bold'>{errors?.Department.message}</span>}


        <label htmlFor="lunch" className="text-lg text-sky-400 font-bold">Section</label>
        <select {...register('Section', { required: true })} onChange={(e) => setSectionsValue(e.target.value)} disabled={!courseValue || !departmentValue} className="form-control ">
          <option value="" disabled selected>Select Section</option>
          {sections.length !== 0 && sections.map((section) => (
            <option key={section._id} value={section._id}>
              {section?.SectionName}
            </option>
          ))}
        </select>

        <label htmlFor="lunch" className="text-lg text-sky-400 font-bold">Mentor</label>
        <select {...register('mentor', { required: true })} onChange={(e) => setMentorValue(e.target.value)} className="form-control ">

          {mentors.length !== 0 && mentors.map((mentor) => (
            <option key={mentor._id} value={mentor._id}>
              {mentor?.personalDetails?.FirstName + '' + mentor?.personalDetails?.LastName}
            </option>
          ))}
        </select>

        <div className='w-full gap-2 flex '>
          <div className="w-[48%]">
            <h3 className='text-2xl font-bold'>Guardin Details</h3>
            <div className="form-group">
              <label className='text-lg text-sky-400 font-bold' htmlFor="guardianName">Guardian's Name</label>
              <input type="text" id="guardianName" name='guardianName' {...register('Guardian.name', { required: true })} className="form-control" />
              {errors?.Guardian?.name && <span className='text-red-700 font-bold'>*{errors?.Guardian?.name.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="guardianRelation" className='text-lg text-sky-400 font-bold'>Relation with Guardian</label>
              <input type="text" id="guardianRelation" {...register('Guardian.relation', { required: true })} className="form-control" />
              {errors?.Guardian?.relation && <span className='text-red-700 font-bold'>*{errors?.Guardian?.relation.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="guardianPhone" className='text-lg text-sky-400 font-bold'>Guardian's Phone Number</label>
              <input type="text" id="guardianPhone" {...register('Guardian.phoneNo', { required: true })} className="form-control" />
              {errors?.Guardian?.phoneNo && <span className='text-red-700 font-bold'>*{errors?.Guardian?.phoneNo.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="guardianAddress" className='text-lg text-sky-400 font-bold'>Guardian's Address</label>
              <input type="text" id="guardianAddress" {...register('Guardian.address', { required: true })} className="form-control" />
              {errors?.Guardian?.address && <span className='text-red-700 font-bold'>*{errors?.Guardian?.address.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="guardianProfession" className='text-lg text-sky-400 font-bold'>Guardian's Profession</label>
              <input type="text" id="profession" {...register('Guardian.profession')} className="form-control" />
            </div>
            <div className="form-group ">
              <label htmlFor="caste" className='text-lg text-sky-400 font-bold'>Religion</label>
              <input type="text" id="Religion" {...register('personalDetails.Religion', { required: true })} className="form-control" />
            </div>

          </div>
          <div className='w-[48%]'>
            <h3 className='text-2xl font-bold'>Personal Address</h3>
            <div className="form-group">
              <label htmlFor="houseNo" className='text-lg text-sky-400 font-bold'>House No</label>
              <input type="text" id="houseNo" {...register('address.houseNo', { required: true })} className="form-control" />
              {errors?.address?.houseNo && <span className='text-red-700 font-bold'>*{errors?.address?.houseNo.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="district" className='text-lg text-sky-400 font-bold'>District</label>
              <input type="text" id="district" {...register('address.district', { required: true })} className="form-control" />
              {errors?.address?.district && <span className='text-red-700 font-bold'>*{errors?.address?.district.message}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="city" className='text-lg text-sky-400 font-bold'>City</label>
              <input type="text" id="city" {...register('address.city', { required: true })} className="form-control" />
              {errors?.address?.city && <span className='text-red-700 font-bold'>*{errors?.address?.city.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="state" className='text-lg text-sky-400 font-bold'>State</label>
              <input type="text" id="state" {...register('address.state', { required: true })} className="form-control" />
              {errors?.address?.state && <span className='text-red-700 font-bold'>*{errors?.address?.state.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="country" className='text-lg text-sky-400 font-bold'>Country</label>
              <input type="text" id="country" {...register('address.country', { required: true })} className="form-control" />
              {errors?.address?.country && <span className='text-red-700 font-bold'>*{errors?.address?.country.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="pincode" className='text-lg text-sky-400 font-bold'>Pincode</label>
              <input type="text" id="pincode" {...register('address.pincode', { required: true, maxLength: 6 })} className="form-control" />
              {errors?.address?.pincode && <span className='text-red-700 font-bold'>*{errors?.address?.pincode.message}</span>}
            </div>

          </div>

        </div>
        <div>
          <h3 className='text-2xl font-bold'>Permanent Address</h3>
          <div className="form-group">
            <label htmlFor="permanentHouseNo" className='text-lg text-sky-400 font-bold'>House No</label>
            <input type="text" id="permanentHouseNo" {...register('permanentAddress.houseNo', { required: true })} className="form-control" />
            {errors?.permanentAddress?.houseNo && <span className='text-red-700 font-bold'>*{errors?.permanentAddress?.houseNo.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="permanentCity" className='text-lg text-sky-400 font-bold'>City</label>
            <input type="text" id="permanentCity" {...register('permanentAddress.city', { required: true })} className="form-control" />
            {errors?.permanentAddress?.city && <span className='text-red-700 font-bold'>*{errors?.permanentAddress?.city.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="permanentState" className='text-lg text-sky-400 font-bold'>State</label>
            <input type="text" id="permanentState" {...register('permanentAddress.state', { required: true })} className="form-control" />
            {errors?.permanentAddress?.state && <span className='text-red-700 font-bold'>*{errors?.permanentAddress?.state.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="permanentCountry" className='text-lg text-sky-400 font-bold'>Country</label>
            <input type="text" id="permanentCountry" {...register('permanentAddress.country', { required: true })} className="form-control" />
            {errors?.permanentAddress?.country && <span className='text-red-700 font-bold'>*{errors?.permanentAddress?.country.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="permanentPincode" className='text-lg text-sky-400 font-bold'>Pincode</label>
            <input type="text" id="permanentPincode" {...register('permanentAddress.pincode', { required: true, maxLength: 6 })} className="form-control" />
            {errors?.permanentAddress?.pincode && <span className='text-red-700 font-bold'>*{errors?.permanentAddress?.pincode.message}</span>}
          </div>


        </div>
        <div className="overflow-x-auto mt-3">
          <h2 className='text-2xl font-bold'>Academics</h2>
          <table className="min-w-full border">
            <thead>
              <tr>
                <th>Academic Type</th>
                <th>Percentage</th>
                <th>Passing Year</th>
                <th>Institution</th>

                <th>Paper</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Matriculation</td>
                <td><input type="number"  {...register('Academics.Matriculation.percentage', {
                  valueAsNumber: true,
                  required: true,
                })} className="form-control" /></td>
                {errors?.Academics?.Matriculation?.percentage && <span className='text-red-700 font-bold'>*{errors?.Academics?.Matriculation?.percentage?.message}</span>}

                <td><input type="number" {...register('Academics.Matriculation.PassingYear', {
                  valueAsNumber: true,
                  required: true,
                })} className="form-control" /></td>
                <td><input type="text" {...register('Academics.Matriculation.institution')} className="form-control" /></td>
                <td><input type="text" {...register('Academics.Matriculation.paper')} className="form-control" /></td>


              </tr>
              {errors?.Academics && <span className='text-red-700 font-bold'>*{errors?.Academics?.message}</span>}
              <tr>
                <td>UG</td>
                <td><input type="number" {...register('Academics.UG.percentage', {
                  valueAsNumber: true,
                  required: true,
                })} className="form-control" /></td>
                <td><input type="number" {...register('Academics.UG.PassingYear', {
                  valueAsNumber: true,
                  required: true,
                })} className="form-control" /></td>
                <td><input type="text" {...register('Academics.UG.institution')} className="form-control" /></td>

                <td><input type="text" {...register('Academics.UG.paper')} className="form-control" /></td>
              </tr>
              <tr>
                <td>Diploma</td>
                <td><input type="number" {...register('Academics.Diploma.percentage', {
                  valueAsNumber: true,
                  required: true,
                })} className="form-control" /></td>
                <td><input type="number" {...register('Academics.Diploma.PassingYear', {
                  valueAsNumber: true,
                  required: true,
                })} className="form-control" /></td>

                <td><input type="text" {...register('Academics.Diploma.institution')} className="form-control" /></td>
                <td><input type="text" {...register('Academics.Diploma.paper')} className="form-control" /></td>

              </tr>
              <tr>
                <td>BCA</td>
                <td><input type="number" {...register('Academics.BCA.percentage', {
                  valueAsNumber: true,
                  required: true,
                })} className="form-control" /></td>
                <td><input type="number" {...register('Academics.BCA.PassingYear', {
                  valueAsNumber: true,
                  required: true,
                })} className="form-control" /></td>
                <td><input type="text" {...register('Academics.BCA.institution')} className="form-control" /></td>
                <td><input type="text" className="form-control" /></td>

              </tr>
              <tr>
                <td>Class 12</td>
                <td><input type="number" {...register('Academics.Class12.percentage', {
                  valueAsNumber: true,
                  required: true,
                })} className="form-control" /></td>
                <td><input type="number" {...register('Academics.Class12.PassingYear', {
                  valueAsNumber: true,
                  required: true,
                })} className="form-control" /></td>
                <td><input type="text" {...register('Academics.Class12.institution')} className="form-control" /></td>

                <td><input type="text" className="form-control" /></td>
              </tr>
              <tr>
                <td>MCA</td>
                <td><input type="number" {...register('Academics.MCA.percentage', {
                  valueAsNumber: true,
                  required: true,
                })} className="form-control" /></td>
                <td><input type="number" {...register('Academics.MCA.PassingYear', {
                  valueAsNumber: true,
                  required: true,
                })} className="form-control" /></td>
                <td><input type="text" {...register('Academics.MCA.institution')} className="form-control" /></td>

                <td><input type="text" className="form-control" /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <div className="form-group">
            <label htmlFor="batch" className='text-lg text-sky-400 font-bold'>Batch</label>
            <input type="text" id="batch" {...register('Batch', { required: true })} className="form-control" />
            {errors?.Batch && <span className='text-red-700 font-bold'>*{errors?.Batch.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="profilePic" className='text-lg text-sky-400 font-bold'>Profile Picture</label>
            <input type="file" name="profilePic" className="form-control" onChange={(e) => { setFileValue(e.target.files[0]) }} required />

          </div>

          <div className="form-group">
            <label htmlFor="PAN" className='text-lg text-sky-400 font-bold'>PAN</label>
            <input type="text" id="PAN" {...register('PAN')} className="form-control" />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNo" className='text-lg text-sky-400 font-bold'>Phone Number</label>
            <input type="text" id="phoneNo" {...register('PhoneNo', { required: true })} className="form-control" />
            {errors?.PhoneNo && <span className='text-red-700 font-bold'>*{errors?.PhoneNo.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="whatsappNo" className='text-lg text-sky-400 font-bold'>WhatsApp Number</label>
            <input type="text" id="whatsappNo" {...register('whatsappNo')} className="form-control" />
          </div>

          <div className="form-group">
            <label htmlFor="regdNo" className='text-lg text-sky-400 font-bold'>Registration Number</label>
            <input type="text" id="regdNo" {...register('RegdNo', { required: true })} className="form-control" />
            {errors?.RegdNo && <span className='text-red-700 font-bold'>*{errors?.RegdNo.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="rollNo" className='text-lg text-sky-400 font-bold'>Roll Number</label>
            <input type="text" id="rollNo" {...register('rollno', { required: true })} className="form-control" />
            {errors?.rollno && <span className='text-red-700 font-bold'>*{errors?.rollno.message}</span>}
          </div>

          <div className='w-full flex gap-4 items-center  '>
            <div className="form-group">
              <label htmlFor="email" className='text-lg text-sky-400 font-bold'>Email</label>
              <input type="email" name="email" className="form-control" onChange={(e) => setEmail(e.target.value)} />

            </div>
            {email && <button className={` justify-center items-center flex hover:bg-cyan-400 w-28 font-bold h-12 p-1 rounded bg-red-400 text-amber-50 shadow-xl ${isButtonDisabled ? ' hover:cursor-not-allowed  opacity-25 ' : 'hover:cursor-pointer'} `} onClick={handleSendOtp} disabled={isButtonDisabled}>
              sendotp
            </button>}
            <div className=' flex justify-center items-center bg-gray-500 p-2 border-2 border-gray-500 '>
              <OTPInput value={OTP} inputStyles={{ outline: "none", borderColor: "black" }} onFocus={(event) => event.target.style.borderColor = 'red'} onChange={setOTP} autoFocus OTPLength={4} otpType="number" disabled={false} />

            </div>

            <div>

            </div>
          </div>
          {errors && <span className='text-red-700 font-bold'>*</span>}

        </div>

        <div className='w-full justify-center flex m-3'>
          <button className={`hover:cursor-pointer justify-center items-center flex hover:bg-cyan-400 w-28 font-bold h-12 p-1 rounded bg-sky-400 text-amber-50 shadow-xl  `} type="submit">{loading ? <div className='w-7 h-7 rounded-full border-b-4 border-dashed border-white animate-spin'></div> : 'Create'}</button>
        </div>


      </form>
    </div>
  )
}

export default StudentRegistration