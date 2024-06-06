export const isAuthenticated = () => {
    const token = localStorage.getItem('adminToken');
    return token !== null;
  };
  
  export const getAdminToken = () => {
    return localStorage.getItem('adminToken');
  };
  
  export const setAdminToken = (token) => {
    localStorage.setItem('adminToken', token);
  };
  
  export const removeAdminToken = () => {
    localStorage.removeItem('adminToken');
  };
  