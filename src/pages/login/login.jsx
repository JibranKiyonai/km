import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';
import { useState, useContext } from "react";
import { Api } from "../../Api";
import Cookies from "js-cookie";

export default function Login() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(`${Api}/user/login`, values);
      console.log(response);
      if (response.status === 200) {
        toast.success('Login successful');

        Cookies.set('id', response.data.id, { expires: 1, path: '/', sameSite: 'Lax', secure: false })
        Cookies.set('name', response.data.name[0], { expires: 1, path: '/', sameSite: 'Lax', secure: false })
        Cookies.set('token', response.data.token, { expires: 1, path: '/', sameSite: 'Lax', secure: false })
        Cookies.set('pic', response.data.pic, { expires: 1, path: '/', sameSite: 'Lax', secure: false })
        Cookies.set('fname', response.data.fname, { expires: 1, path: '/', sameSite: 'Lax', secure: false })
        Cookies.set('auth', 'true', { expires: 1, path: '/', sameSite: 'Lax', secure: false })

        setTimeout(() =>  navigate(`/${response.data.id}`), 1000);

        
      
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error logging in');
      console.log(error.response?.data?.message);
      console.log(error);
    }
    setSubmitting(false);
  };

  if (formSubmitted) {
    return (
      <main className="w-full h-screen flex items-center justify-center bg-gradient-to-tr from-black to-gray-900 px-4 -mt-20">
        <div className="max-w-xl w-full dark:bg-gray-900 rounded-xl shadow-lg p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold dark:text-gray-300 text-gray-600 sm:text-2xl mt-4">
              Login Successful
            </h1>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="w-full h-scre en flex items-center justify-center px-4 ">
        <div className="max-w-xl w-full dark:bg-gray-800     rounded-xl shado w-lg p-4 picboxc">
          <div className="text-center">
            <h1 className="text-2xl font-bold   text-gray-300 sm:text-3xl mt-4">
              Welcome Back!
            </h1>
            <p className=" text-gray-400   mt-2 text-sm sm:text-base">
              Please enter your credentials to log in.
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="mt-1 space-y-5 p-5">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-300">
                    Email Address
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    disabled={isSubmitting}
                    className="dark:bg-gray-900 w-full mt-2 px-4 py-3 border rounded-lg focus:outline-none dark:text-gray-300 text-gray-300 focus:ring-2 focus:ring-pink-600 focus:border-transparent placeholder-gray-400"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-pink-500 text-sm"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-300">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    disabled={isSubmitting}
                    className="dark:bg-gray-900 w-full mt-2 px-4 py-3 border rounded-lg focus:outline-none dark:text-gray-300 text-gray-300 focus:ring-2 focus:ring-pink-600 focus:border-transparent placeholder-gray-400"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-pink-500 text-sm"
                  />
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full justify-center text-center align-middle flex py-3 text-white bg-pink-600 hover:bg-pink-900 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-150"
                >
                  {isSubmitting ? "Logging In..." : "Log In"}
                </button>

                {/* Register link */}
                <p className="text-gray-400 text-sm sm:text-base">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-semibold text-pink-500 hover:text-pink-300 duration-150"
                  >
                    Sign up here
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
        <Toaster />
      </main>
    </>
  );
}
