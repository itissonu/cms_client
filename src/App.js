import './App.css';
import LoginPage from './Pages/LoginPage';
import { Routes, Route } from 'react-router-dom';
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
function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/otp/:email" element={<OtpValidation />} />
        <Route exact path="/forgot" element={<ForgotPassword />} />
        <Route exact path="/newPassword" element={<NewPassword />} />
        <Route element={<ProfileOutlet />}>
          <Route exact path="/" element={<ProfilePage />} />
          <Route exact path="/details/:id" element={<ProfileFullDetails />} />
          <Route exact path="/myblogs" element={<BlogProfile/>} />
          <Route exact path="/mytimetable" element={<TimeTable/>} />
          <Route exact path="/myblogs/addblog" element={<AddBlog/>} />
          <Route exact path="/myblogs/:id" element={<SingleBlog/>}/>
          <Route exact path="/myblogs/update/:id" element={<UpdateBlog/>}/>
          <Route exact path="/overview" element={<AttendenceOverview/>} />
          <Route exact path="/referances/article" element={<References/>} />
          <Route exact path="/referances/video" element={<ReferenceVideo/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
