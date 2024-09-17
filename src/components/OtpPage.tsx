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
    <div>
      <h1>Enter OTP</h1>
      <input
        type="text"
        placeholder="Enter 4 digit OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerifyOTP}>Submit</button>
    </div>
  );
};

export default OTPPage;
