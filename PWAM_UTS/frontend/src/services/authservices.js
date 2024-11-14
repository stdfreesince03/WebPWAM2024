// src/services/authServices.js
import api from './axios';
import  updateIsLoggedIn  from '../redux/slices/auth-thunks';

export const login = async (email, password, role, dispatch, navigate) => {
    try {
        const { data } = await api.post('/login', {
            email, password, role
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (data.user) {
            console.log('Login Successful');
            dispatch(updateIsLoggedIn()); // Update Redux state
            navigate('/'); // Redirect after successful login
        }

        return data; // Optionally return data if needed
    } catch (error) {
        if (error.response) {
            console.log(error.response.data.error);
        } else {
            console.log("An unexpected error occurred.");
        }
        throw error; // Rethrow the error to handle in the calling function if needed
    }
};

export const logout = async (dispatch, navigate) => {
    try {
        await api.post('/logout', {}, {
            withCredentials: true,
        });

        dispatch(updateIsLoggedIn()); // Update Redux state to logged out
        navigate('/login'); // Redirect to login page after logout
    } catch (error) {
        console.error("Error during logout:", error);
        throw error; // Rethrow to handle if needed
    }
};