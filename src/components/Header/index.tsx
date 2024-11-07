import { Link, useParams } from 'react-router-dom'
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import { useAuth } from '../../AuthContext'; // Use your AuthContext
import React, { useState, useEffect } from "react"; // Import useState and useEffect

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const params = useParams();
  const { freecount, setFreecount } = useAuth(); // Use context values
 

  return (
    <header className="sticky top-0 z-999 flex w-full border-b border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark">
      <div className="flex flex-grow items-center justify-between px-4 py-2 shadow-2 md:px-5 2xl:px-10">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-dark-3 dark:bg-dark-2 lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-dark delay-[0] duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "!w-full delay-300"
                    }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-dark delay-150 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "delay-400 !w-full"
                    }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-dark delay-200 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "!w-full delay-500"
                    }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-dark delay-300 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "!h-0 !delay-[0]"
                    }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-dark duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "!h-0 !delay-200"
                    }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden" to="/">
            {/* <Image
              width={32}
              height={32}
              src={"/images/logo/logo-icon.svg"}
              alt="Logo"
            /> */}

          </Link>
        </div>

        <div className="hidden xl:block">
          <div>
            <h1 className="mt-3  font-bold text-slate-600 dark:text-slate-400 italic">
              Boost Your CRM Management with AI-Driven Tools
            </h1>
            {/* <p className="font-medium">Kiyonai CRM Solutions Admin Dashboard Solution</p> */}
          </div>
        </div>

        <div className="flex items-center justify-normal gap-2 2xsm:gap-4 lg:w-full lg:justify-between xl:w-auto xl:justify-normal">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Search Form --> */}
            {/* <SearchForm /> */}
            {/* <!-- Search Form --> */}

            {/* <!-- Dark Mode Toggle --> */}
            <div className="flex items-center">
              <span className="text-sm font-medium font-satoshi text-gray-600 dark:text-gray-300">
              
              
                      </span>
            </div>
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggle --> */} 

            {/* <!-- Notification Menu Area --> */}
            {/* <DropdownNotification /> */}
            {/* <!-- Notification Menu Area --> */}
          </ul>


          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
