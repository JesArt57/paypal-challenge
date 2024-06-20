import { useEffect } from 'react';
import axios from '@api/axios';

const useAxios = () => {

  useEffect(() => {
    const requestIntercept = axios.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = 'Bearer 123';
        }

        return config;
      }, (error => Promise.reject(error))
    )

    const responseIntercept = axios.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 401 && !prevRequest._retry) {
          prevRequest._retry = true;

          console.log("refresh token")

          return await axios(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestIntercept);
      axios.interceptors.response.eject(responseIntercept);
    }
  }, []);

  return axios;

}

export default useAxios;
