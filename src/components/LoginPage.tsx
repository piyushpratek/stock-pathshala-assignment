import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import useAutoLogin from '../hooks/useAutoLogin';

const LoginPage = () => {

    useAutoLogin();  // Calling the hook to check for token and auto-redirect if necessary


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
        <div className=''>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="Enter 10 digit mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
            />
            <button onClick={handleLogin}>Submit</button>
        </div>
    );
};

export default LoginPage;
