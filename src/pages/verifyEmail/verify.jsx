import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';
import  {Api} from '../../Api'

export default function Verifyid() {
  const router = useNavigate();
  const params = useParams();
  const { id, token } = params;
  const navigate=useNavigate()

  useEffect(() => {
    const verifyId = async () => {
      console.log("Verifying: ", id, token);

      // Check if both token and id exist
      if (token && id) {
        try {
          const response = await axios.post(`${Api}/user/verifyEmail`, { id, token });

          if (response.status === 200) {
            toast.success('Email verified successfully');
            setTimeout(() =>  navigate('/login'), 2000);
        // pinkirect after 2 seconds
          } else {
            toast.error(response.data?.message || 'Verification failed');
          }
        } catch (error) {
          console.error('Error in verifying:', error);
          toast.error(error.response?.data?.message || 'Error in verifying');
        }
      } else {
        toast.error('Invalid token or ID');
      }
    };

    verifyId(); // Call the function to trigger the verification
  }, [token, id, router]);

  return (
    <>
    <main className="w-full h-screen flex items-center justify-center bg-gradient-to-tr px-4 -mt-24">
      <div className="max-w-xl w-full  bg-gray-900 rounded-xl shado w-lg p-8 text-center picboxh">
        <h1 className="text-2xl font-bold dark:text-gray-300 text-gray-300 sm:text-3xl mt-4">
          Verifying id...
        </h1>
        <Toaster />
      </div>
    </main>
    </>
  );
}
