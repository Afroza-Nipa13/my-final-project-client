import React from 'react';
import axios from "axios";

import { useNavigate } from 'react-router';
import useAuth from './useAuth';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:3000',
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  console.log(user)
  const navigate = useNavigate();

  axiosSecure.interceptors.request.use(async (config) => {
    if (user) {

      // ✅ This gets the correct Firebase token
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  axiosSecure.interceptors.response.use(
    (res) => res,
    async (error) => {
      const status = error?.response?.status;

      if (status === 403) {
        navigate('/forbidden');
      } else if (status === 401) {
        await logOut();
        navigate('/login');
      }

      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
