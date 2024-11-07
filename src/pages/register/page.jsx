import DefaultLayout from "../../components/Layouts/signi";
import ProfileBox from "./register";
import React, { useEffect } from 'react';
import { useAuth } from '../../AuthContext'; // Import your AuthContext
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Profile = () => {
  const { isAuthenticated } = useAuth();
 

 

  // Prevent body scrolling when this component is rendered
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset'; // Restore scroll when component unmounts
    };
  }, []);

  return (
    <DefaultLayout>
      <div className="flex items-center justify-center min-h-screen">
        {/* Container that fills the screen without scroll */}
        <div className="w-full max-w-[1000px]">
          <ProfileBox />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profile;
