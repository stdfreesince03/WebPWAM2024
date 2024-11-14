import React, { useState } from 'react';
import {Form, useNavigate} from 'react-router-dom';
import './LoginBox.css';
import api from '../../services/axios.js';



export default function LoginBox() {
    const [isInstructor, setIsInstructor] = useState(false);

    const navigate = useNavigate();

    const handleToggle = () => {
        setIsInstructor((prev) => !prev);
    };

    async function postLogin(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const role = formData.get('role').trim();

        try{
            const {data} = await api.post('/login',{
                email,password,role
            },{
                headers:{
                    'Content-Type': 'application/json',
                }
            });

            if(data.user){
                console.log('Login Successful');
                navigate('/');
            }
        }catch(error){
            if (error.response) {
                console.log(error.response.data.error);
            } else {
                console.log("An unexpected error occurred.");
            }
        }


    }

    return (
        <div className="auth-box">
            <h2 className="auth-title">Login</h2>
            <p className="auth-subtitle">Please log in as {isInstructor ? 'Instructor' : 'Student'}</p>

            <Form
                method="post"
                className="auth-form"
                onSubmit={(event)=>postLogin(event)}
            >
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <input type="hidden" name="role" value={isInstructor? 'instructor' : 'student'}  />
                <div className="auth-options">
                    <label className="toggle-label">
                        <span>{isInstructor ? 'Instructor' : 'Student'}</span>
                        <div className="toggle-switch" onClick={handleToggle}>
                            <div className={`toggle-slider ${isInstructor ? 'active' : ''}`}></div>
                        </div>
                    </label>
                    <a href="#" className="forgot-password">Forgot Password?</a>
                </div>

                <button type="submit" className="auth-button">Login</button>
            </Form>

            <div className="or-divider">or</div>
            <button className="google-button">
                <img src="/logos/OAuth.png" id="google-oauth-icon" alt="Google Icon" />
                Login with Google
            </button>

            <div className="auth-footer">
                Don't have an account? <a href="/signup">Sign up</a>
            </div>
        </div>
    );
}