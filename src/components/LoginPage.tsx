import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import useAutoLogin from '../hooks/useAutoLogin';

const LoginPage = () => {

    useAutoLogin();  // Calling hook to check for token and auto-redirect if necessary


    const [mobileNumber, setMobileNumber] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        console.log('Attempting to login with mobile number:', mobileNumber);

        try {
            const response = await login(mobileNumber);
            if (response.data) {
                localStorage.setItem('mobileNumber', mobileNumber);
                console.log('Login successful, navigating to OTP page');

                navigate('/otp');
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col justify-center items-center">
                <h1 className='text-bold text-2xl font-extrabold py-6'>Login</h1>

                <div className='border border-spacing-8 border-gray-300 p-2 rounded-md px-9 py-5 w-full max-w-md shadow-2xl'>
                    <p className='text-bold text-xl font-bold py-3'>Mobile Number:</p>
                    <input
                        type="number"
                        placeholder="Enter 10 digit mobile number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        className="border border-gray-300 p-2 rounded w-full bg-gray-50"
                        pattern="\d{10}"
                        maxLength={10}
                    />
                    <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded w-full mt-9 mb-2 font-medium">Send OTP</button>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;
