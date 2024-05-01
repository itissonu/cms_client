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
          <Route exact path="/overview" element={<AttendenceOverview/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
