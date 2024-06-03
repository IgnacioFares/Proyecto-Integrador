import { useAuth } from '../context/AuthContext'; 

const useAuthToken = () => {
    const { token } = useAuth();
    return token;
};

export default useAuthToken;
