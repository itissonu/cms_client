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
import PrivateRoute from './utils/PrivateRoute';

function App() {
  const { isLogged, role } = useAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    const user = localStorage.getItem('user');

    if (token && user) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [isLogged]);

  if (loading) {
    return <>Loading....</>;
  }

  const redirectToRoleBasedHome = () => {
    if (role === 'student') return <Navigate to="/student" />;
    if (role === 'teacher') return <Navigate to="/teacher" />;
    if (role === 'admin') return <Navigate to="/admin" />;
  };

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp/:email" element={<OtpValidation />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/newPassword" element={<NewPassword />} />

        <Route path="/" element={isLogged ? redirectToRoleBasedHome() : <Navigate to="/login" />} />

        <Route path="/student" element={
          <PrivateRoute allowedRoles={['student']}>
            <ProfileOutlet />
          </PrivateRoute>
        }>
          <Route index element={<ProfilePage />} />
          <Route path="/student/chat" element={<Chat />} />
          <Route path="/student/details/:id" element={<ProfileFullDetails />} />
          <Route path="/student/myblogs" element={<BlogProfile />} />
          <Route path="/student/mytimetable" element={<TimeTable />} />
          <Route path="/student/myblogs/addblog" element={<AddBlog />} />
          <Route path="/student/myblogs/:id" element={<SingleBlog />} />
          <Route path="/student/myblogs/update/:id" element={<UpdateBlog />} />
          <Route path="/student/overview" element={<AttendenceOverview />} />
          <Route path="/student/referances/article" element={<References />} />
          <Route path="/student/referances/video" element={<ReferenceVideo />} />
          <Route path="/student/compiler" element={<Example />} />
        </Route>

        <Route path="/teacher" element={
          <PrivateRoute allowedRoles={['teacher']}>
            <TeacherLayout />
          </PrivateRoute>
        }>
          <Route index element={<TeacherProfile />} />
          <Route path="/teacher/studentregistration" element={<StudentRegistration />} />
          <Route path="/teacher/addmark" element={<ExamMark />} />
          <Route path="/teacher/markoverview" element={<ExamMarkOverView />} />
          <Route path="/teacher/attendance" element={<TakeAttendance />} />
          <Route path="/teacher/attendance/overview" element={<AttendanceOverView />} />
          <Route path="/teacher/timetable" element={<AddTimeTable />} />
          <Route path="/teacher/referances" element={<Referances />} />
          <Route path="/teacher/subjectandall" element={<SubjectAndAll />} />
          <Route path="/teacher/myblogs/:id" element={<SingleBlog />} />
          <Route path="/teacher/fees" element={<FeesDetails />} />
          <Route path="/teacher/compiler" element={<Example />} />
        </Route>

        <Route path="/admin" element={
          <PrivateRoute allowedRoles={['admin']}>
            <AdminLayout />
          </PrivateRoute>
        }>
          {/* Add Admin routes here */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
