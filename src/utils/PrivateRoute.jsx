import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { getUserRole } from './auth';

const PrivateRoute = ({ children, role }) => {
  const { isLogged } = useAuth();

  if (!isLogged) {
    return <Navigate to="/login" />;
  }

  if (role && role !== getUserRole()) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
