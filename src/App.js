import './App.css';
import LoginPage from './Pages/LoginPage';
import { Routes, Route } from 'react-router-dom';
import OtpValidation from './Pages/OtpValidation';
import ForgotPassword from './Pages/ForgotPassword';
import NewPassword from './Pages/NewPassword';
import ProfileOutlet from './utils/ProfileOutlet';
import ProfilePage from './Pages/ProfilePage';
function App() {
  return (
    <Routes>
      <Route exact path="/" element={<LoginPage />} />
      <Route exact path="/otp" element={<OtpValidation />} />
      <Route exact path="/forgot" element={<ForgotPassword />} />
      <Route exact path="/newPassword" element={<NewPassword />} />
      <Route path='profile' element={<ProfileOutlet />}>
        <Route exact path="/profile" element={<ProfilePage />} />

      </Route>
    </Routes>

  );
}

export default App;
