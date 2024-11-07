import React, { useEffect, useState } from "react";
import axios from "axios";
import { CiUser, CiPhone } from "react-icons/ci";
import { MdOutlineMailOutline } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../AuthContext";
import Cookies from "js-cookie";
import { Puff } from "react-loader-spinner";

const SettingBoxes = () => {
   

  return (
    <>
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-12 xl:col-span-12">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-7 py-4 dark:border-dark-3 flex justify-between items-center">
              <h3 className="font-medium text-dark dark:text-white">
                Personal Information - [account:{" "}
                <span className="text-red-800">FREE</span>]
              </h3>
              
            </div>

            <div className="p-7">
              <form>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                        <CiUser size={22} />
                      </span>
                      <input
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="name"
                        id="name"
                        value='Name'
                     
                      />
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                      htmlFor="email"
                    >
                      E-mail
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                        <MdOutlineMailOutline size={22} />
                      </span>
                      <input
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        type="email"
                        name="email"
                        id="email"
                        value='Email'
                   
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                      htmlFor="number"
                    >
                      Phone
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                        <CiPhone size={22} />
                      </span>
                      <input
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="number"
                        id="number"
                        value='Phone'
                     
                      />
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                      htmlFor="channelname"
                    >
                      Company Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                        <CiUser size={22} />
                      </span>
                      <input
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="channelname"
                        id="channelname"
                        value='Company'
                     
                      />
                    </div>
                  </div>
                </div>

           

            
              </form>
              <Toaster />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingBoxes;
