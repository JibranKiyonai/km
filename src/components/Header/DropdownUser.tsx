import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import ClickOutside from "./ClickOutside";
import { FaUserCircle } from "react-icons/fa";
import React from "react";
import { useAuth } from '../../AuthContext'; // Import your AuthContext
import Cookies from "js-cookie";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { logout, authData } = useAuth(); // Destructure user and logout from AuthContext
  const navigate = useNavigate(); // Use useNavigate for redirecting

  const handleLogout = () => {
    logout(); // Call logout function
    Cookies.set('id', '', {  path: '/', sameSite: 'Lax' ,secure: false })
    Cookies.set('token', '', {  path: '/', sameSite: 'Lax' ,secure: false })
    navigate('/login')

  };
  useEffect(() => { if (!authData.isLoggedIn) { navigate('/login') } }, [])


  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2"
        to='#'
      >
        <span className="h-8 w-8 rounded-full">
          <FaUserCircle size={28} className="overflow-hidden rounded-full" />
        </span>

        <span className="flex items-center gap-2 font-medium text-dark dark:text-dark-6">
          <span className="hidden lg:block">{"User"}</span> {/* Display user name or "Guest" */}

          <svg
            className={`fill-current duration-200 ease-in ${dropdownOpen && "rotate-180"}`}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.6921 7.09327C3.91674 6.83119 4.3113 6.80084 4.57338 7.02548L9.99997 11.6768L15.4266 7.02548C15.6886 6.80084 16.0832 6.83119 16.3078 7.09327C16.5325 7.35535 16.5021 7.74991 16.24 7.97455L10.4067 12.9745C10.1727 13.1752 9.82728 13.1752 9.59322 12.9745L3.75989 7.97455C3.49781 7.74991 3.46746 7.35535 3.6921 7.09327Z"
              fill=""
            />
          </svg>
        </span>
      </Link>

      {/* Dropdown Start */}
      {dropdownOpen && (
        <div className={`absolute right-0 mt-7.5 flex w-[280px] flex-col rounded-lg border-[0.5px] border-stroke bg-white shadow-default dark:border-dark-3 dark:bg-gray-dark`}>
          <div className="p-2.5">
            <button
              className="flex w-full items-center gap-2.5 rounded-[7px] p-2.5 text-sm font-medium text-dark-4 duration-300 ease-in-out hover:bg-gray-2 hover:text-dark dark:text-dark-6 dark:hover:bg-dark-3 dark:hover:text-white lg:text-base"
              onClick={handleLogout} // Logout on button click
            >
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Your SVG content here */}
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}
      {/* Dropdown End */}
    </ClickOutside>
  );
};

export default DropdownUser;
