import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyOTP } from '../services/api';

const OTPPage = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const mobileNumber = localStorage.getItem('mobileNumber') || "";

  const handleVerifyOTP = async () => {
    try {
      const response = await verifyOTP(mobileNumber, otp);

      // Extracting token from the response
      const token = response.data.token;

      if (token) {
        // Storing the token in localStorage
        localStorage.setItem('token', token);
        // console.log('Token saved:', token);
        navigate('/classes');
      } else {
        console.error('No token found in response');
      }
    } catch (error) {
      console.error('OTP verification failed', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-bold text-2xl font-extrabold py-9">Enter OTP</h1>

        <div className="border border-gray-300 p-2 rounded px-9 py-5 w-full max-w-md shadow-lg">
          <p className="text-bold text-xl font-bold py-3">OTP:</p>
          <input
            type="number"
            placeholder="Enter 4 digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            maxLength={4}
          />
          <button onClick={handleVerifyOTP} className="bg-blue-500 text-white p-2 rounded w-full mt-4">Submit</button>
        </div>
      </div>
    </div>

  );
};

export default OTPPage;
