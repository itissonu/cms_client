import './App.css';
import LoginPage from './Pages/LoginPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import OtpValidation from './Pages/OtpValidation';
import ForgotPassword from './Pages/ForgotPassword';
import NewPassword from './Pages/NewPassword';
import ProfileOutlet from './utils/ProfileOutlet';
import ProfilePage from './Pages/ProfilePage';
import { Toaster } from "react-hot-toast"
import ProfileFullDetails from './Pages/ProfileFullDetails';
import BlogProfile from './Pages/BlogProfile';
import AttendenceOverview from './Pages/AttendenceOverview';
import SingleBlog from './Pages/SingleBlog';
import AddBlog from './Pages/AddBlog';
import UpdateBlog from './Pages/UpdateBlog';
import References from './Pages/References';
import ReferenceVideo from './Pages/ReferenceVideo';
import TimeTable from './Pages/TimeTable';
import { getUserRole, isLoggedIn } from './utils/auth';
import { useEffect, useState } from 'react';
import TeacherLayout from './utils/TeacherLayout';
import AdminLayout from './utils/AdminLayout';
import StudentLayout from './utils/StudentLayout';
import TeacherProfile from './Pages/TeacherProfile';
import StudentRegistration from './compoenets/StudentRegistration';
import ExamMark from './teacher pages/ExamMark';
import ExamMarkOverView from './teacher pages/ExamMarkOverView';
import TakeAttendance from './teacher pages/TakeAttendance';
import AttendanceOverView from './teacher pages/AttendanceOverView';
import AddTimeTable from './teacher pages/AddTimeTable';
import Referances from './teacher pages/Referances';
import SubjectAndAll from './teacher pages/SubjectAndAll';
import FeesDetails from './teacher pages/FeesDetails';
import { useAuth } from './context/authContext';
import Example from './Pages/Example';
import Chat from './Pages/Chat';

function App() {
  const { isLogged } = useAuth();

  const [role, setUserRole] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const authStatus = isLoggedIn();
      if (!authStatus) {
        <Navigate to="/login" />;
      }

      if (authStatus) {
        try {
          const role = await getUserRole();
          setUserRole(role);
          console.log('User role:', role);
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      }
    };

    fetchData(); // Fetch user data asynchronously
  }, [isLogged]);



  return (
    <>
      <Toaster />
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/otp/:email" element={<OtpValidation />} />
        <Route exact path="/forgot" element={<ForgotPassword />} />
        <Route exact path="/newPassword" element={<NewPassword />} />
        {role === null ? <>Loading....</> : role === 'student' && (
          <Route element={<ProfileOutlet />}>
            <Route exact path="/" element={<ProfilePage />} />
            <Route exact path="/chat" element={<Chat />} />
            <Route exact path="/details/:id" element={<ProfileFullDetails />} />
            <Route exact path="/myblogs" element={<BlogProfile />} />
            <Route exact path="/mytimetable" element={<TimeTable />} />
            <Route exact path="/myblogs/addblog" element={<AddBlog />} />
            <Route exact path="/myblogs/:id" element={<SingleBlog />} />
            <Route exact path="/myblogs/update/:id" element={<UpdateBlog />} />
            <Route exact path="/overview" element={<AttendenceOverview />} />
            <Route exact path="/referances/article" element={<References />} />
            <Route exact path="/referances/video" element={<ReferenceVideo />} />
            <Route exact path="/compiler" element={<Example />} />

          </Route>

        )}
        {role === null ? <>Loading....</> : role === 'teacher' && (
          <Route element={<TeacherLayout />}>
            <Route exact path="/" element={<TeacherProfile />} />
           
            <Route exact path="/studentregistration" element={<StudentRegistration />} />
            <Route exact path="/addmark" element={<ExamMark />} />
            <Route exact path="/markoverview" element={<ExamMarkOverView />} />
            <Route exact path="/attendance" element={<TakeAttendance />} />
            <Route exact path="/attendance/overview" element={<AttendanceOverView />} />
            <Route exact path="/timetable" element={<AddTimeTable />} />
            <Route exact path="/referances" element={<Referances />} />
            <Route exact path="/subjectandall" element={<SubjectAndAll />} />
            <Route exact path="/myblogs/:id" element={<SingleBlog />} />
            <Route exact path="/fees" element={<FeesDetails />} />

            <Route exact path="/compiler" element={<Example />} />

          </Route>

        )}
        {role === null ? <>Loading....</> : role === 'admin' && (
          <Route element={<AdminLayout />}>


          </Route>

        )}


      </Routes>
    </>
  );
}

export default App;
