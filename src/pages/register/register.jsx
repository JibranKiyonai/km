import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';
import { useState,useEffect } from "react";
import { Api } from "../../Api"; 

export default function Register() {
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    username: '',
    number: '',
    password: '',
    cpassword: '',
  
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
// Updated password regex to include all special characters
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    if (!formData.fname || !formData.lname || !formData.email   || !formData.password || !formData.cpassword ) {
      return toast.error("Please fill in all required fields.");
    }
    if (formData.password !== formData.cpassword) {
      return toast.error("Passwords do not match.");
    }
    if (!passwordRegex.test(formData.password)) {
      return toast.error("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
    }

    try {
      setLoading(true); // Hide loader

      const response = await axios.post(`${Api}/user/add`, formData);
      if (response.status === 200) {
        toast.success('Account created successfully');
        setFormSubmitted(true);
      }
    } catch (error) {
      console.log("Error creating account:", error);
      toast.error(error.response?.data?.message || 'Error creating account');
      setLoading(false); // Hide loader
    }
  };

  useEffect(() => {
    if (formSubmitted) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [formSubmitted]);

  useEffect(() => {
    if (formSubmitted) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);



  if (formSubmitted) {
    return (
      <main className="w-full h-screen flex items-center justify-center bg-gradient-to-tr px-4 -mt-20 ">
        <div className="max-w-xl w-full  bg-gray-800   rounded-xl sha dow -lg p-8 picboxh">
          <div className="text-center">
            <h1 className="text-2xl font-bold dark:text-gray-300 text-gray-300 sm:text-2xl mt-4">
              Registration Successful
            </h1>
            <p className="dark:text-gray-300 text-gray-300 mt-2 text-sm sm:text-base">
              A verification email has been sent to you. Please check your inbox and follow the instructions to complete your registration.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="w-full h-sc reen  flex items-center justify-center px-4">
        <div className="max-w-xl w-full  bg-gray-800  rounded-xl sh adow -lg p-4 picboxc">
          <div className="text-center">
            <h1 className="text-2xl font-bold  text-gray-300  mt-4  ">
              Enhance your CRM Today with AI
            </h1>
            <p className=" text-gray-400  mt-2 text-sm sm:text-base">
              Your journey into AI-based CRM starts here. Unlock your potential!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-4 space-y-5 p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 ">First Name</label>
                <input disabled={loading} type="text" name="fname" value={formData.fname} onChange={handleChange} placeholder="Enter your first name" className="dark:bg-gray-900 w-full mt-2 px-4 py-3 border rounded-lg focus:outline-none dark:text-gray-300 text-gray-300" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 ">Last Name</label>
                <input
                disabled={loading}
                  type="text"
                  name="lname"
                  value={formData.lname}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="dark:bg-gray-900 w-full mt-2 px-4 py-3 border rounded-lg focus:outline-none dark:text-gray-300 text-gray-300"
                />
              </div>
              
           </div>
           <div>
                <label className="block text-sm font-medium dark:text-gray-300 text-gray-300">E-mail</label>
                <input
                disabled={loading}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="dark:bg-gray-900 w-full mt-2 px-4 py-3 border rounded-lg focus:outline-none dark:text-gray-300 text-gray-300"
                />
              </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-medium dark:text-gray-300 text-gray-300">Password</label>
                <input
                disabled={loading}
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="dark:bg-gray-900 w-full mt-2 px-4 py-3 border rounded-lg focus:outline-none dark:text-gray-300 text-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium dark:text-gray-300 text-gray-300">Confirm Password</label>
                <input
                disabled={loading}
                  type="password"
                  name="cpassword"
                  value={formData.cpassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="dark:bg-gray-900 w-full mt-2 px-4 py-3 border rounded-lg focus:outline-none dark:text-gray-300 text-gray-300"
                />
              </div>
            </div>

        
            <div className="col-span-1 sm:col-span-2">
              <button
                type="submit"
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-lg focus:outline-none"
              >
                {loading ? "Submitting" : "Register"}
              </button>
            </div>
            <div className="mt-4 text-center col-span-1 sm:col-span-2">
              <p className="text-sm dark:text-gray-300 text-gray-300">
                Already have an account?{' '}
                <Link to="/login" className="text-pink-600 font-bold hover:underline">Login here</Link>
              </p>
            </div>
          </form>
          <Toaster />
        </div>
      </main>
    </>
  );
}
