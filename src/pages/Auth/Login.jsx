import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm() {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    companyName: '',
  });
  const navigate=useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (!data.username) {
      toast.error("Username is required");
      return false;
    }
    if (!data.email) {
      toast.error("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (!data.password) {
      toast.error("Password is required");
      return false;
    }
    if (data.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    if (!data.phone) {
      toast.error("Phone number is required");
      return false;
    }
    const phoneRegex = /^[0-9]{10,15}$/; // Adjust based on region
    if (!phoneRegex.test(data.phone)) {
      toast.error("Invalid phone number");
      return false;
    }
    if (!data.companyName) {
      toast.error("Company name is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:3002/commission/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 402) {
        toast.error('Email already registered')
        return;
      }
      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const result = await response.json();
      toast.success("Registration successful");
      toast.success("Sign-in successful");
      setTimeout(() => { navigate('/login') }, 500);

    } catch (err) {
      console.error("Registration error:", err);
      toast.error("Registration error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-wrap -mx-2 mb-4">
        <div className="w-1/2 px-2">
          <label className="mb-2.5 block font-medium text-dark dark:text-white">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            name="username"
            value={data.username}
            onChange={handleChange}
            className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
          />
        </div>

        <div className="w-1/2 px-2">
          <label className="mb-2.5 block font-medium text-dark dark:text-white">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-2 mb-4">
        <div className="w-1/2 px-2">
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

        <div className="w-1/2 px-2">
          <label className="mb-2.5 block font-medium text-dark dark:text-white">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm your password"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={handleChange}
            className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-2 mb-4">
        <div className="w-1/2 px-2">
          <label className="mb-2.5 block font-medium text-dark dark:text-white">
            Phone
          </label>
          <input
            type="text"
            placeholder="Enter your phone number"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
          />
        </div>

        <div className="w-1/2 px-2">
          <label className="mb-2.5 block font-medium text-dark dark:text-white">
            Company Name
          </label>
          <input
            type="text"
            placeholder="Enter your company name"
            name="companyName"
            value={data.companyName}
            onChange={handleChange}
            className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-primary py-3 text-white"
      >
        Register
      </button>
      <Toaster />
    </form>
  );
}
