import axios from 'axios';

const getToken = () => {
    return localStorage.getItem('token');
};

const instance = axios.create({
  baseURL: 'https://intelligent-tranquility-production.up.railway.app', // URL de fallback en caso de que la variable de entorno no esté definida
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
