
export const getUserRole =async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      if (user.isAdmin) {
        return 'admin';
      } else if (user.isTeacher) {
        return 'teacher';
      } else {
        return 'student';
      }
    }
   
  };
  export const isLoggedIn = () => {
    const authToken = localStorage.getItem('auth-token');
    return !!authToken;
  };
  export const logoutUser = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user');
  };
  