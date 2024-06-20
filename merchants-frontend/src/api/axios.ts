import axios, { AxiosInstance } from 'axios';

const axiosConfig: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL
});

export default axiosConfig;
