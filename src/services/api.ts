import axios from 'axios';

const API_BASE_URL = 'https://internal.stockpathshala.in/api/v1';

export const login = (mobileNumber: string) => {
    return axios.post(`${API_BASE_URL}/login-register`, {
        user_name: mobileNumber,
        hash_code: '96pYMmXfHNR'
    });
};

export const verifyOTP = (mobileNumber: string, otp: string) => {
    return axios.post(`${API_BASE_URL}/verify-login-register`, {
        user_name: mobileNumber,
        otp: otp
    });
};

export const fetchClasses = (token: string) => {
    // console.log("Authorization: Bearer", token); 

    return axios.get(`${API_BASE_URL}/live_classes`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
    });
};
