import axios from 'axios';
// config
import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    login: 'auth/login',
    register: 'auth/register',
    verify: 'auth/verifycode',
    registerByGoogle: 'auth/registerByGoogle',
    loginByGoogle: 'auth/loginByGoogle',
    resetPassword: 'auth/resetPassword',
    resendCode: 'auth/resendCode',
    IBAN: 'auth/iban',
    transfer: 'auth/transfer',
  },
};
