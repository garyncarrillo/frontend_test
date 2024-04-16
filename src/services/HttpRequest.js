import axios from "axios";
import { getAccessToken } from "../config/libs/user"

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  transformRequest: [
    (data, headers) => {
      return JSON.stringify(data);
    },
  ],
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  async config => {
    var token =  getAccessToken()
    
    if(token) {
      config.headers['Authorization'] = "Bearer " + token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
);

instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  // return Promise.reject(error);

  const { response: { status, config } } = error;
  if (status === 401 && config.headers.Authorization) {
    //lscache.set(AUTH_TOKEN, '')
    //history.go(/login)
  } else {
    throw new Error(error.response.data.detail);
  }
});

export default instance;