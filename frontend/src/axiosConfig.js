import axios from 'axios';

const getToken = () => {
    return localStorage.getItem('token');
};

const instance = axios.create({
  baseURL: 'http://localhost:8080', // Asegúrate de que esta sea la URL base correcta para tu backend
});

instance.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
