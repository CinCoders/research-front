import axios, { AxiosInstance } from 'axios';

const apiBack = axios.create({ baseURL: process.env.REACT_APP_URL_BACK });

let hr: AxiosInstance | undefined;
if (process.env.REACT_APP_URL_HR) {
  hr = axios.create({ baseURL: process.env.REACT_APP_URL_HR });
} else {
  hr = undefined;
}
export const apiHr = hr;

export default apiBack;
