import axios from 'axios';

// ----------------------------------------------------------------------
// export const DOMAIN = 'https://tc-837o.onrender.com'
export const DOMAIN = 'http://localhost:9000'
// export const DOMAIN = 'https://tutor-center.onrender.com'
export const USER_LOGIN = 'userLogin'
export const ACCESSTOKEN = 'accessToken'
// const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuZ3V5ZW52YW5jQGdtYWlsLmNvbSIsImlhdCI6MTcwMDQ2NzQwMywiZXhwIjoxNzAwNTUzODAzfQ.HTkOp8ssSU8Kz8RkE3_s5stpD_guUqiyOzLcyMS34N0'
const axiosInstance = axios.create({
  baseURL: DOMAIN,
  timeout: 30000,
});
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESSTOKEN)
  config.headers = {
    // ...config.headers,
    'Authorization': token ? `Bearer ${token}` : '',
    'Content-Type' : 'application/json',
    // ['']: "",

  }
  return config;
}, (error) =>  Promise.reject(error))
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;