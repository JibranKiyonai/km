import Table from './table'
import DefaultLayout from "../../components/Layouts/DefaultLaout";
import React, { useEffect } from 'react';
import { useAuth } from '../../AuthContext'; // Import your AuthContext
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { Api } from "../../Api";

const Settings = () => {

  const navigate = useNavigate();
  const { id } = useParams(); // Get the user ID from the route parameters

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) { navigate(`/login`); return; }

    const verifyUser = async () => {
      try {
        const response = await axios.get(`${Api}/user/verifyuser/${id}/${token}`);
        if (response.data.success) {
          console.log('User verified successfully');
        } else { console.error(response.data.message); navigate(`/login`); }
      } catch (error) { console.error('Error verifying user:', error); navigate(`/login`); }
    };
    verifyUser();
  }, [id, navigate, ]);

  return (
    <DefaultLayout>
      <div className="mx-auto w-full max-w-[1080px] ">
        <Table />
      </div>
    </DefaultLayout>
  );
};

export default Settings;
