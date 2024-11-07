
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from '../../AuthContext'; // Adjust the import based on your file structure
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Register = () => {
  const { isAuthenticated, setisAuthenticated } = useAuth();

  const [data, setData] = useState({
    email: '', // This will accept either email or username
    password: '',
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (!data.email) {
      toast.error("Email or Username is required");
      return false;
    }
    if (!data.password) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === 'CBA234' && data.email === 'kiyonai@gmail.com') {
      setisAuthenticated(true)
      navigate('/')
    }

    else{toast.error('login failed'); return}
  }
    return (
      <>
         <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-dark dark:text-white">
              Email
            </label>
            <input
              type="text"
              placeholder="Enter your email or username"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>

          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-dark dark:text-white">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-primary py-3 text-white"
          >
            Sign In
          </button>
          <Toaster />
        </form>
      </>
    )
  }

  export default Register